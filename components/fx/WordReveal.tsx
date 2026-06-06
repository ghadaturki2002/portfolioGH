'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'

interface WordRevealProps {
  /** The heading text to reveal word-by-word. */
  text: string
  className?: string
  /** Semantic tag to render. Defaults to 'h2'. */
  as?: 'h1' | 'h2' | 'h3' | 'span'
  /** Delay (seconds) before the stagger sequence begins. */
  delay?: number
}

/**
 * Container variants: orchestrates a per-word stagger.
 * `delayChildren` lets callers offset the whole sequence via `delay`.
 */
const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.06,
      delayChildren: delay,
    },
  }),
}

/** Child variants: each word fades up from y:16 -> 0. */
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

/**
 * WordReveal — animates a heading into view one word at a time.
 *
 * Each word is wrapped in an inline-block span (so transforms apply) and
 * staggered as the element scrolls into view (`whileInView`, fires once).
 * Spaces are preserved by rendering a normal space between word spans.
 *
 * Under `prefers-reduced-motion`, the animation is skipped entirely and the
 * plain text is rendered statically inside the requested tag.
 */
export default function WordReveal({
  text,
  className,
  as = 'h2',
  delay = 0,
}: WordRevealProps) {
  const reduce = useReducedMotion()

  // Reduced motion (or SSR-safe default): render static, unwrapped text.
  // No motion spans, no transforms, fully accessible to screen readers.
  if (reduce) {
    const Tag = as
    return <Tag className={className}>{text}</Tag>
  }

  // Split on whitespace; the regex captures the gaps so trailing/leading
  // spacing is normalized to single spaces between words.
  const words = text.split(/\s+/).filter(Boolean)

  // Pick the animated element that matches the requested semantic tag.
  const MotionTag = motion[as] as typeof motion.h2

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      // `whitespace-pre-wrap` keeps the rendered space characters meaningful
      // while still allowing the heading to wrap naturally across lines.
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block whitespace-nowrap">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
          {/* Preserve a real space between words (skip after the last word). */}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </MotionTag>
  )
}
