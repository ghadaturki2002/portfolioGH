'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

/**
 * Thème « nuit » par défaut (le ciel étoilé est l'identité du site) ; le thème clair
 * « calque » reste disponible et mémorisé. La classe .dark est posée AVANT l'affichage
 * par le script inline de app/layout.tsx : aucun flash au chargement.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  // aligne l'état React sur la classe déjà posée par le script inline
  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  const toggleTheme = useCallback(() => {
    const root = document.documentElement
    const next: Theme = root.classList.contains('dark') ? 'light' : 'dark'
    root.classList.toggle('dark', next === 'dark')
    root.style.colorScheme = next
    try {
      window.localStorage.setItem('theme', next)
    } catch {
      /* ignore */
    }
    setTheme(next)
  }, [])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
