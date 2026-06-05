'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Download, ArrowRight, ArrowDown } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import ExplodedAssembly from './draft/ExplodedAssembly'
import CountUp from './draft/CountUp'

export default function Hero() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()

  // CV file is language-aware (preserved behavior)
  const cvPath = language === 'fr' ? '/CV_Ghada_Turki.pdf' : '/resume GhadaTurki.pdf'

  // Spec-sheet stats — factual counts of real content, labelled with existing section titles
  const stats = [
    { to: 10, label: t('projects.title') },
    { to: 5, label: t('experience.title') },
    { to: 3, label: t('education.title') },
    { to: 5, label: t('education.certifications') },
  ]

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.querySelector('#projects')
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6, ease: 'easeOut' } },
  }
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.1 } },
  }

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 md:pt-32">
      <div className="sheet w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* TEXT */}
          <motion.div className="lg:col-span-7" variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="label mb-6 flex items-center gap-3">
              <span className="inline-block h-px w-12 bg-accent" />
              PORTFOLIO — 01 / 01
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-[clamp(2.75rem,8vw,5.75rem)] font-bold leading-[0.92] tracking-tight"
            >
              {t('hero.name')}
            </motion.h1>

            <motion.div variants={item} className="mt-6 max-w-2xl space-y-1.5 text-base text-ink-soft md:text-lg">
              <p>{t('hero.title')}</p>
              <p>{t('hero.master')}</p>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl border-l-2 border-accent pl-4 font-display text-lg italic text-ink md:text-xl"
            >
              {t('hero.tagline')}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#projects" onClick={scrollToProjects} className="btn-primary group">
                {t('hero.viewProjects')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={cvPath} download className="btn-ghost">
                <Download className="h-4 w-4" />
                {t('hero.downloadCV')}
              </a>
            </motion.div>
          </motion.div>

          {/* EXPLODED ASSEMBLY */}
          <div className="lg:col-span-5">
            <ExplodedAssembly />
          </div>
        </div>

        {/* SPEC-SHEET STATS */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-hairline pt-10 md:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={item} className="relative pt-5">
              {/* spec dimension bracket */}
              <span className="absolute left-0 right-0 top-1.5 h-1.5 border border-b-0 border-ink/50" />
              <div className="font-display text-4xl font-bold leading-none text-accent md:text-5xl">
                <CountUp to={s.to} pad={2} />
              </div>
              <div className="label mt-2 normal-case tracking-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.2 }}
        aria-hidden="true"
      >
        <span className="h-10 w-px bg-hairline" />
        <motion.span
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-ink-soft"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  )
}
