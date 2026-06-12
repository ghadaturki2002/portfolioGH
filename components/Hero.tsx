'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { identity, tools, worlds } from '@/lib/content'
import ParticleNetwork from './fx/ParticleNetwork'
import TiltCard from './fx/TiltCard'
import WordReveal from './fx/WordReveal'
import Marquee from './fx/Marquee'

export default function Hero() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Gentle scroll parallax on the portrait (drifts up as you scroll past).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -48])

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
    <section ref={sectionRef} id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 md:pt-28">
      {/* interactive electronic network */}
      <ParticleNetwork className="absolute inset-0 -z-10 h-full w-full" />
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[100px]" aria-hidden="true" />

      <div className="container-px w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* PORTRAIT — on mobile it leads (above text); on lg it sits right */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <Portrait y={portraitY} language={language} reduce={!!reduce} />
          </div>

          {/* TEXT */}
          <motion.div className="order-2 lg:order-1 lg:col-span-7" variants={container} initial="hidden" animate="show">
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
              className="display text-[3.25rem] leading-[0.98] text-ink text-glow sm:text-7xl lg:text-[5rem]"
            />

            <motion.p variants={item} className="mt-5 font-mono text-sm uppercase tracking-[0.18em] text-accent sm:text-base">
              {identity.role[language]}
            </motion.p>

            {/* recruiter hook — real, selectable text */}
            <motion.p variants={item} className="mt-6 max-w-xl text-xl font-medium leading-snug text-ink text-balance sm:text-2xl">
              {identity.heroHook[language]}
            </motion.p>

            <motion.p variants={item} className="mt-4 max-w-xl leading-relaxed text-ink-soft text-pretty">
              {identity.tagline[language]}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={() => go('#projects')} className="btn-glow group">
                {t('hero.viewWork')}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button onClick={() => go('#contact')} className="btn-glass">
                {t('hero.contact')}
              </button>
              <a href={identity.cv[language]} download className="btn-glass">
                <Download className="h-4 w-4" />
                {t('hero.downloadCV')}
              </a>
            </motion.div>

            {/* three worlds — her differentiator, all truthful */}
            <motion.ul variants={item} className="mt-8 hidden max-w-xl grid-cols-3 gap-2.5 sm:grid">
              {worlds.map((wd) => (
                <li
                  key={wd.key}
                  className="rounded-xl border border-hairline bg-surface/40 px-3.5 py-3 backdrop-blur"
                >
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    {wd.label[language]}
                  </span>
                  <span className="mt-1.5 block font-mono text-[11px] leading-snug text-ink-soft">
                    {wd.proof[language]}
                  </span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
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

/* ------------------------------------------------------------------ *
 * Portrait — circular photo disc with a cyan rim glow, a slowly
 * orbiting conic ring (the one surviving rotational motif, replacing
 * the removed gear), a 3D tilt, and three "world" feeder labels.
 * Carries id="hero-portrait" so the intro can dock onto its exact rect.
 * ------------------------------------------------------------------ */
function Portrait({
  y,
  language,
  reduce,
}: {
  y: import('framer-motion').MotionValue<number>
  language: 'fr' | 'en'
  reduce: boolean
}) {
  // ring kept thin via a radial mask that erases everything but the rim
  const ringMask =
    'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))'

  return (
    <div className="relative mx-auto aspect-square w-48 sm:w-60 lg:w-[22rem]">
      {/* texture + bloom behind the disc */}
      <div className="dot-grid pointer-events-none absolute inset-[-8%] -z-10 rounded-full opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-[6%] -z-10 rounded-full bg-accent/15 blur-2xl" aria-hidden="true" />

      <TiltCard className="h-full w-full rounded-full">
        <motion.div
          id="hero-portrait"
          style={{ y }}
          className="glow relative h-full w-full overflow-hidden rounded-full border border-accent/40 bg-surface-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={identity.photo}
            alt={identity.name}
            className="h-full w-full object-cover"
          />
          {/* subtle cyan duotone wash so it reads as a "signal node" */}
          <span aria-hidden="true" className="absolute inset-0 bg-accent/10 mix-blend-soft-light" />
          <span aria-hidden="true" className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </motion.div>

        {/* orbiting conic ring */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-[6px] rounded-full ${reduce ? '' : 'animate-spin-slow'}`}
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgb(var(--accent) / 0.65) 40deg, transparent 130deg, transparent 360deg)',
            WebkitMaskImage: ringMask,
            maskImage: ringMask,
          }}
        />
      </TiltCard>

      {/* three world feeder labels (lg only — the triad in the text column
          carries this on smaller screens) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <FeederLabel className="left-1/2 top-[-1.6rem] -translate-x-1/2" label={worlds[0].label[language]} />
        <FeederLabel className="bottom-[2%] left-[-2.5rem]" label={worlds[1].label[language]} />
        <FeederLabel className="bottom-[2%] right-[-2.5rem]" label={worlds[2].label[language]} />
      </div>
    </div>
  )
}

function FeederLabel({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`absolute inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft backdrop-blur ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-accent" />
      {label}
    </span>
  )
}
