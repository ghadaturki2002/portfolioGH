'use client'

import { useId } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * PCBTraces — a decorative animated printed-circuit-board background layer.
 *
 * Renders an absolutely-positionable SVG drawn on a 480×320 design grid
 * (preserveAspectRatio keeps it tiling / scaling cleanly as a section
 * backdrop). Right-angle copper "traces", square solder pads and round vias
 * are stroked with the hairline token; a few accent traces carry a flowing
 * "current" — a duplicated accent path with a dashed stroke whose
 * stroke-dashoffset is animated via scoped CSS @keyframes.
 *
 * SSR-safe (no window/document access), fully decorative (aria-hidden,
 * pointer-events-none) and honors prefers-reduced-motion by rendering the
 * static board with no flow animation.
 */
export default function PCBTraces({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  // Unique, SSR-stable id so multiple instances don't collide on keyframes.
  const rawId = useId()
  const uid = rawId.replace(/:/g, '') // ':' is invalid inside CSS identifiers

  // Right-angle copper traces (hairline) — the static "wiring".
  const hairlineTraces = [
    'M0 40 H96 V104 H208',
    'M480 64 H352 V160 H272',
    'M0 232 H120 V184 H224',
    'M480 280 H384 V216 H312',
    'M160 320 V256 H96 V200',
    'M320 0 V72 H400 V128',
    'M48 0 V64 H128',
    'M432 320 V248 H336',
  ]

  // Accent traces — these get the animated "current" overlay.
  const accentTraces = [
    'M0 152 H72 V96 H184 V152 H288 V208 H392 H480',
    'M240 320 V248 H168 V160 H264 V96 H360 V32',
  ]

  // Square solder pads: { x, y } top-left on the design grid (8×8 squares).
  const pads = [
    { x: 204, y: 100 },
    { x: 268, y: 156 },
    { x: 116, y: 100 },
    { x: 220, y: 228 },
    { x: 308, y: 212 },
    { x: 396, y: 124 },
    { x: 92, y: 196 },
    { x: 332, y: 244 },
  ]

  // Round vias: { x, y } centers.
  const vias = [
    { x: 96, y: 40 },
    { x: 352, y: 64 },
    { x: 120, y: 232 },
    { x: 384, y: 280 },
    { x: 320, y: 72 },
    { x: 48, y: 64 },
    { x: 264, y: 96 },
    { x: 168, y: 160 },
    { x: 392, y: 208 },
    { x: 72, y: 152 },
  ]

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none opacity-50 ${className ?? ''}`}
    >
      {/*
        Scoped keyframes for the flowing current. Skipped entirely under
        reduced motion so nothing animates (the duplicated accent path is
        simply not rendered below in that case).
      */}
      {!reduce && (
        <style jsx>{`
          @keyframes pcb-flow-${uid} {
            to {
              stroke-dashoffset: -64;
            }
          }
          .pcb-current-${uid} {
            animation: pcb-flow-${uid} 1.6s linear infinite;
          }
        `}</style>
      )}

      <svg
        className="h-full w-full"
        viewBox="0 0 480 320"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hairline copper traces */}
        <g stroke="rgb(var(--hairline))" strokeWidth={1.5} strokeLinejoin="round">
          {hairlineTraces.map((d, i) => (
            <path key={`ht-${i}`} d={d} />
          ))}
        </g>

        {/* Square solder pads (hairline outline, surface fill so traces read under them) */}
        <g stroke="rgb(var(--hairline))" strokeWidth={1.5} fill="rgb(var(--surface))">
          {pads.map((p, i) => (
            <rect key={`pad-${i}`} x={p.x} y={p.y} width={8} height={8} rx={1} />
          ))}
        </g>

        {/* Vias (drilled holes) */}
        <g stroke="rgb(var(--hairline))" strokeWidth={1.5} fill="rgb(var(--bg))">
          {vias.map((v, i) => (
            <circle key={`via-${i}`} cx={v.x} cy={v.y} r={3} />
          ))}
        </g>

        {/* Static accent traces */}
        <g stroke="rgb(var(--accent))" strokeWidth={1.5} strokeLinejoin="round" opacity={0.85}>
          {accentTraces.map((d, i) => (
            <path key={`at-${i}`} d={d} />
          ))}
        </g>

        {/* Accent vias / nodes sitting on the accent traces */}
        <g stroke="rgb(var(--accent))" strokeWidth={1.5} fill="rgb(var(--bg))">
          <circle cx={0} cy={152} r={3.5} />
          <circle cx={240} cy={320} r={3.5} />
          <circle cx={360} cy={32} r={3.5} />
          <circle cx={480} cy={152} r={3.5} />
        </g>

        {/*
          Flowing "current": duplicate the accent paths with a dashed stroke
          and animate stroke-dashoffset. Rendered only when motion is allowed
          so reduced-motion users get the static board above.
        */}
        {!reduce && (
          <g
            stroke="rgb(var(--accent))"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 54"
          >
            {accentTraces.map((d, i) => (
              <path key={`flow-${i}`} d={d} className={`pcb-current-${uid}`} />
            ))}
          </g>
        )}
      </svg>
    </div>
  )
}
