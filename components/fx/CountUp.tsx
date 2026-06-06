'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  /** Display value with an optional trailing suffix, e.g. "8", "6", "4+", "12+". */
  value: string
  className?: string
}

/** easeOutCubic — fast start, gentle settle. */
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

const DURATION = 1100 // ms

/**
 * CountUp
 * Animates a number from 0 → its target the first time it scrolls into view.
 * Parses the leading integer of `value` and preserves any trailing suffix
 * (e.g. the "+" in "12+"). Honors prefers-reduced-motion by rendering the
 * final value immediately with no animation.
 */
export default function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  // Trigger once when the element is ~60px inside the viewport.
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // Split the value into its leading integer target and trailing suffix.
  // parseInt stops at the first non-digit, so "12+" → 12 and suffix "+".
  const target = parseInt(value, 10)
  const hasNumber = Number.isFinite(target)
  const suffix = hasNumber ? value.slice(String(target).length) : ''

  // Start at the target under reduced motion (static, no animation); otherwise 0.
  const [count, setCount] = useState<number>(reduce || !hasNumber ? target || 0 : 0)

  useEffect(() => {
    // Nothing to animate: non-numeric input, reduced motion, or not yet visible.
    if (!hasNumber || reduce || !inView) return

    let raf = 0
    let start: number | null = null

    const tick = (now: number) => {
      if (start === null) start = now
      const elapsed = now - start
      const progress = Math.min(elapsed / DURATION, 1)
      setCount(Math.round(easeOutCubic(progress) * target))

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)

    // Clean up the RAF loop on unmount or dependency change.
    return () => cancelAnimationFrame(raf)
  }, [hasNumber, reduce, inView, target])

  // If the input has no leading integer, just render it verbatim.
  return (
    <span ref={ref} className={className}>
      {hasNumber ? `${count}${suffix}` : value}
    </span>
  )
}
