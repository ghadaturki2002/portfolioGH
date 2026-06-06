'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from './LanguageProvider'
import { identity } from '@/lib/content'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const reduce = useReducedMotion()

  const nav = [
    { href: '#about', label: t('nav.about') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#certifications', label: t('nav.certifications') },
    { href: '#contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: reduce ? 'auto' : 'smooth' })
    setOpen(false)
  }

  return (
    <motion.header
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-hairline bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between md:h-20" aria-label="Primary">
        <a
          href="#hero"
          onClick={(e) => go(e, '#hero')}
          className="font-display text-xl font-semibold tracking-tight text-ink"
        >
          Ghada<span className="text-accent">.</span>
        </a>

        {/* desktop nav */}
        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => go(e, item.href)}
                className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* language */}
          <div className="hidden items-center font-mono text-xs sm:flex" role="group" aria-label={t('lang.toggle')}>
            <button
              onClick={() => setLanguage('fr')}
              aria-pressed={language === 'fr'}
              className={`px-1.5 py-1 transition-colors ${language === 'fr' ? 'text-accent' : 'text-ink-soft hover:text-ink'}`}
            >
              FR
            </button>
            <span className="text-hairline">/</span>
            <button
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              className={`px-1.5 py-1 transition-colors ${language === 'en' ? 'text-accent' : 'text-ink-soft hover:text-ink'}`}
            >
              EN
            </button>
          </div>

          {/* theme */}
          <button
            onClick={toggleTheme}
            aria-label={t('theme.toggle')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-soft transition-colors hover:border-accent hover:text-accent"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* CV */}
          <a href={identity.cv[language]} download className="btn-primary hidden h-9 px-4 py-0 text-sm sm:inline-flex">
            CV
          </a>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-hairline bg-bg lg:hidden"
          >
            <ul className="container-px flex flex-col py-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => go(e, item.href)}
                    className="block border-b border-hairline/60 py-3.5 text-base text-ink-soft transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 py-4">
                <div className="flex items-center font-mono text-sm" role="group" aria-label={t('lang.toggle')}>
                  <button onClick={() => setLanguage('fr')} aria-pressed={language === 'fr'} className={`px-2 ${language === 'fr' ? 'text-accent' : 'text-ink-soft'}`}>FR</button>
                  <span className="text-hairline">/</span>
                  <button onClick={() => setLanguage('en')} aria-pressed={language === 'en'} className={`px-2 ${language === 'en' ? 'text-accent' : 'text-ink-soft'}`}>EN</button>
                </div>
                <a href={identity.cv[language]} download className="btn-primary h-9 px-4 py-0 text-sm">
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
