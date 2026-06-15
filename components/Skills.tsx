'use client'

/**
 * SKILLS — "04 · THE BENCH" (data-as-typography).
 * Three channel columns (mech · elec · soft). Each tool's TYPE WEIGHT is its
 * TRUE usage count across content.ts (usageCount → usageWeight) — heavier = used
 * more. Weights animate up from 300 on view; reduced motion renders them static.
 * Delayed hover reveals the real project count; cross-channel tools (in >1 of the
 * original skillGroups) also show the chip triplet. No invented facts.
 */
import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useLanguage } from './LanguageProvider'
import { skillGroups, worlds } from '@/lib/content'
import { usageCount, usageWeight, type Channel } from '@/lib/channels'
import { Chip, ChipTriplet, DelayedHover, Reveal, SectionHeader, CHIP_BG } from './ui/primitives'

/* ---- derive the three columns from skillGroups (matched by title.en) ---- */
function itemsOf(titleEn: string): string[] {
  return skillGroups.find((g) => g.title.en === titleEn)?.items ?? []
}
const COLUMNS: Record<Channel, string[]> = {
  mech: itemsOf('Mechanical design & CAD'),
  elec: itemsOf('Automation & electronics'),
  // soft = Software development + AI/ML/AR + Industrial management, deduped
  soft: Array.from(
    new Set([
      ...itemsOf('Software development'),
      ...itemsOf('AI, Machine Learning & AR'),
      ...itemsOf('Industrial management'),
    ]),
  ),
}

/** How many of the ORIGINAL skillGroups list this tool (>1 ⇒ cross-channel). */
function groupMembership(tool: string): number {
  return skillGroups.filter((g) => g.items.includes(tool)).length
}

/** Type-size tier so hierarchy survives even if the variable axis fails. */
const SIZE_BY_WEIGHT: Record<number, string> = {
  700: 'text-2xl',
  550: 'text-xl',
  420: 'text-lg',
}

function ToolItem({ tool, index }: { tool: string; index: number }) {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const n = usageCount(tool)
  const weight = usageWeight(n)
  const sizeClass = SIZE_BY_WEIGHT[weight] ?? 'text-lg'
  const crossChannel = groupMembership(tool) > 1

  const target = reduce ? weight : inView ? weight : 300

  return (
    <DelayedHover
      as="li"
      delay={400}
      className="w-fit"
      panelClassName="left-0 top-full mt-2 w-max max-w-[280px]"
      trigger={
        <motion.span
          ref={ref}
          tabIndex={0}
          role="button"
          aria-label={`${tool} — ${t('skills.usedOn')} ${n} ${t('skills.projects')}`}
          className={`font-display ${sizeClass} cursor-default rounded-[3px] leading-tight text-ink`}
          initial={false}
          animate={{ fontVariationSettings: `'wght' ${target}` }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, delay: index * 0.03 }}
          style={{ fontVariationSettings: `'wght' ${target}`, fontWeight: target }}
        >
          {tool}
        </motion.span>
      }
      panel={
        <div className="glass space-y-1.5 rounded-[14px] px-3.5 py-2.5">
          <p className="sys text-ink">
            {tool} — {t('skills.usedOn')} {n} {t('skills.projects')}
          </p>
          {crossChannel && (
            <div className="flex items-center gap-2">
              <ChipTriplet size="sm" />
              <span className="sys text-ink-soft">{t('skills.crossChannel')}</span>
            </div>
          )}
        </div>
      }
    />
  )
}

export default function Skills() {
  const { language, t } = useLanguage()
  const order: Channel[] = ['mech', 'elec', 'soft']

  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* ghosted backdrop numeral — kept behind content */}
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -top-6 right-0 -z-0 select-none text-[14vw] leading-none text-ink/5"
      >
        04
      </span>

      <div className="container-px relative z-10">
        <SectionHeader index="04" kicker={t('skills.kicker')} title={t('skills.title')} channel={null} />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {order.map((channel, col) => {
            const world = worlds.find((w) => w.key === channel)
            return (
              <Reveal key={channel} delay={col * 0.12}>
                <div>
                  {/* column header — big chip + channel label + full-strength underline */}
                  <div className="flex items-center gap-2.5">
                    <Chip channel={channel} className="h-3.5 w-3.5" />
                    <span className="font-display text-xl font-semibold text-ink">
                      {world?.label[language]}
                    </span>
                  </div>
                  <span aria-hidden="true" className={`mt-2 block h-[1.5px] w-12 ${CHIP_BG[channel]}`} />

                  {/* tool list — type weight = true usage */}
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {COLUMNS[channel].map((tool, i) => (
                      <ToolItem key={tool} tool={tool} index={i} />
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
