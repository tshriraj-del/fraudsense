import { useState } from 'react';
import Header from './components/Header.jsx';
import InputSection from './components/InputSection.jsx';
import ResultsSection from './components/ResultsSection.jsx';
import SkeletonLoader from './components/SkeletonLoader.jsx';
import { AlertIcon, SearchIcon, CircuitTexture } from './components/Icons.jsx';
import { investigateCase } from './api.js';
import { processFile, MAX_FILES } from './files.js';
import { CASE_TYPES, MIN_INPUT_LENGTH } from './constants.js';

export default function App() {
  const [caseText, setCaseText] = useState('');
  const [caseType, setCaseType] = useState(CASE_TYPES[0]);
  const [contextFlags, setContextFlags] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState(null);
  // Snapshot of the inputs that produced `analysis`, used for the export report.
  const [caseMeta, setCaseMeta] = useState(null);

  function toggleFlag(flag) {
    setContextFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
  }

  // Read newly selected/dropped files into attachment descriptors.
  async function addFiles(fileList) {
    setError('');
    const incoming = Array.from(fileList ?? []);
    if (!incoming.length) return;

    const room = MAX_FILES - attachments.length;
    if (room <= 0) {
      setError(`You can attach at most ${MAX_FILES} files.`);
      return;
    }

    const results = await Promise.allSettled(incoming.slice(0, room).map(processFile));
    const ok = [];
    const failed = [];
    for (const r of results) {
      if (r.status === 'fulfilled') ok.push(r.value);
      else failed.push(r.reason?.message || 'A file could not be read.');
    }
    if (ok.length) {
      // de-dupe by id
      setAttachments((prev) => {
        const seen = new Set(prev.map((a) => a.id));
        return [...prev, ...ok.filter((a) => !seen.has(a.id))];
      });
    }
    if (failed.length) setError(failed.join(' '));
  }

  function removeFile(id) {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }

  async function runInvestigation() {
    const hasText = caseText.trim().length >= MIN_INPUT_LENGTH;
    if (!hasText && attachments.length === 0) {
      setError(`Enter at least ${MIN_INPUT_LENGTH} characters or attach a file describing the case.`);
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const result = await investigateCase(caseText.trim(), caseType, contextFlags, attachments);
      setAnalysis(result);
      setCaseMeta({
        caseText: caseText.trim(),
        caseType,
        contextFlags: [...contextFlags],
        attachments: attachments.map((a) => ({ name: a.name, kind: a.kind })),
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function resetCase() {
    setCaseText('');
    setCaseType(CASE_TYPES[0]);
    setContextFlags([]);
    setAttachments([]);
    setAnalysis(null);
    setCaseMeta(null);
    setError('');
  }

  // Presentational status derived from existing state (no new app state).
  const status = loading ? 'analyzing' : analysis ? 'complete' : 'ready';

  return (
    <div className="relative min-h-full">
      {/* Faint circuit texture, top-right corner */}
      <div className="pointer-events-none fixed right-0 top-0 z-0 opacity-[0.03]" aria-hidden="true">
        <CircuitTexture />
      </div>

      <Header status={status} />

      <main className="relative z-10 mx-auto max-w-[1100px] px-4 py-8 sm:px-6 sm:py-10">
        <InputSection
          caseText={caseText}
          setCaseText={setCaseText}
          caseType={caseType}
          setCaseType={setCaseType}
          contextFlags={contextFlags}
          toggleFlag={toggleFlag}
          attachments={attachments}
          addFiles={addFiles}
          removeFile={removeFile}
          onInvestigate={runInvestigation}
          loading={loading}
        />

        {/* Error with retry */}
        {error && !loading && (
          <div
            role="alert"
            className="mx-auto mt-6 flex max-w-[720px] items-start gap-3 rounded-[2px] border px-4 py-3.5 font-mono text-[12px]"
            style={{ borderColor: 'var(--accent-red)', background: 'var(--accent-red-dim)', color: 'var(--text-primary)' }}
          >
            <AlertIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex-1">
              <p className="font-display uppercase tracking-[0.1em] text-[color:var(--accent-red)]">
                Investigation failed
              </p>
              <p className="mt-1 text-[color:var(--text-secondary)]">{error}</p>
            </div>
            <button
              type="button"
              onClick={runInvestigation}
              className="shrink-0 rounded-[2px] border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors"
              style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}
            >
              Retry
            </button>
          </div>
        )}

        <div className="mt-8">
          {loading && <SkeletonLoader />}

          {!loading && analysis && (
            <ResultsSection analysis={analysis} caseMeta={caseMeta} onReset={resetCase} />
          )}

          {!loading && !analysis && !error && <EmptyState />}
        </div>
      </main>

      <footer className="relative z-10 mx-auto max-w-[1100px] px-4 py-8 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-dim)] sm:px-6">
        FraudSense 2.0 · Internal fraud triage tooling · Powered by Claude
      </footer>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-[720px] rounded-[2px] border border-dashed border-[color:var(--border-active)] bg-[color:var(--bg-surface)]/40 px-6 py-14 text-center">
      <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[2px] border border-[color:var(--border)] bg-[color:var(--bg-base)] text-[color:var(--accent-cyan)]">
        <SearchIcon className="h-6 w-6" />
      </span>
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-[color:var(--text-primary)]">
        Awaiting case input
      </h3>
      <p className="mx-auto mt-2 max-w-md font-mono text-[12px] leading-[1.7] text-[color:var(--text-secondary)]">
        FraudSense runs a 4-stage investigation — signal extraction, classification, root cause
        analysis, and a recommended action — from a raw case description.
      </p>
    </div>
  );
}
