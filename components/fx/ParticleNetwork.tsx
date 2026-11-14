'use client'

import { useEffect, useRef } from 'react'

/**
 * CIEL ÉTOILÉ du hero (canvas 2D).
 *
 * Trois plans de profondeur qui dérivent lentement, quelques étoiles brillantes
 * avec un halo, des liaisons très fines entre voisines ; le curseur agit comme une
 * sonde et relie les étoiles proches dans la couleur de leur discipline
 * (bleu cyanotype, aurore, nébuleuse).
 *
 * Couleurs lues dans les tokens CSS (relues au changement de thème), résolution
 * plafonnée à 2×, pause hors écran et onglet masqué. Avec prefers-reduced-motion :
 * une seule image fixe.
 */
export default function ParticleNetwork({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const parent = canvas.parentElement as HTMLElement | null
    if (!parent) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let star = [226, 234, 248]
    let glow = [232, 184, 100]
    let channels = [
      [140, 180, 255],
      [94, 214, 180],
      [185, 162, 255],
    ]
    let dark = true
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      const parse = (name: string, fb: number[]) => {
        const p = cs.getPropertyValue(name).trim().split(/[\s,]+/).map(Number)
        return p.length === 3 && p.every((n) => !Number.isNaN(n)) ? p : fb
      }
      star = parse('--star', star)
      glow = parse('--accent-fill', glow)
      channels = [parse('--mech-chip', channels[0]), parse('--elec-chip', channels[1]), parse('--soft-chip', channels[2])]
      dark = document.documentElement.classList.contains('dark')
    }
    readColors()

    type Star = { x: number; y: number; vx: number; vy: number; r: number; z: number; ch: number; phase: number; speed: number; bright: boolean }
    let stars: Star[] = []
    let w = 0
    let h = 0
    let tick = 0
    const mouse = { x: -9999, y: -9999 }
    const LINK = 118
    const PROBE = 170

    const build = () => {
      w = parent.clientWidth
      h = parent.clientHeight
      if (!w || !h) return
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(Math.round((w * h) / 9500), w < 640 ? 46 : 120)
      stars = Array.from({ length: count }, (_, i) => {
        // z : 0 = lointain, 1 = moyen, 2 = proche
        const z = i % 7 === 0 ? 2 : i % 3 === 0 ? 1 : 0
        const speed = [0.05, 0.1, 0.17][z]
        const a = Math.random() * Math.PI * 2
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          r: [0.55, 0.95, 1.45][z] + Math.random() * 0.45,
          z,
          ch: i % 3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.2,
          bright: i % 19 === 0,
        }
      })
    }

    const rgba = (c: number[], a: number) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h)
      const dotA = dark ? 0.85 : 0.5
      const lineA = dark ? 0.12 : 0.09

      for (let i = 0; i < stars.length; i++) {
        const p = stars[i]
        if (animate) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -10) p.x = w + 10
          else if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10
          else if (p.y > h + 10) p.y = -10
        }
        const tw = 0.6 + 0.4 * Math.sin(tick * 0.012 * p.speed + p.phase)
        const depthA = [0.45, 0.7, 1][p.z]

        // halo des étoiles brillantes
        if (p.bright && dark) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 9)
          g.addColorStop(0, rgba(glow, 0.32 * tw))
          g.addColorStop(1, rgba(glow, 0))
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(p.x, p.y, 9, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.bright ? p.r + 0.5 : p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.bright && dark ? rgba(glow, 0.95) : rgba(star, dotA * depthA * tw)
        ctx.fill()

        // liaisons entre voisines (plans moyen et proche seulement)
        if (p.z > 0) {
          for (let j = i + 1; j < stars.length; j++) {
            const q = stars[j]
            if (q.z === 0) continue
            const d = Math.hypot(p.x - q.x, p.y - q.y)
            if (d < LINK) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(q.x, q.y)
              ctx.strokeStyle = rgba(star, lineA * (1 - d / LINK))
              ctx.lineWidth = 0.8
              ctx.stroke()
            }
          }
        }

        // sonde du curseur
        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (md < PROBE && p.z > 0) {
          const c = channels[p.ch]
          const f = 1 - md / PROBE
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = rgba(c, 0.5 * f)
          ctx.lineWidth = 0.9
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r + 0.9 * f, 0, Math.PI * 2)
          ctx.fillStyle = rgba(c, 0.85 * f)
          ctx.fill()
        }
      }
    }

    let raf = 0
    let visible = true
    const loop = () => {
      tick++
      draw(true)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!raf && visible && !document.hidden && !reduce) raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    build()
    draw(false)

    const ro = new ResizeObserver(() => {
      build()
      draw(false)
    })
    ro.observe(parent)
    const mo = new MutationObserver(() => {
      readColors()
      if (reduce) draw(false)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    if (reduce) {
      return () => {
        ro.disconnect()
        mo.disconnect()
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(parent)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    start()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
