'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from './LanguageProvider'
import Reveal from './ui/Reveal'
import PCBTraces from './fx/PCBTraces'
import { convergence } from '@/lib/content'

/* ------------------------------------------------------------------ *
 * ConvergenceScroll — a scroll-driven "three worlds → one signal"
 * story that pays off the intro. On lg+ it pins (sticky) and the three
 * acts (Mécanique / Électronique / Logiciel) cross-fade as you scroll,
 * then their accent lines merge into one signal. On mobile / reduced
 * motion it collapses to three stacked cards (no scroll-jack).
 * ------------------------------------------------------------------ */
export default function ConvergenceScroll() {
  const { language } = useLanguage()
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  })

  // per-act opacity + small lift (hooks run unconditionally)
  const a0 = useTransform(scrollYProgress, [0.0, 0.06, 0.28, 0.34], [1, 1, 1, 0])
  const a1 = useTransform(scrollYProgress, [0.3, 0.36, 0.6, 0.66], [0, 1, 1, 0])
  const a2 = useTransform(scrollYProgress, [0.62, 0.68, 0.9, 1], [0, 1, 1, 1])
  const y0 = useTransform(scrollYProgress, [0, 0.34], [0, -40])
  const y1 = useTransform(scrollYProgress, [0.3, 0.66], [40, -40])
  const y2 = useTransform(scrollYProgress, [0.62, 1], [40, 0])
  const actOpacity = [a0, a1, a2]
  const actY = [y0, y1, y2]

  // motif drawing tied to scroll
  const draw0 = useTransform(scrollYProgress, [0.0, 0.26], [0, 1])
  const draw2 = useTransform(scrollYProgress, [0.66, 0.92], [0, 1])

  // background parallax (slower than foreground)
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60])

  // convergence payoff — one merged signal line growing near the end
  const mergeScale = useTransform(scrollYProgress, [0.82, 0.98], [0, 1])
  const mergeOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1])
  const outroOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])

  // 3-dot rail
  const dot0 = useTransform(scrollYProgress, [0, 0.33], [1, 0.3])
  const dot1 = useTransform(scrollYProgress, [0.33, 0.4, 0.6, 0.66], [0.3, 1, 1, 0.3])
  const dot2 = useTransform(scrollYProgress, [0.66, 0.72], [0.3, 1])
  const dots = [dot0, dot1, dot2]

  const acts = convergence.acts

  // ---- Reduced motion → stacked cards only --------------------------
  if (reduce) {
    return <Stacked language={language} />
  }

  return (
    <>
      {/* ===== Desktop: sticky scroll story ===== */}
      <div ref={wrapRef} className="relative hidden h-[260vh] lg:block">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          {/* background */}
          <motion.div style={{ y: bgY }} className="grid-bg pointer-events-none absolute inset-[-6%] opacity-30" aria-hidden="true" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" aria-hidden="true" />

          <div className="container-px relative w-full">
            <span className="kicker">{convergence.kicker[language]}</span>
            <h2 className="display mt-4 max-w-3xl text-4xl text-ink sm:text-5xl lg:text-[3.25rem]">
              {convergence.title[language]}
            </h2>

            {/* 3-dot progress rail */}
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-3 xl:flex" aria-hidden="true">
              {dots.map((o, i) => (
                <motion.span key={i} style={{ opacity: o }} className="h-2.5 w-2.5 rounded-full bg-accent" />
              ))}
            </div>

            {/* act stage */}
            <div className="relative mt-10 h-[20rem] sm:h-[22rem]">
              {acts.map((act, i) => (
                <motion.div
                  key={act.key}
                  style={{ opacity: actOpacity[i], y: actY[i] }}
                  className="absolute inset-0 grid items-center gap-8 lg:grid-cols-2"
                >
                  {/* text side */}
                  <div>
                    <span className="font-mono text-sm uppercase tracking-[0.18em] text-accent">
                      {`0${i + 1} — ${act.label[language]}`}
                    </span>
                    <p className="mt-4 max-w-md text-2xl font-medium leading-snug text-ink text-balance sm:text-3xl">
                      {act.line[language]}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {act.tags.map((tg) => (
                        <li key={tg} className="chip">{tg}</li>
                      ))}
                    </ul>
                  </div>

                  {/* motif side */}
                  <div className="relative hidden h-full items-center justify-center lg:flex">
                    {i === 0 && <BracketMotif draw={draw0} />}
                    {i === 1 && (
                      <div className="relative h-48 w-full max-w-md">
                        <PCBTraces className="absolute inset-0" />
                      </div>
                    )}
                    {i === 2 && <PredictionMotif draw={draw2} />}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* convergence payoff: one merged signal line + outro */}
            <div className="relative mt-4 flex flex-col items-center">
              <motion.span
                aria-hidden="true"
                style={{ scaleY: mergeScale, opacity: mergeOpacity }}
                className="glow h-16 w-px origin-top bg-accent"
              />
              <motion.p
                style={{ opacity: outroOpacity }}
                className="mt-5 max-w-xl text-center text-pretty leading-relaxed text-ink-soft"
              >
                {convergence.outro[language]}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile fallback ===== */}
      <div className="lg:hidden">
        <Stacked language={language} />
      </div>
    </>
  )
}

