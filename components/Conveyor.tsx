'use client'

/**
 * 05 — THE CONVEYOR. Full-bleed parts-feed belt between Skills and
 * Certifications. Decorative (aria-hidden): real tool names + cert
 * issuers from content.ts ride a seamless CSS belt (.belt/.belt-track).
 * Seam math: items rendered EXACTLY TWICE, no flex gap — every item
 * carries its own mr-14 (including the last), so the -50% wrap is
 * pixel-invisible. Pause: CSS on hover/focus + data-paused when the
 * belt leaves the viewport. Reduced motion: single copy, CSS makes
 * the belt a static overflow-x scroller.
 */
import { Fragment, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { tools, certifications } from '@/lib/content'
import { toolChannel } from '@/lib/channels'
import { Chip } from './ui/primitives'

// real names only — tools list + unique certification issuers (content.ts)
const items: string[] = [
  ...tools,
  ...Array.from(new Set(certifications.map((c) => c.issuer))),
]

const MASK = 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)'

export default function Conveyor() {
  const reduce = useReducedMotion()
  const beltRef = useRef<HTMLDivElement>(null)
  const [offscreen, setOffscreen] = useState(false)

  // pause the animation whenever the belt is out of view
  useEffect(() => {
    const el = beltRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry) setOffscreen(!entry.isIntersecting)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // reduced motion = static scroller → one copy is enough (no seam needed)
  const copies = reduce ? [0] : [0, 1]

  return (
    <div
      ref={beltRef}
      aria-hidden="true"
      data-paused={offscreen ? 'true' : undefined}
      className="belt my-0 flex h-16 items-center overflow-hidden border-y border-hairline bg-surface"
      style={{ WebkitMaskImage: MASK, maskImage: MASK }}
    >
      <div
        className="belt-track"
        style={{ ['--belt-duration' as string]: `${items.length * 2.5}s` }}
      >
        {copies.map((copy) => (
          <Fragment key={copy}>
            {items.map((name) => (
              <span
                key={`${copy}-${name}`}
                className="sys mr-14 flex items-center gap-2.5 whitespace-nowrap text-ink-soft transition-colors hover:text-ink"
              >
                <Chip channel={toolChannel(name)} className="h-2 w-2" />
                {name}
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
