'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Interactive "electronic network" canvas background:
 * floating nodes linked by thin lines that also connect to the cursor.
 * Theme-aware (reads --accent / --ink), DPR-scaled, paused when offscreen
 * or tab hidden. Under prefers-reduced-motion it draws a single static frame.
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
    let raf = 0
    let running = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // theme colors (re-read on theme change)
    let accent = [34, 211, 238]
    let ink = [231, 238, 243]
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      const parse = (v: string, fb: number[]) => {
        const p = v.trim().split(/\s+/).map(Number)
        return p.length === 3 && p.every((n) => !Number.isNaN(n)) ? p : fb
      }
      accent = parse(cs.getPropertyValue('--accent'), accent)
      ink = parse(cs.getPropertyValue('--ink'), ink)
    }
    readColors()
    const themeObserver = new MutationObserver(readColors)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    type P = { x: number; y: number; vx: number; vy: number }
    let particles: P[] = []
    let w = 0
    let h = 0
    const mouse = { x: -9999, y: -9999 }
    const LINK = 130
    const MOUSE_LINK = 170

    const resize = () => {
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // density scales with area, capped for perf; fewer on small screens
      const count = Math.min(Math.round((w * h) / 14000), w < 640 ? 36 : 84)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const aRGB = `${accent[0]}, ${accent[1]}, ${accent[2]}`
      const iRGB = `${ink[0]}, ${ink[1]}, ${ink[2]}`

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (running) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
        // node
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${iRGB}, 0.45)`
        ctx.fill()

        // links to other nodes
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${iRGB}, ${0.16 * (1 - d / LINK)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
        // link to cursor (accent — "current to the probe")
        const mdx = p.x - mouse.x
        const mdy = p.y - mouse.y
        const md = Math.hypot(mdx, mdy)
        if (md < MOUSE_LINK) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(${aRGB}, ${0.5 * (1 - md / MOUSE_LINK)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    const loop = () => {
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
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)

    if (reduce) {
      running = false
      draw() // single static frame
    } else {
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
        themeObserver.disconnect()
        document.removeEventListener('visibilitychange', onVis)
        window.removeEventListener('resize', resize)
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerleave', onLeave)
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
