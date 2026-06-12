'use client'

import { useReducedMotion } from 'framer-motion'
import { useLanguage } from '../LanguageProvider'
import { skillGroups } from '@/lib/content'

/* ------------------------------------------------------------------ *
 * Carousel — a looping, two-row belt of glass "skill" cards built
 * entirely from her real skill groups. Seamless loop via a duplicated
 * track (translateX 0 → -50%), pauses on hover AND keyboard focus.
 * Reduced motion → a single static wrapped grid. Decorative
 * (aria-hidden): the same skills are listed semantically in Skills.
 * ------------------------------------------------------------------ */

type Item = { label: string; group: string }

export default function Carousel() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()

  // flatten real skills → cards tagged with their group label
  const items: Item[] = skillGroups.flatMap((g) =>
    g.items.map((label) => ({ label, group: g.title[language] }))
  )
  const mid = Math.ceil(items.length / 2)
  const rowA = items.slice(0, mid)
  const rowB = items.slice(mid).concat(items.slice(0, 2)) // pad so the 2nd row feels as full

  const Card = ({ label, group }: Item) => (
    <span className="flex shrink-0 select-none items-center gap-3 rounded-xl border border-hairline bg-surface/60 px-4 py-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
      <span className="flex flex-col leading-tight">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{group}</span>
        <span className="font-mono text-sm text-ink">{label}</span>
      </span>
    </span>
  )

  const fadeMask = 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)'

  return (
    <section className="section">
      <div className="container-px">
        <span className="kicker">{t('carousel.kicker')}</span>
        <h2 className="display mt-4 max-w-2xl text-3xl text-ink sm:text-4xl">{t('carousel.title')}</h2>
      </div>

      {/* --- Reduced motion: static wrapped grid --- */}
      {reduce ? (
        <div aria-hidden="true" className="container-px mt-10">
          <div className="flex flex-wrap gap-3">
            {items.map((it, i) => (
              <Card key={`${it.label}-${i}`} {...it} />
            ))}
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="mt-10 space-y-4"
          style={{ WebkitMaskImage: fadeMask, maskImage: fadeMask }}
        >
          {/* row 1 → forward */}
          <div className="flex w-max items-center gap-4 animate-marquee-slow hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {[0, 1].map((copy) =>
              rowA.map((it, i) => <Card key={`a${copy}-${it.label}-${i}`} {...it} />)
            )}
          </div>
          {/* row 2 → reverse (woven feel) */}
          <div className="flex w-max items-center gap-4 animate-marquee-reverse hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {[0, 1].map((copy) =>
              rowB.map((it, i) => <Card key={`b${copy}-${it.label}-${i}`} {...it} />)
            )}
          </div>
        </div>
      )}
    </section>
  )
}
