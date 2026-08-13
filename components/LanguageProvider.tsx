'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from '@/lib/content'

interface LanguageContextType {
  language: Lang
  setLanguage: (lang: Lang) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/* UI chrome strings only — all profile content lives in lib/content.ts.
   TRICHROME "registry voice": kickers are mono, indexed, factual.
   Section components compose `0X · KICKER` from these words. */
const ui: Record<Lang, Record<string, string>> = {
  fr: {
    'nav.about': 'À propos',
    'nav.experience': 'Expérience',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.certifications': 'Certifications',
    'nav.education': 'Formation',
    'nav.contact': 'Contact',

    'intro.loading': 'Chargement',
    'intro.skip': 'Passer',
    'intro.replay': 'Rejouer l’intro',

    'hero.eyebrow': 'Ingénieure en Électromécanique & Mécatronique',
    'hero.viewWork': 'Voir les projets',
    'hero.contact': 'Me contacter',
    'hero.downloadCV': 'Télécharger le CV',
    'hero.scroll': 'Défiler',

    'about.kicker': 'Fiche technique',
    'about.title': 'À propos',
    'about.location': 'Localisation',
    'about.availability': 'Disponibilité',
    'about.languages': 'Langues',
    'about.profile': 'Projets par canal',

    'experience.kicker': 'Le registre',
    'experience.title': 'Expérience',
    'experience.shipped': 'Ce que j’ai livré',
    'experience.roles': 'expériences',

    'projects.kicker': 'Le catalogue',
    'projects.title': 'Projets',
    'projects.view': 'Voir le projet',
    'projects.details': 'Détails',
    'projects.close': 'Fermer',
    'projects.tech': 'Technologies',
    'projects.gallery': 'Aperçu',
    'projects.all': 'Tous les projets',
    'projects.role': 'Mon rôle',
    'projects.learned': 'Ce que j’ai appris',
    'projects.result': 'Résultat',
    'projects.filter': 'Filtrer par catégorie',
    'projects.prev': 'Projet précédent',
    'projects.next': 'Projet suivant',

    'skills.kicker': 'L’établi',
    'skills.title': 'Compétences',
    'skills.usedOn': 'utilisé sur',
    'skills.projects': 'projet(s)',
    'skills.crossChannel': 'Outil transversal',

    'certifications.kicker': 'Les sceaux',
    'certifications.title': 'Certifications',
    'certifications.download': 'Télécharger le PDF',

    'education.kicker': 'Les archives',
    'education.title': 'Formation',
    'education.present': 'Présent',
    'education.associations': 'Vie associative & bénévolat',
    'education.certificate': 'Attestation',

    'contact.kicker': 'La passation',
    'contact.title': 'Parlons-en.',
    'contact.intro': 'Disponible à partir de septembre 2026. Écrivez-moi — je réponds rapidement.',
    'contact.copy': 'Cliquer pour copier',
    'contact.copied': 'Copié ✓',
    'contact.emailLabel': 'Email',
    'contact.phoneLabel': 'Téléphone',
    'contact.locationLabel': 'Localisation',

    'footer.rights': 'Tous droits réservés.',
    'footer.built': 'Conçue et codée par Ghada Turki.',
    'footer.top': 'Haut de page',
    'footer.fin': 'FIN · GT·2026',

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

    'intro.loading': 'Loading',
    'intro.skip': 'Skip',
    'intro.replay': 'Replay intro',

    'hero.eyebrow': 'Electromechanical & Mechatronics Engineer',
    'hero.viewWork': 'View projects',
    'hero.contact': 'Get in touch',
    'hero.downloadCV': 'Download CV',
    'hero.scroll': 'Scroll',

    'about.kicker': 'The spec sheet',
    'about.title': 'About',
    'about.location': 'Location',
    'about.availability': 'Availability',
    'about.languages': 'Languages',
    'about.profile': 'Projects per channel',

    'experience.kicker': 'The registry',
    'experience.title': 'Experience',
    'experience.shipped': 'What I shipped',
    'experience.roles': 'roles',

    'projects.kicker': 'The catalogue',
    'projects.title': 'Projects',
    'projects.view': 'View project',
    'projects.details': 'Details',
    'projects.close': 'Close',
    'projects.tech': 'Technologies',
    'projects.gallery': 'Preview',
    'projects.all': 'All projects',
    'projects.role': 'My role',
    'projects.learned': 'What I learned',
    'projects.result': 'Result',
    'projects.filter': 'Filter by category',
    'projects.prev': 'Previous project',
    'projects.next': 'Next project',

    'skills.kicker': 'The bench',
    'skills.title': 'Skills',
    'skills.usedOn': 'used on',
    'skills.projects': 'project(s)',
    'skills.crossChannel': 'Cross-channel tool',

    'certifications.kicker': 'The seals',
    'certifications.title': 'Certifications',
    'certifications.download': 'Download PDF',

    'education.kicker': 'The archive',
    'education.title': 'Education',
    'education.present': 'Present',
    'education.associations': 'Community & volunteering',
    'education.certificate': 'Certificate',

    'contact.kicker': 'The handoff',
    'contact.title': 'Let’s talk.',
    'contact.intro': 'Available from September 2026. Write to me — I reply quickly.',
    'contact.copy': 'Click to copy',
    'contact.copied': 'Copied ✓',
    'contact.emailLabel': 'Email',
    'contact.phoneLabel': 'Phone',
    'contact.locationLabel': 'Location',

    'footer.rights': 'All rights reserved.',
    'footer.built': 'Designed and coded by Ghada Turki.',
    'footer.top': 'Back to top',
    'footer.fin': 'FIN · GT·2026',

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
