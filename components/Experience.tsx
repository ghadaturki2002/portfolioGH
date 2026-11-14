'use client'

/**
 * 03 · PARCOURS — les six expériences du CV, dans l'ordre du CV.
 * Les deux missions qui ont une étude de cas (TUNIAOS, MATECH mastère) y renvoient
 * au lieu de répéter leurs puces ; les autres renvoient à leur fiche projet.
 */
import { ArrowUpRight, MapPin } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { experiences, projects } from '@/lib/content'
import { Cote, DisciplineTags, Reveal, SectionHeader } from './ui/kit'
import { hasDetails } from './projects/ProjectIndex'

export default function Experience() {
  const { language, t } = useLanguage()

  return (
    <section id="experience" aria-labelledby="experience-title" className="section border-t">
      <div className="container-x">
        <SectionHeader index={3} kicker={t('experience.kicker')} title={t('experience.title')} titleId="experience-title" />

        <ol className="mt-14">
          {experiences.map((exp, i) => {
            const project = projects.find((p) => p.id === exp.projectId)
            const link = exp.caseStudy
              ? { href: `#case-${exp.projectId}`, label: t('experience.caseLink') }
              : project && hasDetails(project)
                ? { href: `#p-${exp.projectId}`, label: t('experience.projectLink') }
                : null
            return (
              <Reveal
                as="li"
                key={exp.id}
                delay={Math.min(i, 3) * 50}
                className="grid gap-6 border-t border-hairline-strong py-10 md:grid-cols-[15rem_1fr] md:gap-12 md:py-12"
              >
                <div>
                  <p className="mono tabular text-[0.875rem] text-ink-soft">
                    <time dateTime={exp.start}>{exp.period[language].split(/\s–\s/)[0]}</time>
                    {exp.start !== exp.end && (
                      <>
                        {' – '}
                        <time dateTime={exp.end}>{exp.period[language].split(/\s–\s/)[1]}</time>
                      </>
                    )}
                  </p>
                  <Cote className="mt-2 hidden max-w-[13rem] md:flex" />
                  <p className="heading mt-4 text-[1.6rem] text-ink">{exp.company}</p>
                  <p className="mt-1.5 inline-flex items-start gap-1.5 text-[0.9rem] text-ink-soft">
                    <MapPin className="mt-[3px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {exp.place[language]}
                  </p>
                  <DisciplineTags list={exp.disciplines} short className="mt-4 flex-col !gap-y-1.5" />
                </div>

                <div className="min-w-0">
                  <p className="label text-accent">{exp.kind[language]}</p>
                  <h3 className="heading mt-3 max-w-3xl text-[clamp(1.15rem,1.9vw,1.45rem)] text-ink">{exp.title[language]}</h3>

                  {exp.caseStudy ? (
                    <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{t('experience.caseNote')}</p>
                  ) : (
                    <ul className="mt-5 max-w-3xl space-y-3">
                      {exp.bullets[language].map((b) => (
                        <li key={b} className="flex gap-3 leading-relaxed text-ink">
                          <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-ink-faint" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={t('projects.tools')}>
                    {exp.tech.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {link && (
                    <a href={link.href} className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-accent hover:underline hover:underline-offset-4">
                      {link.label}
                      <span className="sr-only"> : {exp.company}</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
