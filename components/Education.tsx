'use client'

import { GraduationCap, Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { education, associations } from '@/lib/content'

export default function Education() {
  const { language, t } = useLanguage()

  return (
    <section id="education" className="section">
      <div className="container-px">
        <SectionHeading kicker={t('education.kicker')} title={t('education.title')} />

        {/* DEGREES — timeline */}
        <ol className="relative mt-14 space-y-8 md:space-y-10">
          {/* continuous hairline spine, behind the nodes */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[5px] top-2 w-px bg-hairline"
          />

          {education.map((item, i) => (
            <Reveal as="li" key={i} delay={i * 0.08} className="relative pl-8 md:pl-10">
              {/* node on the spine */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 flex h-[11px] w-[11px] items-center justify-center rounded-full border border-accent bg-bg"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {item.current ? `${item.period} – ${t('education.present')}` : item.period}
                </span>
                <h3 className="display text-xl text-ink sm:text-2xl">{item.degree[language]}</h3>
                <p className="text-ink-soft text-pretty">{item.school[language]}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* ASSOCIATIONS & VOLUNTEERING */}
        <div className="mt-20 md:mt-24">
          <Reveal>
            <h3 className="kicker">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
              {t('education.associations')}
            </h3>
          </Reveal>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {associations.map((assoc, i) => (
              <Reveal as="li" key={i} delay={i * 0.08}>
                <article className="card flex h-full flex-col p-6 md:p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="display text-lg leading-snug text-ink">{assoc.title[language]}</h4>
                    {assoc.period && (
                      <span className="chip flex-none whitespace-nowrap">{assoc.period}</span>
                    )}
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft text-pretty">
                    {assoc.description[language]}
                  </p>

                  {assoc.file && (
                    <a
                      href={assoc.file}
                      download
                      className="link-underline mt-5 inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.18em] text-accent"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      {t('education.certificate')}
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
