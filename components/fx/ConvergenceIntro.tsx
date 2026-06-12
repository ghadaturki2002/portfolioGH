'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { identity, worlds } from '@/lib/content'
import { useLanguage } from '../LanguageProvider'

/* ------------------------------------------------------------------ *
 * ConvergenceIntro — one-time cinematic intro (replaces BootLoader).
 *
 * STORY: three labelled signal lanes (Mécanique / Électronique /
 * Logiciel) draw inward and FUSE into one cyan pulse at center; the
 * pulse springs open into Ghada's portrait (grayscale → colour scan),
 * which then DOCKS onto the hero's portrait (#hero-portrait) via a
 * measured-rect FLIP, and the overlay fades — a seamless hand-off into
 * the live hero. ~2.6s, skippable, session-gated, reduced-motion safe.
 * ------------------------------------------------------------------ */

const STORAGE_KEY = 'intro_seen'

type Phase = 'draw' | 'fuse' | 'reveal' | 'exit'

export default function ConvergenceIntro() {
  const reduce = useReducedMotion()
  const { language, t } = useLanguage()

  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)
  const [phase, setPhase] = useState<Phase>('draw')
  const [dock, setDock] = useState<{ x: number; y: number; scale: number } | null>(null)

  const discRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const timersRef = useRef<number[]>([])
  const exitingRef = useRef(false)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  // pointer parallax (back layers only — keeps the dock target precise)
  const pmx = useMotionValue(0)
  const pmy = useMotionValue(0)
  const sx = useSpring(pmx, { stiffness: 120, damping: 20 })
  const sy = useSpring(pmy, { stiffness: 120, damping: 20 })
  const gridX = useTransform(sx, [-1, 1], [8, -8])
  const gridY = useTransform(sy, [-1, 1], [8, -8])
  const laneX = useTransform(sx, [-1, 1], [18, -18])
  const laneY = useTransform(sy, [-1, 1], [18, -18])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }, [])

  /** Dock the disc onto the hero portrait, then fade out + persist. */
  const beginExit = useCallback(() => {
    if (exitingRef.current) return
    exitingRef.current = true
    clearTimers()

    const hero = document.getElementById('hero-portrait')
    const disc = discRef.current
    if (hero && disc) {
      const h = hero.getBoundingClientRect()
      const d = disc.getBoundingClientRect()
      if (d.width > 0 && h.width > 0) {
        const dCx = d.left + d.width / 2
        const dCy = d.top + d.height / 2
        const hCx = h.left + h.width / 2
        const hCy = h.top + h.height / 2
        setDock({ x: hCx - dCx, y: hCy - dCy, scale: h.width / d.width })
      }
    }
    setPhase('exit')

    // close after the dock travel completes → hero portrait is already
    // underneath at the same spot, so the fade is seamless.
    const closeId = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* private mode — worst case it replays next navigation */
      }
      setShow(false)
    }, reduce ? 260 : 720)
    timersRef.current.push(closeId)
  }, [clearTimers, reduce])

  // Decide on mount whether to show the intro (client only).
  useEffect(() => {
    setMounted(true)
    let seen = false
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      seen = false
    }
    if (!seen) {
      prevFocusRef.current = document.activeElement as HTMLElement | null
      setShow(true)
    }
  }, [])

  // Drive the phase timeline while visible.
  useEffect(() => {
    if (!show) return

    if (reduce) {
      // Reduced motion: skip lanes/fuse — show the colour disc + name, then dock-fade.
      setPhase('reveal')
      const id = window.setTimeout(beginExit, 420)
      timersRef.current.push(id)
      return clearTimers
    }

    const schedule = (ms: number, fn: () => void) => {
      const id = window.setTimeout(fn, ms)
      timersRef.current.push(id)
    }
    setPhase('draw')
    schedule(1300, () => setPhase('fuse'))
    schedule(1680, () => setPhase('reveal'))
    schedule(2420, beginExit)
    schedule(3600, beginExit) // hard safety cap

    return clearTimers
  }, [show, reduce, beginExit, clearTimers])

  // Lock body scroll while visible.
  useEffect(() => {
    if (!show) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [show])

  // Focus trap + restore.
  useEffect(() => {
    if (!show) return
    const id = window.setTimeout(() => skipRef.current?.focus(), 40)
    return () => {
      window.clearTimeout(id)
      prevFocusRef.current?.focus?.()
    }
  }, [show])

  // Skip via any key.
  useEffect(() => {
    if (!show) return
    const onKey = () => beginExit()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show, beginExit])

  // Pointer parallax (hover-capable, non-reduced only).
  useEffect(() => {
    if (!show || reduce) return
    if (typeof window === 'undefined' || !window.matchMedia) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        pmx.set((e.clientX / window.innerWidth) * 2 - 1)
        pmy.set((e.clientY / window.innerHeight) * 2 - 1)
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [show, reduce, pmx, pmy])

  if (!mounted) return null

  const revealed = phase === 'reveal' || phase === 'exit'
  const exiting = phase === 'exit'

  // disc animation target by phase
  const discAnimate = exiting
    ? dock
      ? { x: dock.x, y: dock.y, scale: dock.scale, opacity: 1 }
      : { opacity: 0, scale: 1 }
    : revealed
    ? { opacity: 1, scale: 1, x: 0, y: 0 }
    : { opacity: 0, scale: 0.25, x: 0, y: 0 }

  const discTransition = exiting
    ? { duration: reduce ? 0.2 : 0.66, ease: [0.16, 1, 0.3, 1] as const }
    : { type: 'spring' as const, stiffness: 120, damping: 14 }

  // labels at lane heads (top-left / top-center / top-right)
  const labelPos = [
    'left-[6%] top-[3%]',
    'left-1/2 top-[-1%] -translate-x-1/2',
    'right-[6%] top-[3%]',
  ]

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label={t('intro.loading')}
          onClick={beginExit}
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.18 : 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-bg"
        >
          {/* L0 — backdrop (cross-dissolves with the hero's grid) */}
          <motion.div
            aria-hidden="true"
            style={{ x: gridX, y: gridY }}
            animate={{ opacity: exiting ? 0 : 0.6 }}
            transition={{ duration: 0.4 }}
            className="grid-bg pointer-events-none absolute inset-[-4%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-[100px]"
          />

          {/* STAGE — lanes + fuse + disc, all centered */}
          <div className="relative aspect-square w-[min(86vw,30rem)]">
            {/* L1 — three converging lanes */}
            <motion.div
              aria-hidden="true"
              style={{ x: laneX, y: laneY }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
                {[
                  'M40 44 C 120 120, 162 160, 200 200',
                  'M200 26 C 200 110, 200 150, 200 200',
                  'M360 44 C 280 120, 238 160, 200 200',
                ].map((d, i) => (
                  <g key={d}>
                    <motion.path
                      d={d}
                      stroke="rgb(var(--accent))"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0.25 }}
                      animate={{ pathLength: 1, opacity: revealed ? 0.35 : 0.9 }}
                      transition={{ duration: 1.2, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </g>
                ))}
              </svg>

              {/* lane labels */}
              {worlds.map((wd, i) => (
                <motion.span
                  key={wd.key}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: revealed ? 0 : 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
                  className={`absolute inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft backdrop-blur ${labelPos[i]}`}
                >
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {wd.label[language]}
                </motion.span>
              ))}
            </motion.div>

            {/* convergence node (draw + fuse) */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <motion.span
                aria-hidden="true"
                className="glow block rounded-full bg-accent"
                animate={
                  phase === 'fuse'
                    ? { width: 22, height: 22, opacity: 1 }
                    : revealed
                    ? { width: 8, height: 8, opacity: 0 }
                    : { width: 10, height: 10, opacity: 1 }
                }
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* fuse flash ring */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <motion.span
                aria-hidden="true"
                className="block h-24 w-24 rounded-full border border-accent"
                initial={{ scale: 0, opacity: 0 }}
                animate={phase === 'fuse' ? { scale: [0, 1.8], opacity: [0.9, 0] } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            {/* L2 — portrait disc (springs open, then docks onto the hero) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                ref={discRef}
                className="glow relative h-[clamp(170px,42vw,260px)] w-[clamp(170px,42vw,260px)] overflow-hidden rounded-full border border-accent/40 bg-surface-2"
                initial={{ opacity: 0, scale: 0.25 }}
                animate={discAnimate}
                transition={discTransition}
                style={{ transformOrigin: 'center center' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src={identity.photo}
                  alt={identity.name}
                  className="h-full w-full object-cover"
                  initial={{ filter: 'grayscale(1) brightness(0.9)' }}
                  animate={{ filter: revealed ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.9)' }}
                  transition={{ duration: 0.6, delay: revealed && !exiting ? 0.15 : 0 }}
                />
                <span aria-hidden="true" className="scanlines absolute inset-0" />
                <span aria-hidden="true" className="absolute inset-0 bg-accent/10 mix-blend-soft-light" />

                {/* cyan scan-bar sweeping top→bottom during the reveal */}
                {!reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 h-[3px] bg-accent text-glow"
                    initial={{ top: '-6%', opacity: 0 }}
                    animate={revealed && !exiting ? { top: ['-6%', '106%'], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeInOut' }}
                  />
                )}
              </motion.div>
            </div>
          </div>

          {/* name + hook */}
          <motion.div
            className="relative mt-8 px-6 text-center"
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1
              className="display text-2xl text-ink text-glow sm:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
              transition={{ duration: 0.4 }}
            >
              {identity.name}
            </motion.h1>
            <motion.p
              className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-accent sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: revealed ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {identity.loaderHook[language]}
            </motion.p>
          </motion.div>

          {/* skip */}
          <button
            ref={skipRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              beginExit()
            }}
            className="absolute bottom-5 right-5 rounded-full border border-hairline bg-surface/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft backdrop-blur transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            {t('intro.skip')}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
