'use client'

import { Award, Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { certifications, type Certification } from '@/lib/content'

const ISSUER_ORDER: Certification['issuer'][] = ['SOLIDWORKS', 'NVIDIA']

export default function Certifications() {
  const { t } = useLanguage()

  // Group certifications by issuer, in the fixed display order.
  const groups = ISSUER_ORDER.map((issuer) => ({
    issuer,
    items: certifications.filter((c) => c.issuer === issuer),
  })).filter((g) => g.items.length > 0)

  return (
    <section id="certifications" className="section">
      <div className="container-px">
        <SectionHeading kicker={t('certifications.kicker')} title={t('certifications.title')} />

        <div className="mt-14 space-y-14 md:mt-16">
          {groups.map((group) => (
            <div key={group.issuer}>
              <Reveal>
                <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">
                  {group.issuer}
                </h3>
              </Reveal>

              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {group.items.map((cert, i) => (
                  <Reveal as="li" key={`${cert.issuer}-${cert.name}`} delay={i * 0.06}>
                    <article className="card group flex h-full flex-col p-5 hover:border-accent">
                      <span
                        className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-hairline text-accent transition-colors group-hover:border-accent"
                        aria-hidden="true"
                      >
                        <Award className="h-5 w-5" />
                      </span>

                      <h4 className="display mt-4 text-lg leading-snug text-ink">
                        {cert.name}
                      </h4>
                      <p className="mt-1 font-mono text-[12px] tracking-wide text-ink-soft">
                        {cert.issuer}
                      </p>

                      {cert.file && (
                        <a
                          href={cert.file}
                          download
                          className="link-underline mt-5 inline-flex items-center gap-2 self-start border-t-0 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:text-accent"
                          aria-label={`${t('certifications.download')} — ${cert.name}`}
                        >
                          <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                          {t('certifications.download')}
                        </a>
                      )}
                    </article>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
