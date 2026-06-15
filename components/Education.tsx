'use client'

/**
 * 07 · THE SHELF — Education as archive boxes on a bench.
 * Degrees are horizontal spines resting on shelf hairlines; a delayed
 * pull-out slides each spine 8px right, revealing a channel-colored
 * left edge. Associations sit below as quiet cards.
 * Deliberately calm — the breath before Contact. No glow, no glass.
 */
import { useReducedMotion } from 'framer-motion'
import { GraduationCap, Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { education, associations } from '@/lib/content'
import type { Channel } from '@/lib/channels'
import { SectionHeader, Reveal, BORDER_CH } from './ui/primitives'

const SPINE_CYCLE: Channel[] = ['mech', 'elec', 'soft']

export default function Education() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()

  return (
    <section id="education" className="section">
      <div className="container-px">
        <SectionHeader index="07" kicker={t('education.kicker')} title={t('education.title')} />

        {/* ---------- degree spines on shelf lines ---------- */}
        <ol className="mt-12">
          {education.map((item, i) => {
            const ch = SPINE_CYCLE[i % SPINE_CYCLE.length]
            return (
              <Reveal as="li" key={item.degree.en} delay={i * 0.07} className="border-b border-hairline">
                <div className="relative mb-4">
                  {/* channel edge, hidden under the spine until pull-out */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-2 left-0 border-l-[1.5px] ${BORDER_CH[ch]}`}
                  />
                  {/* decorative pull-out flourish — not interactive (no focus stop) */}
                  <div
                    className={[
                      'relative grid items-center gap-3 rounded-[10px] border border-hairline bg-surface px-5 py-4 sm:grid-cols-12 sm:px-6',
                      reduce ? '' : 'transition-transform duration-200 delay-300 hover:translate-x-2',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <p className="sys text-ink-soft sm:col-span-3">
                      {item.period}
                      {item.current ? ` – ${t('education.present')}` : ''}
                    </p>
                    <div className="sm:col-span-9">
                      <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
                        {item.degree[language]}
                      </h3>
                      <p className="mt-1 text-sm text-ink-soft">{item.school[language]}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>

        {/* ---------- associations & volunteering ---------- */}
        <Reveal className="mt-14">
          <h3 className="sys flex items-center gap-2.5 text-ink-soft">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            {t('education.associations')}
          </h3>
        </Reveal>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {associations.map((a, i) => (
            <Reveal as="li" key={a.title.en} delay={0.06 + i * 0.07} className="h-full">
              <article className="h-full rounded-[14px] border border-hairline bg-surface p-5">
                <h4 className="font-display font-semibold text-ink">{a.title[language]}</h4>
                {a.period && <p className="sys mt-1.5 text-ink-soft">{a.period}</p>}
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{a.description[language]}</p>
                {a.file && (
                  <a
                    href={a.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline sys mt-4 inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('education.certificate')}
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
