'use client'

/**
 * INTRO (environ 4 s, une seule fois par visiteur ; ?intro dans l'adresse la rejoue).
 * Le ciel s'allume, les étoiles du monogramme « GT » se relient comme une
 * constellation, le nom apparaît, une ligne de cote se déroule comme une barre de
 * chargement, puis le voile s'efface sur le ciel étoilé du hero.
 *
 * Tout le minutage est en CSS (globals.css) : l'intro se retire seule, même si le
 * JavaScript ne se charge pas. Le script inline de app/layout.tsx pose
 * data-intro="off" AVANT l'affichage pour les visiteurs qui l'ont déjà vue, pour
 * ?nointro, et en cas de prefers-reduced-motion : aucun flash.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageProvider'
import { identity } from '@/lib/content'
import { GT_LINES, GT_LINE_DELAYS, GT_NODES, seeded } from './fx/Constellation'

export const INTRO_KEY = 'gt-intro-v2'
const TOTAL_MS = 4200

/* étoiles de fond, identiques côté serveur et client */
const rand = seeded(20261114)
const SKY = Array.from({ length: 54 }, () => ({
  x: rand() * 1000,
  y: rand() * 600,
  r: 0.5 + rand() * 1.3,
  o: 0.25 + rand() * 0.6,
  d: Math.round(rand() * 1000),
}))

export default function Intro() {
  const { language, t } = useLanguage()
  const [mounted, setMounted] = useState(true)
  const [leaving, setLeaving] = useState(false)
  const timers = useRef<number[]>([])

  const cleanup = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    document.body.style.overflow = ''
  }, [])

  const skip = useCallback(() => {
    // le hero n'attend plus la fin de l'intro
    document.documentElement.style.setProperty('--intro-delay', '0ms')
    setLeaving(true)
    cleanup()
    timers.current.push(window.setTimeout(() => setMounted(false), 280))
  }, [cleanup])

  useEffect(() => {
    const root = document.documentElement
    if (root.dataset.intro !== 'on') {
      setMounted(false)
      return
    }
    try {
      window.localStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* stockage indisponible */
    }
    document.body.style.overflow = 'hidden'
    timers.current.push(
      window.setTimeout(() => {
        document.body.style.overflow = ''
        setMounted(false)
      }, TOTAL_MS + 60)
    )
    const onAny = () => skip()
    window.addEventListener('keydown', onAny)
    window.addEventListener('wheel', onAny, { passive: true })
    window.addEventListener('touchmove', onAny, { passive: true })
    return () => {
      window.removeEventListener('keydown', onAny)
      window.removeEventListener('wheel', onAny)
      window.removeEventListener('touchmove', onAny)
      cleanup()
    }
  }, [skip, cleanup])

  if (!mounted) return null

  // délai d'apparition de chaque étoile du monogramme = début du premier segment qui la touche
  const nodeDelay = GT_NODES.map((_, i) => {
    const ds = GT_LINES.map(([a, b], k) => (a === i || b === i ? GT_LINE_DELAYS[k] : Infinity))
    return Math.max(400, Math.min(...ds) - 80)
  })

  return (
    <div className={`intro no-print${leaving ? ' is-leaving' : ''}`} onClick={skip}>
      {/* ciel */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {SKY.map((s, i) => (
          <circle
            key={i}
            className="intro-star"
            cx={s.x.toFixed(1)}
            cy={s.y.toFixed(1)}
            r={s.r.toFixed(2)}
            fill="rgb(226 234 248)"
            style={{ '--d': `${s.d}ms`, '--o': s.o.toFixed(2) } as React.CSSProperties}
          />
        ))}
      </svg>

      {/* monogramme */}
      <div className="relative flex flex-col items-center px-6 text-center" aria-hidden="true">
        <svg viewBox="0 0 260 140" className="w-[min(64vw,300px)] overflow-visible">
          <g fill="none" stroke="rgb(140 180 255 / 0.75)" strokeWidth="1.1" strokeLinecap="round">
            {GT_LINES.map(([a, b], i) => (
              <line
                key={i}
                pathLength={1}
                className="intro-line"
                style={{ '--d': `${GT_LINE_DELAYS[i]}ms` } as React.CSSProperties}
                x1={GT_NODES[a][0]}
                y1={GT_NODES[a][1]}
                x2={GT_NODES[b][0]}
                y2={GT_NODES[b][1]}
              />
            ))}
          </g>
          {GT_NODES.map(([x, y, r], i) => (
            <g key={i} className="intro-node" style={{ '--d': `${nodeDelay[i]}ms` } as React.CSSProperties}>
              {r > 3 && <circle cx={x} cy={y} r={r * 3.2} fill="rgb(232 184 100 / 0.16)" />}
              <circle cx={x} cy={y} r={r} fill={r > 3 ? 'rgb(240 206 140)' : 'rgb(238 242 248)'} />
            </g>
          ))}
        </svg>
        <p
          className="intro-text mono mt-8 text-[0.95rem] font-medium uppercase tracking-[0.42em]"
          style={{ '--d': '2350ms' } as React.CSSProperties}
        >
          {identity.name}
        </p>
        <p
          className="intro-text label mt-3 text-[rgb(167_179_199)]"
          style={{ '--d': '2550ms' } as React.CSSProperties}
        >
          {identity.shortRole[language]}
        </p>
        {/* ligne de cote qui se déroule : la « barre de chargement » du plan */}
        <div className="intro-cote mt-7 flex w-[min(60vw,260px)] items-center text-[rgb(140_180_255/0.7)]">
          <span className="h-3 w-px bg-current" />
          <span className="intro-cote-line h-px flex-1 bg-current" />
          <span className="h-3 w-px bg-current" />
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          skip()
        }}
        aria-label={t('intro.skipLabel')}
        className="label absolute bottom-5 right-5 min-h-[44px] rounded-md border border-[rgb(50_64_96)] px-4 text-[rgb(238_242_248)] transition-colors hover:border-[rgb(167_179_199)]"
      >
        {t('intro.skip')}
      </button>
    </div>
  )
}
