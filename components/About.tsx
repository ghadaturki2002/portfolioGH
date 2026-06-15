'use client'

/**
 * ABOUT — "01 · THE SPEC SHEET".
 * Sticky portrait + identity rows on the left; the narrative, the
 * three-worlds legend (teaches the channel system), the tri-axis
 * instrument bars (TRUE per-channel project counts) and the real
 * stats on the right. All facts from lib/content.ts — none invented.
 */
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from './LanguageProvider'
import { identity, about, worlds, projects } from '@/lib/content'
import { channelCounts } from '@/lib/channels'
import { Chip, ProofTag, Reveal, SectionHeader, CHIP_BG, EASE } from './ui/primitives'

/* derived once from content.ts — deterministic, never invented */
const counts = channelCounts()
const totalProjects = projects.length

export default function About() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()

  return (
    <section id="about" className="section">
      <div className="container-px">
        <SectionHeader index="01" kicker={t('about.kicker')} title={t('about.title')} channel={null} />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* LEFT — portrait + identity rows (sticky spec card) */}
          <div className="self-start lg:sticky lg:top-24 lg:col-span-5">
            <Reveal>
              <img
                src={identity.photo}
                alt={identity.name}
                loading="lazy"
                className="aspect-[4/5] w-full max-w-[280px] rounded-[24px] border border-hairline object-cover"
                style={{ filter: 'grayscale(0.5) sepia(0.08)' }}
              />
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-8 max-w-[440px]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-hairline py-3.5">
                  <dt className="sys text-ink-soft">{t('about.location')}</dt>
                  <dd className="sys text-ink">{identity.location[language]}</dd>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 border-t border-hairline py-3.5">
                  <dt className="sys text-ink-soft">{t('about.availability')}</dt>
                  <dd>
                    <ProofTag channel="elec">09.2026</ProofTag>
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-y border-hairline py-3.5">
                  <dt className="sys text-ink-soft">{t('contact.emailLabel')}</dt>
                  <dd>
                    <a
                      href={`mailto:${identity.email}`}
                      className="link-underline break-all font-mono text-[13px] tracking-[0.02em] text-ink"
                    >
                      {identity.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* RIGHT — narrative, worlds legend, tri-axis profile, stats */}
          <div className="lg:col-span-7">
            <div className="max-w-prose space-y-5">
              {about.paragraphs[language].map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-lg leading-relaxed text-ink-soft text-pretty">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {/* the three worlds — chip legend that teaches the channel system */}
            <Reveal delay={0.16}>
              <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                {worlds.map((w) => (
                  <li key={w.key} className="sys inline-flex items-baseline gap-2.5 text-ink">
                    <Chip channel={w.key} className="self-center" />
                    <span>{w.label[language]}</span>
                    <span className="text-ink-soft">· {w.proof[language]}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* TRI-AXIS PROFILE — instrument bars, TRUE counts per channel */}
            <Reveal delay={0.2}>
              <div className="mt-12 border-t border-hairline pt-8">
                <p className="sys text-ink-soft">{t('about.profile')}</p>
                <div className="mt-6 space-y-6">
                  {worlds.map((w, i) => {
                    const n = counts[w.key]
                    const pct = totalProjects > 0 ? (n / totalProjects) * 100 : 0
                    return (
                      <div key={w.key}>
                        <p className="sys inline-flex items-center gap-2 text-ink">
                          <Chip channel={w.key} className="h-2 w-2" />
                          <span>
                            {w.label[language]} — {n}/{totalProjects}
                          </span>
                        </p>
                        {/* 1.5px track + 6px channel fill */}
                        <div className="relative mt-2.5 h-[6px]" aria-hidden="true">
                          <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-hairline" />
                          <motion.span
                            className={`absolute inset-y-0 left-0 origin-left rounded-full ${CHIP_BG[w.key]}`}
                            style={{ width: `${pct}%` }}
                            initial={reduce ? false : { scaleX: 0 }}
                            whileInView={reduce ? undefined : { scaleX: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>

            {/* real stats from content.ts */}
            <Reveal delay={0.24}>
              <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-hairline pt-8 sm:grid-cols-4">
                {about.stats.map((stat) => (
                  <div key={stat.label.en}>
                    <p className="display text-3xl text-ink md:text-4xl">{stat.value}</p>
                    <p className="sys mt-1.5 text-ink-soft">{stat.label[language]}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
