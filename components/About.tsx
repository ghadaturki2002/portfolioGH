'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Cpu, Zap, Target, Users } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import SectionHeader from './draft/SectionHeader'
import Measured from './draft/Measured'

export default function About() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  const domains = [
    {
      icon: Cpu,
      title: t('about.industrialAutomation'),
      description: t('about.industrialAutomationDesc'),
    },
    {
      icon: Zap,
      title: t('about.robotics'),
      description: t('about.roboticsDesc'),
    },
    {
      icon: Target,
      title: t('about.iot'),
      description: t('about.iotDesc'),
    },
    {
      icon: Users,
      title: t('about.ar'),
      description: t('about.arDesc'),
    },
  ]

  const softSkills = [
    t('about.innovation'),
    t('about.teamwork'),
    t('about.autonomy'),
    t('about.analytical'),
    t('about.problemSolving'),
    t('about.leadership'),
  ]

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6, ease: 'easeOut' } },
  }
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  }

  return (
    <section id="about" className="section-pad">
      <div className="sheet">
        <SectionHeader
          number="01"
          marker="A—A"
          label={t('about.subtitle')}
          title={t('about.title')}
        />

        {/* ===== PROFILE: measured photo + professional profile copy ===== */}
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* photo as a dimensioned drawing detail */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: reduce ? 0 : 0.6 }}
          >
            <Measured widthLabel="320.00" heightLabel="320.00">
              {/* TODO: profile photo /ghada-turki-photo.jpg may be low-res — swap for a higher-resolution scan if available */}
              <div className="corner-ticks relative aspect-square overflow-hidden border-[1.5px] border-ink bg-paper-2">
                <img
                  src="/ghada-turki-photo.jpg"
                  alt="Ghada Turki - Ingénieure en Électromécanique"
                  className="h-full w-full object-cover grayscale-[35%] transition-all duration-500 hover:grayscale-0"
                />
                <span className="absolute right-3 top-3 spec-chip border-accent bg-paper/90 uppercase text-accent">
                  GT—01
                </span>
              </div>
            </Measured>
          </motion.div>

          {/* professional profile */}
          <motion.div
            className="lg:col-span-7"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={item} className="label mb-3 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-accent" />
              REF · GT—01
            </motion.div>
            <motion.h3
              variants={item}
              className="font-display text-2xl font-bold leading-tight text-ink md:text-3xl"
            >
              {t('about.professionalProfile')}
            </motion.h3>
            <motion.p
              variants={item}
              className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg"
            >
              {t('about.description')}
            </motion.p>
            <motion.p
              variants={item}
              className="mt-5 max-w-2xl border-l-2 border-accent pl-4 text-base leading-relaxed text-ink md:text-lg"
            >
              {t('about.objective')}
            </motion.p>
          </motion.div>
        </div>

        {/* ===== KEY DOMAINS — annotated drafting spec list ===== */}
        <div className="mt-16 border-t border-hairline pt-10 md:mt-20">
          <div className="mb-8 flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
              {t('about.keyDomains')}
            </h3>
            <span className="label hidden sm:block">04 ITEMS</span>
          </div>

          <motion.ol
            className="divide-y divide-hairline border-y border-hairline"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {domains.map((domain, index) => {
              const Icon = domain.icon
              return (
                <motion.li
                  key={index}
                  variants={item}
                  className="group flex items-start gap-4 py-5 md:gap-6"
                >
                  {/* drawing item balloon */}
                  <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center border border-ink font-mono text-xs text-ink transition-colors group-hover:border-accent group-hover:text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <Icon
                    className="mt-0.5 h-6 w-6 flex-none text-accent"
                    aria-hidden="true"
                  />

                  <div className="min-w-0 flex-1">
                    <h4 className="font-display text-lg font-semibold leading-tight text-ink transition-colors group-hover:text-accent">
                      {domain.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {domain.description}
                    </p>
                  </div>

                  {/* leader line + spec ref (decorative, desktop) */}
                  <div className="hidden items-center gap-2.5 self-center lg:flex" aria-hidden="true">
                    <span className="h-px w-10 bg-hairline-2" />
                    <span className="font-mono text-[11px] uppercase tracking-label text-ink-soft">
                      DOM—{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </motion.li>
              )
            })}
          </motion.ol>
        </div>

        {/* ===== SOFT SKILLS — spec-chip tags ===== */}
        <div className="mt-16 md:mt-20">
          <div className="mb-6 flex items-center gap-3">
            <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
              {t('about.softSkills')}
            </h3>
            <span className="h-px flex-1 border-t border-dashed border-hairline" aria-hidden="true" />
          </div>

          <motion.ul
            className="flex flex-wrap gap-2.5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {softSkills.map((skill, index) => (
              <motion.li key={index} variants={item}>
                <span className="spec-chip">{skill}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
