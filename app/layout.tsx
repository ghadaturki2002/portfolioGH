import type { Metadata } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import { LanguageProvider } from '@/components/LanguageProvider'
import { ReactNode } from 'react'

// Editorial display serif
const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})
// Body
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
// Small technical labels / chips
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://portfoliogh.vercel.app'),
  title: 'Ghada Turki — Ingénieure Électromécanique & Mécatronique',
  description:
    'Portfolio de Ghada Turki, ingénieure en électromécanique et mécatronique : conception mécanique (SolidWorks, CATIA V5), automatisation, systèmes embarqués (Arduino, ESP32), développement logiciel (Python, C#, Java) et intelligence artificielle.',
  keywords: [
    'Ghada Turki',
    'ingénieure mécatronique',
    'électromécanique',
    'SolidWorks',
    'CATIA V5',
    'Arduino',
    'ESP32',
    'automatisation',
    'machine learning',
    'jumeau numérique',
  ],
  authors: [{ name: 'Ghada Turki' }],
  openGraph: {
    title: 'Ghada Turki — Ingénieure Électromécanique & Mécatronique',
    description:
      'Conception mécanique, automatisation, systèmes embarqués, développement logiciel et IA appliquée.',
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
