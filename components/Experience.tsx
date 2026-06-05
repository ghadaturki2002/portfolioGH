'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, MapPin, Code, Cpu, Smartphone, Settings } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import SectionHeader from './draft/SectionHeader'

interface Experience {
  company: string
  position: string
  location: string
  period: string
  description: string
  technologies: string[]
  icon: React.ElementType
}

/** Drafting-log reference, e.g. EXP-01 */
const ref = (i: number) => `EXP-${String(i + 1).padStart(2, '0')}`

export default function Experience() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  const experiences: Experience[] = [
    {
      company: 'MATECH',
      position: t('experience.matech2025.position'),
      location: 'Megrine, Tunisia',
      period: '03/2025 - 09/2025',
      description: t('experience.matech2025.description'),
      technologies: ['Unity', 'C#', 'Vuforia', 'Arduino', 'SolidWorks', 'Blender'],
      icon: Smartphone,
    },
    {
      company: 'GD Tunisie',
      position: t('experience.gd2025.position'),
      location: 'Birbouragba, Tunisia',
      period: '07/2025 - 08/2025',
      description: t('experience.gd2025.description'),
      technologies: ['Python', 'Arduino', 'SolidWorks', 'Capteurs'],
      icon: Settings,
    },
    {
      company: 'MATECH',
      position: t('experience.matech2023.position'),
      location: 'Megrine, Tunisia',
      period: '02/2023 - 06/2023',
      description: t('experience.matech2023.description'),
      technologies: ['Java', 'Industrial electronics', 'Controllers'],
      icon: Cpu,
    },
    {
      company: 'CSM-GIAS',
      position: t('experience.csm2022.position'),
      location: 'Bouargoub, Tunisia',
      period: '01/2022 - 02/2022',
      description: t('experience.csm2022.description'),
      technologies: ['SolidWorks', 'Arduino'],
      icon: Code,
    },
    {
      company: 'WEWIRE',
      position: t('experience.wewire2021.position'),
      location: 'Hammamet, Tunisia',
      period: '07/2021 - 07/2021',
      description: t('experience.wewire2021.description'),
      technologies: ['Lean Manufacturing'],
      icon: Settings,
    },
  ]

  return (
    <section id="experience" className="section-pad">
      <div className="sheet">
        <SectionHeader
          number="02"
          marker="C—C"
          label={t('experience.subtitle')}
          title={t('experience.title')}
        />

        {/* DRAFTING LOG / TIMELINE */}
        <ol className="relative">
          {/* continuous hairline spine (left rail; centered on the node column) */}
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-[7px] top-3 w-px bg-hairline md:left-[calc(7.5rem+7px)]"
          />

          {experiences.map((exp, index) => {
            const Icon = exp.icon
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : index * 0.08 }}
                className="relative grid grid-cols-[auto_1fr] gap-x-5 pb-12 last:pb-0 md:grid-cols-[7.5rem_auto_1fr] md:gap-x-6"
              >
                {/* PERIOD — mono station label (own column on desktop) */}
                <div className="col-start-2 row-start-1 mb-1 md:col-start-1 md:row-start-1 md:mb-0 md:pt-1 md:text-right">
                  <div className="label flex items-center gap-1.5 text-accent md:justify-end">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    {exp.period}
                  </div>
                </div>

                {/* NODE — station marker sitting on the spine */}
                <div className="relative col-start-1 row-start-1 flex justify-center md:col-start-2 md:row-span-2">
                  <span
                    aria-hidden="true"
                    className="relative z-10 mt-1.5 flex h-3.5 w-3.5 flex-none items-center justify-center border-[1.5px] border-accent bg-paper md:mt-1.5"
                  >
                    <span className="h-1.5 w-1.5 bg-accent" />
                  </span>
                </div>

                {/* ENTRY CARD */}
                <div className="col-start-2 row-start-2 md:col-start-3 md:row-start-1">
                  <article className="draft-surface corner-ticks relative p-5 md:p-6">
                    {/* drafting-log ref */}
                    <div className="label mb-3 text-ink-soft">{ref(index)}</div>

                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 flex-none items-center justify-center border border-hairline bg-paper text-ink">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl font-semibold leading-tight text-ink">
                          {exp.position}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">
                            {exp.company}
                          </span>
                          <span className="label flex items-center gap-1.5 normal-case tracking-label text-ink-soft">
                            <MapPin className="h-3 w-3" aria-hidden="true" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 border-l-2 border-hairline pl-4 text-sm leading-relaxed text-ink-soft">
                      {exp.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5 border-t border-hairline pt-4">
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="spec-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
