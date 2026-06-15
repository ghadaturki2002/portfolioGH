'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from './LanguageProvider'
import { identity } from '@/lib/content'
import { ChipTriplet, EASE } from './ui/primitives'

const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'certifications', 'education', 'contact']

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const reduce = useReducedMotion()

  const nav = SECTION_IDS.map((id) => ({ href: `#${id}`, id, label: t(`nav.${id}`) }))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // active-section tracking — the selector dial
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: reduce ? 'auto' : 'smooth' })
    setOpen(false)
  }

  return (
    // static mount — the intro overlay covers the header during calibration
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-x-0 border-t-0 border-b border-b-hairline' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between" aria-label="Primary">
        <a
          href="#hero"
          onClick={(e) => go(e, '#hero')}
          className="flex items-center gap-2.5"
          aria-label={identity.name}
        >
          <ChipTriplet />
          <span className="sys text-ink">GT</span>
        </a>

        {/* desktop nav */}
        <ul className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => go(e, item.href)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`sys transition-colors ${
                  active === item.id ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* language */}
          <div className="glass hidden items-center rounded-full px-1 py-1 font-mono text-[13px] sm:flex" role="group" aria-label={t('lang.toggle')}>
            {(['fr', 'en'] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => setLanguage(lng)}
                aria-pressed={language === lng}
                className={`rounded-full px-2.5 py-0.5 uppercase transition-colors ${
                  language === lng ? 'bg-ink text-bg' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {lng}
              </button>
            ))}
          </div>

          {/* theme */}
          <button
            onClick={toggleTheme}
            aria-label={t('theme.toggle')}
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:text-ink"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* CV */}
          <a href={identity.cv[language]} download className="btn-ink hidden h-9 px-4 py-0 text-[13px] sm:inline-flex">
            CV
          </a>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden border-t border-hairline bg-bg lg:hidden"
          >
            <ul className="container-px flex flex-col py-3">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => go(e, item.href)}
                    className="sys block border-b border-hairline/60 py-4 text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <li className="flex items-center gap-4 py-4">
                <div className="glass flex items-center rounded-full px-1 py-1 font-mono text-[13px]" role="group" aria-label={t('lang.toggle')}>
                  {(['fr', 'en'] as const).map((lng) => (
                    <button
                      key={lng}
                      onClick={() => setLanguage(lng)}
                      aria-pressed={language === lng}
                      className={`rounded-full px-2.5 py-0.5 uppercase ${language === lng ? 'bg-ink text-bg' : 'text-ink-soft'}`}
                    >
                      {lng}
                    </button>
                  ))}
                </div>
                <a href={identity.cv[language]} download className="btn-ink h-9 px-4 py-0 text-[13px]">
                  {t('hero.downloadCV')}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
