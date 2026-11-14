/**
 * SOURCE UNIQUE DU CONTENU (FR / EN).
 *
 * Source de vérité : le CV de novembre 2026 (« a ajouter/CV_Ghada_TURKI.pdf » et sa version
 * anglaise). Les détails de projets qui ne figurent pas sur le CV viennent des textes que Ghada
 * avait déjà validés pour ce site ; rien n'est inventé. Les écarts restants sont listés dans
 * RAPPORT.md.
 *
 * Le texte du projet TUNIAOS (titre, ligne de cadre, quatre puces) est repris mot pour mot.
 * Les champs localisés ont la forme { fr, en } ; les composants lisent champ[language].
 * Les espaces insécables françaises (avant ? ! : ; ») sont ajoutées automatiquement (fixFr).
 */

export type Lang = 'fr' | 'en'
export type L = { fr: string; en: string }
export type LList = { fr: string[]; en: string[] }
/** Les trois disciplines du site (filtres, pastilles, compteurs). */
export type Channel = 'mech' | 'elec' | 'soft'

/* ------------------------------------------------------------------ */
/* Typographie française : espace fine insécable avant ? ! : ; et »    */
/* ------------------------------------------------------------------ */
const NNBSP = ' '
export function frSpacing(s: string): string {
  return s.replace(/ ([?!;:»])/g, `${NNBSP}$1`).replace(/« /g, `«${NNBSP}`)
}
function fixFr<T>(value: T, isFr = false): T {
  if (typeof value === 'string') {
    // « 2023 – 2025 » ne se coupe jamais avant le tiret
    const v = value.replace(/ – /g, ' – ').replace(/ · /g, ' · ')
    return (isFr ? frSpacing(v) : v) as T
  }
  if (Array.isArray(value)) return value.map((v) => fixFr(v, isFr)) as T
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = fixFr(v, isFr || k === 'fr')
    return out as T
  }
  return value
}

/* ------------------------------------------------------------------ */
/* IDENTITÉ                                                            */
/* ------------------------------------------------------------------ */
export const identity = fixFr({
  name: 'Ghada Turki',
  role: {
    fr: 'Ingénieure en génie électromécanique, spécialité mécatronique',
    en: 'Electromechanical engineer, mechatronics specialization',
  } as L,
  shortRole: {
    fr: 'Ingénieure électromécanique · Mécatronique',
    en: 'Electromechanical engineer · Mechatronics',
  } as L,
  headline: {
    fr: 'Je dessine la pièce, je câble la carte, j’écris le code.',
    en: 'I draw the part, wire the board, write the code.',
  } as L,
  tagline: {
    fr: 'Ingénieure diplômée d’ESPRIT, spécialité mécatronique. Je relie conception mécanique, automatisme, systèmes embarqués et intelligence artificielle, du modèle 3D jusqu’au prototype qui fonctionne.',
    en: 'ESPRIT engineering graduate, specialized in mechatronics. I connect mechanical design, automation, embedded systems and artificial intelligence, from the 3D model to a working prototype.',
  } as L,
  availability: { fr: 'Disponible immédiatement', en: 'Available immediately' } as L,
  email: 'turkii.ghada@gmail.com',
  phone: '+216 26 016 352',
  phoneHref: 'tel:+21626016352',
  location: { fr: 'Hammamet, Tunisie', en: 'Hammamet, Tunisia' } as L,
  linkedin: 'https://www.linkedin.com/in/ghada-turki-20319b217',
  linkedinLabel: 'linkedin.com/in/ghada-turki-20319b217',
  photo: '/ghada-turki-photo.jpg',
  cv: { fr: '/CV_Ghada_Turki.pdf', en: '/CV_Ghada_Turki_EN.pdf' } as L,
  /** URL publique indiquée sur le CV (à confirmer, voir RAPPORT.md). */
  siteUrl: 'https://portfolio-gh-seven.vercel.app',
  /** conservé pour l'ancien composant HeroCalibration (non affiché) */
  introLine: {
    fr: 'Ingénieure électromécanique · Mécatronique',
    en: 'Electromechanical engineer · Mechatronics',
  } as L,
})

/* ------------------------------------------------------------------ */
/* DISCIPLINES (libellés des filtres et pastilles)                     */
/* ------------------------------------------------------------------ */
export const disciplines: { key: Channel; label: L; short: L; proof: L }[] = fixFr([
  {
    key: 'mech' as Channel,
    label: { fr: 'Mécanique', en: 'Mechanical' },
    short: { fr: 'Mécanique', en: 'Mechanical' },
    proof: { fr: 'SolidWorks · CATIA V5 · Blender', en: 'SolidWorks · CATIA V5 · Blender' },
  },
  {
    key: 'elec' as Channel,
    label: { fr: 'Électronique & Automatisme', en: 'Electronics & Automation' },
    short: { fr: 'Électronique', en: 'Electronics' },
    proof: { fr: 'ESP32 · STM32 · Siemens S7-1200', en: 'ESP32 · STM32 · Siemens S7-1200' },
  },
  {
    key: 'soft' as Channel,
    label: { fr: 'Logiciel & IA', en: 'Software & AI' },
    short: { fr: 'Logiciel & IA', en: 'Software & AI' },
    proof: { fr: 'Python · Random Forest · LSTM', en: 'Python · Random Forest · LSTM' },
  },
])
/** alias conservé pour l'ancien composant HeroCalibration (non affiché) */
export const worlds = disciplines

/* ------------------------------------------------------------------ */
/* ACCROCHE                                                            */
/* ------------------------------------------------------------------ */
export const pitch = fixFr({
  question: {
    fr: 'Vous cherchez une ingénieure qui conçoit, câble, code et déploie l’IA ?',
    en: 'Looking for an engineer who designs, wires, codes and deploys AI?',
  } as L,
  answer: { fr: 'Elle est devant vous.', en: 'You’re looking at her.' } as L,
  proofs: [
    {
      figure: { fr: '19/20', en: '19/20' },
      title: { fr: 'Meilleure note de projet de fin d’études', en: 'Best final-year project grade' },
      detail: {
        fr: 'Mastère professionnel en mécatronique à l’ISTIC (2023 – 2025).',
        en: 'Professional Master’s in Mechatronics at ISTIC (2023 – 2025).',
      },
    },
    {
      figure: { fr: 'Depuis 2023', en: 'Since 2023' },
      title: { fr: 'Un banc en service chez MATECH', en: 'A rig in service at MATECH' },
      detail: {
        fr: 'L’émulateur de pannes pour groupe électrogène conçu pendant mon PFE de licence (Guard Revolution AMF25, Arduino) y est utilisé depuis 2023.',
        en: 'The generator-set fault emulator built during my bachelor’s final project (Guard Revolution AMF25, Arduino) has been in use there since 2023.',
      },
    },
    {
      figure: { fr: '13', en: '13' },
      title: { fr: 'Certifications', en: 'Certifications' },
      detail: {
        fr: 'Dont deux SOLIDWORKS Professional (Simulation, Sheet Metal) et deux certificats NVIDIA en intelligence artificielle.',
        en: 'Including two SOLIDWORKS Professional (Simulation, Sheet Metal) and two NVIDIA certificates in artificial intelligence.',
      },
    },
    {
      figure: { fr: 'IA · IoT · RA', en: 'AI · IoT · AR' },
      title: { fr: 'Un jumeau numérique complet', en: 'A complete digital twin' },
      detail: {
        fr: 'PFE chez TUNIAOS : modèles Random Forest et LSTM pour la RUL, chaîne ESP32, MQTT et Node-RED, interface de réalité augmentée sous Unity.',
        en: 'Final-year project at TUNIAOS: Random Forest and LSTM models for RUL, an ESP32, MQTT and Node-RED chain, and an augmented-reality interface in Unity.',
      },
    },
  ] as { figure: L; title: L; detail: L }[],
})

/* ------------------------------------------------------------------ */
/* À PROPOS                                                            */
/* ------------------------------------------------------------------ */
export const about = fixFr({
  paragraphs: {
    fr: [
      'Je suis ingénieure en génie électromécanique, diplômée d’ESPRIT avec la spécialité mécatronique (2024 – 2026). Auparavant, j’ai obtenu à l’ISTIC un Mastère professionnel en mécatronique, avec la meilleure note de projet de fin d’études : 19/20.',
      'Mon domaine, c’est la jonction entre la mécanique, l’électronique et le logiciel. Je modélise sous SolidWorks et CATIA V5, je programme aussi bien des cartes ESP32 ou STM32 que des automates Siemens, et j’entraîne des modèles d’IA en Python. Mon projet de fin d’études chez TUNIAOS réunit tout cela : un jumeau numérique qui associe IA, IoT et réalité augmentée au service de la maintenance prédictive.',
      'J’ai aussi appris à travailler en équipe multiculturelle, en France lors de l’Erasmus+ Glocal Leadership Summer School de l’Université Côte d’Azur (2026), et en Türkiye comme volontaire AIESEC (2023).',
    ],
    en: [
      'I am an electromechanical engineer, graduated from ESPRIT with a specialization in mechatronics (2024 – 2026). Before that, I earned a Professional Master’s in Mechatronics at ISTIC, with the best final-year project grade: 19/20.',
      'My field is where mechanics, electronics and software meet. I model in SolidWorks and CATIA V5, program ESP32 or STM32 boards as well as Siemens PLCs, and train AI models in Python. My final-year project at TUNIAOS brings all of this together: a digital twin that combines AI, IoT and augmented reality for predictive maintenance.',
      'I have also learned to work in multicultural teams, in France at the Erasmus+ Glocal Leadership Summer School of Université Côte d’Azur (2026), and in Türkiye as an AIESEC volunteer (2023).',
    ],
  } as LList,
  facts: [
    {
      label: { fr: 'Diplôme', en: 'Degree' },
      value: { fr: 'Ingénieure en génie électromécanique, ESPRIT 2026', en: 'Electromechanical Engineering degree, ESPRIT 2026' },
    },
    { label: { fr: 'Spécialité', en: 'Specialization' }, value: { fr: 'Mécatronique', en: 'Mechatronics' } },
    { label: { fr: 'Disponibilité', en: 'Availability' }, value: { fr: 'Immédiate', en: 'Immediate' } },
    { label: { fr: 'Basée à', en: 'Based in' }, value: { fr: 'Hammamet, Tunisie', en: 'Hammamet, Tunisia' } },
    {
      label: { fr: 'Langues', en: 'Languages' },
      value: { fr: 'Arabe (langue maternelle), français B2, anglais B2', en: 'Arabic (native), French B2, English B2' },
    },
  ] as { label: L; value: L }[],
})

/* ------------------------------------------------------------------ */
/* EXPÉRIENCE PROFESSIONNELLE (CV, dans l'ordre du CV)                  */
/* ------------------------------------------------------------------ */
export interface Experience {
  id: string
  company: string
  kind: L
  title: L
  place: L
  period: L
  /** AAAA-MM, pour l'attribut datetime */
  start: string
  end: string
  bullets: LList
  disciplines: Channel[]
  tech: string[]
  /** fiche ou étude de cas correspondante dans la section Projets */
  projectId: string
  /** vrai : l'étude de cas porte le détail, la ligne de parcours renvoie vers elle */
  caseStudy?: boolean
}

