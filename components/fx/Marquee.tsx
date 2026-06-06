'use client'

import { useReducedMotion } from 'framer-motion'

interface MarqueeProps {
  /** Strings to scroll (e.g. skills/keywords). Decorative — duplicated elsewhere. */
  items: string[]
  className?: string
}

/**
 * Infinite horizontal marquee for an electronics/engineering portfolio.
 *
 * - Animated: the list is rendered TWICE inside a `w-max` flex row and slid
 *   with the `animate-marquee` keyframe (translateX 0 -> -50%). Because the
 *   content is duplicated, the -50% shift lands exactly on the start of the
 *   second copy, producing a seamless loop. Pauses on hover.
 * - Reduced motion: the list is rendered ONCE, wrapped (flex-wrap), no motion.
 *
 * The whole strip is decorative (`aria-hidden`) since the same skills are
 * exposed semantically elsewhere on the page, so it stays out of the a11y tree.
 */
export default function Marquee({ items, className }: MarqueeProps) {
  const reduce = useReducedMotion()

  // Nothing to render — bail early to avoid an empty animated track.
  if (!items?.length) return null

  // One renderable unit: a mono label followed by a small cyan "node" dot.
  const Item = ({ label }: { label: string }) => (
    <span className="flex shrink-0 items-center gap-6">
      <span className="font-mono text-sm tracking-wide text-ink-soft">{label}</span>
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
        aria-hidden="true"
      />
    </span>
  )

  // --- Reduced motion: static, wrapped, no animation ---------------------
  if (reduce) {
    return (
      <div
        aria-hidden="true"
        className={['overflow-hidden', className].filter(Boolean).join(' ')}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {items.map((label, i) => (
            <Item key={`${label}-${i}`} label={label} />
          ))}
        </div>
      </div>
    )
  }

  // --- Animated: duplicated track, hover-pause, edge fade masks ----------
  // The linear-gradient mask fades the strip out at both edges so items
  // appear to emerge from / dissolve into the layout rather than hard-cut.
  const fadeMask =
    'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'

  return (
    <div
      aria-hidden="true"
      className={['overflow-hidden', className].filter(Boolean).join(' ')}
      style={{
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask,
      }}
    >
      <div className="flex w-max items-center gap-6 animate-marquee hover:[animation-play-state:paused]">
        {/* Render the items twice for a seamless -50% loop. */}
        {[0, 1].map((copy) =>
          items.map((label, i) => (
            <Item key={`copy${copy}-${label}-${i}`} label={label} />
          ))
        )}
      </div>
    </div>
  )
}
