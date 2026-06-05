'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface CalloutProps {
  /** mono annotation text */
  text: string
  /** optional balloon number (drawing item reference) */
  number?: number | string
  className?: string
}

/**
 * Engineering leader-line callout: a balloon/dot + leader line + mono label,
 * used to annotate content (hero stats, project specs). Reveals on view.
 */
export default function Callout({ text, number, className = '' }: CalloutProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`flex items-center gap-2.5 ${className}`}
      initial={{ opacity: 0, x: reduce ? 0 : -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduce ? 0 : 0.5 }}
    >
      {number != null ? (
        <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent font-mono text-[11px] text-paper">
          {number}
        </span>
      ) : (
        <span className="h-[7px] w-[7px] flex-none rounded-full bg-accent" />
      )}
      <span className="h-px w-10 flex-none bg-ink" />
      <span className="font-mono text-[11px] uppercase tracking-label text-ink-soft">{text}</span>
    </motion.div>
  )
}
