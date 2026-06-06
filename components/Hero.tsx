'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { identity } from '@/lib/content'

const TOOLS = ['SolidWorks', 'CATIA V5', 'Blender', 'Arduino', 'ESP32', 'Python', 'C#', 'Java', 'Unity', 'Vuforia', 'Node-RED', 'Machine Learning']

export default function Hero() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()

  const go = (href: string) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: reduce ? 'auto' : 'smooth' })
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.05 } },
  }
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  }

  return (
    <section id="hero" className="relative overflow-hidden pt-28 md:pt-36">
      {/* subtle backdrop */}
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-24 -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* text */}
          <motion.div className="lg:col-span-7" variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface px-4 py-1.5 text-sm text-ink-soft">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-accent ${reduce ? '' : 'animate-ping'} opacity-75`} />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {identity.availability[language]}
            </motion.div>

            <motion.h1 variants={item} className="display text-[3rem] leading-[0.98] text-ink sm:text-7xl lg:text-[5.25rem]">
              {identity.name}
            </motion.h1>

            <motion.p variants={item} className="mt-5 font-mono text-sm uppercase tracking-[0.18em] text-accent sm:text-base">
              {identity.role[language]}
            </motion.p>

            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty sm:text-xl">
              {identity.tagline[language]}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={() => go('#projects')} className="btn-primary group">
                {t('hero.viewWork')}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button onClick={() => go('#contact')} className="btn-outline">
                {t('hero.contact')}
              </button>
              <a href={identity.cv[language]} download className="btn-outline">
                <Download className="h-4 w-4" />
                {t('hero.downloadCV')}
              </a>
            </motion.div>
          </motion.div>

          {/* portrait */}
          <motion.div
            className="lg:col-span-5"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative mx-auto max-w-sm lg:ml-auto">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] border border-accent/30" aria-hidden="true" />
              <div className="overflow-hidden rounded-[1.75rem] border border-hairline bg-surface-2">
                {/* TODO: photo de profil possiblement basse résolution — remplacer /ghada-turki-photo.jpg par une version HD si disponible */}
                <img
                  src={identity.photo}
                  alt={`${identity.name} — ${identity.role[language]}`}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* tools marquee */}
        <div className="relative mt-16 overflow-hidden border-y border-hairline py-5 md:mt-24" aria-hidden="true">
          <div className={`flex w-max gap-10 ${reduce ? 'flex-wrap' : 'animate-marquee'}`}>
            {(reduce ? TOOLS : [...TOOLS, ...TOOLS]).map((tool, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-ink-soft">
                {tool}
                <span className="h-1 w-1 rounded-full bg-accent/60" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <button
        onClick={() => go('#about')}
        className="mx-auto mt-10 mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-accent"
      >
        {t('hero.scroll')}
        <motion.span animate={reduce ? {} : { y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>
    </section>
  )
}
