'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

/** Max rotation in degrees applied at the edges of the card. */
const MAX_TILT = 7
/** Spring config for a snappy-but-smooth tilt response. */
const SPRING = { stiffness: 220, damping: 22, mass: 0.6 }

/**
 * 3D tilt wrapper with a cursor-following accent spotlight.
 *
 * On pointer move the card rotates on X/Y (max ~7deg) in a perspective
 * context, and a radial-gradient highlight tracks the cursor underneath
 * the content. Tilt + spotlight are fully disabled under reduced motion
 * or on touch / no-hover devices (renders a plain static wrapper).
 *
 * Children always remain interactive — overlays are pointer-events-none
 * and the spotlight sits behind content (above the card background).
 */
export default function TiltCard({ children, className }: TiltCardProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  // Detect a device that actually supports a precise hover pointer.
  // Defaults to false so SSR + first paint are the safe (static) path.
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    // Guard: window/matchMedia only exist on the client.
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mql = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(mql.matches)
    update()

    // addEventListener is the modern API; fall back to addListener for Safari.
    if (mql.addEventListener) {
      mql.addEventListener('change', update)
      return () => mql.removeEventListener('change', update)
    }
    mql.addListener(update)
    return () => mql.removeListener(update)
  }, [])

  // Normalized pointer position within the card: -0.5 .. 0.5 (center = 0).
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  // Raw pixel position of the cursor for the spotlight center.
  const sx = useMotionValue(0)
  const sy = useMotionValue(0)

  // Smooth the normalized position, then map to rotation degrees.
  // Note: moving the cursor right (+px) tilts the card to reveal its right
  // edge, which reads as a negative rotateY; vertical is inverted likewise.
  const springX = useSpring(px, SPRING)
  const springY = useSpring(py, SPRING)
  const rotateY = useTransform(springX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT])
  const rotateX = useTransform(springY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT])
  // Spotlight gradient — MUST be declared here (not in JSX) so the hook count
  // never changes between renders (canHover flips false→true after mount).
  const spotlight = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(220px circle at ${x}px ${y}px, rgb(var(--accent) / 0.15), transparent 70%)`
  )

  const enabled = !reduce && canHover

  // Static fallback: no listeners, no transforms, no decorative layer.
  // (All hooks above run unconditionally, so this early return is safe.)
  if (!enabled) {
    return <div className={className}>{children}</div>
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    // Normalize to -0.5..0.5 for tilt math.
    px.set(offsetX / rect.width - 0.5)
    py.set(offsetY / rect.height - 0.5)
    // Pixel coords drive the spotlight gradient center.
    sx.set(offsetX)
    sy.set(offsetY)
  }

  const handlePointerLeave = () => {
    // Spring back to a flat, centered resting state.
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        // Perspective gives the rotation real depth; preserve-3d keeps
        // any 3D-transformed children in the same space.
        perspective: 900,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Cursor spotlight — decorative, non-interactive, sits above the
          card background but behind content (z-0 vs. children below). */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{ background: spotlight }}
      />
      {/* Content layer kept above the spotlight and fully interactive. */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
