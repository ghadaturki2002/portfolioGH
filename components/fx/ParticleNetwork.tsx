'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Starfield / "constellation" canvas background for the hero.
 *
 * Drifting stars linked by hairlines; the cursor acts as a probe and pulls
 * trichrome links (gentian / amber / magenta) out of the nearby stars.
 * Reads the theme tokens (--ink + the three channel chips), DPR-scaled,
 * paused when offscreen or when the tab is hidden. Under
 * prefers-reduced-motion it draws a single static frame.
 */
export default function ParticleNetwork({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement as HTMLElement
    if (!parent) return
    let raf = 0
    let running = true
    let tick = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    /* ---------- theme colors (re-read when the theme class flips) ---------- */
    let ink = [244, 239, 230]
    let channels = [
      [94, 142, 247], // mech — gentian
      [242, 163, 60], // elec — amber
      [226, 86, 158], // soft — magenta
    ]
    let dark = true
    const readColors = () => {
      const root = document.documentElement
      const cs = getComputedStyle(root)
      const parse = (name: string, fb: number[]) => {
        const p = cs.getPropertyValue(name).trim().split(/[\s,]+/).map(Number)
        return p.length === 3 && p.every((n) => !Number.isNaN(n)) ? p : fb
      }
      ink = parse('--ink', ink)
      channels = [
        parse('--mech-chip', channels[0]),
        parse('--elec-chip', channels[1]),
        parse('--soft-chip', channels[2]),
      ]
      dark = root.classList.contains('dark')
    }
    readColors()
    const themeObserver = new MutationObserver(readColors)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    type Star = { x: number; y: number; vx: number; vy: number; r: number; ch: number; phase: number }
    let stars: Star[] = []
    let w = 0
    let h = 0
    const mouse = { x: -9999, y: -9999 }
    const LINK = 130
    const MOUSE_LINK = 170

    const resize = () => {
      w = parent.clientWidth
      h = parent.clientHeight
      if (!w || !h) return
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // density scales with area, capped for perf; fewer on small screens
      const count = Math.min(Math.round((w * h) / 14000), w < 640 ? 34 : 80)
      stars = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: 0.9 + Math.random() * 1.1,
        ch: i % 3,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const iRGB = `${ink[0]}, ${ink[1]}, ${ink[2]}`
      // the bone-paper light theme needs less ink than the bitumen dark one
      const dotA = dark ? 0.5 : 0.34
      const lineA = dark ? 0.15 : 0.1

      for (let i = 0; i < stars.length; i++) {
        const p = stars[i]
        if (running) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }

        // star — slow twinkle
        const twinkle = 0.65 + 0.35 * Math.sin(tick * 0.02 + p.phase)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${iRGB}, ${dotA * twinkle})`
        ctx.fill()

        // hairlines between neighbouring stars
        for (let j = i + 1; j < stars.length; j++) {
          const q = stars[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${iRGB}, ${lineA * (1 - d / LINK)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        // link to the cursor — trichrome, one channel per star
        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (md < MOUSE_LINK) {
          const c = channels[p.ch]
          const fade = 1 - md / MOUSE_LINK
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${0.55 * fade})`
          ctx.lineWidth = 1
          ctx.stroke()
          // the star itself lights up in its channel colour
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r + 0.7 * fade, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${0.75 * fade})`
          ctx.fill()
        }
      }
    }

    const loop = () => {
      tick++
      draw()
      raf = requestAnimationFrame(loop)
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

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)

    if (reduce) {
      running = false
      draw() // single static frame
      return () => {
        ro.disconnect()
        themeObserver.disconnect()
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerleave', onLeave)
      }
    }

    // pause when offscreen / tab hidden
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          if (!raf) loop()
        } else {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 }
    )
    io.observe(parent)
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (!raf) {
        loop()
      }
    }
    document.addEventListener('visibilitychange', onVis)
    loop()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
