'use client'

/**
 * TRICHROME primitives — the shared vocabulary of the whole site.
 * Chips, rails, index codes, proof tags, delayed hover, reveals,
 * section headers. All channel colors come from static class maps
 * (Tailwind JIT needs literal class names).
 */
import { ReactNode, useState, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Channel } from '@/lib/channels'

/* ---------- motion grammar (one system) ---------- */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const EASE_SHEET: [number, number, number, number] = [0.32, 0.72, 0, 1]
export const SPRING_CHIP = { type: 'spring', stiffness: 260, damping: 24 } as const
export const SPRING_MORPH = { type: 'spring', stiffness: 80, damping: 18 } as const
export const SPRING_TILT = { stiffness: 120, damping: 18 } as const

/* ---------- static channel class maps ---------- */
export const CHIP_BG: Record<Channel, string> = {
  mech: 'bg-mech-chip',
  elec: 'bg-elec-chip',
  soft: 'bg-soft-chip',
}
export const TEXT_CH: Record<Channel, string> = {
  mech: 'text-mech',
  elec: 'text-elec',
  soft: 'text-soft',
}
export const GLOW_CH: Record<Channel, string> = {
  mech: 'glow-mech',
  elec: 'glow-elec',
  soft: 'glow-soft',
}
/** 8–10% tint fields (flat, never gradients) */
export const TINT_CH: Record<Channel, string> = {
  mech: 'bg-mech-chip/10',
  elec: 'bg-elec-chip/10',
  soft: 'bg-soft-chip/10',
}
export const BORDER_CH: Record<Channel, string> = {
  mech: 'border-mech-chip',
  elec: 'border-elec-chip',
  soft: 'border-soft-chip',
}

/* ---------- THE CHIP — 10px oscilloscope channel marker ---------- */
export function Chip({
  channel,
  className = '',
  dim = false,
}: {
  channel: Channel
  className?: string
  dim?: boolean
}) {
  return (
    <span
      aria-hidden="true"
      className={[
        'chip-sq',
        CHIP_BG[channel],
        // light-mode amber chips always carry a 1px ink border
        channel === 'elec' ? 'border border-ink/20 dark:border-transparent' : '',
        dim ? 'opacity-30' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}

/* ---------- THE LOGO — chip triplet (blue · amber · magenta) ---------- */
export function ChipTriplet({
  lit,
  size = 'md',
  className = '',
}: {
  /** which chip is lit (others dim); undefined = all lit */
  lit?: Channel | null
  size?: 'sm' | 'md'
  className?: string
}) {
  const chips: Channel[] = ['mech', 'elec', 'soft']
  return (
    <span className={`inline-flex items-center ${size === 'sm' ? 'gap-1' : 'gap-1.5'} ${className}`} aria-hidden="true">
      {chips.map((c) => (
        <Chip key={c} channel={c} dim={lit != null && lit !== c} className={size === 'sm' ? 'h-2 w-2' : ''} />
      ))}
    </span>
  )
}

/* ---------- INDEX CODE — M·03 / E·07 / S·12 ---------- */
export function IndexCode({ code, channel, className = '' }: { code: string; channel: Channel; className?: string }) {
  return (
    <span className={`sys inline-flex items-center gap-2 ${TEXT_CH[channel]} ${className}`}>
      <Chip channel={channel} className="h-2 w-2" />
      {code}
    </span>
  )
}

/* ---------- PROOF TAG — verifiable facts only ---------- */
export function ProofTag({
  children,
  channel,
  className = '',
}: {
  children: ReactNode
  channel?: Channel
  className?: string
}) {
  return (
    <span className={`proof-tag ${className}`}>
      {channel && <Chip channel={channel} className="h-2 w-2" />}
      {children}
    </span>
  )
}

/* ---------- DELAYED HOVER — CSS mechanism + touch tap-toggle ---------- */
export function DelayedHover({
  trigger,
  panel,
  delay = 350,
  className = '',
  panelClassName = '',
  as: Tag = 'div',
}: {
  trigger: ReactNode
  panel: ReactNode
  /** enter delay in ms (exit + keyboard are always instant) */
  delay?: number
  className?: string
  panelClassName?: string
  as?: 'div' | 'span' | 'li'
}) {
  const [open, setOpen] = useState(false)
  const touchedRef = useRef(false)

  // touch mapping: first tap reveals, second tap activates; blur closes
  const onTouchStart = useCallback(() => {
    touchedRef.current = true
  }, [])
  const onClick = useCallback((e: React.MouseEvent) => {
    if (touchedRef.current && !open) {
      e.preventDefault()
      setOpen(true)
    }
  }, [open])

  return (
    <Tag
      className={`dh ${className}`}
      style={{ '--dh-delay': `${delay}ms` } as React.CSSProperties}
      data-open={open || undefined}
      onTouchStart={onTouchStart}
      onClick={onClick}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e: React.FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }}
    >
      {trigger}
      <div className={`dh-panel ${panelClassName}`}>{panel}</div>
    </Tag>
  )
}

/* ---------- REVEAL — translateY 24px + fade, viewport once ---------- */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'span' | 'section' | 'article'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduce ? 0.2 : 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* ---------- SECTION HEADER — registry voice: "02 · LE REGISTRE — 6 …" ---------- */
export function SectionHeader({
  index,
  kicker,
  title,
  count,
  channel,
  className = '',
}: {
  index: string
  kicker: string
  title: string
  /** optional " — N UNITS" suffix, derived from content.ts */
  count?: string
  channel?: Channel | null
  className?: string
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal>
        <p className="sys flex items-center gap-2.5 text-ink-soft">
          {channel ? <Chip channel={channel} /> : <ChipTriplet size="sm" />}
          <span>
            {index} · {kicker}
            {count ? ` — ${count}` : ''}
          </span>
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="display mt-4 text-[clamp(28px,4vw,44px)] text-ink">{title}</h2>
      </Reveal>
    </div>
  )
}

/* ---------- SECTION RAIL — 1.5px channel line drawn on scroll ---------- */
export function SectionRail({
  channel,
  progress,
  className = '',
}: {
  channel: Channel
  /** a MotionValue<number> 0→1 (from useScroll), or undefined for static */
  progress?: import('framer-motion').MotionValue<number>
  className?: string
}) {
  return (
    <motion.span
      aria-hidden="true"
      style={progress ? { scaleY: progress } : undefined}
      className={`pointer-events-none absolute bottom-0 left-0 top-0 w-[1.5px] origin-top ${CHIP_BG[channel]} ${className}`}
    />
  )
}
