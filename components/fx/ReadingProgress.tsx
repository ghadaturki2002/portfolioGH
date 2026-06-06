'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/**
 * ReadingProgress
 * ----------------
 * A thin fixed bar pinned to the very top of the viewport that fills from the
 * left as the page scrolls. It sits above the header (z-[60]).
 *
 * - Uses framer-motion `useScroll().scrollYProgress` (a MotionValue in [0, 1])
 *   bound to `scaleX` with a left transform-origin, so it grows L -> R.
 * - A `useSpring` smooths the raw scroll value. When the user prefers reduced
 *   motion we bypass the spring entirely and drive `scaleX` from the raw value
 *   (instant, no easing), fully honoring the OS setting.
 * - SSR-safe: `useScroll` defaults to the window/document and only attaches its
 *   listeners inside an effect on the client; framer-motion handles cleanup on
 *   unmount. No direct window/document access here.
 * - Purely decorative -> `aria-hidden`. It contains no focusable children and
 *   is non-interactive (`pointer-events-none`), so it never traps focus or
 *   interferes with screen readers.
 */
export default function ReadingProgress() {
  const reduce = useReducedMotion()

  // Raw scroll progress (0 at top of page -> 1 at bottom).
  const { scrollYProgress } = useScroll()

  // Spring-smoothed version for fluid motion. Cheap to create even when unused.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  })

  // Under reduced-motion, track the raw value (no spring easing/overshoot).
  const scaleX = reduce ? scrollYProgress : smooth

  return (
    <motion.div
      aria-hidden="true"
      // `glow` gives the cyan "powered-on" signal look from the design system.
      className="glow pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
      style={{ scaleX }}
    />
  )
}
