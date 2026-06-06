'use client'

import Reveal from './Reveal'
import WordReveal from '../fx/WordReveal'

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
      <WordReveal
        text={title}
        as="h2"
        delay={0.05}
        className="display mt-5 text-4xl text-ink sm:text-5xl lg:text-[3.25rem]"
      />
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft text-pretty">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
