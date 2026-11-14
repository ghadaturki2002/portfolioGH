'use client'

/**
 * 01 · PROFIL — texte d'après le profil du CV, fiche d'identité en cartouche,
 * compteurs CALCULÉS depuis lib/content.ts et répartition par discipline
 * (chaque barre filtre l'index des réalisations).
 */
import { useLanguage } from './LanguageProvider'
import { about, disciplines, education, engagements, experiences, identity, projects } from '@/lib/content'
import { countByChannel } from '@/lib/channels'
import { CH_BG, ChannelChip, Reveal, SectionHeader } from './ui/kit'
import { selectFilter } from './Hero'

const counts = countByChannel()

export default function About() {
  const { language, t } = useLanguage()

  const stats = [
    { value: experiences.length, label: t('about.stat.experiences') },
    { value: projects.length, label: t('about.stat.works') },
    { value: education.length, label: t('about.stat.degrees') },
    { value: engagements.filter((e) => e.international).length, label: t('about.stat.international') },
  ]

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x">
        <SectionHeader index={1} kicker={t('about.kicker')} title={t('about.title')} titleId="about-title" />

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="max-w-prose space-y-6">
              {about.paragraphs[language].map((para, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className={i === 0 ? 'text-[1.25rem] leading-relaxed text-ink' : 'text-lg leading-relaxed text-ink-soft'}>{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal as="ul" className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-hairline sm:grid-cols-4">
              {stats.map((s) => (
                <li key={s.label} className="bg-bg p-5">
                  <p className="display tabular text-4xl text-ink">{s.value}</p>
                  <p className="mt-2 text-[0.875rem] leading-snug text-ink-soft">{s.label}</p>
                </li>
              ))}
            </Reveal>
          </div>

          <aside className="space-y-10 lg:col-span-5" aria-label={t('about.facts')}>
            <Reveal className="card overflow-hidden">
              <p className="label flex items-center justify-between border-b bg-surface-2/60 px-5 py-3 text-ink-faint">
                <span>{t('about.facts')}</span>
                <span aria-hidden="true">GT · 2026</span>
              </p>
              <dl className="divide-y">
                {about.facts.map((f) => (
                  <div key={f.label.en} className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3.5">
                    <dt className="label pt-0.5 text-ink-faint">{f.label[language]}</dt>
                    <dd className="text-[0.95rem] text-ink">
                      {f.label.en === 'Availability' ? (
                        <span className="inline-flex items-center gap-2">
                          <span aria-hidden="true" className="pulse relative h-2 w-2 rounded-full bg-elec-chip" />
                          {f.value[language]}
                        </span>
                      ) : (
                        f.value[language]
                      )}
                    </dd>
                  </div>
                ))}
                <div className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3.5">
                  <dt className="label pt-0.5 text-ink-faint">{t('about.email')}</dt>
                  <dd className="min-w-0">
                    <a href={`mailto:${identity.email}`} className="link mono break-all text-[0.9rem] text-ink">
                      {identity.email}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3.5">
                  <dt className="label pt-0.5 text-ink-faint">{t('about.phone')}</dt>
                  <dd>
                    <a href={identity.phoneHref} className="link mono tabular text-[0.9rem] text-ink">
                      {identity.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal>
              <h3 className="label text-ink-faint">{t('about.profile')}</h3>
              <ul className="mt-5 space-y-4">
                {disciplines.map((d) => {
                  const n = counts[d.key]
                  return (
                    <li key={d.key}>
                      <a
                        href="#index"
                        onClick={() => selectFilter(d.key)}
                        aria-label={t('about.barLabel', { label: d.label[language], n, total: counts.all })}
                        className="group block rounded focus-visible:outline-offset-4"
                      >
                        <span className="flex items-baseline justify-between gap-3 text-[0.95rem]">
                          <span className="inline-flex items-center gap-2.5 text-ink group-hover:underline group-hover:underline-offset-4">
                            <ChannelChip ch={d.key} />
                            {d.label[language]}
                          </span>
                          <span className="mono tabular text-ink-soft">
                            {n}/{counts.all}
                          </span>
                        </span>
                        <span aria-hidden="true" className="relative mt-2 block h-1.5 overflow-hidden rounded-full bg-surface-2">
                          <span className={`absolute inset-y-0 left-0 rounded-full ${CH_BG[d.key]}`} style={{ width: `${(n / counts.all) * 100}%` }} />
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-4 text-[0.875rem] text-ink-faint">{t('about.profileNote')}</p>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  )
}
