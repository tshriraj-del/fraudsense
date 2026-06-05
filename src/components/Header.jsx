import { ShieldCheck } from 'lucide-react';

const STATUS = {
  ready:     { color: 'var(--accent-green)',  label: 'Ready' },
  analyzing: { color: 'var(--accent-amber)',  label: 'Analyzing…' },
  complete:  { color: 'var(--accent-cyan)',   label: 'Complete' },
};

export default function Header({ status = 'ready' }) {
  const s = STATUS[status] ?? STATUS.ready;

  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      background: 'rgba(8,11,20,0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Left: icon + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36,
            background: 'rgba(56,189,248,0.1)',
            border: '1px solid rgba(56,189,248,0.3)',
            borderRadius: 9,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ShieldCheck size={17} color="#38bdf8" />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              FraudSense
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
              AI fraud investigation copilot · 4-stage pipeline
            </div>
          </div>
        </div>

        {/* Right: status + badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: s.color,
              boxShadow: `0 0 6px ${s.color}`,
              animation: status === 'analyzing' ? 'pulseDot 1s steps(1) infinite' : 'none',
            }} />
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
              {s.label}
            </span>
          </div>
          <div style={{
            background: 'rgba(56,189,248,0.08)',
            border: '1px solid rgba(56,189,248,0.2)',
            borderRadius: 6, padding: '4px 10px',
            fontSize: 11, color: '#38bdf8', fontWeight: 500,
          }}>
            REDWING · Investigation
          </div>
        </div>
      </div>
    </header>
  );
}
