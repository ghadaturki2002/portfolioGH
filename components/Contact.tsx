'use client'

/**
 * 08 · THE HANDOFF — contact as a calibration surface.
 * No form (intentional): one mono email button (click = copy, the site's
 * single strongest glow), glass action row, .sys fact rows, availability
 * proof tag. Background: a cursor-reactive calibration dot-grid canvas —
 * dots near the pointer tint toward the channel of their vertical third
 * (mech | elec | soft) and ease back over ~300ms.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Linkedin, Download, Mail } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { identity } from '@/lib/content'
import { ChipTriplet, DelayedHover, ProofTag, Reveal, GLOW_CH } from './ui/primitives'

type RGB = [number, number, number]

const GAP = 24 // px between dots
const DOT = 2 // dot size
const RADIUS = 140 // cursor influence radius
const DECAY_MS = 300 // tint ease-back duration

export default function Contact() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()

  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<number | null>(null)

  /* ---------- email copy (clipboard → mailto fallback) ---------- */
  const copyEmail = useCallback(() => {
    const fallback = () => {
      window.location.href = `mailto:${identity.email}`
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(identity.email)
          .then(() => {
            setCopied(true)
            if (copyTimer.current !== null) window.clearTimeout(copyTimer.current)
            copyTimer.current = window.setTimeout(() => setCopied(false), 1500)
          })
          .catch(fallback)
      } else {
        fallback()
      }
    } catch {
      fallback()
    }
  }, [])

  useEffect(() => {
    return () => {
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current)
    }
  }, [])

  /* ---------- calibration dot-grid canvas ---------- */
  useEffect(() => {
    const host = sectionRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const coarse =
      typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches
    const isStatic = !!reduce || coarse

    let width = 0
    let height = 0
    let dpr = 1
    let cols = 0
    let rows = 0
    let intensity = new Float32Array(0)
    let raf = 0
    let running = false
    let visible = true
    let last = 0
    const mouse = { x: -1e4, y: -1e4, active: false }

    const tokens: { ink: RGB; ch: RGB[] } = {
      ink: [0, 0, 0],
      ch: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    }
    const readToken = (name: string): RGB => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
      const p = raw.split(/\s+/).map(Number)
      return [p[0] || 0, p[1] || 0, p[2] || 0]
    }
    const readTokens = () => {
      tokens.ink = readToken('--ink')
      tokens.ch = [readToken('--mech'), readToken('--elec'), readToken('--soft')]
    }

    // base grid pre-rendered offscreen; redrawn on resize / theme change
    const base = document.createElement('canvas')

    const drawBase = () => {
      const bctx = base.getContext('2d')
      if (!bctx) return
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      bctx.clearRect(0, 0, width, height)
      const [r, g, b] = tokens.ink
      bctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.1)`
      for (let row = 0; row < rows; row++) {
        const y = row * GAP + GAP / 2
        for (let col = 0; col < cols; col++) {
          bctx.fillRect(col * GAP + GAP / 2 - DOT / 2, y - DOT / 2, DOT, DOT)
        }
      }
    }

    const paintBase = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(base, 0, 0, width, height)
    }

    const frame = (now: number) => {
      raf = 0
      const dt = Math.min(64, last === 0 ? 16 : now - last)
      last = now
      paintBase()

      const decay = dt / DECAY_MS
      const r2 = RADIUS * RADIUS
      const [ir, ig, ib] = tokens.ink
      let anyActive = false

      for (let row = 0; row < rows; row++) {
        const y = row * GAP + GAP / 2
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col
          let v = intensity[i] > 0 ? Math.max(0, intensity[i] - decay) : 0
          const x = col * GAP + GAP / 2
          if (mouse.active) {
            const dx = x - mouse.x
            const dy = y - mouse.y
            const d2 = dx * dx + dy * dy
            if (d2 < r2) {
              const target = 1 - Math.sqrt(d2) / RADIUS
              if (target > v) v = target
            }
          }
          intensity[i] = v
          if (v > 0.02) {
            anyActive = true
            const third = x < width / 3 ? 0 : x < (2 * width) / 3 ? 1 : 2
            const hue = tokens.ch[third]
            const mr = Math.round(ir + (hue[0] - ir) * v)
            const mg = Math.round(ig + (hue[1] - ig) * v)
            const mb = Math.round(ib + (hue[2] - ib) * v)
            ctx.fillStyle = `rgba(${mr}, ${mg}, ${mb}, ${(0.1 + 0.6 * v).toFixed(3)})`
            ctx.fillRect(x - DOT / 2, y - DOT / 2, DOT, DOT)
          }
        }
      }

      if (visible && (mouse.active || anyActive)) {
        raf = requestAnimationFrame(frame)
      } else {
        running = false
        last = 0
      }
    }

    const start = () => {
      if (isStatic || running || !visible) return
      running = true
      last = 0
      raf = requestAnimationFrame(frame)
    }

    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      running = false
      last = 0
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      base.width = width * dpr
      base.height = height * dpr
      cols = Math.ceil(width / GAP)
      rows = Math.ceil(height / GAP)
      intensity = new Float32Array(cols * rows)
      drawBase()
      paintBase() // static frame; the rAF loop overwrites it when active
    }

    readTokens()
    resize()

    // theme switch (light/dark class on <html>) → re-read tokens, repaint
    const mo = new MutationObserver(() => {
      readTokens()
      drawBase()
      paintBase()
      start()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    let ro: ResizeObserver | null = null
    const onWindowResize = () => resize()
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => resize())
      ro.observe(host)
    } else {
      window.addEventListener('resize', onWindowResize)
    }

    let io: IntersectionObserver | null = null
    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
      start()
    }
    const onPointerLeave = () => {
      mouse.active = false
      start() // let the tint decay out
    }

    if (!isStatic) {
      io = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? false
        if (!visible) stop()
        else start()
      })
      io.observe(host)
      host.addEventListener('pointermove', onPointerMove)
      host.addEventListener('pointerleave', onPointerLeave)
    }

    return () => {
      stop()
      mo.disconnect()
      if (ro) ro.disconnect()
      else window.removeEventListener('resize', onWindowResize)
      if (io) io.disconnect()
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reduce])

  const telHref = `tel:+${identity.phone.replace(/[^0-9]/g, '')}`

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section flex min-h-[80svh] items-center"
    >
      {/* calibration dot-grid — the only cursor-reactive ambient surface */}
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full" />

      <div className="container-px w-full">
        {/* custom header — kicker row + giant headline */}
        <Reveal>
          <p className="sys flex items-center gap-2.5 text-ink-soft">
            <ChipTriplet size="sm" />
            <span>08 · {t('contact.kicker')}</span>
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display mt-4 text-[clamp(56px,10vw,120px)] text-ink">
            {t('contact.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-xl text-lg text-ink-soft text-pretty">{t('contact.intro')}</p>
        </Reveal>

        {/* centerpiece glass card */}
        <Reveal delay={0.18}>
          <div className="glass card-lift mt-10 max-w-2xl rounded-[24px] p-6 sm:p-8">
            {/* email copy — carries the viewport's ONE glow (hover/focus only) */}
            <DelayedHover
              delay={350}
              panelClassName="absolute bottom-full left-0 z-10 mb-3"
              trigger={
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={`${identity.email} — ${t('contact.copy')}`}
                  className={`-mx-2 break-all rounded-xl px-2 py-1.5 text-left font-mono text-lg text-ink transition-shadow duration-200 sm:text-2xl ${GLOW_CH['elec']}`}
                >
                  {identity.email}
                </button>
              }
              panel={
                <span className="glass sys inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-ink" role="status">
                  {copied ? t('contact.copied') : t('contact.copy')}
                </span>
              }
            />

            {/* glass action row */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
              <a href={identity.cv[language]} download className="btn-glass">
                <Download className="h-4 w-4" aria-hidden="true" />
                {t('hero.downloadCV')}
              </a>
              <a href={`mailto:${identity.email}`} className="btn-glass">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {t('contact.emailLabel')}
              </a>
            </div>

            {/* fact rows behind hairline dividers */}
            <dl className="mt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-hairline py-3">
                <dt className="sys text-ink-soft">{t('contact.phoneLabel')}</dt>
                <dd>
                  <a href={telHref} className="sys link-underline text-ink">
                    {identity.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-hairline py-3">
                <dt className="sys text-ink-soft">{t('contact.locationLabel')}</dt>
                <dd className="sys text-ink">{identity.location[language]}</dd>
              </div>
            </dl>

            {/* availability — verifiable fact, elec channel */}
            <div className="border-t border-hairline pt-5">
              <ProofTag channel="elec">{identity.availability[language]}</ProofTag>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