export const experiences: Experience[] = fixFr([
  {
    id: 'tuniaos',
    company: 'TUNIAOS',
    kind: { fr: 'Projet de fin d’études – Ingénieur', en: 'Final Year Project – Engineer' },
    title: {
      fr: 'Conception et réalisation d’un jumeau numérique intelligent intégrant l’IA et l’IoT pour la surveillance et la maintenance prédictive d’un système industriel',
      en: 'Design and implementation of an intelligent digital twin integrating AI and IoT for monitoring and predictive maintenance of an industrial system',
    },
    place: { fr: 'TUNIAOS – Tunisie', en: 'TUNIAOS – Tunisia' },
    period: { fr: 'Mars 2026 – Septembre 2026', en: 'March 2026 – September 2026' },
    start: '2026-03',
    end: '2026-09',
    bullets: {
      fr: [
        'Conçu un jumeau numérique reproduisant le fonctionnement de la machine industrielle et permettant de visualiser son état et de simuler différents scénarios.',
        'Développé des modèles de détection et de pronostic des défaillances basés sur Random Forest et LSTM avec Python, incluant l’estimation de la durée de vie résiduelle (RUL).',
        'Intégré une architecture IoT temps réel basée sur ESP32, MQTT et Node-RED pour la collecte, la transmission et la supervision des données.',
        'Développé une interface de réalité augmentée avec Unity, Vuforia et C#, intégrant des modèles 3D réalisés sous SolidWorks et Blender pour faciliter l’exploration de la machine et le diagnostic.',
      ],
      en: [
        'Designed a digital twin reproducing the operation of the industrial machine, making it possible to visualize its status and simulate different scenarios.',
        'Developed failure detection and prognosis models based on Random Forest and LSTM with Python, including Remaining Useful Life (RUL) estimation.',
        'Integrated a real-time IoT architecture based on ESP32, MQTT and Node-RED for data collection, transmission and monitoring.',
        'Developed an augmented reality interface with Unity, Vuforia and C#, integrating 3D models created in SolidWorks and Blender to facilitate machine exploration and diagnosis.',
      ],
    },
    disciplines: ['mech', 'elec', 'soft'],
    tech: ['Python', 'Random Forest', 'LSTM', 'ESP32', 'MQTT', 'Node-RED', 'Unity', 'Vuforia', 'C#', 'SolidWorks', 'Blender'],
    projectId: 'tuniaos',
    caseStudy: true,
  },
  {
    id: 'matech-master',
    company: 'MATECH',
    kind: { fr: 'Mémoire de fin d’études – Mastère', en: 'Final Thesis – Master’s Degree' },
    title: {
      fr: 'GenARino – Application de réalité augmentée pour la formation et la maintenance industrielle',
      en: 'GenARino – Augmented reality application for industrial training and maintenance',
    },
    place: { fr: 'MATECH – Mégrine, Tunisie', en: 'MATECH – Mégrine, Tunisia' },
    period: { fr: 'Mars 2025 – Septembre 2025', en: 'March 2025 – September 2025' },
    start: '2025-03',
    end: '2025-09',
    bullets: {
      fr: [
        'Développé une application mobile de réalité augmentée avec Unity, Vuforia et C# pour identifier les composants d’un groupe électrogène VISA et accompagner les opérations de maintenance.',
        'Réalisé la modélisation 3D du groupe électrogène et de ses composants sous SolidWorks et Blender, ainsi qu’un émulateur physique basé sur Arduino.',
        'Intégré un quiz d’évaluation et un plan de maintenance préventive ; solution validée par les techniciens et la direction.',
      ],
      en: [
        'Developed a mobile augmented reality application with Unity, Vuforia and C# to identify the components of a VISA generator set and support maintenance operations.',
        'Carried out the 3D modeling of the generator set and its components in SolidWorks and Blender, as well as a physical emulator based on Arduino.',
        'Integrated an assessment quiz and a preventive maintenance plan; solution validated by the technicians and management.',
      ],
    },
    disciplines: ['mech', 'elec', 'soft'],
    tech: ['Unity', 'Vuforia', 'C#', 'SolidWorks', 'Blender', 'Arduino'],
    projectId: 'genarino',
    caseStudy: true,
  },
  {
    id: 'gd-tunisie',
    company: 'GD Tunisie',
    kind: { fr: 'Stage d’ingénieur – Cycle ingénieur', en: 'Engineering Internship – Engineering Cycle' },
    title: {
      fr: 'Digitalisation du suivi de production et automatisation du comptage industriel',
      en: 'Digitalization of production tracking and automation of industrial counting',
    },
    place: { fr: 'GD Tunisie – Bir Bouregba, Tunisie', en: 'GD Tunisie – Bir Bouregba, Tunisia' },
    period: { fr: 'Juillet 2025 – Août 2025', en: 'July 2025 – August 2025' },
    start: '2025-07',
    end: '2025-08',
    bullets: {
      fr: [
        'Développé une application Python de suivi de production intégrant l’identification des opérateurs par QR code, la gestion des shifts, un tableau de bord et l’export Excel, en remplacement du suivi papier.',
        'Conçu et mis en service un poste de comptage automatique en bout de ligne (capteur E3F-DS30C4, Arduino et SolidWorks), connecté à l’application de suivi.',
      ],
      en: [
        'Developed a Python production tracking application featuring operator identification by QR code, shift management, a dashboard and Excel export, replacing paper-based tracking.',
        'Designed and commissioned an automatic end-of-line counting station (E3F-DS30C4 sensor, Arduino and SolidWorks), connected to the tracking application.',
      ],
    },
    disciplines: ['mech', 'elec', 'soft'],
    tech: ['Python', 'QR code', 'Arduino', 'E3F-DS30C4', 'SolidWorks', 'Excel'],
    projectId: 'gd-tunisie',
  },
  {
    id: 'matech-licence',
    company: 'MATECH',
    kind: { fr: 'Projet de fin d’études – Licence', en: 'Final Year Project – Bachelor’s Degree' },
    title: {
      fr: 'Conception d’un émulateur de pannes et développement d’une application de diagnostic pour groupe électrogène',
      en: 'Design of a fault emulator and development of a diagnostic application for a generator set',
    },
    place: { fr: 'MATECH – Mégrine, Tunisie', en: 'MATECH – Mégrine, Tunisia' },
    period: { fr: 'Février 2023 – Juin 2023', en: 'February 2023 – June 2023' },
    start: '2023-02',
    end: '2023-06',
    bullets: {
      fr: [
        'Conçu un émulateur interactif de pannes pour groupe électrogène, basé sur le contrôleur Guard Revolution AMF25 et Arduino, utilisé chez MATECH depuis 2023.',
        'Développé une application Java associant chaque code de panne à son action corrective et réalisé le dossier de fabrication ainsi que les supports de travaux pratiques.',
      ],
      en: [
        'Designed an interactive fault emulator for generator sets, based on the Guard Revolution AMF25 controller and Arduino, in use at MATECH since 2023.',
        'Developed a Java application linking each fault code to its corrective action and produced the manufacturing file as well as the practical work materials.',
      ],
    },
    disciplines: ['mech', 'elec', 'soft'],
    tech: ['Guard Revolution AMF25', 'Arduino', 'Java', 'Dossier de fabrication'],
    projectId: 'emulateur-pannes',
  },
  {
    id: 'csm-gias',
    company: 'CSM-GIAS',
    kind: { fr: 'Stage de technicien – Licence', en: 'Technician Internship – Bachelor’s Degree' },
    title: {
      fr: 'Conception et prototypage d’un système automatisé de placement de récipients sur convoyeur',
      en: 'Design and prototyping of an automated system for placing containers on a conveyor',
    },
    place: { fr: 'CSM-GIAS – Bouargoub, Tunisie', en: 'CSM-GIAS – Bouargoub, Tunisia' },
    period: { fr: 'Janvier 2022 – Février 2022', en: 'January 2022 – February 2022' },
    start: '2022-01',
    end: '2022-02',
    bullets: {
      fr: ['Conçu sous SolidWorks et prototypé avec Arduino un système de placement automatique de récipients sur un convoyeur Trepko.'],
      en: ['Designed in SolidWorks and prototyped with Arduino a system for automatically placing containers on a Trepko conveyor.'],
    },
    disciplines: ['mech', 'elec'],
    tech: ['SolidWorks', 'Arduino'],
    projectId: 'csm-gias',
  },
  {
    id: 'wewire',
    company: 'WEWIRE',
    kind: { fr: 'Stage d’initiation – Licence', en: 'Introductory Internship – Bachelor’s Degree' },
    title: {
      fr: 'Fabrication de câbles et application des principes du Lean Manufacturing',
      en: 'Cable manufacturing and application of Lean Manufacturing principles',
    },
    place: { fr: 'WEWIRE – Hammamet, Tunisie', en: 'WEWIRE – Hammamet, Tunisia' },
    period: { fr: 'Juillet 2021', en: 'July 2021' },
    start: '2021-07',
    end: '2021-07',
    bullets: {
      fr: ['Analysé le processus de fabrication des câbles et appliqué les principes Lean, notamment la standardisation des postes et la méthode 5S.'],
      en: ['Analyzed the cable manufacturing process and applied Lean principles, notably workstation standardization and the 5S method.'],
    },
    disciplines: ['mech'],
    tech: ['Lean Manufacturing', '5S'],
    projectId: 'wewire',
  },
] as Experience[])

/* ------------------------------------------------------------------ */
/* PROJETS                                                             */
/* ------------------------------------------------------------------ */
export type SchematicKey =
  | 'line-follower'
  | 'tank'
  | 'mcu'
  | 'plc'
  | 'gantry'
  | 'solar'
  | 'bom'
  | 'cycle'
  | 'conveyor'
  | 'lean'

export interface MediaTrack {
  src: string
  lang: Lang
  label: string
  kind: 'captions' | 'subtitles'
}
export interface Media {
  type: 'image' | 'video'
  src: string
  /** image d'attente (vidéo) */
  poster?: string
  width: number
  height: number
  alt?: L
  caption: L
  duration?: L
  tracks?: MediaTrack[]
}

export interface ArchBox {
  title: L
  items: LList
  ch?: Channel
}
export type Architecture =
  | { type: 'hub'; center: ArchBox; spokes: ArchBox[]; caption: L }
  | { type: 'pipeline'; steps: ArchBox[]; outputs?: ArchBox; aside?: ArchBox; caption: L }

export interface Project {
  id: string
  /** repère de nomenclature, ex. P-01 */
  code: string
  flagship?: boolean
  disciplines: Channel[]
  kind: L
  place?: L
  /** absente quand la date n'est pas connue */
  period?: L
  team?: L
  title: L
  subtitle?: L
  summary: L
  tech: string[]
  /** vignette (image réelle) */
  thumb?: string
  thumbAlt?: L
  thumbPosition?: string
  /** schéma dessiné quand aucune image n'existe */
  schematic?: SchematicKey
  context?: L
  work?: LList
  role?: L
  results?: LList
  learned?: L
  media?: Media[]
  architecture?: Architecture
}

const track = (lang: Lang, label: string, kind: MediaTrack['kind']) => ({ lang, label, kind })

