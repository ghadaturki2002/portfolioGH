'use client'

import { Linkedin, Mail } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import SchematicTrace from './draft/SchematicTrace'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const links = [
    { label: t('footer.about'), href: '#about' },
    { label: t('footer.projects'), href: '#projects' },
    { label: t('footer.contact'), href: '#contact' },
  ]

  return (
    <footer className="relative border-t-[1.5px] border-ink bg-paper-2/40">
      {/* schematic trace divider */}
      <SchematicTrace className="absolute -top-px left-0 h-10 w-64 opacity-60" />

      <div className="sheet py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink">Ghada Turki</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="label mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-mono text-sm text-ink-soft transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label mb-4">{t('footer.social')}</h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/ghada-turki-20319b217"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-ink text-ink transition-colors hover:bg-accent hover:border-accent hover:text-paper"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:ghada.turkiditgaraali@esprit.tn"
                className="flex h-10 w-10 items-center justify-center border border-ink text-ink transition-colors hover:bg-accent hover:border-accent hover:text-paper"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-hairline pt-6 text-center">
          <p className="mb-2 font-mono text-xs italic text-ink-soft">{t('footer.quote')}</p>
          <p className="label">
            © {year} Ghada Turki. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  )
}
