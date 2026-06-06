'use client'

/**
 * Decorative cover art for projects that have no photo yet.
 * Pure line-art motifs (emerald, via currentColor) — NOT data/screenshots,
 * so nothing here implies real results. Keyed by project id, with a generic
 * fallback. Replace by adding an image to the project in lib/content.ts.
 */
export default function ProjectArtwork({ id, label }: { id: string; label: string }) {
  return (
    <div className="dot-grid relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="w-full max-w-[280px] px-6 text-accent/70">
        {id === 'digital-twin' ? (
          <DigitalTwin />
        ) : id === 'line-follower' ? (
          <LineFollower />
        ) : id === 'smart-reservoir' ? (
          <Reservoir />
        ) : (
          <Generic />
        )}
      </div>
      <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </span>
    </div>
  )
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/* Machine (left) mirrored by a model/graph (right) across a "twin" boundary. */
function DigitalTwin() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      {/* twin boundary */}
      <line x1="120" y1="14" x2="120" y2="106" stroke="currentColor" strokeWidth="1" strokeDasharray="4 5" opacity="0.6" />
      {/* left: machine / rotor */}
      <circle cx="60" cy="60" r="26" {...stroke} />
      <circle cx="60" cy="60" r="9" {...stroke} />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const r = (a * Math.PI) / 180
        return (
          <line key={a} x1={60 + 26 * Math.cos(r)} y1={60 + 26 * Math.sin(r)} x2={60 + 33 * Math.cos(r)} y2={60 + 33 * Math.sin(r)} {...stroke} />
        )
      })}
      {/* right: time-series + nodes (RF/LSTM abstraction) */}
      <polyline points="150,84 168,66 186,74 204,50 222,58" {...stroke} />
      {[ [150,84],[168,66],[186,74],[204,50],[222,58] ].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="2.6" fill="currentColor" />
      ))}
      <rect x="150" y="26" width="72" height="16" rx="4" {...stroke} opacity="0.8" />
      <line x1="160" y1="34" x2="170" y2="34" {...stroke} />
      <line x1="178" y1="34" x2="200" y2="34" {...stroke} />
    </svg>
  )
}

/* Winding track with a little bot following it. */
function LineFollower() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      <path d="M16 92 C 60 92, 60 30, 110 30 S 184 92, 224 56" {...stroke} strokeDasharray="2 7" opacity="0.7" />
      <rect x="98" y="44" width="26" height="18" rx="3" {...stroke} />
      <circle cx="105" cy="68" r="3" {...stroke} />
      <circle cx="117" cy="68" r="3" {...stroke} />
      <line x1="111" y1="44" x2="111" y2="34" {...stroke} />
      <circle cx="111" cy="31" r="2.4" fill="currentColor" />
    </svg>
  )
}

/* Tank with a fill level + signal arcs. */
function Reservoir() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      <rect x="74" y="26" width="92" height="74" rx="8" {...stroke} />
      <path d="M74 70 q 11 -10 23 0 t 23 0 t 23 0 t 23 0" {...stroke} />
      <line x1="170" y1="44" x2="182" y2="44" {...stroke} />
      <line x1="170" y1="60" x2="182" y2="60" {...stroke} />
      {/* signal */}
      <path d="M120 18 a 14 14 0 0 1 14 14" {...stroke} opacity="0.7" />
      <path d="M120 10 a 22 22 0 0 1 22 22" {...stroke} opacity="0.45" />
      <circle cx="120" cy="24" r="2.4" fill="currentColor" />
    </svg>
  )
}

function Generic() {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden="true">
      <rect x="48" y="34" width="144" height="52" rx="8" {...stroke} />
      <line x1="48" y1="60" x2="192" y2="60" {...stroke} opacity="0.5" />
      <circle cx="72" cy="60" r="6" {...stroke} />
      <circle cx="120" cy="60" r="6" {...stroke} />
      <circle cx="168" cy="60" r="6" {...stroke} />
    </svg>
  )
}