export const projects: Project[] = fixFr([
  /* ===================== ÉTUDES DE CAS ===================== */
  {
    id: 'tuniaos',
    code: 'P-01',
    flagship: true,
    disciplines: ['mech', 'elec', 'soft'],
    kind: { fr: 'Projet de fin d’études – Ingénieur', en: 'Final Year Project – Engineer' },
    place: { fr: 'TUNIAOS – Tunisie', en: 'TUNIAOS – Tunisia' },
    period: { fr: 'Mars 2026 – Septembre 2026', en: 'March 2026 – September 2026' },
    title: {
      fr: 'Conception et réalisation d’un jumeau numérique intelligent intégrant l’IA et l’IoT pour la surveillance et la maintenance prédictive d’un système industriel',
      en: 'Design and implementation of an intelligent digital twin integrating AI and IoT for monitoring and predictive maintenance of an industrial system',
    },
    subtitle: { fr: 'Jumeau numérique · TUNIAOS', en: 'Digital twin · TUNIAOS' },
    summary: {
      fr: 'Jumeau numérique intelligent intégrant l’IA et l’IoT pour la surveillance et la maintenance prédictive d’un système industriel.',
      en: 'Intelligent digital twin integrating AI and IoT for monitoring and predictive maintenance of an industrial system.',
    },
    tech: ['Python', 'Random Forest', 'LSTM', 'ESP32', 'MQTT', 'Node-RED', 'Unity', 'Vuforia', 'C#', 'SolidWorks', 'Blender'],
    thumb: '/media/tuniaos-tableau-de-bord.jpg',
    thumbAlt: {
      fr: 'Tableau de bord du jumeau numérique TUNIAOS',
      en: 'TUNIAOS digital twin dashboard',
    },
    work: {
      fr: [
        'Conçu un jumeau numérique reproduisant le fonctionnement de la machine industrielle et permettant de visualiser son état et de simuler différents scénarios.',
        'Développé des modèles de détection et de pronostic des défaillances basés sur Random Forest et LSTM avec Python, incluant l’estimation de la durée de vie résiduelle (RUL).',
        'Intégré une architecture IoT temps réel basée sur ESP32, MQTT et Node-RED pour la collecte, la transmission et la supervision des données.',
        'Développé une interface de réalité augmentée avec Unity, Vuforia et C#, intégrant des modèles 3D réalisés sous SolidWorks et Blender pour faciliter l’exploration de la machine et le diagnostic.',
      ],
      en: [
        'Designed a digital twin reproducing the operation of the industrial machine, making it possible to visualize its status and simulate different scenarios.',
        'Developed failure detection and prognosis models based on Random Forest and LSTM with Python, including Remaining Useful Life (RUL) estimation.',
        'Integrated a real-time IoT architecture based on ESP32, MQTT and Node-RED for data collection, transmission and monitoring.',
        'Developed an augmented reality interface with Unity, Vuforia and C#, integrating 3D models created in SolidWorks and Blender to facilitate machine exploration and diagnosis.',
      ],
    },
    architecture: {
      type: 'hub',
      center: {
        title: { fr: 'Jumeau numérique', en: 'Digital twin' },
        items: {
          fr: ['Fonctionnement de la machine', 'Visualisation de son état', 'Simulation de scénarios'],
          en: ['Machine operation', 'Status visualization', 'Scenario simulation'],
        },
      },
      spokes: [
        {
          ch: 'soft',
          title: { fr: 'IA · Python', en: 'AI · Python' },
          items: {
            fr: ['Random Forest et LSTM', 'Détection et pronostic des défaillances', 'Durée de vie résiduelle (RUL)'],
            en: ['Random Forest and LSTM', 'Failure detection and prognosis', 'Remaining Useful Life (RUL)'],
          },
        },
        {
          ch: 'elec',
          title: { fr: 'IoT temps réel', en: 'Real-time IoT' },
          items: {
            fr: ['ESP32 : collecte', 'MQTT : transmission', 'Node-RED : supervision'],
            en: ['ESP32: collection', 'MQTT: transmission', 'Node-RED: monitoring'],
          },
        },
        {
          ch: 'mech',
          title: { fr: 'Réalité augmentée', en: 'Augmented reality' },
          items: {
            fr: ['Unity, Vuforia et C#', 'Modèles 3D SolidWorks et Blender', 'Exploration et diagnostic'],
            en: ['Unity, Vuforia and C#', 'SolidWorks and Blender 3D models', 'Exploration and diagnosis'],
          },
        },
      ],
      caption: {
        fr: 'Les trois briques que le jumeau numérique réunit, telles que décrites dans les réalisations.',
        en: 'The three building blocks the digital twin brings together, as described in the work.',
      },
    },
    media: [
      {
        type: 'video',
        src: '/videos/tuniaos-tableau-de-bord.mp4',
        poster: '/media/tuniaos-tableau-de-bord.jpg',
        width: 1920,
        height: 1080,
        duration: { fr: '1 min 52 s', en: '1 min 52 s' },
        caption: {
          fr: 'Tableau de bord Node-RED du jumeau numérique : simulation pilotée depuis le PC ou depuis le boîtier de commande, état de la machine, risque de panne prédit et estimation de la durée de vie résiduelle en temps réel.',
          en: 'Node-RED dashboard of the digital twin: simulation driven from the PC or from the control box, machine status, predicted failure risk and real-time Remaining Useful Life estimate.',
        },
        tracks: [
          { src: '/media/tuniaos-tableau-de-bord.fr.vtt', ...track('fr', 'Français', 'captions') },
          { src: '/media/tuniaos-tableau-de-bord.en.vtt', ...track('en', 'English', 'subtitles') },
        ],
      },
      {
        type: 'video',
        src: '/videos/tuniaos-application-ra.mp4',
        poster: '/media/tuniaos-application-ra.jpg',
        width: 1280,
        height: 574,
        duration: { fr: '2 min 15 s', en: '2 min 15 s' },
        caption: {
          fr: 'Application mobile de réalité augmentée : le modèle 3D de la machine apparaît sur un marqueur, déroule son cycle étape par étape, puis affiche son état et le délai estimé avant panne pendant les scénarios simulés.',
          en: 'Augmented-reality mobile app: the 3D model of the machine appears on a marker, runs through its cycle step by step, then shows its status and the estimated time to failure during the simulated scenarios.',
        },
        tracks: [
          { src: '/media/tuniaos-application-ra.fr.vtt', ...track('fr', 'Français', 'captions') },
          { src: '/media/tuniaos-application-ra.en.vtt', ...track('en', 'English', 'subtitles') },
        ],
      },
    ],
  },
  {
    id: 'genarino',
    code: 'P-02',
    flagship: true,
    disciplines: ['mech', 'elec', 'soft'],
    kind: { fr: 'Mémoire de fin d’études – Mastère', en: 'Final Thesis – Master’s Degree' },
    place: { fr: 'MATECH – Mégrine, Tunisie', en: 'MATECH – Mégrine, Tunisia' },
    period: { fr: 'Mars 2025 – Septembre 2025', en: 'March 2025 – September 2025' },
    team: { fr: 'Projet individuel', en: 'Individual project' },
    title: { fr: 'GenARino', en: 'GenARino' },
    subtitle: {
      fr: 'Application de réalité augmentée pour la formation et la maintenance industrielle',
      en: 'Augmented reality application for industrial training and maintenance',
    },
    summary: {
      fr: 'Application mobile de réalité augmentée qui identifie les composants d’un groupe électrogène VISA et accompagne la maintenance, avec quiz et plan de maintenance préventive.',
      en: 'Augmented-reality mobile app that identifies the components of a VISA generator set and supports maintenance, with a quiz and a preventive maintenance plan.',
    },
    tech: ['Unity', 'Vuforia', 'C#', 'SolidWorks', 'Blender', 'Arduino'],
    thumb: '/app.jpg',
    thumbAlt: { fr: 'Écran d’accueil de l’application GenARino', en: 'GenARino app home screen' },
    context: {
      fr: 'Former techniciens et utilisateurs au fonctionnement d’un groupe électrogène VISA, puis les assister à distance pendant la maintenance, coûte cher à MATECH. GenARino affiche l’information directement sur la machine, grâce à la réalité augmentée, pour apprendre sans manipuler l’équipement réel.',
      en: 'Training technicians and users on a VISA generator set, then assisting them remotely during maintenance, is costly for MATECH. GenARino overlays the information directly onto the machine with augmented reality, so people can learn without handling the real equipment.',
    },
    work: {
      fr: [
        'Modélisation 3D du groupe électrogène et de ses composants sous SolidWorks, puis préparation des modèles dans Blender, allégés pour rester fluides sur téléphone.',
        'Application mobile sous Unity, Vuforia et C# : pointé vers la machine, le téléphone superpose le modèle 3D au groupe réel ; le composant concerné ressort en rouge et un toucher l’isole avec ses informations.',
        'Quiz d’évaluation et plan de maintenance préventive intégrés à l’application.',
        'Émulateur physique basé sur Arduino.',
      ],
      en: [
        '3D modeling of the generator set and its components in SolidWorks, then model preparation in Blender, simplified to stay smooth on a phone.',
        'Mobile app built with Unity, Vuforia and C#: pointed at the machine, the phone overlays the 3D model on the real generator; the relevant component turns red and a tap isolates it with its information.',
        'Assessment quiz and preventive maintenance plan built into the app.',
        'Physical emulator based on Arduino.',
      ],
    },
    role: {
      fr: 'Projet mené seule, de la modélisation 3D au développement complet de l’application.',
      en: 'Run on my own, from 3D modeling to full app development.',
    },
    results: {
      fr: [
        'Solution validée par les techniciens et la direction de MATECH.',
        'Trois fonctions livrées : identification des composants en réalité augmentée, quiz d’évaluation, plan de maintenance préventive.',
      ],
      en: [
        'Solution validated by MATECH’s technicians and management.',
        'Three features delivered: augmented-reality component identification, assessment quiz, preventive maintenance plan.',
      ],
    },
    learned: {
      fr: 'Le plus délicat a été d’amener des modèles issus de la CAO dans une application fluide sur téléphone : les alléger fortement sans perdre le réalisme, et obtenir un suivi stable pour que les composants restent alignés sur la vraie machine. J’ai aussi appris à concevoir pour un technicien non spécialiste : la réalité augmentée n’a de valeur que si elle se lit immédiatement sur le terrain.',
      en: 'The hardest part was bringing CAD models into an app that stays smooth on a phone: simplifying them heavily without losing realism, and getting stable tracking so components stay aligned with the real machine. I also learned to design for non-specialist technicians: augmented reality only has value if it reads instantly in the field.',
    },
    architecture: {
      type: 'pipeline',
      steps: [
        { ch: 'mech', title: { fr: 'SolidWorks', en: 'SolidWorks' }, items: { fr: ['CAO 3D du groupe électrogène'], en: ['3D CAD of the generator set'] } },
        { ch: 'mech', title: { fr: 'Blender', en: 'Blender' }, items: { fr: ['Préparation et allègement des modèles'], en: ['Model preparation and simplification'] } },
        { ch: 'soft', title: { fr: 'Unity · Vuforia · C#', en: 'Unity · Vuforia · C#' }, items: { fr: ['Application de réalité augmentée'], en: ['Augmented-reality app'] } },
        { ch: 'soft', title: { fr: 'Téléphone', en: 'Phone' }, items: { fr: ['Modèle superposé à la machine réelle'], en: ['Model overlaid on the real machine'] } },
      ],
      outputs: {
        title: { fr: 'Fonctions', en: 'Features' },
        items: {
          fr: ['Identification des composants', 'Quiz d’évaluation', 'Maintenance préventive'],
          en: ['Component identification', 'Assessment quiz', 'Preventive maintenance'],
        },
      },
      aside: {
        ch: 'elec',
        title: { fr: 'Émulateur physique', en: 'Physical emulator' },
        items: { fr: ['Basé sur Arduino'], en: ['Arduino-based'] },
      },
      caption: {
        fr: 'De la CAO au téléphone : la chaîne de production des contenus de réalité augmentée.',
        en: 'From CAD to phone: how the augmented-reality content is produced.',
      },
    },
    media: [
      {
        type: 'image',
        src: '/app.jpg',
        width: 2400,
        height: 1080,
        alt: {
          fr: 'Écran d’accueil de GenARino avec les boutons Explore the Generator (AR), Learn More, Take the Quiz et About Us',
          en: 'GenARino home screen with the Explore the Generator (AR), Learn More, Take the Quiz and About Us buttons',
        },
        caption: { fr: 'Écran d’accueil de l’application.', en: 'App home screen.' },
      },
      {
        type: 'image',
        src: '/8.jpg',
        width: 734,
        height: 336,
        alt: {
          fr: 'Modèle 3D du groupe électrogène ouvert dans Blender',
          en: '3D model of the generator set open in Blender',
        },
        caption: { fr: 'Préparation du modèle 3D dans Blender.', en: 'Preparing the 3D model in Blender.' },
      },
    ],
  },
  {
    id: 'crack-scout',
    code: 'P-03',
    flagship: true,
    disciplines: ['elec', 'soft'],
    kind: { fr: 'Projet académique', en: 'Academic project' },
    place: { fr: 'ESPRIT – Tunisie', en: 'ESPRIT – Tunisia' },
    period: { fr: '2025', en: '2025' },
    team: { fr: 'Équipe de 6', en: 'Team of 6' },
    title: { fr: 'Crack Scout', en: 'Crack Scout' },
    subtitle: { fr: 'Robot de détection de fissures', en: 'Crack-detection robot' },
    summary: {
      fr: 'Robot mobile équipé d’une ESP32-CAM, dont les images sont analysées par un modèle de vision VGG16 entraîné par transfer learning.',
      en: 'Mobile robot fitted with an ESP32-CAM, whose images are analyzed by a VGG16 vision model trained with transfer learning.',
    },
    tech: ['Python', 'VGG16', 'Transfer Learning', 'ESP32-CAM', 'MATLAB'],
    thumb: '/crac.jpg',
    thumbAlt: { fr: 'Le robot Crack Scout', en: 'The Crack Scout robot' },
    context: {
      fr: 'Inspecter à la main les murs d’un bâtiment est lent, subjectif et parfois risqué, surtout en hauteur ou dans les zones difficiles d’accès. L’équipe a construit un robot mobile, piloté à distance depuis une application mobile, qui embarque une caméra et un modèle d’IA chargé de repérer les fissures.',
      en: 'Inspecting a building’s walls by hand is slow, subjective and sometimes risky, especially at height or in hard-to-reach areas. The team built a mobile robot, remotely driven from a mobile app, that carries a camera and an AI model that spots cracks.',
    },
    work: {
      fr: [
        'Ma partie : la détection par vision et son intégration sur le robot.',
        'Première piste en traitement d’image classique sous MATLAB, puis passage au deep learning : VGG16, un réseau convolutif préentraîné, réentraîné par transfer learning sur un jeu d’images de fissures issu de Kaggle.',
        'Architecture déportée : l’ESP32-CAM ne peut pas faire tourner un modèle aussi lourd que VGG16. Elle capture et transmet donc les images, et le PC exécute l’inférence.',
      ],
      en: [
        'My part: vision-based detection and its integration on the robot.',
        'A first attempt with classic image processing in MATLAB, then a switch to deep learning: VGG16, a pretrained convolutional network, retrained with transfer learning on a Kaggle crack-image dataset.',
        'Offloaded architecture: the ESP32-CAM cannot run a model as heavy as VGG16. It captures and sends the images, and the PC runs the inference.',
      ],
    },
    results: {
      fr: [
        '96 % de précision (accuracy) sur la détection de fissures.',
        'Chaîne complète fonctionnelle : la caméra du robot transmet les images, le PC les analyse et signale les fissures en direct.',
      ],
      en: [
        '96% accuracy on crack detection.',
        'Full chain working end to end: the robot’s camera sends the images, the PC analyzes them and flags cracks live.',
      ],
    },
    learned: {
      fr: 'Ne pas m’enfermer dans la première méthode : passer du traitement d’image classique au deep learning a donné une solution plus simple et plus précise. J’ai aussi appris à raisonner « système », en répartissant la capture et le calcul entre la carte et le PC.',
      en: 'Don’t lock into the first method: moving from classic image processing to deep learning gave a simpler and more accurate solution. I also learned to think at system level, splitting capture and computation between the board and the PC.',
    },
    architecture: {
      type: 'pipeline',
      steps: [
        { ch: 'elec', title: { fr: 'Robot mobile', en: 'Mobile robot' }, items: { fr: ['Piloté depuis une application mobile'], en: ['Driven from a mobile app'] } },
        { ch: 'elec', title: { fr: 'ESP32-CAM', en: 'ESP32-CAM' }, items: { fr: ['Capture et envoi des images'], en: ['Captures and sends images'] } },
        { ch: 'soft', title: { fr: 'PC · VGG16', en: 'PC · VGG16' }, items: { fr: ['Inférence, modèle entraîné par transfer learning'], en: ['Inference, model trained with transfer learning'] } },
        { ch: 'soft', title: { fr: 'Fissure signalée', en: 'Crack flagged' }, items: { fr: ['En direct'], en: ['Live'] } },
      ],
      caption: {
        fr: 'La carte capture, le PC calcule : le modèle est trop lourd pour tourner sur l’ESP32.',
        en: 'The board captures, the PC computes: the model is too heavy to run on the ESP32.',
      },
    },
    media: [
      {
        type: 'video',
        src: '/video.mp4',
        poster: '/media/crack-scout-video.jpg',
        width: 640,
        height: 368,
        duration: { fr: '47 s', en: '47 s' },
        caption: { fr: 'Le robot en déplacement pendant un essai.', en: 'The robot moving during a test run.' },
      },
      {
        type: 'image',
        src: '/crac.jpg',
        width: 1392,
        height: 768,
        alt: { fr: 'Le robot Crack Scout posé sur un établi', en: 'The Crack Scout robot on a workbench' },
        caption: { fr: 'Visuel de présentation du robot.', en: 'Presentation visual of the robot.' },
      },
    ],
  },

  /* ===================== AUTRES RÉALISATIONS ===================== */
  {
    id: 'gd-tunisie',
    code: 'P-04',
    disciplines: ['mech', 'elec', 'soft'],
    kind: { fr: 'Stage d’ingénieur · GD Tunisie', en: 'Engineering internship · GD Tunisie' },
    period: { fr: 'Juillet – Août 2025', en: 'July – August 2025' },
    team: { fr: 'Individuel', en: 'Individual' },
    title: { fr: 'Suivi de production digitalisé et comptage automatique', en: 'Digital production tracking and automatic counting' },
    summary: {
      fr: 'Une application Python remplace le suivi papier d’un fabricant de câbles, reliée à un poste de comptage automatique en bout de ligne.',
      en: 'A Python application replaces a cable manufacturer’s paper tracking, linked to an automatic end-of-line counting station.',
    },
    tech: ['Python', 'QR code', 'Arduino', 'E3F-DS30C4', 'SolidWorks', 'Excel'],
    thumb: '/GD12.png',
    thumbAlt: { fr: 'Prototype du poste de comptage relié à un ordinateur', en: 'Counting station prototype connected to a laptop' },
    context: {
      fr: 'Chez GD Tunisie, fabricant de câbles, le suivi de production se faisait entièrement sur papier.',
      en: 'At GD Tunisie, a cable manufacturer, production tracking was done entirely on paper.',
    },
    work: {
      fr: [
        'Application Python : ajout d’un ouvrier avec photo et QR code, QR codes d’opération, début et fin de shift, tableau de bord avec historique et export Excel.',
        'Poste de comptage en bout de ligne, conçu sous SolidWorks : un capteur E3F-DS30C4 relié à une carte Arduino détecte chaque câble terminé et l’ajoute au comptage.',
        'Le poste de comptage est connecté à l’application de suivi.',
      ],
      en: [
        'Python application: adding a worker with photo and QR code, operation QR codes, shift start and end, a dashboard with history and Excel export.',
        'End-of-line counting station designed in SolidWorks: an E3F-DS30C4 sensor wired to an Arduino board detects each finished cable and adds it to the count.',
        'The counting station is connected to the tracking application.',
      ],
    },
    role: { fr: 'Conception et développement en autonomie, sur site.', en: 'Designed and developed autonomously, on site.' },
    results: {
      fr: ['Poste de comptage conçu et mis en service, connecté à l’application qui remplace le suivi papier.'],
      en: ['Counting station designed and commissioned, connected to the application that replaces paper tracking.'],
    },
    learned: {
      fr: 'Partir d’un besoin concret d’atelier : remplacer un suivi papier par un outil numérique simple, pensé pour être utilisé chaque jour par les opérateurs.',
      en: 'Starting from a real shop-floor need: replacing paper tracking with a simple digital tool designed for operators to use every day.',
    },
    media: [
      { type: 'image', src: '/GD12.png', width: 681, height: 513, alt: { fr: 'Prototype du poste de comptage : capteur sur rail, carte Arduino et ordinateur portable', en: 'Counting station prototype: sensor on a rail, Arduino board and laptop' }, caption: { fr: 'Prototype du poste de comptage.', en: 'Counting station prototype.' } },
      { type: 'image', src: '/gd4.png', width: 936, height: 566, alt: { fr: 'Tableau de bord de suivi des câbles et des opérations, avec export Excel', en: 'Cable and operation tracking dashboard with Excel export' }, caption: { fr: 'Tableau de bord et export Excel.', en: 'Dashboard and Excel export.' } },
      { type: 'image', src: '/gd.png', width: 732, height: 637, alt: { fr: 'Menu de l’application de gestion de production', en: 'Production management app menu' }, caption: { fr: 'Menu principal.', en: 'Main menu.' } },
      { type: 'image', src: '/gd6.png', width: 608, height: 511, alt: { fr: 'Écran de début de shift', en: 'Shift start screen' }, caption: { fr: 'Début de shift.', en: 'Shift start.' } },
      { type: 'image', src: '/gd11.png', width: 605, height: 340, alt: { fr: 'Écran de fin de shift avec la quantité produite', en: 'Shift end screen with the quantity produced' }, caption: { fr: 'Fin de shift.', en: 'Shift end.' } },
      { type: 'image', src: '/gd3.png', width: 622, height: 238, alt: { fr: 'Génération d’un QR code d’opération', en: 'Generating an operation QR code' }, caption: { fr: 'QR code d’opération.', en: 'Operation QR code.' } },
    ],
  },
  {
    id: 'emulateur-pannes',
    code: 'P-05',
    disciplines: ['mech', 'elec', 'soft'],
    kind: { fr: 'PFE de licence · MATECH', en: 'Bachelor’s final project · MATECH' },
    period: { fr: 'Février – Juin 2023', en: 'February – June 2023' },
    team: { fr: 'Binôme', en: 'Pair' },
    title: { fr: 'Émulateur de pannes et application de diagnostic', en: 'Fault emulator and diagnostic app' },
    summary: {
      fr: 'Un banc qui reproduit les pannes d’un groupe électrogène pour former au diagnostic en toute sécurité, utilisé chez MATECH depuis 2023.',
      en: 'A rig that reproduces generator-set faults to train diagnosis safely, in use at MATECH since 2023.',
    },
    tech: ['Guard Revolution AMF25', 'Arduino', 'Java', 'Dossier de fabrication'],
    thumb: '/groupe.jpg',
    thumbAlt: { fr: 'Face avant de l’émulateur de pannes MATECH', en: 'Front panel of the MATECH fault emulator' },
    context: {
      fr: 'Apprendre à diagnostiquer un groupe électrogène suppose de pouvoir reproduire ses pannes, ce qui est risqué, voire impossible, sur une machine en service.',
      en: 'Learning to diagnose a generator set means being able to reproduce its faults, which is risky, if not impossible, on a machine in service.',
    },
    work: {
      fr: [
        'Banc construit autour du contrôleur Guard Revolution AMF25, d’une carte Arduino et de composants électriques ; des potentiomètres déclenchent les pannes à la demande (batterie déchargée, démarreur défaillant, surchauffe…).',
        'Application Java qui associe chaque code de panne à son action corrective.',
        'Dossier de fabrication et supports de travaux pratiques.',
      ],
      en: [
        'Rig built around the Guard Revolution AMF25 controller, an Arduino board and electrical components; potentiometers trigger faults on demand (flat battery, faulty starter, overheating…).',
        'Java application linking each fault code to its corrective action.',
        'Manufacturing file and practical work materials.',
      ],
    },
    role: {
      fr: 'Banc conçu en binôme ; application de diagnostic développée seule.',
      en: 'Rig designed as a pair; diagnostic app developed on my own.',
    },
    results: {
      fr: ['Banc utilisé chez MATECH depuis 2023 pour former au diagnostic.'],
      en: ['Rig in use at MATECH since 2023 for diagnosis training.'],
    },
    learned: {
      fr: 'Le contrôleur Guard Revolution était une technologie entièrement nouvelle pour moi : j’ai appris à apprivoiser un équipement industriel inconnu par la documentation et l’expérimentation, puis à en faire un outil pédagogique.',
      en: 'The Guard Revolution controller was entirely new to me: I learned to master unfamiliar industrial equipment through documentation and experimentation, then turn it into a teaching tool.',
    },
    media: [
      { type: 'image', src: '/groupe.jpg', width: 1280, height: 960, alt: { fr: 'Face avant de l’émulateur : schéma du moteur, contrôleur et commandes', en: 'Emulator front panel: engine diagram, controller and switches' }, caption: { fr: 'Face avant du banc.', en: 'Front of the rig.' } },
      { type: 'image', src: '/projet  groupe.jpg', width: 2048, height: 1536, alt: { fr: 'Armoire électrique de l’émulateur, câblée', en: 'Wired electrical cabinet of the emulator' }, caption: { fr: 'Câblage de l’armoire.', en: 'Cabinet wiring.' } },
      { type: 'video', src: '/video1.mp4', poster: '/media/emulateur-video1.jpg', width: 832, height: 464, duration: { fr: '1 min 02 s', en: '1 min 02 s' }, caption: { fr: 'Commandes et potentiomètres du banc.', en: 'The rig’s switches and potentiometers.' } },
      { type: 'video', src: '/video2.mp4', poster: '/media/emulateur-video2.jpg', width: 832, height: 464, duration: { fr: '13 s', en: '13 s' }, caption: { fr: 'Gros plan sur le moteur reproduit.', en: 'Close-up of the reproduced engine.' } },
      { type: 'video', src: '/video3.mp4', poster: '/media/emulateur-video3.jpg', width: 832, height: 464, duration: { fr: '16 s', en: '16 s' }, caption: { fr: 'Le banc en fonctionnement.', en: 'The rig in operation.' } },
      { type: 'image', src: '/phone1.jpg', width: 720, height: 1600, alt: { fr: 'Application de diagnostic : liste des équipements', en: 'Diagnostic app: equipment list' }, caption: { fr: 'Application de diagnostic.', en: 'Diagnostic app.' } },
      { type: 'image', src: '/Phone.jpg', width: 720, height: 1600, alt: { fr: 'Application de diagnostic : fiche d’une alarme', en: 'Diagnostic app: alarm detail' }, caption: { fr: 'Fiche d’une alarme.', en: 'Alarm detail.' } },
      { type: 'image', src: '/phone 4.jpg', width: 720, height: 1600, alt: { fr: 'Application de diagnostic : boutons du contrôleur', en: 'Diagnostic app: controller buttons' }, caption: { fr: 'Boutons du contrôleur.', en: 'Controller buttons.' } },
    ],
  },
  {
    id: 'csm-gias',
    code: 'P-06',
    disciplines: ['mech', 'elec'],
    kind: { fr: 'Stage de technicien · CSM-GIAS', en: 'Technician internship · CSM-GIAS' },
    period: { fr: 'Janvier – Février 2022', en: 'January – February 2022' },
    title: { fr: 'Placement automatique de récipients sur convoyeur', en: 'Automatic container placement on a conveyor' },
    summary: {
      fr: 'Conçu sous SolidWorks et prototypé avec Arduino : un système qui place automatiquement les récipients sur un convoyeur Trepko.',
      en: 'Designed in SolidWorks and prototyped with Arduino: a system that automatically places containers on a Trepko conveyor.',
    },
    tech: ['SolidWorks', 'Arduino'],
    schematic: 'conveyor',
  },
  {
    id: 'mes',
    code: 'P-07',
    disciplines: ['elec', 'soft'],
    kind: { fr: 'Projet académique · ESPRIT', en: 'Academic project · ESPRIT' },
    period: { fr: '2026', en: '2026' },
    team: { fr: 'Individuel', en: 'Individual' },
    title: { fr: 'MES : suivi de production en temps réel', en: 'MES: real-time production tracking' },
    summary: {
      fr: 'Carte d’acquisition Arduino et interface WinDev : arrêts avec MTTR et MTBF, production conforme et non conforme, consommations. Projet noté 19/20.',
      en: 'Arduino acquisition board and WinDev interface: stoppages with MTTR and MTBF, conforming and non-conforming output, consumption. Graded 19/20.',
    },
    tech: ['WinDev', 'Arduino', 'MTTR / MTBF'],
    thumb: '/mes1.png',
    thumbAlt: { fr: 'Interface du MES', en: 'MES interface' },
    thumbPosition: 'top',
    context: {
      fr: 'Un MES capte ce qui se passe sur la ligne et le transforme en indicateurs exploitables, entre l’atelier et le pilotage.',
      en: 'A MES captures what happens on the line and turns it into usable indicators, between the shop floor and management.',
    },
    work: {
      fr: [
        'Acquisition : une carte Arduino lit les capteurs (niveau de matière première, température) ainsi que les signaux de production et d’arrêt.',
        'Logiciel : interface MES et base de données sous WinDev, avec le suivi des arrêts (type, date, heure) et le calcul du MTTR et du MTBF, la production journalière conforme, non conforme et totale, et les consommations.',
      ],
      en: [
        'Acquisition: an Arduino board reads the sensors (raw-material level, temperature) and the production and stoppage signals.',
        'Software: MES interface and database in WinDev, with stoppage tracking (type, date, time) and MTTR and MTBF computation, daily conforming, non-conforming and total output, and consumption.',
      ],
    },
    role: { fr: 'Projet réalisé seule, de la carte d’acquisition à l’interface.', en: 'Built on my own, from the acquisition board to the interface.' },
    results: {
      fr: ['Système complet qui acquiert les données en temps réel et restitue les indicateurs.', 'Projet noté 19/20.'],
      en: ['A complete system that acquires data in real time and reports the indicators.', 'Graded 19/20.'],
    },
    learned: {
      fr: 'Passer des formules de fiabilité à un calcul juste du MTBF et du MTTR à partir de vraies données d’arrêt.',
      en: 'Going from reliability formulas to a correct MTBF and MTTR computation based on real stoppage data.',
    },
    media: [
      { type: 'image', src: '/mes1.png', width: 1107, height: 1008, alt: { fr: 'Interface MES : capteurs, température, MTBF et MTTR', en: 'MES interface: sensors, temperature, MTBF and MTTR' }, caption: { fr: 'Vue de supervision.', en: 'Supervision view.' } },
      { type: 'image', src: '/MES2.png', width: 1915, height: 946, alt: { fr: 'Tableau de suivi dans l’interface WinDev', en: 'Tracking table in the WinDev interface' }, caption: { fr: 'Suivi des arrêts.', en: 'Stoppage tracking.' } },
      { type: 'image', src: '/MES3.png', width: 1913, height: 945, alt: { fr: 'Liste des arrêts dans l’interface WinDev', en: 'Stoppage list in the WinDev interface' }, caption: { fr: 'Historique.', en: 'History.' } },
      { type: 'image', src: '/mes4.png', width: 1917, height: 951, alt: { fr: 'Tableau de production dans l’interface WinDev', en: 'Production table in the WinDev interface' }, caption: { fr: 'Production journalière.', en: 'Daily output.' } },
    ],
  },
  {
    id: 'siemens',
    code: 'P-08',
    disciplines: ['elec'],
    kind: { fr: 'Projet académique · ESPRIT', en: 'Academic project · ESPRIT' },
    period: { fr: '2025', en: '2025' },
    team: { fr: 'Individuel', en: 'Individual' },
    title: { fr: 'Automatisme industriel sur automate Siemens', en: 'Industrial automation on a Siemens PLC' },
    summary: {
      fr: 'Commande d’un servovariateur SINAMICS S210, intégration de l’IO-Link, de la RFID et d’un compteur d’énergie en Ladder, supervision par IHM sur maquette industrielle.',
      en: 'Control of a SINAMICS S210 servo drive, integration of IO-Link, RFID and an energy meter in Ladder, with HMI supervision on an industrial mock-up.',
    },
    tech: ['TIA Portal', 'SINAMICS S210', 'IO-Link', 'RFID', 'Ladder', 'IHM'],
    schematic: 'plc',
    context: {
      fr: 'Faire fonctionner ensemble des technologies très différentes (servovariateur, capteurs en réseau, compteur d’énergie) dans un même système piloté : un vrai sujet d’intégration, mené seule en 5ᵉ année.',
      en: 'Making very different technologies (servo drive, networked sensors, energy meter) work together in one controlled system: a real integration challenge, run on my own in my fifth year.',
    },
    work: {
      fr: [
        'Mise en service du servovariateur SINAMICS S210 avec Startdrive, régulation de vitesse et de position.',
        'Communication IO-Link et capteur RFID RF210, en lecture et en écriture d’étiquettes.',
        'Compteur d’énergie pour suivre la qualité de l’énergie.',
        'Écrans IHM sur pupitre TP700 pour superviser et piloter l’ensemble, sous TIA Portal.',
      ],
      en: [
        'Commissioning of the SINAMICS S210 servo drive with Startdrive, speed and position control.',
        'IO-Link communication and RF210 RFID sensor, reading and writing tags.',
        'Energy meter to monitor power quality.',
        'HMI screens on a TP700 panel to supervise and drive the system, in TIA Portal.',
      ],
    },
    role: {
      fr: 'Configuration matérielle et réseau, programmation de l’automate et conception des écrans IHM.',
      en: 'Hardware and network configuration, PLC programming and HMI screen design.',
    },
    results: {
      fr: ['Système complet sur la maquette : servo asservi en vitesse et en position, RFID via IO-Link, suivi de l’énergie, le tout supervisé depuis le pupitre IHM.'],
      en: ['A complete system on the mock-up: servo controlled in speed and position, RFID over IO-Link, energy monitoring, all supervised from the HMI panel.'],
    },
    learned: {
      fr: 'Faire cohabiter commande d’axe, IO-Link, RFID et mesure d’énergie dans un projet cohérent, et penser la supervision du point de vue de l’opérateur.',
      en: 'Making motion control, IO-Link, RFID and energy metering coexist in one coherent project, and designing supervision from the operator’s point of view.',
    },
  },
  {
    id: 'reservoir-iot',
    code: 'P-09',
    disciplines: ['elec', 'soft'],
    kind: { fr: 'Projet académique · ESPRIT', en: 'Academic project · ESPRIT' },
    period: { fr: '2026', en: '2026' },
    team: { fr: 'Équipe de 3', en: 'Team of 3' },
    title: { fr: 'Réservoir intelligent connecté', en: 'Connected smart tank' },
    summary: {
      fr: 'Une chaîne IoT ESP32, MQTT, Node-RED et Firebase surveille le niveau d’eau et pilote la pompe automatiquement.',
      en: 'An ESP32, MQTT, Node-RED and Firebase IoT chain monitors the water level and drives the pump automatically.',
    },
    tech: ['ESP32', 'MQTT', 'Node-RED', 'Firebase', 'Wokwi'],
    schematic: 'tank',
    context: {
      fr: 'Construire une chaîne IoT complète et son tableau de bord sur un cas concret : surveiller le niveau d’eau d’un réservoir et commander une pompe en fonction de ce niveau.',
      en: 'Building a complete IoT chain and its dashboard on a concrete case: monitoring a tank’s water level and driving a pump based on it.',
    },
    work: {
      fr: [
        'Un capteur de niveau immergé mesure le niveau ; l’ESP32 récupère la mesure et la publie en MQTT.',
        'Tableau de bord Node-RED en temps réel, données historisées dans Firebase.',
        'Déclenchement automatique de la pompe selon le niveau.',
        'Système développé et testé en simulation sous Wokwi comme avec de vrais composants.',
      ],
      en: [
        'An immersed level sensor measures the level; the ESP32 reads it and publishes it over MQTT.',
        'Real-time Node-RED dashboard, data logged in Firebase.',
        'Automatic pump control based on the level.',
        'Developed and tested both in Wokwi simulation and with real components.',
      ],
    },
    role: {
      fr: 'Travail en équipe de 3 sur toute la chaîne, du capteur à Firebase, et sur le tableau de bord de supervision.',
      en: 'Teamwork (3 people) on the whole chain, from sensor to Firebase, and on the supervision dashboard.',
    },
    results: {
      fr: ['Niveau suivi en direct, pompe déclenchée au bon niveau, données historisées ; validé en simulation et en réel.'],
      en: ['Level tracked live, pump triggered at the right level, data logged; validated in simulation and on hardware.'],
    },
    learned: {
      fr: 'Transformer un flux de mesures en information lisible en temps réel, et comprendre la logique publication/abonnement de MQTT pour relier chaque maillon jusqu’à la commande de la pompe.',
      en: 'Turning a stream of measurements into readable real-time information, and understanding MQTT’s publish/subscribe model to link every step up to pump control.',
    },
  },
  {
    id: 'pick-place',
    code: 'P-10',
    disciplines: ['elec'],
    kind: { fr: 'Projet académique · ESPRIT', en: 'Academic project · ESPRIT' },
    period: { fr: '2024', en: '2024' },
    team: { fr: 'Équipe de 5', en: 'Team of 5' },
    title: { fr: 'Pick & Place automatisé sur S7-1200', en: 'Automated pick & place on an S7-1200' },
    summary: {
      fr: 'Empilage automatique de caisses modélisé en GRAFCET, programmé en Ladder et validé en simulation 3D sous Factory I/O.',
      en: 'Automatic crate stacking modeled in GRAFCET, programmed in Ladder and validated in 3D simulation with Factory I/O.',
    },
    tech: ['S7-1200', 'GRAFCET', 'Ladder', 'Factory I/O'],
    schematic: 'gantry',
    context: {
      fr: 'Automatiser une opération de pick & place : empiler des caisses du bas vers le haut sans intervention, et valider le programme automate en simulation avant tout matériel.',
      en: 'Automating a pick & place operation: stacking crates bottom to top with no intervention, and validating the PLC program in simulation before any hardware.',
    },
    work: {
      fr: [
        'Modélisation du fonctionnement en GRAFCET, puis traduction en Ladder pour l’automate Siemens S7-1200.',
        'Gestion de l’empilage avec deux compteurs, horizontal et vertical, qui suivent la position de chaque caisse et déclenchent l’étape suivante.',
        'Validation sous Factory I/O, qui reproduit l’usine en 3D.',
      ],
      en: [
        'Operation modeled in GRAFCET, then translated into Ladder for the Siemens S7-1200 PLC.',
        'Stacking managed with two counters, horizontal and vertical, that track each crate’s position and trigger the next step.',
        'Validation in Factory I/O, which recreates the plant in 3D.',
      ],
    },
    role: {
      fr: 'Travail en équipe de 5 : modélisation GRAFCET et programmation Ladder de l’empilage.',
      en: 'Team of 5: GRAFCET modeling and Ladder programming of the stacking.',
    },
    results: {
      fr: ['Cycle automatique complet en simulation : caisses empilées de façon fiable, du bas vers le haut.'],
      en: ['Full automatic cycle in simulation: crates stacked reliably, bottom to top.'],
    },
    learned: {
      fr: 'Enchaîner les étapes au bon moment, et mesurer l’intérêt de la simulation pour valider un programme automate avant le terrain.',
      en: 'Chaining steps at the right moment, and seeing the value of simulation to validate a PLC program before going on site.',
    },
  },
  {
    id: 'stm32',
    code: 'P-11',
    disciplines: ['elec'],
    kind: { fr: 'Projet académique · ESPRIT', en: 'Academic project · ESPRIT' },
    period: { fr: '2024', en: '2024' },
    team: { fr: 'Équipe de 3', en: 'Team of 3' },
    title: { fr: 'Système embarqué temps réel sur STM32', en: 'Real-time embedded system on STM32' },
    summary: {
      fr: 'Communications I2C et UART, capteur à ultrasons, moteur, boutons et afficheur LCD, validés en simulation sous Proteus ISIS.',
      en: 'I2C and UART communication, ultrasonic sensor, motor, buttons and LCD display, validated in simulation with Proteus ISIS.',
    },
    tech: ['STM32', 'I2C', 'UART', 'Proteus ISIS'],
    schematic: 'mcu',
    context: {
      fr: 'Maîtriser deux protocoles incontournables de l’embarqué, I2C et UART, en les mettant en œuvre sur un microcontrôleur STM32 au sein d’un petit montage.',
      en: 'Mastering two essential embedded protocols, I2C and UART, by implementing them on an STM32 microcontroller in a small setup.',
    },
    work: {
      fr: [
        'Montage développé sur STM32 et simulé sous Proteus ISIS : capteur à ultrasons, moteur, boutons et afficheur LCD.',
        'Mise en œuvre d’une communication I2C et d’une liaison série UART.',
      ],
      en: [
        'Setup developed on STM32 and simulated in Proteus ISIS: ultrasonic sensor, motor, buttons and LCD display.',
        'Implementation of I2C communication and a UART serial link.',
      ],
    },
    results: {
      fr: ['Montage fonctionnel en simulation, qui démontre les communications I2C et UART sur STM32.'],
      en: ['A setup working in simulation, demonstrating I2C and UART communication on STM32.'],
    },
    learned: {
      fr: 'Comprendre comment plusieurs composants partagent un même bus (I2C) et comment établir une liaison série (UART). La simulation sous Proteus valide le montage et le code avant tout matériel.',
      en: 'Understanding how several components share one bus (I2C) and how to set up a serial link (UART). Simulating in Proteus validates the setup and code before any hardware.',
    },
  },
  {
    id: 'bras-6-axes',
    code: 'P-12',
    disciplines: ['mech', 'elec'],
    kind: { fr: 'Projet académique', en: 'Academic project' },
    period: { fr: '2024', en: '2024' },
    team: { fr: 'Individuel', en: 'Individual' },
    title: { fr: 'Bras robotisé 6 axes : gravure sur bois', en: '6-axis robotic arm: wood engraving' },
    summary: {
      fr: 'Conception sous CATIA V5 de la pièce et de son support, puis programmation sous RT ToolBox des trajectoires qui gravent le motif « MECA ».',
      en: 'Part and fixture designed in CATIA V5, then RT ToolBox toolpaths programmed to engrave the “MECA” pattern.',
    },
    tech: ['CATIA V5', 'RT ToolBox', 'Robot 6 axes'],
    thumb: '/rttoolbox.png',
    thumbAlt: { fr: 'Simulation du bras robotisé sous RT ToolBox', en: 'Robotic arm simulation in RT ToolBox' },
    context: {
      fr: 'Projet libre dont j’ai choisi le sujet : prendre en main un bras robotisé à 6 axes via son logiciel de programmation et lui faire réaliser une gravure. L’enjeu : passer d’un motif dessiné sur ordinateur à un mouvement précis exécuté par le robot.',
      en: 'An open project whose topic I chose: getting to grips with a 6-axis robotic arm through its programming software and having it engrave a pattern. The challenge: going from a pattern drawn on a computer to a precise motion executed by the robot.',
    },
    work: {
      fr: [
        'Conception sous CATIA V5 de la pièce à graver, portant le motif « MECA », et du support monté sur le bras.',
        'Programmation du bras 6 axes sous RT ToolBox : définition des trajectoires pour suivre fidèlement le tracé du motif.',
      ],
      en: [
        'CATIA V5 design of the part to engrave, bearing the “MECA” pattern, and of the fixture mounted on the arm.',
        'Programming the 6-axis arm in RT ToolBox: defining toolpaths that faithfully follow the pattern.',
      ],
    },
    results: {
      fr: ['Un programme fonctionnel qui fait suivre et graver le motif au bras, du modèle CAO jusqu’au mouvement du robot.'],
      en: ['A working program that makes the arm follow and engrave the pattern, from the CAD model to the robot’s motion.'],
    },
    learned: {
      fr: 'Programmer un robot industriel : définir des trajectoires propres et sûres, et faire en sorte qu’un motif dessiné en CAO se traduise fidèlement en mouvement.',
      en: 'Programming an industrial robot: defining clean, safe toolpaths and making a CAD pattern translate faithfully into motion.',
    },
    media: [
      { type: 'image', src: '/rttoolbox.png', width: 822, height: 521, alt: { fr: 'Bras robotisé gravant le motif MECA dans la simulation RT ToolBox', en: 'Robotic arm engraving the MECA pattern in the RT ToolBox simulation' }, caption: { fr: 'Trajectoire de gravure simulée sous RT ToolBox.', en: 'Engraving toolpath simulated in RT ToolBox.' } },
    ],
  },
  {
    id: 'suiveur-ligne',
    code: 'P-13',
    disciplines: ['mech', 'elec'],
    kind: { fr: 'Projet académique', en: 'Academic project' },
    title: { fr: 'Robot suiveur de ligne, anti-obstacles et parking', en: 'Line-following, obstacle-avoiding, self-parking robot' },
    summary: {
      fr: 'Robot mobile autonome qui suit une ligne, évite les obstacles et se gare seul, grâce à des capteurs infrarouges et à ultrasons.',
      en: 'Autonomous mobile robot that follows a line, avoids obstacles and parks itself, using infrared and ultrasonic sensors.',
    },
    tech: ['Arduino', 'SolidWorks', 'Capteurs IR', 'Ultrasons', 'Robotique mobile'],
    schematic: 'line-follower',
    role: {
      fr: 'Conception mécanique sous SolidWorks, électronique et programmation des comportements sous Arduino.',
      en: 'Mechanical design in SolidWorks, electronics and behavior programming on Arduino.',
    },
    learned: {
      fr: 'Robotique mobile, asservissement par capteurs et logique de commande embarquée.',
      en: 'Mobile robotics, sensor-based control and embedded control logic.',
    },
  },
  {
    id: 'photovoltaique',
    code: 'P-14',
    disciplines: ['elec'],
    kind: { fr: 'Atelier · ESPRIT', en: 'Workshop · ESPRIT' },
    period: { fr: '2026', en: '2026' },
    team: { fr: 'Individuel', en: 'Individual' },
    title: { fr: 'Dimensionnement photovoltaïque', en: 'Photovoltaic system sizing' },
    summary: {
      fr: 'Deux installations dimensionnées sous PVSyst, résidentielle et pompage solaire, du choix des composants au calcul des sections de câbles.',
      en: 'Two installations sized in PVSyst, residential and solar pumping, from component selection to cable cross-section calculation.',
    },
    tech: ['PVSyst'],
    schematic: 'solar',
    context: {
      fr: 'Une installation mal dimensionnée gaspille de l’énergie ou coûte inutilement cher. Objectif : dimensionner correctement deux installations et valider leurs performances par simulation.',
      en: 'A poorly sized installation wastes energy or costs more than it should. Goal: size two installations correctly and validate their performance by simulation.',
    },
    work: {
      fr: [
        'Dimensionnement d’une installation résidentielle, puis d’un système de pompage solaire.',
        'Choix des panneaux et des équipements selon les besoins.',
        'Calcul des sections de câbles selon les normes.',
        'Simulation des performances sous PVSyst pour valider les choix.',
      ],
      en: [
        'Sizing a residential installation, then a solar pumping system.',
        'Selecting panels and equipment to match the needs.',
        'Computing cable cross-sections to standards.',
        'Simulating performance in PVSyst to validate the choices.',
      ],
    },
    results: {
      fr: ['Deux installations correctement dimensionnées, câbles calculés selon les normes, performances confirmées par la simulation.'],
      en: ['Two correctly sized installations, cables computed to standards, performance confirmed by simulation.'],
    },
    learned: {
      fr: 'Le photovoltaïque était un domaine nouveau pour moi : chaque choix découle d’un calcul et d’une norme, jamais d’une approximation.',
      en: 'Photovoltaics was a new field for me: every choice follows from a calculation and a standard, never an approximation.',
    },
  },
  {
    id: 'erp-sap',
    code: 'P-15',
    disciplines: ['soft'],
    kind: { fr: 'Projet académique · ESPRIT', en: 'Academic project · ESPRIT' },
    period: { fr: '2026', en: '2026' },
    team: { fr: 'Binôme', en: 'Pair' },
    title: { fr: 'ERP SAP S/4HANA : modélisation d’un vélo', en: 'SAP S/4HANA ERP: modeling a bicycle' },
    summary: {
      fr: 'Nomenclature, gammes de fabrication et flux MM, PP et EAM paramétrés sur SAP S/4HANA pour gérer achats, production et maintenance.',
      en: 'Bill of materials, routings and MM, PP and EAM flows configured in SAP S/4HANA to manage procurement, production and maintenance.',
    },
    tech: ['SAP S/4HANA'],
    schematic: 'bom',
    context: {
      fr: 'Un ERP relie les achats, la production et la maintenance autour d’une même base de données. Objectif : modéliser entièrement un vélo sur SAP S/4HANA et faire tourner les flux correspondants.',
      en: 'An ERP links procurement, production and maintenance around a single database. Goal: fully model a bicycle in SAP S/4HANA and run the corresponding flows.',
    },
    work: {
      fr: [
        'MM (Materials Management) : achats et fournisseurs.',
        'PP (Production Planning) : nomenclature du vélo, gammes de fabrication et postes de travail.',
        'EAM (Enterprise Asset Management) : maintenance des équipements.',
      ],
      en: [
        'MM (Materials Management): procurement and suppliers.',
        'PP (Production Planning): the bicycle’s bill of materials, routings and work centers.',
        'EAM (Enterprise Asset Management): equipment maintenance.',
      ],
    },
    role: {
      fr: 'Travail en binôme ; nous avons toutes deux touché à l’ensemble des modules, de la création des données de base au suivi des flux.',
      en: 'Pair work; we both worked across all modules, from master data creation to following the flows.',
    },
    results: {
      fr: ['Paramétrage fonctionnel : produit modélisé, modules configurés, flux de gestion qui tournent de bout en bout.'],
      en: ['A working setup: product modeled, modules configured, management flows running end to end.'],
    },
    learned: {
      fr: 'La rigueur des données de base conditionne tout : une nomenclature ou une gamme mal saisie dérègle toute la chaîne.',
      en: 'Master-data rigor drives everything: one wrong bill of materials or routing throws the whole chain off.',
    },
  },
  {
    id: 'gmao',
    code: 'P-16',
    disciplines: ['soft'],
    kind: { fr: 'Projet académique · ISET Nabeul', en: 'Academic project · ISET Nabeul' },
    period: { fr: '2022', en: '2022' },
    title: { fr: 'GMAO : structurer la maintenance d’un parc', en: 'CMMS: structuring fleet maintenance' },
    summary: {
      fr: 'Paramétrage d’un logiciel de GMAO : déclaration de panne, gestion de l’intervention, état des équipements et historique.',
      en: 'Configuring CMMS software: fault reporting, work order management, equipment status and history.',
    },
    tech: ['GMAO'],
    schematic: 'cycle',
    context: {
      fr: 'Découvrir et mettre en œuvre une GMAO pour suivre les pannes, les interventions et l’état des équipements d’un parc machines.',
      en: 'Discovering and implementing a CMMS to track breakdowns, interventions and equipment status across a machine fleet.',
    },
    work: {
      fr: ['Paramétrage d’un logiciel de GMAO existant.', 'Saisie des données du parc : machines, équipements, pièces de rechange, techniciens.'],
      en: ['Configuring existing CMMS software.', 'Entering the fleet data: machines, equipment, spare parts, technicians.'],
    },
    results: {
      fr: ['Une GMAO opérationnelle, qui trace le cycle panne, intervention, remise en service et conserve l’historique du parc.'],
      en: ['An operational CMMS that traces the breakdown, intervention, return-to-service cycle and keeps the fleet history.'],
    },
    learned: {
      fr: 'Sans un parc correctement décrit, le suivi des pannes et des interventions perd son sens : une première approche concrète de l’organisation de la maintenance.',
      en: 'Without a properly described fleet, tracking breakdowns and interventions makes no sense: a first hands-on look at how maintenance is organized.',
    },
  },
  {
    id: 'wewire',
    code: 'P-17',
    disciplines: ['mech'],
    kind: { fr: 'Stage d’initiation · WEWIRE', en: 'Introductory internship · WEWIRE' },
    period: { fr: 'Juillet 2021', en: 'July 2021' },
    title: { fr: 'Fabrication de câbles et Lean Manufacturing', en: 'Cable manufacturing and Lean Manufacturing' },
    summary: {
      fr: 'Analyse du processus de fabrication des câbles et application des principes Lean : standardisation des postes et méthode 5S.',
      en: 'Analysis of the cable manufacturing process and application of Lean principles: workstation standardization and the 5S method.',
    },
    tech: ['Lean Manufacturing', '5S'],
    schematic: 'lean',
  },
] as Project[])