/* Stacked, static layout — used on mobile and under reduced motion. */
function Stacked({ language }: { language: 'fr' | 'en' }) {
  return (
    <section className="section">
      <div className="container-px">
        <span className="kicker">{convergence.kicker[language]}</span>
        <h2 className="display mt-4 max-w-3xl text-4xl text-ink sm:text-5xl">
          {convergence.title[language]}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {convergence.acts.map((act, i) => (
            <Reveal key={act.key} delay={i * 0.08}>
              <div className="card h-full p-6 hover:border-accent/40">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  {`0${i + 1} — ${act.label[language]}`}
                </span>
                <p className="mt-3 text-lg font-medium leading-snug text-ink text-pretty">
                  {act.line[language]}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {act.tags.map((tg) => (
                    <li key={tg} className="chip">{tg}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-pretty leading-relaxed text-ink-soft">
            {convergence.outro[language]}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* Act 1 — an assembly/bracket outline that draws in (no literal gear). */
function BracketMotif({ draw }: { draw: import('framer-motion').MotionValue<number> }) {
  return (
    <svg viewBox="0 0 220 180" className="h-48 w-full max-w-md text-accent/80" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round">
        <motion.rect x="40" y="40" width="140" height="100" rx="10" style={{ pathLength: draw }} />
        <motion.path d="M70 40 V20 H150 V40" style={{ pathLength: draw }} />
        <motion.line x1="40" y1="90" x2="180" y2="90" style={{ pathLength: draw }} opacity={0.5} />
      </g>
      <g fill="currentColor">
        <circle cx="70" cy="90" r="3" />
        <circle cx="110" cy="90" r="3" />
        <circle cx="150" cy="90" r="3" />
      </g>
    </svg>
  )
}

/* Act 3 — a noisy signal resolving into a clean predicted curve. */
function PredictionMotif({ draw }: { draw: import('framer-motion').MotionValue<number> }) {
  return (
    <svg viewBox="0 0 240 140" className="h-48 w-full max-w-md text-accent" fill="none" aria-hidden="true">
      {/* noisy raw signal */}
      <polyline
        points="10,90 30,70 45,100 60,60 80,95 100,55 120,88 140,50 160,92 180,48 200,80 230,40"
        stroke="rgb(var(--ink) / 0.25)"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      {/* clean prediction drawn in */}
      <motion.path
        d="M10 95 C 60 80, 100 60, 140 50 S 210 30, 232 26"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        style={{ pathLength: draw }}
      />
      <motion.circle cx="232" cy="26" r="3.5" fill="currentColor" style={{ opacity: draw }} />
    </svg>
  )
}
