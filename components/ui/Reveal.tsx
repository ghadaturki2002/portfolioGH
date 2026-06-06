'use client'

import { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  /** stagger delay in seconds */
  delay?: number
  /** distance to travel on the y-axis */
  y?: number
  className?: string
  as?: 'div' | 'li' | 'span' | 'section' | 'article'
}

/**
 * Scroll-reveal wrapper: fades + slides content into view once.
 * Fully disabled (renders static) under prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, y = 18, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}