/* ------------------------------------------------------------------ */
/* COMPÉTENCES (groupes et libellés du CV)                              */
/*  match : jetons cherchés dans les « tech » des projets               */
/*  refs  : projets rattachés explicitement                            */
/* ------------------------------------------------------------------ */
export interface SkillItem {
  label: L
  match?: string[]
  refs?: string[]
}
export interface SkillGroup {
  id: string
  title: L
  disciplines: Channel[]
  items: SkillItem[]
}
const s = (fr: string, en?: string, match?: string[], refs?: string[]): SkillItem => ({
  label: { fr, en: en ?? fr },
  match,
  refs,
})

export const skillGroups: SkillGroup[] = fixFr([
  {
    id: 'automation',
    title: { fr: 'Automatisation & contrôle-commande', en: 'Automation & control systems' },
    disciplines: ['elec'],
    items: [
      s('Siemens SIMATIC S7-1200', undefined, ['S7-1200']),
      s('TIA Portal'),
      s('Ladder (LAD)', undefined, ['Ladder']),
      s('GRAFCET'),
      s('Logique séquentielle', 'Sequential logic'),
      s('IHM/SCADA', 'HMI/SCADA', ['IHM']),
      s('IO-Link'),
      s('RFID'),
      s('SINAMICS S210'),
      s('Factory I/O'),
    ],
  },
  {
    id: 'embedded',
    title: { fr: 'Systèmes embarqués & IoT', en: 'Embedded systems & IoT' },
    disciplines: ['elec'],
    items: [
      s('STM32'),
      s('ESP32 / ESP32-S3 / ESP32-CAM', undefined, ['ESP32', 'ESP32-CAM']),
      s('Arduino'),
      s('C/C++ embarqué', 'Embedded C/C++'),
      s('I2C, UART et SPI', 'I2C, UART and SPI', ['I2C', 'UART']),
      s('ADC'),
      s('Capteurs et actionneurs industriels', 'Industrial sensors and actuators'),
      s('MQTT'),
      s('Node-RED'),
      s('Firebase'),
    ],
  },
  {
    id: 'ai',
    title: { fr: 'Intelligence artificielle & analyse de données', en: 'Artificial intelligence & data analysis' },
    disciplines: ['soft'],
    items: [
      s('Python'),
      s('PyTorch'),
      s('scikit-learn'),
      s('pandas'),
      s('Random Forest'),
      s('LSTM'),
      s('Séries temporelles', 'Time series'),
      s('Vision par ordinateur (VGG16, Transfer Learning)', 'Computer vision (VGG16, Transfer Learning)', ['VGG16']),
      s('Jumeau numérique', 'Digital twin', [], ['tuniaos']),
      s('PHM/RUL'),
      s('CRISP-DM'),
    ],
  },
  {
    id: 'cad',
    title: { fr: 'Conception mécanique & CAO', en: 'Mechanical design & CAD' },
    disciplines: ['mech'],
    items: [
      s('SolidWorks'),
      s('CATIA V5'),
      s('Blender'),
      s('Conception 3D', '3D design'),
      s('Simulation par éléments finis', 'Finite element simulation'),
      s('Prototypage', 'Prototyping'),
      s('Dossiers de fabrication', 'Manufacturing files', ['Dossier de fabrication']),
    ],
  },
  {
    id: 'ar-robotics',
    title: { fr: 'Réalité augmentée & robotique', en: 'Augmented reality & robotics' },
    disciplines: ['soft', 'elec'],
    items: [
      s('Unity'),
      s('Vuforia'),
      s('C#'),
      s('Bras robotisé 6 axes', '6-axis robotic arm', ['Robot 6 axes']),
      s('RT ToolBox'),
      s('Robotique mobile autonome', 'Autonomous mobile robotics', ['Robotique mobile']),
    ],
  },
  {
    id: 'industrial',
    title: { fr: 'Génie industriel & qualité', en: 'Industrial engineering & quality' },
    disciplines: [],
    items: [
      s('Lean Manufacturing'),
      s('Lean Six Sigma/DMAIC'),
      s('AMDEC', 'FMEA (AMDEC)'),
      s('SMED'),
      s('VSM'),
      s('5S'),
      s('PDCA'),
      s('MTTR/MTBF', undefined, ['MTTR / MTBF']),
      s('GMAO', 'CMMS (GMAO)', ['GMAO']),
      s('MES', undefined, [], ['mes']),
      s('SAP S/4HANA (MM, PP, EAM)', undefined, ['SAP S/4HANA']),
      s('Odoo'),
      s('ISO 45001 et ISO 14001', 'ISO 45001 and ISO 14001'),
    ],
  },
] as SkillGroup[])

