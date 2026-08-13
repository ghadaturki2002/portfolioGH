'use client'

/**
 * HERO + INTRO "CALIBRATION" — one client tree, one LayoutGroup.
 *
 * The intro is a self-test: three channel chips snap in (MÉCANIQUE /
 * ÉLECTRONIQUE / LOGICIEL) while a counter ticks 00→100; at t≈2s the
 * chips FLY via layoutId to their final home — the chip-triplet
 * underline beneath her name — while the portrait performs its
 * REGISTRATION SNAP (three print plates sliding into register).
 * No cut, no flash: the overlay shares the page's --bg token.
 *
 * sessionStorage 'gt-intro-seen' gates replays; the footer triplet
 * clears it. Reduced motion: a single 400ms crossfade, chips pre-placed.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
} from 'framer-motion'
import { ArrowUpRight, Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { identity, worlds } from '@/lib/content'
import type { Channel } from '@/lib/channels'
import { Chip, CHIP_BG, TEXT_CH, EASE } from './ui/primitives'
import ParticleNetwork from './fx/ParticleNetwork'

const SEEN_KEY = 'gt-intro-seen'
type Stage = 'intro' | 'morph' | 'done'

const CHANNELS: Channel[] = ['mech', 'elec', 'soft']

export default function HeroCalibration() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()

  const [stage, setStage] = useState<Stage>('intro')
  const [chipsVisible, setChipsVisible] = useState(0) // 0..3 in the overlay
  const [fading, setFading] = useState(false) // words/counter fade at 1800

  const timersRef = useRef<number[]>([])
  const startedRef = useRef(false)
  const skipRef = useRef<HTMLButtonElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  /* ---------- counter 00 → 100 ---------- */
  const count = useMotionValue(0)
  const countText = useTransform(count, (v) => String(Math.min(100, Math.round(v))).padStart(2, '0'))

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }, [])
  const at = useCallback((ms: number, fn: () => void) => {
    timersRef.current.push(window.setTimeout(fn, ms))
  }, [])

  const persist = useCallback(() => {
    try {
      window.sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* private mode — intro may replay next load */
    }
  }, [])

  /** Jump the timeline to the morph (used by skip + natural end). */
  const beginMorph = useCallback(() => {
    clearTimers()
    persist()
    setFading(true)
    setChipsVisible(3)
    setStage('morph')
    timersRef.current.push(window.setTimeout(() => setStage('done'), 950))
  }, [clearTimers, persist])

  /* ---------- timeline ---------- */
  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    let seen = false
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      seen = false
    }

    if (seen) {
      setChipsVisible(3)
      setStage('done')
      return
    }

    if (reduce) {
      // static triplet + name, then a simple crossfade
      setChipsVisible(3)
      at(420, () => {
        persist()
        setStage('done')
      })
      return clearTimers
    }

    const controls = animate(count, 100, { duration: 1.6, ease: 'linear' })
    at(150, () => setChipsVisible(1))
    at(450, () => setChipsVisible(2))
    at(750, () => setChipsVisible(3))
    at(1800, () => setFading(true))
    at(2000, beginMorph)
    at(3600, beginMorph) // hard safety cap
    return () => {
      controls.stop()
      clearTimers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------- overlay: scroll lock + skip keys + focus ---------- */
  const overlayActive = stage === 'intro'
  useEffect(() => {
    if (!overlayActive) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = () => beginMorph()
    window.addEventListener('keydown', onKey)
    const fid = window.setTimeout(() => skipRef.current?.focus({ preventScroll: true }), 80)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(fid)
    }
  }, [overlayActive, beginMorph])

  // hand focus to the heading once the morph settles (screen-reader sanity)
  useEffect(() => {
    if (stage === 'done' && startedRef.current) headingRef.current?.focus?.({ preventScroll: true })
  }, [stage])

  /* ---------- portrait: registration snap + parallax + tilt ---------- */
  const heroRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  // snap offsets (plates B/C mis-registered until the morph)
  const snap = useMotionValue(stage === 'intro' && !reduce ? 1 : 0)
  useEffect(() => {
    if (stage !== 'intro') {
      if (reduce) {
        snap.set(0)
        return
      }
      const c = animate(snap, 0, { duration: 0.9, ease: EASE })
      return () => c.stop()
    }
  }, [stage, snap, reduce])

  // pointer parallax (hover-capable only)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 120, damping: 18 })
  const sy = useSpring(py, { stiffness: 120, damping: 18 })
  const rotateX = useTransform(sy, [-1, 1], [3, -3])
  const rotateY = useTransform(sx, [-1, 1], [-3, 3])

  // scroll-out re-separation (chromatic aberration as craft)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const sep = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 4])

  // plate offsets = snap(±6/±4) + parallax(±2) ± scroll separation
  const bX = useTransform([snap, sx, sep], ([s, p, sc]: number[]) => s * -6 + p * 2 - sc)
  const bY = useTransform([snap, sy], ([s, p]: number[]) => s * 4 + p * 2)
  const cX = useTransform([snap, sx, sep], ([s, p, sc]: number[]) => s * 6 - p * 2 + sc)
  const cY = useTransform([snap, sy], ([s, p]: number[]) => s * -4 - p * 2)

  const [canHover, setCanHover] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(mql.matches)
    update()
    mql.addEventListener?.('change', update)
    return () => mql.removeEventListener?.('change', update)
  }, [])

  const onPointerMove = (e: React.PointerEvent) => {
    if (!canHover || reduce) return
    const el = frameRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  const goTo = (href: string) => {
    const el = document.querySelector(href)
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 72,
        behavior: reduce ? 'auto' : 'smooth',
      })
  }

  /* ---------- copy ---------- */
  const headlineLines = identity.headline[language].split(/,\s*/) // manual 3-line break
  const heroIn = stage !== 'intro'
  const useFlight = !reduce // layoutId flight only when motion allowed

  const textContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  }
  const textItem = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  }

  return (
    <LayoutGroup>
      {/* ================= HERO (always mounted beneath the overlay) ================= */}
      <section ref={heroRef} id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 md:pt-28">
        {/* STARFIELD — drifting stars, trichrome links to the cursor */}
        <motion.div
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: heroIn ? 1 : 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          className="pointer-events-none absolute inset-0 z-0 [-webkit-mask-image:radial-gradient(120%_95%_at_50%_45%,#000_30%,transparent_100%)] [mask-image:radial-gradient(120%_95%_at_50%_45%,#000_30%,transparent_100%)]"
        >
          <ParticleNetwork className="absolute inset-0 h-full w-full" />
        </motion.div>

        <div className="container-px relative z-10 w-full pb-16">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* LEFT — cols 1–7 */}
            <motion.div
              className="order-2 lg:order-1 lg:col-span-7"
              variants={textContainer}
              initial="hidden"
              animate={heroIn ? 'show' : 'hidden'}
            >
              <motion.p variants={textItem} className="sys text-ink-soft">
                {identity.name} — {t('hero.eyebrow')}
              </motion.p>

              <motion.h1
                ref={headingRef}
                tabIndex={-1}
                variants={textItem}
                className="display mt-6 text-[clamp(38px,6vw,72px)] text-ink outline-none"
              >
                {headlineLines.map((line, i) => (
                  <span key={i} className="block text-balance">
                    {line}
                    {i < headlineLines.length - 1 ? ',' : ''}
                  </span>
                ))}
              </motion.h1>

              {/* chip-triplet underline — the chips LAND here from the loader */}
              <div className="mt-6 flex h-4 items-center gap-2" aria-hidden="true">
                {CHANNELS.map(
                  (c) =>
                    (heroIn || !useFlight) && (
                      <motion.span
                        key={`home-${c}`}
                        layoutId={useFlight ? `cal-chip-${c}` : undefined}
                        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                        className={[
                          'inline-block h-2.5 w-2.5 rounded-[3px]',
                          CHIP_BG[c],
                          c === 'elec' ? 'border border-ink/20 dark:border-transparent' : '',
                        ].join(' ')}
                      />
                    )
                )}
                <motion.span
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={heroIn ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                  className="ml-1 h-px w-24 origin-left bg-hairline"
                />
              </div>

              {/* availability proof tag */}
              <motion.div variants={textItem} className="mt-7">
                <span className="proof-tag glass border-0">
                  <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-elec-chip pulse-dot" aria-hidden="true" />
                  {identity.availability[language]} — {identity.location[language]}
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={textItem} className="mt-8 flex flex-wrap items-center gap-3">
                <button onClick={() => goTo('#projects')} className="btn-ink glow-mech group">
                  {t('hero.viewWork')}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <button onClick={() => goTo('#contact')} className="btn-glass glow-elec">
                  {t('hero.contact')}
                </button>
                <a href={identity.cv[language]} download className="btn-glass glow-soft">
                  <Download className="h-4 w-4" />
                  {t('hero.downloadCV')}
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT — cols 8–12: THE PORTRAIT (registration snap) */}
            <motion.div
              className="order-1 mx-auto w-[min(78vw,330px)] lg:order-2 lg:col-span-5 lg:w-full lg:max-w-[420px]"
              initial={reduce ? false : { opacity: 0 }}
              animate={heroIn ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <motion.div
                ref={frameRef}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                style={canHover && !reduce ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
                className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-hairline bg-surface-2 card-lift [isolation:isolate]"
              >
                {/* PLATE A — warm grayscale base */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={identity.photo}
                  alt={identity.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: 'grayscale(0.9) sepia(0.12) contrast(1.03)' }}
                />
                {/* PLATE B — gentian channel (screen in dark / multiply in light) */}
                <motion.div
                  aria-hidden="true"
                  style={{
                    x: bX,
                    y: bY,
                    backgroundImage: `url(${identity.photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'rgb(var(--mech-chip))',
                    backgroundBlendMode: 'multiply',
                  }}
                  className="absolute inset-0 opacity-[0.08] mix-blend-multiply dark:opacity-[0.45] dark:mix-blend-screen"
                />
                {/* PLATE C — magenta channel (md+ only, perf on phones) */}
                <motion.div
                  aria-hidden="true"
                  style={{
                    x: cX,
                    y: cY,
                    backgroundImage: `url(${identity.photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'rgb(var(--soft-chip))',
                    backgroundBlendMode: 'multiply',
                  }}
                  className="absolute inset-0 hidden opacity-[0.08] mix-blend-multiply dark:opacity-[0.45] dark:mix-blend-screen md:block"
                />
              </motion.div>

              {/* under-frame: code + clickable wayfinding chips */}
              <div className="mt-4 flex items-center justify-between">
                <span className="sys text-ink-soft">GT·2026</span>
                <div className="flex items-center gap-3">
                  {worlds.map((w) => (
                    <span key={w.key} className="dh relative" style={{ '--dh-delay': '350ms' } as React.CSSProperties}>
                      <button
                        onClick={() => goTo('#projects')}
                        aria-label={`${w.label[language]} — ${t('nav.projects')}`}
                        className="flex items-center justify-center rounded-[5px] p-1.5 transition-colors hover:bg-surface-2 focus-visible:outline focus-visible:outline-2"
                      >
                        <Chip channel={w.key} />
                      </button>
                      <span className="dh-panel glass absolute bottom-full right-0 z-20 mb-2 w-max max-w-[230px] rounded-[14px] px-3.5 py-2.5">
                        <span className={`sys block ${TEXT_CH[w.key]}`}>{w.label[language]}</span>
                        <span className="mt-1 block font-mono text-[13px] text-ink-soft">{w.proof[language]}</span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= INTRO OVERLAY (same tree, same --bg) ================= */}
      <AnimatePresence>
        {stage !== 'done' && (
          <motion.div
            role="status"
            aria-label={t('intro.loading')}
            onClick={beginMorph}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.45, ease: EASE }}
            style={stage === 'morph' ? { pointerEvents: 'none' } : undefined}
            className="fixed inset-0 z-[90] bg-bg"
          >
            {/* calibration stage */}
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex items-start gap-10 sm:gap-16">
                {CHANNELS.map((c, i) => (
                  <div key={c} className="flex w-24 flex-col items-center gap-4 sm:w-32">
                    {stage === 'intro' && chipsVisible > i && (
                      <motion.span
                        layoutId={useFlight ? `cal-chip-${c}` : undefined}
                        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                        className={[
                          'inline-block h-3.5 w-3.5 rounded-[4px]',
                          CHIP_BG[c],
                          c === 'elec' ? 'border border-ink/20 dark:border-transparent' : '',
                        ].join(' ')}
                      />
                    )}
                    {/* word stamp */}
                    <motion.span
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{
                        opacity: chipsVisible > i && !fading ? 1 : 0,
                        y: chipsVisible > i ? 0 : 6,
                      }}
                      transition={{ duration: 0.18 }}
                      className={`sys text-center ${TEXT_CH[c]}`}
                    >
                      {worlds[i].label[language]}
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>

            {/* counter — bottom left */}
            <motion.div
              animate={{ opacity: fading ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="sys absolute bottom-6 left-6 tabular-nums text-ink-soft"
              aria-hidden="true"
            >
              <motion.span>{countText}</motion.span>
              <span> / 100</span>
            </motion.div>

            {/* intro line — bottom center */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: fading ? 0 : chipsVisible >= 3 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="sys absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ink-soft sm:block"
              aria-hidden="true"
            >
              {identity.introLine[language]}
            </motion.p>

            {/* skip — bottom right */}
            <motion.button
              ref={skipRef}
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 'intro' ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              onClick={(e) => {
                e.stopPropagation()
                beginMorph()
              }}
              className="btn-glass absolute bottom-5 right-5 px-4 py-1.5 font-mono text-[13px] uppercase tracking-[0.08em]"
            >
              {t('intro.skip')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  )
}
