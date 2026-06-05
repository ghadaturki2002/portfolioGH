'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  to: number
  duration?: number
  className?: string
  /** zero-pads to this many digits, e.g. pad=2 → "07" */
  pad?: number
}

/** A number that counts up from 0 when scrolled into view. Honors reduced motion. */
export default function CountUp({ to, duration = 900, className, pad }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setN(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / duration)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - k, 3)
      setN(Math.round(eased * to))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, to, duration])

  const text = pad ? String(n).padStart(pad, '0') : String(n)
  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  )
}