export const languages: { name: L; level: L }[] = fixFr([
  { name: { fr: 'Arabe', en: 'Arabic' }, level: { fr: 'Langue maternelle', en: 'Native' } },
  { name: { fr: 'Français', en: 'French' }, level: { fr: 'B2, intermédiaire avancé', en: 'B2, upper-intermediate' } },
  { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'B2, intermédiaire avancé', en: 'B2, upper-intermediate' } },
])

/** Liste d'outils (sans doublon) conservée pour l'ancien composant Conveyor (non affiché). */
export const tools: string[] = [
  'SolidWorks', 'CATIA V5', 'Blender', 'Python', 'C#', 'Java', 'Arduino', 'ESP32', 'STM32',
  'TIA Portal', 'Unity', 'Vuforia', 'Node-RED', 'MQTT', 'RT ToolBox', 'SAP S/4HANA',
]

/* ------------------------------------------------------------------ */
/* CERTIFICATIONS (titres et dates lus sur les certificats)             */
/* ------------------------------------------------------------------ */
export interface Certification {
  /** nom affiché dans son groupe */
  name: string
  /** intitulé complet du certificat */
  fullName: string
  issuer: 'SOLIDWORKS' | 'Dassault Systèmes' | 'NVIDIA'
  group: 'solidworks' | '3dexperience' | 'nvidia'
  level: 'professional' | 'associate' | 'competency'
  /** JJ.MM.AAAA */
  date: string
  file: string
}

