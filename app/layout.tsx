import type { Metadata } from 'next'
import { Space_Grotesk, IBM_Plex_Mono, Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import { LanguageProvider } from '@/components/LanguageProvider'
import { ReactNode } from 'react'

// Display: precise technical grotesque
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})
// Labels / specs / annotations
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})
// Body
const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ghada Turki | Ingénieure Électromécanique | Mécatronique',
  description: 'Portfolio de Ghada Turki - Ingénieure en Électromécanique spécialisée en Mécatronique, Automatisation, Robotique, IoT et Intelligence Artificielle',
  keywords: 'Ingénieur, Électromécanique, Mécatronique, Robotique, IoT, IA, Automatisation',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${display.variable} ${mono.variable} ${body.variable} font-sans`}>
        <LanguageProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
