'use client'

/**
 * Pied de page en cartouche de plan : nom, rubrique, échelle, révision.
 * « Rejouer l'intro » efface le témoin d'intro et recharge en haut de page.
 */
import { ArrowUp, Linkedin, Mail } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { identity } from '@/lib/content'
import { INTRO_KEY } from './Intro'

const NAV = ['about', 'projects', 'experience', 'skills', 'certifications', 'education', 'contact'] as const

export default function Footer() {
  const { language, t } = useLanguage()
  const year = new Date().getFullYear()

  const replay = () => {
    try {
      window.localStorage.removeItem(INTRO_KEY)
    } catch {
      /* ignore */
    }
    window.location.href = window.location.pathname
  }

  return (
    <footer className="border-t border-hairline-strong">
      <div className="container-x py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <nav aria-label={t('a11y.footerNav')}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-flex min-h-[44px] items-center text-[0.95rem] text-ink-soft hover:text-ink">
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn, ${identity.name}`}
              className="grid h-11 w-11 place-items-center rounded-md border text-ink-soft transition-colors hover:text-ink"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${identity.email}`}
              aria-label={`${t('contact.email')} : ${identity.email}`}
              className="grid h-11 w-11 place-items-center rounded-md border text-ink-soft transition-colors hover:text-ink"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#top" className="btn-quiet">
              {t('footer.top')}
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* cartouche */}
        <div className="cartouche label mt-10 grid-cols-2 text-ink-faint sm:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
          <p className="text-ink-soft">
            {identity.name} · {identity.shortRole[language]}
          </p>
          <p>{t('footer.sheet')}</p>
          <p aria-hidden="true">{language === 'fr' ? 'Éch. 1:1' : 'Scale 1:1'}</p>
          <p className="tabular">
            © {year}. {t('footer.rights')}
          </p>
          <p>
            <button type="button" onClick={replay} className="link uppercase text-ink-soft hover:text-ink">
              {t('intro.replay')}
            </button>
          </p>
        </div>
      </div>
    </footer>
  )
}