export const certifications: Certification[] = [
  { name: 'Simulation Professional', fullName: 'SOLIDWORKS Simulation Professional', issuer: 'SOLIDWORKS', group: 'solidworks', level: 'professional', date: '17.06.2024', file: '/certifications/solidworks-simulation-professional.pdf' },
  { name: 'Sheet Metal Professional', fullName: 'SOLIDWORKS Sheet Metal Professional', issuer: 'SOLIDWORKS', group: 'solidworks', level: 'professional', date: '30.01.2023', file: '/certifications/solidworks-sheet-metal-professional.pdf' },
  { name: 'Simulation Associate', fullName: 'SOLIDWORKS Simulation Associate', issuer: 'SOLIDWORKS', group: 'solidworks', level: 'associate', date: '15.06.2026', file: '/certifications/solidworks-simulation-associate.pdf' },
  { name: 'xDesign Associate', fullName: 'SOLIDWORKS xDesign Associate', issuer: 'SOLIDWORKS', group: 'solidworks', level: 'associate', date: '13.06.2026', file: '/certifications/solidworks-xdesign-associate.pdf' },
  { name: 'xMold Associate', fullName: 'SOLIDWORKS xMold Associate', issuer: 'SOLIDWORKS', group: 'solidworks', level: 'associate', date: '13.06.2026', file: '/certifications/solidworks-xmold-associate.pdf' },
  { name: 'xShape Associate', fullName: 'SOLIDWORKS xShape Associate', issuer: 'SOLIDWORKS', group: 'solidworks', level: 'associate', date: '13.06.2026', file: '/certifications/solidworks-xshape-associate.pdf' },
  { name: 'Electrical Design Associate', fullName: 'SOLIDWORKS Electrical Design Associate', issuer: 'SOLIDWORKS', group: 'solidworks', level: 'associate', date: '10.08.2025', file: '/certifications/solidworks-electrical-design-associate.pdf' },
  { name: 'Sustainability Associate', fullName: 'SOLIDWORKS Sustainability Associate', issuer: 'SOLIDWORKS', group: 'solidworks', level: 'associate', date: '08.08.2025', file: '/certifications/solidworks-sustainability-associate.pdf' },
  { name: 'Additive Manufacturing Associate', fullName: 'SOLIDWORKS Additive Manufacturing Associate', issuer: 'SOLIDWORKS', group: 'solidworks', level: 'associate', date: '07.08.2025', file: '/certifications/solidworks-additive-manufacturing-associate.pdf' },
  { name: 'Design Associate (CSWA)', fullName: 'SOLIDWORKS Design Associate (CSWA)', issuer: 'SOLIDWORKS', group: 'solidworks', level: 'associate', date: '17.01.2023', file: '/certifications/solidworks-design-associate-cswa.pdf' },
  { name: '3DSwymer Associate', fullName: '3DEXPERIENCE 3DSwymer Associate', issuer: 'Dassault Systèmes', group: '3dexperience', level: 'associate', date: '12.12.2025', file: '/certifications/3dswymer-associate.pdf' },
  { name: 'Generative AI with Diffusion Models', fullName: 'NVIDIA · Generative AI with Diffusion Models', issuer: 'NVIDIA', group: 'nvidia', level: 'competency', date: '14.11.2025', file: '/Certificate Generative AI with Diffusion Models.pdf' },
  { name: 'Applications of AI for Predictive Maintenance', fullName: 'NVIDIA · Applications of AI for Predictive Maintenance', issuer: 'NVIDIA', group: 'nvidia', level: 'competency', date: '23.10.2025', file: '/Certificate Applications of AI for Predictive Maintenance.pdf' },
]

