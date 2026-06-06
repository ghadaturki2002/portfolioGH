'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { identity, tools } from '@/lib/content'
import ParticleNetwork from './fx/ParticleNetwork'
import GearCanvas from './fx/GearCanvas'
import WordReveal from './fx/WordReveal'
import Marquee from './fx/Marquee'

export default function Hero() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()

  const go = (href: string) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: reduce ? 'auto' : 'smooth' })
  }

  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  }
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.15 } },
  }

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 md:pt-28">
      {/* interactive electronic network */}
      <ParticleNetwork className="absolute inset-0 -z-10 h-full w-full" />
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[100px]" aria-hidden="true" />

      <div className="container-px w-full">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* text */}
          <motion.div className="lg:col-span-7" variants={container} initial="hidden" animate="show">
            <motion.div
              variants={item}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/70 px-4 py-1.5 text-sm text-ink-soft backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-accent ${reduce ? '' : 'animate-ping'} opacity-75`} />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {identity.availability[language]}
            </motion.div>

            <WordReveal
              text={identity.name}
              as="h1"
              className="display text-[3.25rem] leading-[0.98] text-ink text-glow sm:text-7xl lg:text-[5.5rem]"
            />

            <motion.p variants={item} className="mt-5 font-mono text-sm uppercase tracking-[0.18em] text-accent sm:text-base">
              {identity.role[language]}
            </motion.p>

            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty sm:text-xl">
              {identity.tagline[language]}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={() => go('#projects')} className="btn-primary glow group">
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

          {/* 3D gear (md+ only, lazy + reduced-motion safe) */}
          <div className="relative hidden h-72 lg:col-span-5 lg:block lg:h-[26rem]">
            <GearCanvas className="absolute inset-0" />
          </div>
        </div>
      </div>

      {/* tools marquee */}
      <div className="absolute inset-x-0 bottom-16 border-y border-hairline bg-surface/40 py-4 backdrop-blur-sm">
        <Marquee items={tools} />
      </div>

      {/* scroll cue */}
      <button
        onClick={() => go('#about')}
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-accent"
      >
        {t('hero.scroll')}
        <motion.span animate={reduce ? {} : { y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>
    </section>
  )
}
