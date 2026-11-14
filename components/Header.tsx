'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X, Moon, Sun, Download } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from './LanguageProvider'
import { identity, type Lang } from '@/lib/content'
import { Monogram } from './fx/Constellation'

const SECTION_IDS = ['about', 'projects', 'experience', 'skills', 'certifications', 'education', 'contact'] as const
/** numéro de planche de chaque section (07 = International, hors menu) */
const SHEET_NO: Record<(typeof SECTION_IDS)[number], number> = {
  about: 1,
  projects: 2,
  experience: 3,
  skills: 4,
  certifications: 5,
  education: 6,
  contact: 8,
}

export function SkipLink() {
  const { t } = useLanguage()
  return (
    <a href="#main" className="skip-link btn-primary">
      {t('a11y.skip')}
    </a>
  )
}

function LangSwitch({ className = '' }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage()
  const options: { code: Lang; name: string }[] = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
  ]
  return (
    <div role="group" aria-label={t('lang.label')} className={`flex items-center rounded-md border p-0.5 ${className}`}>
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          lang={o.code}
          aria-label={o.name}
          aria-pressed={language === o.code}
          onClick={() => setLanguage(o.code)}
          className={`label h-9 min-w-[2.5rem] rounded px-2 transition-colors ${
            language === o.code ? 'bg-ink text-bg' : 'text-ink-soft hover:text-ink'
          }`}
        >
          {o.code}
        </button>
      ))}
    </div>
  )
}

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { language, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 12))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // section active (indicateur de navigation)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'))
    if (!els.length) return
    const navIds = new Set<string>(SECTION_IDS)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(navIds.has(e.target.id) ? e.target.id : null)
      },
      { rootMargin: '-42% 0px -52% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const close = useCallback((returnFocus = false) => {
    setOpen(false)
    if (returnFocus) toggleRef.current?.focus()
  }, [])

  // menu mobile : Échap, clic extérieur, focus sur le premier lien
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true)
    }
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open, close])

  const solid = scrolled || open

  return (
    <header
      data-site-header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? 'border-b bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label={t('a11y.primaryNav')} className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label={t('a11y.home')} className="group flex min-h-[44px] items-center gap-3">
          <Monogram className="h-7 w-auto text-mech transition-opacity group-hover:opacity-80" />
          <span className="heading text-[1.02rem] text-ink">{identity.name}</span>
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'location' : undefined}
                className={`relative rounded px-3 py-2 text-[0.9rem] transition-colors ${
                  active === id ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {t(`nav.${id}`)}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-transform duration-300 ${
                    active === id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch className="hidden sm:flex" />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('theme.toLight') : t('theme.toDark')}
            className="grid h-11 w-11 place-items-center rounded-md text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
          >
            {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
          </button>
          <a
            href={identity.cv[language]}
            download
            aria-label={t('hero.cvLabel')}
            className="btn-primary hidden min-h-[40px] px-4 py-2 text-sm sm:inline-flex"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t('hero.cvShort')}
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('a11y.menuClose') : t('a11y.menuOpen')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-md text-ink transition-colors hover:bg-surface-2 xl:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t bg-bg xl:hidden"
      >
        <ul className="container-x py-2">
          {SECTION_IDS.map((id) => (
            <li key={id} className="border-b last:border-b-0">
              <a
                href={`#${id}`}
                onClick={() => close()}
                aria-current={active === id ? 'location' : undefined}
                className="flex min-h-[52px] items-center justify-between text-lg text-ink"
              >
                {t(`nav.${id}`)}
                <span className="label tabular text-ink-faint" aria-hidden="true">
                  {String(SHEET_NO[id]).padStart(2, '0')}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="container-x flex flex-wrap items-center gap-3 border-t py-5">
          <LangSwitch />
          <a href={identity.cv.fr} download className="btn-secondary min-h-[44px] text-sm">
            <Download className="h-4 w-4" aria-hidden="true" />
            {t('contact.cvFr')}
          </a>
          <a href={identity.cv.en} download className="btn-secondary min-h-[44px] text-sm">
            <Download className="h-4 w-4" aria-hidden="true" />
            {t('contact.cvEn')}
          </a>
        </div>
      </div>
    </header>
  )
}
