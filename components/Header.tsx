'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from './LanguageProvider'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const reduce = useReducedMotion()

  // Formation (#education) added — key exists in both languages; Education is now its own section.
  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.education'), href: '#education' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: reduce ? 0 : -100 }}
      animate={{ y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'border-b border-hairline bg-paper/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className={`sheet flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
        {/* brand mark — drawing tag */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="corner-ticks flex items-center gap-2 border border-ink px-2.5 py-1 font-display text-sm font-bold tracking-widest text-ink transition-colors hover:bg-accent hover:border-accent hover:text-paper"
        >
          GT
        </a>

        {/* desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="group relative font-mono text-xs uppercase tracking-label text-ink-soft transition-colors hover:text-ink"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <span className="h-4 w-px bg-hairline" />

          {/* language selector */}
          <div className="flex items-center font-mono text-xs">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-1.5 transition-colors ${language === 'fr' ? 'text-accent' : 'text-ink-soft hover:text-ink'}`}
              aria-pressed={language === 'fr'}
            >
              FR
            </button>
            <span className="text-hairline">/</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 transition-colors ${language === 'en' ? 'text-accent' : 'text-ink-soft hover:text-ink'}`}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>

          {/* theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-paper"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center font-mono text-xs">
            <button onClick={() => setLanguage('fr')} aria-pressed={language === 'fr'} className={`px-1.5 ${language === 'fr' ? 'text-accent' : 'text-ink-soft'}`}>FR</button>
            <span className="text-hairline">/</span>
            <button onClick={() => setLanguage('en')} aria-pressed={language === 'en'} className={`px-1.5 ${language === 'en' ? 'text-accent' : 'text-ink-soft'}`}>EN</button>
          </div>
          <button onClick={toggleTheme} className="flex h-8 w-8 items-center justify-center border border-ink" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="flex h-8 w-8 items-center justify-center border border-ink" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-hairline bg-paper md:hidden"
          >
            <div className="sheet flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="border-b border-hairline-2 py-3 font-mono text-sm uppercase tracking-label text-ink-soft transition-colors hover:text-accent"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
