'use client'

import { Linkedin, Mail, ArrowUp } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import Reveal from './ui/Reveal'
import { identity } from '@/lib/content'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const nav = [
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#contact', label: t('nav.contact') },
  ]

  const go = (href: string) => {
    const el = document.querySelector(href)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer className="border-t border-hairline">
      <div className="container-px py-12 md:py-16">
        <Reveal>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            {/* wordmark + built line */}
            <div className="max-w-sm">
              <button
                onClick={() => go('#hero')}
                className="font-display text-2xl font-semibold tracking-tight text-ink"
                aria-label={t('footer.top')}
              >
                Ghada<span className="text-accent">.</span>
              </button>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft text-pretty">
                {t('footer.built')}
              </p>
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
                        className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${identity.email}`}
                  aria-label={`Email — ${identity.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* bottom row */}
        <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-ink-soft">
            © {year} {identity.name}. {t('footer.rights')}
          </p>
          <button
            onClick={() => go('#hero')}
            className="group inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-accent sm:self-auto"
          >
            {t('footer.top')}
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
