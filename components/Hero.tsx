'use client'

/**
 * HERO — le ciel étoilé, l'accroche « Je dessine la pièce, je câble la carte,
 * j'écris le code. », le portrait (affiché une seule fois sur le site) et une
 * cotation en chaîne des trois disciplines : chaque cote est dimensionnée par le
 * nombre réel de réalisations et filtre l'index des projets.
 */
import Image from 'next/image'
import { ArrowRight, Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { disciplines, identity, type Channel } from '@/lib/content'
import { countByChannel } from '@/lib/channels'
import ParticleNetwork from './fx/ParticleNetwork'
import { ChannelChip } from './ui/kit'

const counts = countByChannel()

export function selectFilter(ch: Channel | 'all') {
  window.dispatchEvent(new CustomEvent('gt:filter', { detail: ch }))
}

export default function Hero() {
  const { language, t } = useLanguage()
  const lines = identity.headline[language].split(/,\s*/)

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-24 md:pt-28">
      {/* ciel : halo d'horizon + grille de plan + étoiles */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_0%,rgb(var(--grid)/0.10),transparent_60%)]" />
        <div className="bp-grid fade-edges absolute inset-0 opacity-80" />
        <div className="hero-fade absolute inset-0">
          <ParticleNetwork className="absolute inset-0 h-full w-full" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          {/* mobile : carte de visite compacte */}
          <div className="hero-in mb-8 flex items-center gap-4 lg:hidden" style={{ '--d': '0ms' } as React.CSSProperties}>
            <div className="marks relative h-[76px] w-[62px] shrink-0 overflow-hidden rounded-[4px] border">
              <Image src={identity.photo} alt="" fill sizes="62px" className="object-cover object-top" priority />
            </div>
            <div>
              <p className="heading text-lg text-ink">{identity.name}</p>
              <p className="label mt-1 text-ink-soft">{identity.shortRole[language]}</p>
            </div>
          </div>

          <p className="hero-in label hidden items-center gap-3 text-ink-soft lg:flex" style={{ '--d': '0ms' } as React.CSSProperties}>
            <span className="text-ink">{identity.name}</span>
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
            <span>{identity.shortRole[language]}</span>
          </p>

          <h1
            id="hero-title"
            className="display hero-in mt-0 text-[clamp(2.3rem,4.8vw,3.8rem)] text-ink lg:mt-6"
            style={{ '--d': '80ms', fontVariationSettings: "'wdth' 100", lineHeight: 1.04 } as React.CSSProperties}
          >
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line}
                {i < lines.length - 1 ? ',' : ''}
              </span>
            ))}
          </h1>

          <p className="hero-in mt-7 max-w-[36rem] text-lg text-ink-soft md:text-[1.2rem] md:leading-relaxed" style={{ '--d': '160ms' } as React.CSSProperties}>
            {identity.tagline[language]}
          </p>

          <p
            className="hero-in mt-7 inline-flex items-center gap-2.5 rounded-full border bg-surface/60 px-3.5 py-1.5 text-[0.9rem] text-ink backdrop-blur-sm"
            style={{ '--d': '220ms' } as React.CSSProperties}
          >
            <span aria-hidden="true" className="pulse relative h-2 w-2 rounded-full bg-elec-chip" />
            <span>
              <strong className="font-semibold">{identity.availability[language]}</strong>
              <span className="text-ink-soft"> · {identity.location[language]}</span>
            </span>
          </p>

          <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={{ '--d': '280ms' } as React.CSSProperties}>
            <a href="#projects" className="btn-primary">
              {t('hero.viewWork')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-secondary">
              {t('hero.contact')}
            </a>
            <a href={identity.cv[language]} download className="btn-quiet">
              <Download className="h-4 w-4" aria-hidden="true" />
              {t('hero.cv')}
            </a>
          </div>
        </div>

        {/* portrait (écrans larges) */}
        <div className="hidden lg:col-span-4 lg:block">
          <figure className="hero-in ml-auto w-full max-w-[340px]" style={{ '--d': '120ms' } as React.CSSProperties}>
            <div className="marks relative aspect-[4/5] overflow-hidden rounded-md border bg-surface-2">
              <Image
                src={identity.photo}
                alt={t('hero.portrait')}
                fill
                priority
                sizes="(min-width: 1280px) 340px, 30vw"
                className="object-cover object-top"
              />
            </div>
            <dl aria-hidden="true" className="cartouche label mt-4 grid-cols-2 text-ink-faint">
              <div>
                <dt>Ghada Turki</dt>
                <dd className="mt-1 text-ink-soft">{identity.shortRole[language].split(' · ')[1]}</dd>
              </div>
              <div>
                <dt>ESPRIT</dt>
                <dd className="mt-1 text-ink-soft">2024 – 2026</dd>
              </div>
            </dl>
          </figure>
        </div>
      </div>

      {/* cotation en chaîne des disciplines */}
      <div className="container-x mt-14 hero-in" style={{ '--d': '420ms' } as React.CSSProperties}>
        <p className="label mb-3 text-ink-faint">{t('hero.chain')}</p>
        <ul className="flex flex-col gap-3 md:flex-row md:gap-0">
          {disciplines.map((d) => {
            const n = counts[d.key]
            return (
              <li key={d.key} className="md:min-w-0" style={{ flexGrow: n, flexBasis: 0 }}>
                <a
                  href="#index"
                  onClick={() => selectFilter(d.key)}
                  aria-label={t('hero.chainItem', { label: d.label[language], n })}
                  className="group block rounded py-1 text-ink-faint transition-colors hover:text-ink"
                >
                  <span className="flex items-center gap-2">
                    <span className="cote-tick" aria-hidden="true" />
                    <span className="cote-line start" aria-hidden="true" />
                    <span className="label flex shrink-0 items-center gap-2 px-1 text-ink-soft group-hover:text-ink">
                      <ChannelChip ch={d.key} />
                      <span className="md:hidden xl:inline">{d.label[language]}</span>
                      <span className="hidden md:inline xl:hidden">{d.short[language]}</span>
                      <span className="tabular text-accent">{n}</span>
                    </span>
                    <span className="cote-line end" aria-hidden="true" />
                    <span className="cote-tick hidden md:block" aria-hidden="true" />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
