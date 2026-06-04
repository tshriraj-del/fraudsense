import { FingerprintIcon } from './Icons.jsx';

// status: 'ready' | 'analyzing' | 'complete' — derived from existing app state.
const STATUS = {
  ready: { dot: 'var(--accent-green)', label: 'SYSTEM READY' },
  analyzing: { dot: 'var(--accent-amber)', label: 'ANALYZING...' },
  complete: { dot: 'var(--accent-cyan)', label: 'INVESTIGATION COMPLETE' },
};

export default function Header({ status = 'ready' }) {
  const s = STATUS[status] ?? STATUS.ready;

  return (
    <header className="sticky top-0 z-30 h-14 border-b border-[color:var(--border)] bg-[color:var(--bg-surface)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1100px] items-center justify-between px-4 sm:px-6">
        {/* Left: fingerprint + wordmark */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden text-[color:var(--accent-cyan)]">
            <FingerprintIcon className="h-6 w-6" />
            {/* horizontal scan line sweeping every 3s */}
            <span className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-[color:var(--accent-cyan)] shadow-[0_0_6px_var(--accent-cyan)] animate-icon-scan" />
          </span>
          <span className="font-display text-sm font-bold tracking-[0.15em] text-[color:var(--text-primary)]">
            FRAUDSENSE
          </span>
        </div>

        {/* Center: status indicator (hidden on mobile) */}
        <div className="hidden items-center gap-2 md:flex">
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
            style={{ backgroundColor: s.dot, boxShadow: `0 0 8px ${s.dot}` }}
          />
          <span className="font-mono text-[11px] tracking-[0.1em] text-[color:var(--text-secondary)]">
            {s.label}
          </span>
        </div>

        {/* Right: powered-by pill */}
        <span className="rounded-[2px] border border-[color:var(--border)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[color:var(--text-dim)]">
          Powered by Claude
        </span>
      </div>
    </header>
  );
}