export const certificationGroups: { id: Certification['group']; name: string; detail: L }[] = fixFr([
  {
    id: 'solidworks' as const,
    name: 'SOLIDWORKS',
    detail: { fr: 'Dassault Systèmes · certifications CAO, simulation et fabrication', en: 'Dassault Systèmes · CAD, simulation and manufacturing certifications' },
  },
  {
    id: '3dexperience' as const,
    name: '3DEXPERIENCE',
    detail: { fr: 'Dassault Systèmes · plateforme collaborative', en: 'Dassault Systèmes · collaborative platform' },
  },
  {
    id: 'nvidia' as const,
    name: 'NVIDIA',
    detail: { fr: 'Certificats de compétence en intelligence artificielle', en: 'Certificates of competency in artificial intelligence' },
  },
])

/* ------------------------------------------------------------------ */
/* FORMATION (CV)                                                      */
/* ------------------------------------------------------------------ */
export interface Education {
  degree: L
  school: L
  schoolShort: string
  period: string
  distinction?: L
}

export const education: Education[] = fixFr([
  {
    degree: {
      fr: 'Diplôme d’ingénieur en génie électromécanique, spécialité mécatronique',
      en: 'Engineering degree in electromechanical engineering, mechatronics specialization',
    },
    school: {
      fr: 'École Supérieure Privée d’Ingénierie et de Technologies, Tunis',
      en: 'Private Higher School of Engineering and Technologies, Tunis',
    },
    schoolShort: 'ESPRIT',
    period: '2024 – 2026',
    distinction: {
      fr: '2e de ma classe pendant toutes mes études',
      en: '2nd in my class throughout my studies',
    },
  },
  {
    degree: { fr: 'Mastère professionnel en mécatronique', en: 'Professional Master’s degree in mechatronics' },
    school: {
      fr: 'Institut Supérieur des Technologies de l’Information et de la Communication',
      en: 'Higher Institute of Information and Communication Technologies',
    },
    schoolShort: 'ISTIC',
    period: '2023 – 2025',
    distinction: {
      fr: 'Meilleure note de projet de fin d’études · 19/20',
      en: 'Best final-year project grade · 19/20',
    },
  },
  {
    degree: {
      fr: 'Licence appliquée en génie mécanique, spécialité maintenance industrielle',
      en: 'Applied bachelor’s degree in mechanical engineering, industrial maintenance specialization',
    },
    school: {
      fr: 'Institut Supérieur des Études Technologiques de Nabeul',
      en: 'Higher Institute of Technological Studies of Nabeul',
    },
    schoolShort: 'ISET Nabeul',
    period: '2020 – 2023',
  },
] as Education[])

