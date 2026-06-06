'use client'

import Reveal from './Reveal'

interface SectionHeadingProps {
  kicker: string
  title: string
  /** optional supporting line under the title */
  lead?: string
  align?: 'left' | 'center'
}

/** Reusable section heading: mono kicker + large serif title. */
export default function SectionHeading({ kicker, title, lead, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <span className="kicker">{kicker}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display mt-5 text-4xl text-ink sm:text-5xl lg:text-[3.25rem]">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft text-pretty">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
