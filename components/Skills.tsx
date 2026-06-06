'use client'

import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import PCBTraces from './fx/PCBTraces'
import { useLanguage } from './LanguageProvider'
import { skillGroups } from '@/lib/content'

export default function Skills() {
  const { language, t } = useLanguage()

  return (
    <section id="skills" className="section relative overflow-hidden">
      <PCBTraces className="absolute inset-0 -z-10 h-full w-full opacity-50" />
      <div className="container-px">
        <SectionHeading kicker={t('skills.kicker')} title={t('skills.title')} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16">
          {skillGroups.map((group, i) => (
            <Reveal as="li" key={group.title.en} delay={i * 0.08}>
              <div className="card group h-full p-7 hover:border-accent sm:p-8">
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-mono text-sm text-accent transition-colors group-hover:text-accent-strong"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="display text-lg text-ink sm:text-xl">{group.title[language]}</h3>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="chip group-hover:border-accent/50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
