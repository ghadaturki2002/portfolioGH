'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/* ------------------------------------------------------------------ *
 * BootLoader
 * One-time "system boot / diagnostic" splash shown on first load of a
 * session. Terminal aesthetic: mono lines typed in sequence, a blinking
 * cursor, and a thin accent progress bar. Dismisses automatically after
 * ~1.9s (or ~400ms under reduced motion), and can be skipped via click
 * or any keydown. Uses sessionStorage('booted') so it never re-appears
 * on subsequent navigations within the same session.
 * ------------------------------------------------------------------ */

const STORAGE_KEY = 'booted'

/** Diagnostic lines revealed in sequence. */
const BOOT_LINES = [
  '> INITIALIZING SYSTEM…',
  '> LOADING MODULES [mechanical · electronics · software]…',
  '> CALIBRATING…',
  '> ONLINE',
] as const

/** Total time the splash stays up before auto-dismiss. */
const FULL_DURATION_MS = 1900
const REDUCED_DURATION_MS = 400
/** Per-line reveal cadence so all lines land before auto-dismiss. */
const LINE_INTERVAL_MS = Math.floor(FULL_DURATION_MS / (BOOT_LINES.length + 1))

export default function BootLoader() {
  const reduce = useReducedMotion()

  // `mounted` gates everything to the client: on the server (and on the
  // very first client render) we render nothing, avoiding both SSR hazards
  // and a hydration mismatch from reading sessionStorage too early.
  const [mounted, setMounted] = useState(false)
  // Whether the overlay should be shown at all this session.
  const [show, setShow] = useState(false)
  // How many diagnostic lines are currently visible.
  const [visibleLines, setVisibleLines] = useState(0)

  // Hold timer/RAF ids so we can cancel them on dismiss/unmount.
  const timersRef = useRef<number[]>([])
  const rafRef = useRef<number | null>(null)

  /** Cancel any pending timeouts / animation frames. */
  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  /** Mark the session as booted and begin the exit animation. */
  const dismiss = useCallback(() => {
    clearTimers()
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // sessionStorage can throw (privacy mode / disabled storage);
      // ignore — worst case the splash shows again next navigation.
    }
    setShow(false)
  }, [clearTimers])

  // Decide on mount whether to show the splash (client only).
  useEffect(() => {
    setMounted(true)
    let alreadyBooted = false
    try {
      alreadyBooted = window.sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      alreadyBooted = false
    }
    if (!alreadyBooted) setShow(true)
  }, [])

  // Drive the sequence + auto-dismiss while visible.
  useEffect(() => {
    if (!show) return

    if (reduce) {
      // Reduced motion: skip the typing entirely. Show only the final
      // "ONLINE" line statically, then dismiss after a brief pause.
      setVisibleLines(BOOT_LINES.length)
      const id = window.setTimeout(dismiss, REDUCED_DURATION_MS)
      timersRef.current.push(id)
      return clearTimers
    }

    // Full experience: reveal one line at a time…
    setVisibleLines(1)
    for (let i = 2; i <= BOOT_LINES.length; i++) {
      const id = window.setTimeout(
        () => setVisibleLines(i),
        LINE_INTERVAL_MS * (i - 1)
      )
      timersRef.current.push(id)
    }
    // …then auto-dismiss once the whole sequence has played.
    const dismissId = window.setTimeout(dismiss, FULL_DURATION_MS)
    timersRef.current.push(dismissId)

    return clearTimers
  }, [show, reduce, dismiss, clearTimers])

  // Allow skipping via click or any keydown while visible.
  useEffect(() => {
    if (!show) return
    const onKey = () => dismiss()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show, dismiss])

  // Lock body scroll while the overlay is visible; restore on cleanup.
  useEffect(() => {
    if (!show) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [show])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Chargement"
          onClick={dismiss}
          initial={reduce ? false : { opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg font-mono text-ink"
        >
          {/* Decorative engineering backdrop. */}
          <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

          <div className="container-px relative w-full max-w-2xl">
            {/* Terminal header chip. */}
            <div aria-hidden="true" className="mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              <span className="inline-block h-2 w-2 rounded-full bg-accent text-glow" />
              <span>diagnostic · v1.0</span>
            </div>

            {/* Diagnostic lines. */}
            <div className="space-y-1.5 text-sm leading-relaxed sm:text-base">
              {BOOT_LINES.map((line, i) => {
                const isVisible = i < visibleLines
                const isLast = i === BOOT_LINES.length - 1
                if (!isVisible) return null
                return (
                  <LineRow key={line} text={line} highlight={isLast} reduce={!!reduce} />
                )
              })}

              {/* Blinking cursor trails the last revealed line. */}
              <span aria-hidden="true" className="inline-block">
                <span className="text-accent">&gt;&nbsp;</span>
                <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent animate-blink align-middle" />
              </span>
            </div>

            {/* Thin accent progress bar 0 → 100%. */}
            <div aria-hidden="true" className="mt-8 h-px w-full overflow-hidden bg-hairline">
              <motion.div
                className="h-full bg-accent text-glow"
                initial={reduce ? false : { scaleX: 0 }}
                animate={reduce ? { scaleX: 1 } : { scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{
                  duration: reduce ? 0 : FULL_DURATION_MS / 1000,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Skip hint. */}
            <p aria-hidden="true" className="mt-4 text-[11px] text-ink-soft">
              press any key to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ *
 * Single diagnostic line. Fades/slides in unless reduced motion is on.
 * ------------------------------------------------------------------ */
function LineRow({
  text,
  highlight,
  reduce,
}: {
  text: string
  highlight: boolean
  reduce: boolean
}) {
  return (
    <motion.p
      initial={reduce ? false : { opacity: 0, x: -6 }}
      animate={reduce ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={highlight ? 'text-accent text-glow' : 'text-ink-soft'}
    >
      {text}
    </motion.p>
  )
}
