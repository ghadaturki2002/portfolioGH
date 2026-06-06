import type { Metadata } from 'next'
import { Sora, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import { LanguageProvider } from '@/components/LanguageProvider'
import { ReactNode } from 'react'

// Modern geometric display — techy yet professional
const display = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://portfoliogh.vercel.app'),
  title: 'Ghada Turki — Ingénieure Électromécanique & Mécatronique',
  description:
    'Portfolio de Ghada Turki, ingénieure en électromécanique et mécatronique. Conception mécanique (SolidWorks, CATIA V5), automatisation et systèmes embarqués (Arduino, ESP32), développement logiciel (Python, C#, Java) et machine learning (jumeau numérique, Random Forest, LSTM). Disponible à partir de septembre 2026.',
  keywords: [
    'Ghada Turki', 'ingénieure électromécanique', 'mécatronique', 'SolidWorks', 'CATIA V5',
    'Arduino', 'ESP32', 'automatisation', 'machine learning', 'jumeau numérique', 'LSTM', 'Random Forest',
  ],
  authors: [{ name: 'Ghada Turki' }],
  openGraph: {
    title: 'Ghada Turki — Ingénieure Électromécanique & Mécatronique',
    description:
      'Conception mécanique, automatisation, systèmes embarqués, développement logiciel et machine learning.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${display.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}>
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
