import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import { LanguageProvider } from '@/components/LanguageProvider'
import { ReactNode } from 'react'
import { identity } from '@/lib/content'

/* Couple typographique + monospace technique */
// TITRES : grotesque à axe de largeur (titres élargis façon plaque de machine)
const display = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
})
// TEXTE : dessinée pour un usage d'ingénierie, très lisible
const sans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})
// DÉTAILS TECHNIQUES : cotes, cartouches, dates, repères
const mono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const title = 'Ghada Turki · Ingénieure électromécanique, spécialité mécatronique'
const description =
  'Ingénieure diplômée d’ESPRIT en génie électromécanique, spécialité mécatronique. Conception mécanique, automatisation, systèmes embarqués, IoT et intelligence artificielle appliquée à la maintenance prédictive. Disponible immédiatement.'

export const metadata: Metadata = {
  metadataBase: new URL(identity.siteUrl),
  title,
  description,
  applicationName: 'Ghada Turki',
  authors: [{ name: 'Ghada Turki', url: identity.linkedin }],
  keywords: [
    'Ghada Turki',
    'ingénieure électromécanique',
    'mécatronique',
    'jumeau numérique',
    'maintenance prédictive',
    'SolidWorks',
    'CATIA V5',
    'ESP32',
    'Siemens S7-1200',
    'TIA Portal',
    'Python',
    'Random Forest',
    'LSTM',
    'IoT',
    'réalité augmentée',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'Ghada Turki',
    title,
    description,
    locale: 'fr_FR',
    alternateLocale: ['en_US'],
    firstName: 'Ghada',
    lastName: 'Turki',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ghada Turki, ingénieure électromécanique, spécialité mécatronique : « Je dessine la pièce, je câble la carte, j’écris le code. »',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#070B14',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
}

/*
 * Exécuté AVANT le premier affichage : thème mémorisé (nuit par défaut), langue,
 * et intro déjà vue / ?nointro / mouvement réduit → data-intro="off" ; ?intro force
 * l'intro (sauf mouvement réduit). Aucun flash.
 */
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'){d.classList.remove('dark');d.style.colorScheme='light'}else{d.classList.add('dark');d.style.colorScheme='dark'}var l=localStorage.getItem('language');if(l==='en'){d.lang='en'}var seen=localStorage.getItem('gt-intro-v2')==='1';var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;var q=/[?&]nointro\\b/.test(location.search);var f=/[?&]intro\\b/.test(location.search);d.setAttribute('data-intro',(q||rm)?'off':(f||!seen)?'on':'off')}catch(e){d.setAttribute('data-intro','off')}})();`

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ghada Turki',
  jobTitle: 'Ingénieure en génie électromécanique, spécialité mécatronique',
  url: identity.siteUrl,
  email: `mailto:${identity.email}`,
  telephone: identity.phone,
  address: { '@type': 'PostalAddress', addressLocality: 'Hammamet', addressCountry: 'TN' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'ESPRIT, École Supérieure Privée d’Ingénierie et de Technologies' },
    { '@type': 'CollegeOrUniversity', name: 'ISTIC, Institut Supérieur des Technologies de l’Information et de la Communication' },
    { '@type': 'CollegeOrUniversity', name: 'ISET Nabeul' },
  ],
  knowsLanguage: ['ar', 'fr', 'en'],
  sameAs: [identity.linkedin],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}
      data-intro="on"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body className="font-sans">
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
