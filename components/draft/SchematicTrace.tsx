'use client'

interface SchematicTraceProps {
  /** SVG path for the trace (PCB-style right-angle routing recommended) */
  d?: string
  className?: string
  /** viewBox width/height */
  width?: number
  height?: number
  /** node pad coordinates [x,y] in viewBox space */
  nodes?: [number, number][]
}

/**
 * A schematic/PCB trace: a static hairline route with an accent dash that
 * flows along it like current. The flow animation is neutralized under
 * prefers-reduced-motion via globals.css.
 */
export default function SchematicTrace({
  d = 'M0,20 L60,20 L60,60 L140,60 L140,30 L220,30',
  className = '',
  width = 240,
  height = 80,
  nodes = [
    [0, 20],
    [60, 60],
    [140, 30],
    [220, 30],
  ],
}: SchematicTraceProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* base trace */}
      <path d={d} stroke="rgb(var(--hairline))" strokeWidth={2} />
      {/* flowing current */}
      <path
        d={d}
        stroke="rgb(var(--accent))"
        strokeWidth={2}
        strokeDasharray="6 14"
        className="animate-trace-flow"
      />
      {/* solder pads */}
      {nodes.map(([x, y], i) => (
        <rect
          key={i}
          x={x - 3}
          y={y - 3}
          width={6}
          height={6}
          fill="rgb(var(--paper))"
          stroke="rgb(var(--accent))"
          strokeWidth={1.5}
        />
      ))}
    </svg>
  )
}
