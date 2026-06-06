'use client'

import { MapPin } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { experiences } from '@/lib/content'

export default function Experience() {
  const { language, t } = useLanguage()

  return (
    <section id="experience" className="section">
      <div className="container-px">
        <SectionHeading kicker={t('experience.kicker')} title={t('experience.title')} />

        {/* vertical timeline rail */}
        <ol className="mt-14 md:mt-20">
          {experiences.map((exp, i) => (
            <Reveal
              key={`${exp.company}-${exp.period}`}
              as="li"
              delay={i * 0.08}
              className="relative grid gap-6 border-l border-hairline pb-12 pl-7 last:pb-0 sm:pl-10 md:grid-cols-12 md:gap-10"
            >
              {/* accent node dot on the rail */}
              <span
                aria-hidden="true"
                className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent ring-1 ring-accent/40"
              />

              {/* left: period + company + location */}
              <div className="md:col-span-4 lg:col-span-3">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
                  {exp.period}
                </p>
                <h3 className="display mt-3 text-2xl text-ink sm:text-[1.7rem]">
                  {exp.company}
                </h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-soft">
                  <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {exp.location[language]}
                </p>
              </div>

              {/* right: role + summary + bullets + tech */}
              <div className="md:col-span-8 lg:col-span-9">
                <p className="font-mono text-sm uppercase tracking-[0.14em] text-accent-strong">
                  {exp.role[language]}
                </p>
                <p className="mt-3 text-lg leading-relaxed text-ink text-pretty">
                  {exp.summary[language]}
                </p>

                <ul className="mt-5 space-y-3">
                  {exp.bullets[language].map((bullet, bi) => (
                    <li key={bi} className="flex gap-3 leading-relaxed text-ink-soft">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                      />
                      <span className="text-pretty">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {exp.tech.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={t('projects.tech')}>
                    {exp.tech.map((tech) => (
                      <li key={tech}>
                        <span className="chip">{tech}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