/* ------------------------------------------------------------------ */
/* EXPÉRIENCES INTERNATIONALES & ENGAGEMENTS (CV)                       */
/* ------------------------------------------------------------------ */
export interface Engagement {
  title: L
  org: L
  period: L
  description: L
  /** code pays ISO affiché en étiquette (pas de drapeau emoji) */
  country?: string
  international?: boolean
  file?: { href: string; label: L }
}

export const engagements: Engagement[] = fixFr([
  {
    title: { fr: 'ERASMUS+ Glocal Leadership Summer School Program', en: 'ERASMUS+ Glocal Leadership Summer School Program' },
    org: { fr: 'Université Côte d’Azur – Nice, France', en: 'Université Côte d’Azur – Nice, France' },
    period: { fr: 'Juillet 2026', en: 'July 2026' },
    description: {
      fr: 'Ateliers de leadership et travail en équipes multiculturelles sur des enjeux liés à l’énergie, à l’eau et au développement durable.',
      en: 'Leadership workshops and multicultural teamwork on issues related to energy, water and sustainable development.',
    },
    country: 'FR',
    international: true,
  },
  {
    title: { fr: 'AIESEC Global Volunteer, projet Youth 4 Impact', en: 'AIESEC Global Volunteer, Youth 4 Impact project' },
    org: { fr: 'İzmit, Türkiye', en: 'İzmit, Türkiye' },
    period: { fr: 'Juillet 2023 – Août 2023', en: 'July 2023 – August 2023' },
    description: {
      fr: 'Animation d’activités éducatives en anglais autour des Objectifs de développement durable (ODD).',
      en: 'Led educational activities in English around the Sustainable Development Goals (SDGs).',
    },
    country: 'TR',
    international: true,
    file: { href: '/Certification.pdf', label: { fr: 'Certificat AIESEC (PDF)', en: 'AIESEC certificate (PDF)' } },
  },
  {
    title: { fr: 'Vie associative, clubs CAO et Cyberobot', en: 'Student associations, CAD and Cyberobot clubs' },
    org: { fr: 'ISET Nabeul', en: 'ISET Nabeul' },
    period: { fr: '2020 – 2023', en: '2020 – 2023' },
    description: {
      fr: 'Participation à des activités de CAO, de robotique et de sensibilisation environnementale.',
      en: 'Participation in CAD, robotics and environmental awareness activities.',
    },
  },
  {
    title: {
      fr: 'Engagement environnemental, Association d’Éducation Relative à l’Environnement de Hammamet',
      en: 'Environmental commitment, Association for Environmental Education of Hammamet',
    },
    org: { fr: 'Hammamet, Tunisie', en: 'Hammamet, Tunisia' },
    period: { fr: '2017 – 2021', en: '2017 – 2021' },
    description: {
      fr: 'Participation à des actions de préservation des écosystèmes marins et terrestres.',
      en: 'Participation in actions to preserve marine and terrestrial ecosystems.',
    },
  },
] as Engagement[])
