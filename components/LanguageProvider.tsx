'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { frSpacing, type Lang } from '@/lib/content'

interface LanguageContextType {
  language: Lang
  setLanguage: (lang: Lang) => void
  /** chaîne d'interface ; {n} est remplacé par vars.n */
  t: (key: string, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/* Chaînes d'interface uniquement : tout le contenu du profil est dans lib/content.ts. */
const ui: Record<Lang, Record<string, string>> = {
  fr: {
    'a11y.skip': 'Aller au contenu',
    'a11y.menuOpen': 'Ouvrir le menu',
    'a11y.menuClose': 'Fermer le menu',
    'a11y.primaryNav': 'Navigation principale',
    'a11y.footerNav': 'Navigation de pied de page',
    'a11y.home': 'Ghada Turki, retour en haut de page',
    'lang.label': 'Langue du site',
    'theme.toLight': 'Passer au thème clair',
    'theme.toDark': 'Passer au thème sombre',

    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.experience': 'Expérience',
    'nav.skills': 'Compétences',
    'nav.certifications': 'Certifications',
    'nav.education': 'Formation',
    'nav.contact': 'Contact',

    'intro.label': 'Introduction animée',
    'intro.skip': 'Passer',
    'intro.skipLabel': 'Passer l’introduction',
    'intro.replay': 'Rejouer l’intro',

    'hero.viewWork': 'Voir les projets',
    'hero.contact': 'Me contacter',
    'hero.cv': 'Télécharger le CV',
    'hero.cvShort': 'CV',
    'hero.cvLabel': 'Télécharger le CV (PDF)',
    'hero.chain': 'Réalisations par discipline',
    'hero.chainItem': '{label} : {n} réalisations',
    'hero.portrait': 'Portrait de Ghada Turki',

    'pitch.kicker': 'Note de synthèse',
    'pitch.proof': 'Preuve',
    'pitch.cta': 'Me contacter',
    'pitch.or': 'ou écrivez directement à',

    'section.sheet': 'Planche',
    'section.subject': 'Objet',

    'about.kicker': 'Profil',
    'about.title': 'À propos',
    'about.facts': 'Fiche d’identité',
    'about.email': 'E-mail',
    'about.phone': 'Téléphone',
    'about.profile': 'Réalisations par discipline',
    'about.profileNote': 'Une réalisation peut relever de plusieurs disciplines.',
    'about.barLabel': '{label} : {n} réalisations sur {total}, afficher la liste',
    'about.stat.experiences': 'expériences professionnelles',
    'about.stat.works': 'réalisations',
    'about.stat.degrees': 'diplômes',
    'about.stat.international': 'expériences internationales',

    'projects.kicker': 'Réalisations',
    'projects.title': 'Projets',
    'projects.intro': 'Trois études de cas détaillées, puis l’index de toutes mes réalisations, filtrable par discipline.',
    'projects.case': 'Étude de cas',
    'projects.frame': 'Cadre',
    'projects.place': 'Lieu',
    'projects.period': 'Période',
    'projects.team': 'Équipe',
    'projects.tools': 'Outils',
    'projects.context': 'Contexte',
    'projects.work': 'Réalisation',
    'projects.workList': 'Réalisations',
    'projects.architecture': 'Architecture',
    'projects.results': 'Résultats',
    'projects.demos': 'Le système en fonctionnement',
    'projects.visuals': 'Visuels',
    'projects.role': 'Mon rôle',
    'projects.learned': 'Ce que j’en retiens',
    'projects.video': 'Vidéo',
    'projects.image': 'Image',
    'projects.captions': 'Sous-titres disponibles (FR, EN)',
    'projects.index.kicker': 'Nomenclature',
    'projects.index.title': 'Toutes les réalisations',
    'projects.index.note': 'Repère, cadre, disciplines et outils de chaque réalisation. Les trois premières renvoient aux études de cas ci-dessus.',
    'projects.filter': 'Filtrer les réalisations par discipline',
    'projects.all': 'Tout',
    'projects.shown': '{n} réalisations affichées',
    'projects.shownOne': '{n} réalisation affichée',
    'projects.open': 'Voir la fiche',
    'projects.toCase': 'Voir l’étude de cas',
    'projects.close': 'Fermer la fiche',
    'projects.prev': 'Réalisation précédente',
    'projects.next': 'Réalisation suivante',
    'projects.position': '{i} sur {n}',
    'projects.schematic': 'Schéma de principe',

    'experience.kicker': 'Parcours',
    'experience.title': 'Expérience professionnelle',
    'experience.caseLink': 'Lire l’étude de cas complète',
    'experience.caseNote': 'Cette mission est détaillée dans son étude de cas, avec le schéma d’architecture et les visuels.',
    'experience.projectLink': 'Voir la fiche du projet',

    'skills.kicker': 'Boîte à outils',
    'skills.title': 'Compétences techniques',
    'skills.legend': 'Le chiffre indique le nombre de réalisations de ce portfolio qui mobilisent la compétence.',
    'skills.usedIn': 'utilisée dans {n} réalisations',
    'skills.usedInOne': 'utilisée dans {n} réalisation',
    'skills.languages': 'Langues',
    'skills.transverse': 'Transverse',

    'certs.kicker': 'Validations',
    'certs.title': 'Certifications',
    'certs.count': '{n} certifications, 3 éditeurs',
    'certs.professional': 'Niveau Professional',
    'certs.download': 'Télécharger le certificat',
    'certs.pdf': 'PDF',

    'education.kicker': 'Formation',
    'education.title': 'Formation',

    'engagements.kicker': 'International',
    'engagements.title': 'Expériences internationales et engagements',

    'contact.kicker': 'Contact',
    'contact.title': 'Parlons de votre projet.',
    'contact.intro': 'Le plus simple : un e-mail ou un message sur LinkedIn. Mes CV en français et en anglais sont aussi téléchargeables ici.',
    'contact.email': 'E-mail',
    'contact.copy': 'Copier l’adresse',
    'contact.copied': 'Adresse copiée',
    'contact.write': 'Écrire un e-mail',
    'contact.phone': 'Téléphone',
    'contact.linkedin': 'LinkedIn',
    'contact.location': 'Localisation',
    'contact.cvFr': 'CV en français',
    'contact.cvEn': 'CV en anglais',

    'footer.top': 'Haut de page',
    'footer.rights': 'Tous droits réservés.',
    'footer.sheet': 'Portfolio',
  },
  en: {
    'a11y.skip': 'Skip to content',
    'a11y.menuOpen': 'Open menu',
    'a11y.menuClose': 'Close menu',
    'a11y.primaryNav': 'Main navigation',
    'a11y.footerNav': 'Footer navigation',
    'a11y.home': 'Ghada Turki, back to top',
    'lang.label': 'Site language',
    'theme.toLight': 'Switch to light theme',
    'theme.toDark': 'Switch to dark theme',

    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.certifications': 'Certifications',
    'nav.education': 'Education',
    'nav.contact': 'Contact',

    'intro.label': 'Animated introduction',
    'intro.skip': 'Skip',
    'intro.skipLabel': 'Skip the introduction',
    'intro.replay': 'Replay intro',

    'hero.viewWork': 'View projects',
    'hero.contact': 'Get in touch',
    'hero.cv': 'Download CV',
    'hero.cvShort': 'CV',
    'hero.cvLabel': 'Download the CV (PDF)',
    'hero.chain': 'Projects by discipline',
    'hero.chainItem': '{label}: {n} projects',
    'hero.portrait': 'Portrait of Ghada Turki',

    'pitch.kicker': 'Executive summary',
    'pitch.proof': 'Proof',
    'pitch.cta': 'Get in touch',
    'pitch.or': 'or write directly to',

    'section.sheet': 'Sheet',
    'section.subject': 'Subject',

    'about.kicker': 'Profile',
    'about.title': 'About',
    'about.facts': 'At a glance',
    'about.email': 'Email',
    'about.phone': 'Phone',
    'about.profile': 'Projects by discipline',
    'about.profileNote': 'A project can belong to several disciplines.',
    'about.barLabel': '{label}: {n} of {total} projects, show the list',
    'about.stat.experiences': 'professional experiences',
    'about.stat.works': 'projects',
    'about.stat.degrees': 'degrees',
    'about.stat.international': 'international experiences',

    'projects.kicker': 'Work',
    'projects.title': 'Projects',
    'projects.intro': 'Three in-depth case studies, then an index of all my work, filterable by discipline.',
    'projects.case': 'Case study',
    'projects.frame': 'Context',
    'projects.place': 'Place',
    'projects.period': 'Period',
    'projects.team': 'Team',
    'projects.tools': 'Tools',
    'projects.context': 'Context',
    'projects.work': 'What I built',
    'projects.workList': 'What I built',
    'projects.architecture': 'Architecture',
    'projects.results': 'Results',
    'projects.demos': 'The system in action',
    'projects.visuals': 'Visuals',
    'projects.role': 'My role',
    'projects.learned': 'What I took away',
    'projects.video': 'Video',
    'projects.image': 'Image',
    'projects.captions': 'Captions available (FR, EN)',
    'projects.index.kicker': 'Index',
    'projects.index.title': 'All projects',
    'projects.index.note': 'Reference, context, disciplines and tools for each project. The first three link to the case studies above.',
    'projects.filter': 'Filter projects by discipline',
    'projects.all': 'All',
    'projects.shown': '{n} projects shown',
    'projects.shownOne': '{n} project shown',
    'projects.open': 'View details',
    'projects.toCase': 'Read the case study',
    'projects.close': 'Close details',
    'projects.prev': 'Previous project',
    'projects.next': 'Next project',
    'projects.position': '{i} of {n}',
    'projects.schematic': 'Principle diagram',

    'experience.kicker': 'Career',
    'experience.title': 'Professional experience',
    'experience.caseLink': 'Read the full case study',
    'experience.caseNote': 'This assignment is detailed in its case study, with the architecture diagram and visuals.',
    'experience.projectLink': 'View project details',

    'skills.kicker': 'Toolbox',
    'skills.title': 'Technical skills',
    'skills.legend': 'The number shows how many projects in this portfolio use the skill.',
    'skills.usedIn': 'used in {n} projects',
    'skills.usedInOne': 'used in {n} project',
    'skills.languages': 'Languages',
    'skills.transverse': 'Cross-cutting',

    'certs.kicker': 'Credentials',
    'certs.title': 'Certifications',
    'certs.count': '{n} certifications, 3 issuers',
    'certs.professional': 'Professional level',
    'certs.download': 'Download the certificate',
    'certs.pdf': 'PDF',

    'education.kicker': 'Education',
    'education.title': 'Education',

    'engagements.kicker': 'International',
    'engagements.title': 'International experience and commitments',

    'contact.kicker': 'Contact',
    'contact.title': 'Let’s talk about your project.',
    'contact.intro': 'The simplest way: an email or a message on LinkedIn. My CV in French and in English can also be downloaded here.',
    'contact.email': 'Email',
    'contact.copy': 'Copy address',
    'contact.copied': 'Address copied',
    'contact.write': 'Write an email',
    'contact.phone': 'Phone',
    'contact.linkedin': 'LinkedIn',
    'contact.location': 'Location',
    'contact.cvFr': 'CV in French',
    'contact.cvEn': 'CV in English',

    'footer.top': 'Back to top',
    'footer.rights': 'All rights reserved.',
    'footer.sheet': 'Portfolio',
  },
}

// espaces insécables françaises appliquées une fois pour toutes
for (const k of Object.keys(ui.fr)) ui.fr[k] = frSpacing(ui.fr[k])

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Lang>('fr')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('language')
      if (saved === 'fr' || saved === 'en') setLanguageState(saved)
    } catch {
      /* stockage indisponible : on reste en français */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((lang: Lang) => {
    setLanguageState(lang)
    try {
      window.localStorage.setItem('language', lang)
    } catch {
      /* ignore */
    }
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let out = ui[language][key] ?? ui.fr[key] ?? key
      if (vars) for (const [k, v] of Object.entries(vars)) out = out.replace(`{${k}}`, String(v))
      return out
    },
    [language]
  )

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
