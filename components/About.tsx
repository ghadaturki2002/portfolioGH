'use client'

import { useLanguage } from './LanguageProvider'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import CountUp from './fx/CountUp'
import { about, skillGroups, identity } from '@/lib/content'

export default function About() {
  const { language, t } = useLanguage()

  return (
    <section id="about" className="section">
      <div className="container-px">
        <SectionHeading kicker={t('about.kicker')} title={t('about.title')} />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* LEFT — profile narrative */}
          <div className="lg:col-span-7">
            <div className="max-w-prose space-y-6">
              {about.paragraphs[language].map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-lg leading-relaxed text-ink-soft text-pretty">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* focus areas — skill group titles as chips */}
            <Reveal delay={0.16} className="mt-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                {t('about.focusAreas')}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {skillGroups.map((group, i) => (
                  <Reveal key={group.title.en} as="li" delay={0.18 + i * 0.06}>
                    <span className="chip">{group.title[language]}</span>
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* RIGHT — stat tiles */}
          <div className="lg:col-span-5">
            <ul className="grid grid-cols-2 gap-4 sm:gap-5">
              {about.stats.map((stat, i) => (
                <Reveal key={stat.label.en} as="li" delay={i * 0.08}>
                  <div className="card flex h-full flex-col justify-between p-5 hover:border-accent/40 sm:p-6">
                    <CountUp
                      value={stat.value}
                      className="font-display text-4xl font-semibold text-accent sm:text-5xl"
                    />
                    <span className="mt-3 block font-mono text-xs uppercase leading-snug tracking-[0.12em] text-ink-soft">
                      {stat.label[language]}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>

            {/* role caption tying the tiles back to the profile */}
            <Reveal delay={0.32} className="mt-5">
              <p className="text-sm leading-relaxed text-ink-soft">
                {identity.role[language]}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
