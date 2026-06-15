'use client'

import { Linkedin, Mail, ArrowUp } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { identity } from '@/lib/content'
import { ChipTriplet, Reveal } from './ui/primitives'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const go = (href: string) => {
    const el = document.querySelector(href)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: reduce ? 'auto' : 'smooth' })
  }

  // the docked signature triplet replays the intro — built for live interviews
  const replayIntro = () => {
    try {
      window.sessionStorage.removeItem('gt-intro-seen')
    } catch {
      /* ignore */
    }
    window.location.reload()
  }

  const nav = [
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    <footer className="border-t border-hairline">
      <div className="container-px py-12 md:py-16">
        <Reveal>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            {/* signature triplet — click to replay the intro */}
            <div className="max-w-sm">
              <button
                onClick={replayIntro}
                className="group flex items-center gap-3"
                aria-label={t('intro.replay')}
              >
                <ChipTriplet />
                <span className="sys text-ink-soft transition-colors group-hover:text-ink">
                  {t('intro.replay')}
                </span>
              </button>
              <p className="mt-5 text-sm leading-relaxed text-ink-soft text-pretty">{t('footer.built')}</p>
            </div>

            {/* nav + socials */}
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
              <nav aria-label="Footer">
                <ul className="flex flex-col gap-3">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          go(item.href)
                        }}
                        className="link-underline sys text-ink-soft transition-colors hover:text-ink"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-start gap-3">
                <a
                  href={identity.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn — ${identity.name}`}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:text-ink"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${identity.email}`}
                  aria-label={`Email — ${identity.email}`}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:text-ink"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* bottom row */}
        <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[13px] text-ink-soft">
            © {year} {identity.name}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <span className="sys text-ink-soft/70" aria-hidden="true">
              {t('footer.fin')}
            </span>
            <button
              onClick={() => go('#hero')}
              className="sys group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
            >
              {t('footer.top')}
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
