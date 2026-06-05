'use client'

import { useRef, ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface MeasuredProps {
  children: ReactNode
  /** label drawn along the top dimension line (e.g. "640.00") */
  widthLabel?: string
  /** label drawn along the left dimension line (e.g. "440.00") */
  heightLabel?: string
  className?: string
}

/**
 * Wraps an element (typically an image) and overlays engineering dimension
 * lines — extension ticks + a dimension line that "draws on" when scrolled
 * into view, with a monospace measurement label. Honors reduced motion.
 */
export default function Measured({ children, widthLabel, heightLabel, className = '' }: MeasuredProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const drawn = reduce || inView

  const lineTransition = { duration: reduce ? 0 : 1, ease: 'easeInOut' as const }
  const labelTransition = { duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.7 }

  return (
    <div ref={ref} className={`relative pl-8 pt-8 ${className}`}>
      <div className="relative">
        {children}

        {/* TOP horizontal dimension */}
        <svg
          className="pointer-events-none absolute -top-5 left-0 h-4 w-full overflow-visible"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.line
            x1="0" y1="10" x2="100" y2="10"
            stroke="rgb(var(--accent))" strokeWidth={1} vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={lineTransition}
          />
          <line x1="0" y1="3" x2="0" y2="17" stroke="rgb(var(--accent))" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="3" x2="100" y2="17" stroke="rgb(var(--accent))" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </svg>
        {widthLabel && (
          <motion.span
            className="absolute -top-[26px] left-1/2 -translate-x-1/2 bg-paper px-1 font-mono text-[11px] tracking-wider text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: drawn ? 1 : 0 }}
            transition={labelTransition}
          >
            {widthLabel}
          </motion.span>
        )}

        {/* LEFT vertical dimension */}
        <svg
          className="pointer-events-none absolute -left-5 top-0 h-full w-4 overflow-visible"
          viewBox="0 0 20 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.line
            x1="10" y1="0" x2="10" y2="100"
            stroke="rgb(var(--ink-soft))" strokeWidth={1} vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={lineTransition}
          />
          <line x1="3" y1="0" x2="17" y2="0" stroke="rgb(var(--ink-soft))" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <line x1="3" y1="100" x2="17" y2="100" stroke="rgb(var(--ink-soft))" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </svg>
        {heightLabel && (
          <motion.span
            className="absolute -left-[26px] top-1/2 origin-center -translate-y-1/2 -rotate-90 bg-paper px-1 font-mono text-[11px] tracking-wider text-ink-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: drawn ? 1 : 0 }}
            transition={labelTransition}
          >
            {heightLabel}
          </motion.span>
        )}
      </div>
    </div>
  )
}
