'use client'

/**
 * 04 · COMPÉTENCES — les six familles du CV, mot pour mot.
 * Le petit chiffre accolé à une compétence = nombre de réalisations de ce
 * portfolio qui la mobilisent (calculé par skillUsage) ; il n'apparaît que s'il
 * est supérieur à zéro. Les langues ferment la section.
 */
import { useLanguage } from './LanguageProvider'
import { languages, skillGroups } from '@/lib/content'
import { skillUsage } from '@/lib/channels'
import { DisciplineTags, Reveal, SectionHeader } from './ui/kit'

export default function Skills() {
  const { language, t } = useLanguage()

  return (
    <section id="skills" aria-labelledby="skills-title" className="section border-t">
      <div className="container-x">
        <SectionHeader index={4} kicker={t('skills.kicker')} title={t('skills.title')} intro={t('skills.legend')} titleId="skills-title" />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <Reveal as="li" key={g.id} delay={(gi % 3) * 60} className="card flex flex-col p-6">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 border-b pb-4">
                <h3 className="heading text-[1.12rem] text-ink">{g.title[language]}</h3>
                {g.disciplines.length ? (
                  <DisciplineTags list={g.disciplines} short />
                ) : (
                  <span className="text-[0.8125rem] text-ink-soft">{t('skills.transverse')}</span>
                )}
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => {
                  const used = skillUsage(item)
                  const n = used.length
                  const label = item.label[language]
                  return (
                    <li
                      key={item.label.en}
                      className="tag text-[0.875rem] text-ink"
                      title={n ? used.map((p) => p.code).join(' · ') : undefined}
                    >
                      {label}
                      {n > 0 && (
                        <>
                          <span aria-hidden="true" className="mono tabular ml-0.5 rounded-sm bg-accent-fill/15 px-1 text-[0.75rem] font-medium text-accent">
                            {n}
                          </span>
                          <span className="sr-only">, {t(n > 1 ? 'skills.usedIn' : 'skills.usedInOne', { n })}</span>
                        </>
                      )}
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-5 grid gap-px overflow-hidden rounded-md border bg-hairline sm:grid-cols-[auto_1fr_1fr_1fr]">
          <h3 className="label flex items-center bg-surface px-6 py-4 text-ink-faint">{t('skills.languages')}</h3>
          {languages.map((l) => (
            <p key={l.name.en} className="bg-surface px-6 py-4">
              <span className="heading block text-[1.05rem] text-ink">{l.name[language]}</span>
              <span className="text-[0.9rem] text-ink-soft">{l.level[language]}</span>
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
