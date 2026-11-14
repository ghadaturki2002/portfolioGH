'use client'

/**
 * 07 · INTERNATIONAL — expériences internationales (Erasmus+ à Nice, AIESEC à
 * İzmit) et engagements associatifs, fidèles au CV.
 */
import { Download, Globe2 } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { engagements } from '@/lib/content'
import { Reveal, SectionHeader } from './ui/kit'

export default function Engagements() {
  const { language, t } = useLanguage()
  return (
    <section id="international" aria-labelledby="international-title" className="section border-t">
      <div className="container-x">
        <SectionHeader index={7} kicker={t('engagements.kicker')} title={t('engagements.title')} titleId="international-title" />
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {engagements.map((e, i) => (
            <Reveal
              as="li"
              key={e.title.en}
              delay={(i % 2) * 70}
              className={`card flex flex-col p-6 ${e.international ? 'border-hairline-strong' : ''}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="mono tabular text-[0.875rem] text-ink-soft">{e.period[language]}</p>
                {e.country && (
                  <span className="label inline-flex items-center gap-1.5 rounded border px-2 py-1 text-ink-soft">
                    <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {e.country}
                  </span>
                )}
              </div>
              <h3 className="heading mt-4 text-[1.15rem] text-ink">{e.title[language]}</h3>
              <p className="mt-1 text-[0.95rem] font-medium text-ink-soft">{e.org[language]}</p>
              <p className="mt-3 leading-relaxed text-ink">{e.description[language]}</p>
              {e.file && (
                <a
                  href={e.file.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-4 text-[0.9rem] text-ink-soft hover:text-ink"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span className="link">{e.file.label[language]}</span>
                </a>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
