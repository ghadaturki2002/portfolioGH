'use client'

/**
 * 02 · THE REGISTRY — Experience.
 * A sober vertical ledger of the 6 experiences. Color is starved on
 * purpose (chips, a 1.5px channel rail segment per row, one colored
 * role line) so the Projects catalogue lands harder. No glass on rows,
 * no glow anywhere in this section.
 */
import { MapPin } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { experiences } from '@/lib/content'
import { experienceChannel, experienceChannels } from '@/lib/channels'
import {
  Chip,
  ProofTag,
  DelayedHover,
  Reveal,
  SectionHeader,
  CHIP_BG,
  TEXT_CH,
} from './ui/primitives'

export default function Experience() {
  const { language, t } = useLanguage()

  return (
    <section id="experience" className="section">
      <div className="container-px">
        <SectionHeader
          index="02"
          kicker={t('experience.kicker')}
          title={t('experience.title')}
          count={`${experiences.length} ${t('experience.roles')}`}
        />

        {/* the ledger — far-left rail built from per-row channel segments */}
        <ol className="mt-14 border-t border-hairline md:mt-20">
          {experiences.map((exp, i) => {
            const ch = experienceChannel(exp)
            const channels = experienceChannels(exp)
            const bullets = exp.bullets[language]
            const lastBullet = bullets[bullets.length - 1]
            const numeral = String(i + 1).padStart(2, '0')

            return (
              <Reveal
                as="li"
                key={`${exp.company}-${exp.period}`}
                delay={Math.min(i * 0.07, 0.21)}
                className="relative border-b border-hairline py-12 pl-6 md:py-16 md:pl-10"
              >
                {/* rail segment — this row's channel, 1.5px, static */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-0 left-0 top-0 w-[1.5px] ${CHIP_BG[ch]}`}
                />

                {/* ghosted registry numeral */}
                <span
                  aria-hidden="true"
                  className="display pointer-events-none absolute right-0 top-8 select-none text-[10vw] font-extrabold leading-none text-ink/5 lg:text-[7vw]"
                >
                  {numeral}
                </span>

                <div className="relative grid gap-8 md:grid-cols-12 md:gap-10">
                  {/* LEFT — company / period / location / channel chips */}
                  <div className="self-start md:sticky md:top-24 md:col-span-4">
                    <h3 className="display text-2xl text-ink">{exp.company}</h3>

                    {exp.current ? (
                      <div className="mt-3">
                        <ProofTag channel="elec">{exp.period}</ProofTag>
                      </div>
                    ) : (
                      <p className="sys mt-3 text-ink-soft">{exp.period}</p>
                    )}

                    <p className="sys mt-2 flex items-center gap-1.5 text-ink-soft">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {exp.location[language]}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5">
                      {channels.map((c) => (
                        <Chip key={c} channel={c} />
                      ))}
                    </div>
                  </div>

                  {/* RIGHT — role / summary / bullets / tech / shipped panel */}
                  <div className="md:col-span-8">
                    <p className={`sys ${TEXT_CH[ch]}`}>{exp.role[language]}</p>

                    <p className="mt-3 max-w-2xl text-lg text-ink text-pretty">
                      {exp.summary[language]}
                    </p>

                    <ul className="mt-6 max-w-2xl space-y-3 border-l-[1.5px] border-hairline pl-4 text-ink-soft">
                      {bullets.map((b, j) => (
                        <li key={j} className="leading-relaxed text-pretty">
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex max-w-2xl flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="sys rounded-full border border-hairline px-3 py-1 text-ink-soft"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* what shipped — delayed hover / instant focus, last bullet */}
                    <DelayedHover
                      delay={250}
                      className="mt-6"
                      trigger={
                        <button
                          type="button"
                          className="sys text-ink-soft transition-colors duration-200 hover:text-ink"
                        >
                          + {t('experience.shipped')}
                        </button>
                      }
                      panel={
                        <p className="text-sm leading-relaxed text-ink text-pretty">
                          {lastBullet}
                        </p>
                      }
                      panelClassName="glass absolute left-0 top-full z-20 mt-2 w-full max-w-xl rounded-[14px] p-4"
                    />
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
