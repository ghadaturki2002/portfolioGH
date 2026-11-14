'use client'

/**
 * 06 · FORMATION — les trois diplômes du CV, avec leurs distinctions
 * (ESPRIT : 2e de la classe sur tout le cursus ; ISTIC : meilleure note de PFE, 19/20).
 */
import { GraduationCap } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { education } from '@/lib/content'
import { Reveal, SectionHeader } from './ui/kit'

/** « 2e de ma classe » → 2 + e en exposant (idem 2nd en anglais) */
function Ordinal({ text }: { text: string }) {
  const m = text.match(/^(\d+)(e|er|re|st|nd|rd|th)(\s[\s\S]*)$/)
  if (!m) return <span>{text}</span>
  return (
    <span>
      {m[1]}
      <sup className="text-[0.7em]">{m[2]}</sup>
      {m[3]}
    </span>
  )
}

export default function Education() {
  const { language, t } = useLanguage()
  return (
    <section id="education" aria-labelledby="education-title" className="section border-t">
      <div className="container-x">
        <SectionHeader index={6} kicker={t('education.kicker')} title={t('education.title')} titleId="education-title" />
        <ol className="mt-14 grid gap-5 lg:grid-cols-3">
          {education.map((e, i) => (
            <Reveal as="li" key={e.schoolShort} delay={i * 70} className="card flex flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="mono tabular text-[0.875rem] text-ink-soft">{e.period}</p>
                <GraduationCap className="h-5 w-5 text-ink-faint" aria-hidden="true" />
              </div>
              <h3 className="heading mt-5 text-[1.18rem] text-ink">{e.degree[language]}</h3>
              <p className="mt-3 text-[0.95rem] text-ink-soft">
                <span className="font-semibold text-ink">{e.schoolShort}</span>, {e.school[language]}
              </p>
              {e.distinction && (
                <p className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 rounded border border-accent/50 bg-accent-fill/10 px-3 py-1.5 text-[0.875rem] font-medium text-accent">
                    <Ordinal text={e.distinction[language]} />
                  </span>
                </p>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
