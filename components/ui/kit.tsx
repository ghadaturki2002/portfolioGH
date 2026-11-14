'use client'

/**
 * Vocabulaire visuel commun : en-tête de « planche », cote, pastilles de discipline,
 * apparition au défilement. Les classes de couleur sont écrites en entier (Tailwind JIT).
 */
import { ReactNode, useEffect, useRef, CSSProperties, ElementType } from 'react'
import { useLanguage } from '../LanguageProvider'
import { disciplines, type Channel } from '@/lib/content'

export const CH_BG: Record<Channel, string> = {
  mech: 'bg-mech-chip',
  elec: 'bg-elec-chip',
  soft: 'bg-soft-chip',
}
export const CH_TEXT: Record<Channel, string> = {
  mech: 'text-mech',
  elec: 'text-elec',
  soft: 'text-soft',
}
export const CH_BORDER: Record<Channel, string> = {
  mech: 'border-mech/60',
  elec: 'border-elec/60',
  soft: 'border-soft/60',
}

/** Nombre total de planches (sections numérotées). */
export const SHEETS = 8

/* ---------- apparition au défilement (un seul observateur partagé) ---------- */
let observer: IntersectionObserver | null = null
function getObserver() {
  if (observer || typeof window === 'undefined' || !('IntersectionObserver' in window)) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.setAttribute('data-shown', '')
          observer?.unobserve(e.target)
        }
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
  )
  return observer
}

type RevealTag = 'div' | 'li' | 'section' | 'article' | 'figure' | 'ol' | 'ul' | 'p' | 'aside' | 'header'

export function Reveal({
  as = 'div',
  delay = 0,
  className,
  children,
  id,
  style,
}: {
  as?: RevealTag
  delay?: number
  className?: string
  children: ReactNode
  id?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = getObserver()
    if (!io) {
      el.setAttribute('data-shown', '')
      return
    }
    io.observe(el)
    return () => io.unobserve(el)
  }, [])
  const Tag = as as unknown as ElementType
  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      style={delay ? ({ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties) : style}
    >
      {children}
    </Tag>
  )
}

/* ---------- pastille + libellé de discipline ---------- */
export function ChannelChip({ ch, className = '' }: { ch: Channel; className?: string }) {
  return <span aria-hidden="true" className={`chip-sq ${CH_BG[ch]} ${className}`} />
}

export function DisciplineTags({ list, short = false, className = '' }: { list: Channel[]; short?: boolean; className?: string }) {
  const { language } = useLanguage()
  if (!list.length) return null
  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-2 ${className}`}>
      {disciplines
        .filter((d) => list.includes(d.key))
        .map((d) => (
          <li key={d.key} className="inline-flex items-center gap-2 text-[0.8125rem] text-ink-soft">
            <ChannelChip ch={d.key} />
            {short ? d.short[language] : d.label[language]}
          </li>
        ))}
    </ul>
  )
}

/* ---------- cote : |◄──── libellé ────►| ---------- */
export function Cote({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`cote ${className}`} aria-hidden={children ? undefined : true}>
      <span className="cote-tick" />
      {children ? (
        <>
          <span className="cote-line start" />
          <span className="label shrink-0 px-1 text-ink-faint">{children}</span>
          <span className="cote-line end" />
        </>
      ) : (
        <span className="cote-line start end" />
      )}
      <span className="cote-tick" />
    </div>
  )
}

/* ---------- en-tête de section façon « planche » ---------- */
export function SectionHeader({
  index,
  kicker,
  title,
  intro,
  titleId,
  className = '',
}: {
  index: number
  kicker: string
  title: string
  intro?: string
  titleId?: string
  className?: string
}) {
  const { t } = useLanguage()
  const n = String(index).padStart(2, '0')
  return (
    <Reveal as="header" className={`grid gap-8 lg:grid-cols-12 ${className}`}>
      <div className="lg:col-span-8">
        <p className="label flex items-center gap-3 text-accent">
          <span className="tabular">{n}</span>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
          <span>{kicker}</span>
        </p>
        <h2 id={titleId} className="display mt-5 text-[clamp(2.1rem,4.6vw,3.6rem)] text-ink">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-lg text-ink-soft">{intro}</p>}
      </div>
      {/* cartouche de planche, purement décoratif */}
      <div aria-hidden="true" className="hidden items-start justify-end lg:col-span-4 lg:flex">
        <dl className="cartouche label w-60 grid-cols-[auto_1fr] text-ink-faint">
          <dt>{t('section.sheet')}</dt>
          <dd className="tabular text-ink-soft">
            {n} / {String(SHEETS).padStart(2, '0')}
          </dd>
          <dt>{t('section.subject')}</dt>
          <dd className="truncate text-ink-soft">{kicker}</dd>
        </dl>
      </div>
    </Reveal>
  )
}
