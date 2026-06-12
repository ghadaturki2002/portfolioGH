'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from '@/lib/content'

interface LanguageContextType {
  language: Lang
  setLanguage: (lang: Lang) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/* UI chrome strings only — all profile content lives in lib/content.ts */
const ui: Record<Lang, Record<string, string>> = {
  fr: {
    'nav.about': 'À propos',
    'nav.experience': 'Expérience',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.certifications': 'Certifications',
    'nav.education': 'Formation',
    'nav.contact': 'Contact',

    'hero.viewWork': 'Voir mes projets',
    'hero.downloadCV': 'Télécharger le CV',
    'hero.contact': 'Me contacter',
    'hero.scroll': 'Découvrir',

    'intro.loading': 'Chargement',
    'intro.skip': 'Passer',
    'intro.replay': 'Revoir l’intro',

    'carousel.kicker': 'En mouvement',
    'carousel.title': 'Mon terrain de jeu technique',

    'about.kicker': 'À propos',
    'about.title': 'Profil',
    'about.focusAreas': 'Domaines clés',

    'experience.kicker': 'Parcours',
    'experience.title': 'Expérience',

    'projects.kicker': 'Sélection',
    'projects.title': 'Projets',
    'projects.view': 'Voir le projet',
    'projects.close': 'Fermer',
    'projects.tech': 'Technologies',
    'projects.gallery': 'Aperçu',
    'projects.all': 'Tous les projets',
    'projects.role': 'Mon rôle',
    'projects.learned': 'Ce que j’ai appris',
    'projects.result': 'Résultat',
    'projects.filter': 'Filtrer par catégorie',

    'skills.kicker': 'Savoir-faire',
    'skills.title': 'Compétences',

    'certifications.kicker': 'Crédentials',
    'certifications.title': 'Certifications',
    'certifications.download': 'Voir le certificat',

    'education.kicker': 'Académique',
    'education.title': 'Formation',
    'education.present': 'Présent',
    'education.associations': 'Vie associative & bénévolat',
    'education.certificate': 'Attestation',

    'contact.kicker': 'Contact',
    'contact.title': 'Travaillons ensemble',
    'contact.intro': 'Disponible pour un stage de fin d’études. N’hésitez pas à me contacter — je réponds rapidement.',
    'contact.name': 'Nom',
    'contact.namePlaceholder': 'Votre nom',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'vous@exemple.com',
    'contact.subject': 'Sujet',
    'contact.subjectPlaceholder': 'L’objet de votre message',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Votre message…',
    'contact.send': 'Envoyer',
    'contact.sent': 'Message envoyé !',
    'contact.emailLabel': 'Email',
    'contact.phoneLabel': 'Téléphone',
    'contact.locationLabel': 'Localisation',

    'footer.rights': 'Tous droits réservés.',
    'footer.built': 'Conçu et développé par Ghada Turki.',
    'footer.top': 'Haut de page',

    'theme.toggle': 'Changer de thème',
    'lang.toggle': 'Changer de langue',
  },
  en: {
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.certifications': 'Certifications',
    'nav.education': 'Education',
    'nav.contact': 'Contact',

    'hero.viewWork': 'View my work',
    'hero.downloadCV': 'Download CV',
    'hero.contact': 'Get in touch',
    'hero.scroll': 'Scroll',

    'intro.loading': 'Loading',
    'intro.skip': 'Skip',
    'intro.replay': 'Replay intro',

    'carousel.kicker': 'In motion',
    'carousel.title': 'My technical playground',

    'about.kicker': 'About',
    'about.title': 'Profile',
    'about.focusAreas': 'Focus areas',

    'experience.kicker': 'Journey',
    'experience.title': 'Experience',

    'projects.kicker': 'Selected work',
    'projects.title': 'Projects',
    'projects.view': 'View project',
    'projects.close': 'Close',
    'projects.tech': 'Technologies',
    'projects.gallery': 'Preview',
    'projects.all': 'All projects',
    'projects.role': 'My role',
    'projects.learned': 'What I learned',
    'projects.result': 'Result',
    'projects.filter': 'Filter by category',

    'skills.kicker': 'Expertise',
    'skills.title': 'Skills',

    'certifications.kicker': 'Credentials',
    'certifications.title': 'Certifications',
    'certifications.download': 'View certificate',

    'education.kicker': 'Academic',
    'education.title': 'Education',
    'education.present': 'Present',
    'education.associations': 'Community & volunteering',
    'education.certificate': 'Certificate',

    'contact.kicker': 'Contact',
    'contact.title': 'Let’s work together',
    'contact.intro': 'Available for an end-of-studies internship. Feel free to reach out — I reply quickly.',
    'contact.name': 'Name',
    'contact.namePlaceholder': 'Your name',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'you@example.com',
    'contact.subject': 'Subject',
    'contact.subjectPlaceholder': 'What’s it about',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Your message…',
    'contact.send': 'Send',
    'contact.sent': 'Message sent!',
    'contact.emailLabel': 'Email',
    'contact.phoneLabel': 'Phone',
    'contact.locationLabel': 'Location',

    'footer.rights': 'All rights reserved.',
    'footer.built': 'Designed & built by Ghada Turki.',
    'footer.top': 'Back to top',

    'theme.toggle': 'Toggle theme',
    'lang.toggle': 'Toggle language',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Lang>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Lang | null
    if (saved === 'fr' || saved === 'en') setLanguageState(saved)
  }, [])

  const setLanguage = (lang: Lang) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
  }

  const t = (key: string): string => ui[language][key] ?? key

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
