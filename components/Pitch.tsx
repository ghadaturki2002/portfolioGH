'use client'

/**
 * ACCROCHE — « Vous cherchez une ingénieure qui conçoit, câble, code et déploie
 * l'IA ? Elle est devant vous. » Quatre preuves vérifiables (toutes sur le CV),
 * présentées comme les cases d'un cartouche, puis un seul appel à l'action.
 */
import { ArrowRight } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { identity, pitch } from '@/lib/content'
import { Reveal } from './ui/kit'

export default function Pitch() {
  const { language, t } = useLanguage()

  return (
    <section id="pitch" aria-labelledby="pitch-title" className="relative isolate overflow-hidden border-y bg-bg-2">
      <div aria-hidden="true" className="bp-grid absolute inset-0 -z-10 opacity-70" />
      <div className="container-x py-20 md:py-28">
        <Reveal>
          <p className="label flex items-center gap-3 text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
            {t('pitch.kicker')}
          </p>
          <h2 id="pitch-title" className="display mt-6 max-w-4xl text-[clamp(1.95rem,4.4vw,3.5rem)] text-ink">
            {pitch.question[language]}
          </h2>
          <p className="display mt-4 text-[clamp(1.6rem,3.4vw,2.7rem)] text-accent">{pitch.answer[language]}</p>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-md border border-hairline-strong bg-hairline-strong sm:grid-cols-2 lg:grid-cols-4">
          {pitch.proofs.map((p, i) => (
            <Reveal as="li" key={p.title.en} delay={i * 70} className="flex flex-col bg-surface p-6 md:p-7">
              <p className="label tabular text-ink-faint">
                {t('pitch.proof')} {String(i + 1).padStart(2, '0')}
              </p>
              <p className="display mt-5 text-[2.1rem] leading-none text-ink">{p.figure[language]}</p>
              <p className="heading mt-4 text-lg text-ink">{p.title[language]}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{p.detail[language]}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href="#contact" className="btn-primary">
            {t('pitch.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="text-ink-soft">
            {t('pitch.or')}{' '}
            <a href={`mailto:${identity.email}`} className="link mono text-[0.95rem] text-ink">
              {identity.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
