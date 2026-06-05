'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'framer-motion'
import { useLanguage } from '../LanguageProvider'
import Gear from './Gear'

/**
 * The mechatronics thesis as an exploded engineering assembly:
 * MECHANICAL (gear) + ELECTRONICS (PCB) + CONTROL (MCU) integrate into the
 * core (profile photo). Layers assemble on mount, then drift apart as the
 * hero scrolls — a scroll-linked exploded view. Honors reduced motion.
 *
 * Layer annotations are drawn from the About copy ("combine mécanique,
 * électronique et intelligence artificielle").
 */
export default function ExplodedAssembly() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // explode offsets (px) — layers separate along the assembly axis on scroll
  const yMech = useTransform(scrollYProgress, [0, 1], [0, -110])
  const yElec = useTransform(scrollYProgress, [0, 1], [0, -45])
  const yCtrl = useTransform(scrollYProgress, [0, 1], [0, 70])
  const axisOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 0.7, 0.7])

  const { language } = useLanguage()
  const L = (fr: string, en: string) => (language === 'fr' ? fr : en)

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.18, delayChildren: reduce ? 0 : 0.2 } },
  }
  const layer = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.85, y: reduce ? 0 : 40 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease: 'easeOut' } },
  }

  const motionY = (mv: MotionValue<number>) => (reduce ? undefined : mv)

  return (
    <div ref={ref} className="relative mx-auto flex h-[420px] w-full max-w-[360px] items-center justify-center md:h-[480px]">
      {/* assembly axis (exploded-view alignment line) */}
      <motion.span
        className="pointer-events-none absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 border-l border-dashed border-accent"
        style={{ opacity: reduce ? 0.5 : axisOpacity }}
        aria-hidden="true"
      />

      <motion.div
        className="relative flex flex-col items-center"
        variants={container}
        initial="hidden"
        animate="show"
        aria-hidden="true"
      >
        {/* MECHANICAL — gear */}
        <motion.div variants={layer} style={{ y: motionY(yMech) }} className="relative z-30">
          <div className="corner-ticks relative flex h-24 w-24 items-center justify-center border border-hairline bg-paper/70 text-ink-soft md:h-28 md:w-28">
            <Gear teeth={12} size={84} speed={28} className="text-ink" />
          </div>
          <LayerTag text={L('MÉCANIQUE', 'MECHANICAL')} ref-id="M-01" />
        </motion.div>

        {/* ELECTRONICS — PCB plate */}
        <motion.div variants={layer} style={{ y: motionY(yElec) }} className="relative z-20 -mt-2">
          <div className="corner-ticks relative h-20 w-44 overflow-hidden border border-hairline bg-paper/70 md:h-24 md:w-52">
            <PcbPlate />
          </div>
          <LayerTag text={L('ÉLECTRONIQUE', 'ELECTRONICS')} ref-id="E-02" />
        </motion.div>

        {/* CORE — the integrated result (photo) */}
        <motion.div variants={layer} className="relative z-10 -mt-2">
          <div className="relative h-28 w-28 overflow-hidden border-[1.5px] border-ink bg-paper-2 md:h-32 md:w-32">
            {/* TODO: source photo is low-resolution; replace /ghada-turki-photo.jpg with a higher-res image if available */}
            <img
              src="/ghada-turki-photo.jpg"
              alt="Ghada Turki"
              className="h-full w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 mix-blend-multiply dark:mix-blend-screen" />
          </div>
          <LayerTag text={L('MÉCATRONIQUE', 'MECHATRONICS')} ref-id="∑" accent />
        </motion.div>

        {/* CONTROL — microcontroller */}
        <motion.div variants={layer} style={{ y: motionY(yCtrl) }} className="relative z-0 -mt-2">
          <div className="corner-ticks relative flex h-16 w-32 items-center justify-center border border-hairline bg-paper/70 md:h-20 md:w-36">
            <McuChip />
          </div>
          <LayerTag text={L('CONTRÔLE · IA', 'CONTROL · AI')} ref-id="C-03" />
        </motion.div>
      </motion.div>
    </div>
  )
}

function LayerTag({ text, 'ref-id': refId, accent }: { text: string; 'ref-id': string; accent?: boolean }) {
  return (
    <div className="absolute left-full top-1/2 ml-3 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap">
      <span className="h-px w-6 bg-ink" />
      <span className={`font-mono text-[10px] tracking-label ${accent ? 'text-accent' : 'text-ink-soft'}`}>
        {refId} · {text}
      </span>
    </div>
  )
}

function PcbPlate() {
  return (
    <svg viewBox="0 0 200 90" className="h-full w-full" fill="none" aria-hidden="true">
      <path d="M10,20 L70,20 L70,55 L120,55 L120,30 L190,30" stroke="rgb(var(--hairline))" strokeWidth={2} />
      <path
        d="M10,20 L70,20 L70,55 L120,55 L120,30 L190,30"
        stroke="rgb(var(--accent))"
        strokeWidth={2}
        strokeDasharray="5 13"
        className="animate-trace-flow"
      />
      <path d="M20,70 L90,70 L90,40" stroke="rgb(var(--hairline))" strokeWidth={1.5} />
      {[
        [10, 20],
        [70, 55],
        [120, 30],
        [190, 30],
        [20, 70],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 3} y={y - 3} width={6} height={6} fill="rgb(var(--paper))" stroke="rgb(var(--accent))" strokeWidth={1.5} />
      ))}
      <rect x={86} y={36} width={22} height={16} fill="none" stroke="rgb(var(--ink-soft))" strokeWidth={1} />
    </svg>
  )
}

function McuChip() {
  return (
    <svg viewBox="0 0 120 60" className="h-full w-full text-ink" fill="none" aria-hidden="true">
      <rect x={34} y={14} width={52} height={32} stroke="currentColor" strokeWidth={1.2} />
      <circle cx={42} cy={22} r={2} fill="currentColor" />
      {/* pins */}
      {[42, 54, 66, 78].map((x) => (
        <g key={x}>
          <line x1={x} y1={14} x2={x} y2={6} stroke="currentColor" strokeWidth={1} />
          <line x1={x} y1={46} x2={x} y2={54} stroke="currentColor" strokeWidth={1} />
        </g>
      ))}
      <text x={60} y={34} textAnchor="middle" className="fill-current font-mono" fontSize={7} letterSpacing={1}>
        MCU
      </text>
    </svg>
  )
}
