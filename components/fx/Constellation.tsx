/**
 * Constellation « GT » : le monogramme dessiné comme une figure d'étoiles.
 * Utilisée par l'intro (animée), le logo de l'en-tête et le fond du contact.
 * Coordonnées dans un repère 260 × 140.
 */

export const GT_NODES: [number, number, number][] = [
  // [x, y, rayon] — lettre G
  [110, 38, 2.2],
  [84, 22, 3.2],
  [52, 26, 2.2],
  [30, 50, 2.2],
  [26, 82, 3.2],
  [44, 110, 2.2],
  [76, 120, 3.2],
  [104, 106, 2.2],
  [112, 80, 3.2],
  [86, 80, 2.2],
  // lettre T
  [142, 24, 3.2],
  [186, 22, 2.2],
  [230, 26, 3.2],
  [187, 70, 2.2],
  [188, 118, 3.2],
]

export const GT_LINES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
  [10, 11], [11, 12], [11, 13], [13, 14],
]

/** Délais d'apparition (ms) des segments, dans l'ordre de GT_LINES. */
export const GT_LINE_DELAYS = [700, 830, 960, 1090, 1220, 1350, 1480, 1610, 1740, 1150, 1290, 1430, 1570]

export function Constellation({
  className = '',
  lineClassName = '',
  nodeClassName = '',
  title,
}: {
  className?: string
  lineClassName?: string
  nodeClassName?: string
  /** si fourni, la figure est annoncée (sinon décorative) */
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 260 140"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className={lineClassName}>
        {GT_LINES.map(([a, b], i) => (
          <line key={i} x1={GT_NODES[a][0]} y1={GT_NODES[a][1]} x2={GT_NODES[b][0]} y2={GT_NODES[b][1]} />
        ))}
      </g>
      <g className={nodeClassName}>
        {GT_NODES.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>
    </svg>
  )
}

/** Générateur pseudo-aléatoire déterministe (mêmes étoiles côté serveur et client). */
export function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Monogramme compact (logo de l'en-tête, favicon) : la même constellation, simplifiée. */
export function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="4 6 56 40" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
        <polyline points="31,17 24,13 15,14 9,21 8,30 13,38 22,41 30,37 32,30 25,30" />
        <polyline points="37,14 46,13 55,14" />
        <polyline points="46,13 46,27 46,42" />
      </g>
      <g className="fill-accent">
        <circle cx="24" cy="13" r="3" />
        <circle cx="8" cy="30" r="3" />
        <circle cx="22" cy="41" r="3" />
        <circle cx="32" cy="30" r="3" />
        <circle cx="37" cy="14" r="3" />
        <circle cx="55" cy="14" r="3" />
        <circle cx="46" cy="42" r="3" />
      </g>
    </svg>
  )
}
