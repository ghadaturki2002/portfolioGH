'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface SectionHeaderProps {
  /** Two-digit section number, e.g. "02" */
  number: string
  /** Section-view marker, e.g. "A—A" */
  marker?: string
  /** Mono kicker label above the title */
  label?: string
  /** Heading text */
  title: string
}

/**
 * Section divider styled as an engineering section-view cut line:
 * a dashed cut line with arrowheads + an "A—A" marker, the section number,
 * then the heading. Used at the top of every content section.
 */
export default function SectionHeader({ number, marker = 'A—A', label, title }: SectionHeaderProps) {
  const reduce = useReducedMotion()
  const line = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: reduce ? 0 : 0.8, ease: 'easeInOut' } },
  }

  return (
    <div className="mb-12 md:mb-16">
      {/* cut line */}
      <motion.div
        className="flex items-center gap-0"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        aria-hidden="true"
      >
        <span className="font-mono text-[11px] tracking-label text-ink-soft">SEC&nbsp;{number}</span>
        <motion.span variants={line} className="mx-3 h-px flex-1 origin-left border-t border-dashed border-hairline" />
        <span className="flex items-center gap-2 font-mono text-xs tracking-[0.2em]">
          <span className="h-0 w-0 border-y-[6px] border-r-[9px] border-y-transparent border-r-accent" />
          <span className="font-semibold text-accent">{marker.split('—')[0]}</span>
          <span className="text-ink-soft">—</span>
          <span className="font-semibold text-accent">{marker.split('—')[1] ?? marker.split('—')[0]}</span>
          <span className="h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-accent" />
        </span>
        <motion.span variants={line} className="mx-3 h-px flex-1 origin-right border-t border-dashed border-hairline" />
      </motion.div>

      {/* heading */}
      <div className="mt-7">
        {label && <div className="label mb-2">{label}</div>}
        <motion.h2
          className="font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduce ? 0 : 0.6 }}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  )
}
