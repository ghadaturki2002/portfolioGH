'use client'

interface GearProps {
  teeth?: number
  size?: number
  className?: string
  /** spin direction */
  reverse?: boolean
  /** seconds per revolution */
  speed?: number
}

/** Build a stylized gear outline path (flat-topped teeth) + center bore. */
function gearPath(teeth: number, rOuter: number, rInner: number, cx: number, cy: number) {
  const step = (Math.PI * 2) / teeth
  const pts: string[] = []
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const polar = (r: number, ang: number) => [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]
    const p1 = polar(rInner, a)
    const p2 = polar(rOuter, a + step * 0.2)
    const p3 = polar(rOuter, a + step * 0.4)
    const p4 = polar(rInner, a + step * 0.6)
    pts.push(
      `${i === 0 ? 'M' : 'L'}${p1[0].toFixed(2)},${p1[1].toFixed(2)}`,
      `L${p2[0].toFixed(2)},${p2[1].toFixed(2)}`,
      `L${p3[0].toFixed(2)},${p3[1].toFixed(2)}`,
      `L${p4[0].toFixed(2)},${p4[1].toFixed(2)}`,
    )
  }
  pts.push('Z')
  return pts.join(' ')
}

/**
 * A mechanical gear drawn as a thin engineering outline. Spins continuously
 * (CSS animation, neutralized under prefers-reduced-motion via globals.css).
 */
export default function Gear({ teeth = 12, size = 120, className = '', reverse = false, speed = 24 }: GearProps) {
  const cx = 50
  const cy = 50
  const d = gearPath(teeth, 46, 38, cx, cy)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      style={{
        animation: `gear-spin ${speed}s linear infinite`,
        animationDirection: reverse ? 'reverse' : 'normal',
      }}
    >
      <path d={d} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r={26} fill="none" stroke="currentColor" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={10} fill="none" stroke="currentColor" strokeWidth={1} />
      {/* spokes */}
      <line x1={cx} y1={cy - 26} x2={cx} y2={cy - 10} stroke="currentColor" strokeWidth={1} />
      <line x1={cx} y1={cy + 26} x2={cx} y2={cy + 10} stroke="currentColor" strokeWidth={1} />
      <line x1={cx - 26} y1={cy} x2={cx - 10} y2={cy} stroke="currentColor" strokeWidth={1} />
      <line x1={cx + 26} y1={cy} x2={cx + 10} y2={cy} stroke="currentColor" strokeWidth={1} />
    </svg>
  )
}
