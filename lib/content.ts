/**
 * SINGLE SOURCE OF CONTENT.
 * FACTS are grounded in Ghada Turki's CV; wording is rewritten to be more
 * professional and impactful (still 100% true). Where a fact is unknown it is a
 * visible placeholder "[À COMPLÉTER : …]" / "[TO COMPLETE: …]" (see TODO.md).
 * Localized fields carry { fr, en }; components read field[language].
 *
 * Target: an ELECTROMECHANICAL / MECHATRONICS ENGINEER seeking a full position
 * (not an internship), available after her engineering final-year project (PFE).
 */

export type Lang = 'fr' | 'en'
export type L = { fr: string; en: string }
export type LList = { fr: string[]; en: string[] }

/* ------------------------------------------------------------------ */
/* IDENTITY                                                            */
/* ------------------------------------------------------------------ */
export const identity = {
  name: 'Ghada Turki',
  role: {
    fr: 'Ingénieure en Électromécanique & Mécatronique',
    en: 'Electromechanical & Mechatronics Engineer',
  } as L,
  tagline: {
    fr: 'Je conçois des systèmes mécatroniques de bout en bout — conception mécanique, automatisation, électronique embarquée et intelligence artificielle — pour transformer une idée en machine qui fonctionne.',
    en: 'I engineer mechatronic systems end to end — mechanical design, automation, embedded electronics and machine learning — turning an idea into a machine that works.',
  } as L,
  availability: {
    fr: 'Disponible à partir de septembre 2026',
    en: 'Available from September 2026',
  } as L,
  email: 'ghada.turkiditgaraali@esprit.tn',
  phone: '216-26-016-352',
  location: { fr: 'Hammamet, Nabeul, Tunisie', en: 'Hammamet, Nabeul, Tunisia' } as L,
  linkedin: 'https://www.linkedin.com/in/ghada-turki-20319b217',
  photo: '/ghada-turki-photo.jpg',
  cv: { fr: '/CV_Ghada_Turki.pdf', en: '/resume GhadaTurki.pdf' } as L,
}

/* ------------------------------------------------------------------ */
/* ABOUT                                                              */
/* ------------------------------------------------------------------ */
export const about = {
  paragraphs: {
    fr: [
      'Ingénieure en Électromécanique et titulaire d’un Master professionnel en Mécatronique, je travaille à l’intersection de trois mondes : la mécanique, l’électronique et le logiciel.',
      'De la conception 3D à la carte électronique, du code embarqué jusqu’à l’intelligence artificielle, j’aime porter un projet industriel du concept au prototype fonctionnel. Je termine actuellement mon projet de fin d’études — un jumeau numérique de machine industrielle piloté par machine learning — et je serai disponible dès septembre 2026 pour rejoindre une équipe d’ingénierie ambitieuse.',
    ],
    en: [
      'An Electromechanical Engineer with a Professional Master’s in Mechatronics, I work where three worlds meet: mechanics, electronics and software.',
      'From 3D design to the circuit board, from embedded code to machine learning, I love taking an industrial project from concept to working prototype. I am currently completing my engineering final-year project — a machine-learning-driven digital twin of an industrial machine — and will be available from September 2026 to join an ambitious engineering team.',
    ],
  } as LList,
  stats: [
    { value: '6', label: { fr: 'Expériences en entreprise', en: 'Industry experiences' } as L },
    { value: '8', label: { fr: 'Projets d’ingénierie', en: 'Engineering projects' } as L },
    { value: '6', label: { fr: 'Certifications', en: 'Certifications' } as L },
    { value: '3', label: { fr: 'Diplômes', en: 'Degrees' } as L },
  ],
}

/* ------------------------------------------------------------------ */
/* EXPERIENCE                                                         */
/*  - PFE digital-twin = current + flagship (top). Company/dates/      */
/*    specifics are placeholders (NOT in the CV) → see TODO.md.        */
/*  - The 5 CV experiences follow, reworded for impact (facts intact). */
/* ------------------------------------------------------------------ */
export interface Experience {
  company: string
  location: L
  period: string
  role: L
  summary: L
  bullets: LList
  tech: string[]
  current?: boolean
  featured?: boolean
}

export const experiences: Experience[] = [
  {
    company: '[À COMPLÉTER : entreprise du PFE]',
    location: { fr: 'Tunisie', en: 'Tunisia' },
    period: '03/2026 – 09/2026',
    current: true,
    featured: true,
    role: { fr: 'Projet de fin d’études — Ingénieur (PFE)', en: 'Engineering final-year project (PFE)' },
    summary: {
      fr: 'Jumeau numérique d’une machine industrielle piloté par machine learning (Random Forest & LSTM).',
      en: 'Machine-learning-driven digital twin of an industrial machine (Random Forest & LSTM).',
    },
    bullets: {
      fr: [
        'Conception d’un jumeau numérique modélisant le comportement d’une machine industrielle [À COMPLÉTER : type de machine] à partir de ses données capteurs.',
        'Développement de modèles de machine learning combinant Random Forest et réseau de neurones récurrent LSTM pour prédire [À COMPLÉTER : grandeur prédite / objectif].',
        'Objectif : aide à la décision et maintenance prédictive — [À COMPLÉTER : résultats obtenus, ex. précision du modèle, gain].',
      ],
      en: [
        'Building a digital twin that models the behaviour of an industrial machine [TO COMPLETE: machine type] from its sensor data.',
        'Developing machine-learning models combining Random Forest and an LSTM recurrent neural network to predict [TO COMPLETE: predicted variable / objective].',
        'Goal: decision support and predictive maintenance — [TO COMPLETE: results achieved, e.g. model accuracy, gains].',
      ],
    },
    tech: ['Python', 'Machine Learning', 'Random Forest', 'LSTM', 'Jumeau numérique'],
  },
  {
    company: 'MATECH',
    location: { fr: 'Megrine, Tunisie', en: 'Megrine, Tunisia' },
    period: '03/2025 – 09/2025',
    role: { fr: 'Mémoire de fin d’études — Master', en: 'Master’s final-year project' },
    summary: {
      fr: 'Émulateur physique d’un groupe électrogène doublé d’une application mobile en réalité augmentée pour la formation des techniciens.',
      en: 'A physical generator emulator paired with an augmented-reality mobile app for training technicians.',
    },
    bullets: {
      fr: [
        'Conception et développement d’une application mobile en réalité augmentée (Vuforia, Unity, C#) permettant d’explorer virtuellement les composants d’un groupe électrogène, avec un quiz d’évaluation intégré.',
        'Modélisation des composants sous SolidWorks et Blender.',
        'Réalisation de l’émulateur physique à base d’Arduino et de composants électriques.',
      ],
      en: [
        'Designed and built an augmented-reality mobile app (Vuforia, Unity, C#) to virtually explore a generator’s components, with a built-in assessment quiz.',
        'Modelled the components in SolidWorks and Blender.',
        'Built the physical emulator with Arduino and electrical components.',
      ],
    },
    tech: ['Unity', 'Vuforia', 'C#', 'SolidWorks', 'Blender', 'Arduino'],
  },
  {
    company: 'GD Tunisie',
    location: { fr: 'Birbouragba, Tunisie', en: 'Birbouragba, Tunisia' },
    period: '07/2025 – 08/2025',
    role: { fr: 'Stage d’ingénieur', en: 'Engineering internship' },
    summary: {
      fr: 'Solution complète de supervision de production : du capteur sur la ligne au tableau de bord.',
      en: 'End-to-end production-supervision solution: from the sensor on the line to the dashboard.',
    },
    bullets: {
      fr: [
        'Développement d’une application desktop Python comptabilisant la production de câbles par ouvrier, avec tableau de bord de supervision.',
        'Conception d’un poste de comptage sous SolidWorks et réalisation de la partie électrique (capteur de proximité E3F-DS30C4, carte Arduino) avec remontée des données vers l’application.',
      ],
      en: [
        'Built a Python desktop application tracking each worker’s cable output, with a supervisory dashboard.',
        'Designed a counting station in SolidWorks and built the electrical part (E3F-DS30C4 proximity sensor, Arduino board), streaming data into the application.',
      ],
    },
    tech: ['Python', 'SolidWorks', 'Arduino', 'E3F-DS30C4'],
  },
  {
    company: 'MATECH',
    location: { fr: 'Megrine, Tunisie', en: 'Megrine, Tunisia' },
    period: '02/2023 – 06/2023',
    role: { fr: 'Stage de fin d’études', en: 'Final-year internship' },
    summary: {
      fr: 'Simulateur de pannes de groupe électrogène et application mobile d’aide au diagnostic.',
      en: 'A generator fault simulator and a mobile app that supports diagnosis.',
    },
    bullets: {
      fr: [
        'Application mobile (Java) traduisant un code de panne en description claire pour le technicien.',
        'Réalisation d’un simulateur de pannes à base d’un contrôleur Guardrevolution et de composants électriques.',
        'Rédaction du dossier de fabrication, définition des besoins et création de travaux pratiques pédagogiques.',
      ],
      en: [
        'Java mobile app translating a fault code into a clear description for the technician.',
        'Built a fault simulator around a Guardrevolution controller and electrical components.',
        'Wrote the manufacturing dossier, defined requirements and created hands-on training exercises.',
      ],
    },
    tech: ['Java', 'Guardrevolution', 'Électronique'],
  },
  {
    company: 'CSM-GIAS',
    location: { fr: 'Bouargoub, Tunisie', en: 'Bouargoub, Tunisia' },
    period: '01/2022 – 02/2022',
    role: { fr: 'Stage de technicien', en: 'Technician internship' },
    summary: {
      fr: 'Amélioration de la machine Trepko Seau par la conception d’un poste d’alimentation automatisé.',
      en: 'Improved the Trepko bucket machine by designing an automated feeding station.',
    },
    bullets: {
      fr: [
        'Conception et prototypage d’une machine de mise en place des récipients sur le tapis (SolidWorks, Arduino).',
      ],
      en: [
        'Designed and prototyped a machine to place containers onto the conveyor (SolidWorks, Arduino).',
      ],
    },
    tech: ['SolidWorks', 'Arduino'],
  },
  {
    company: 'WEWIRE',
    location: { fr: 'Hammamet, Tunisie', en: 'Hammamet, Tunisia' },
    period: '07/2021',
    role: { fr: 'Stage d’initiation', en: 'Introductory internship' },
    summary: {
      fr: 'Première immersion en milieu industriel : fabrication de câbles et démarche Lean.',
      en: 'First industrial immersion: cable manufacturing and Lean methodology.',
    },
    bullets: {
      fr: [
        'Découverte du processus de fabrication des câbles et des activités de l’entreprise.',
        'Participation à la mise en œuvre des principes du Lean (organisation des espaces de travail).',
      ],
      en: [
        'Learned the cable-manufacturing process and the company’s operations.',
        'Took part in applying Lean principles (workspace organization).',
      ],
    },
    tech: ['Lean Manufacturing'],
  },
]

/* ------------------------------------------------------------------ */
/* PROJECTS                                                           */
/* ------------------------------------------------------------------ */
export interface Project {
  id: string
  category: L
  title: L
  summary: L
  description: LList
  tech: string[]
  images?: string[]
  videos?: string[]
  status?: L
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'digital-twin',
    category: { fr: 'Machine Learning · PFE', en: 'Machine Learning · Capstone' },
    status: { fr: 'En cours', en: 'In progress' },
    featured: true,
    title: {
      fr: 'Jumeau numérique d’une machine industrielle',
      en: 'Digital twin of an industrial machine',
    },
    summary: {
      fr: 'Mon projet de fin d’études : modéliser et prédire le comportement d’une machine industrielle par machine learning (Random Forest & LSTM).',
      en: 'My engineering capstone: modelling and predicting an industrial machine’s behaviour with machine learning (Random Forest & LSTM).',
    },
    description: {
      fr: [
        'Projet de fin d’études (PFE) chez [À COMPLÉTER : entreprise], visant à construire le jumeau numérique d’une machine industrielle [À COMPLÉTER : type de machine] à partir de ses données capteurs.',
        'L’approche combine un modèle Random Forest et un réseau de neurones récurrent LSTM pour modéliser et prédire [À COMPLÉTER : grandeur prédite], au service de la maintenance prédictive et de l’aide à la décision.',
        'Résultats : [À COMPLÉTER : précision du modèle, indicateurs, gains obtenus].',
      ],
      en: [
        'Final-year project (PFE) at [TO COMPLETE: company], building the digital twin of an industrial machine [TO COMPLETE: machine type] from its sensor data.',
        'The approach combines a Random Forest model and an LSTM recurrent neural network to model and predict [TO COMPLETE: predicted variable], supporting predictive maintenance and decision-making.',
        'Results: [TO COMPLETE: model accuracy, KPIs, gains achieved].',
      ],
    },
    tech: ['Python', 'Machine Learning', 'Random Forest', 'LSTM', 'Jumeau numérique'],
    // ➤ Ajouter votre image ici (capture du dashboard / schéma du pipeline ML / modèle). Taille recommandée : 1200×750 px (ratio 16:10).
  },
  {
    id: 'generator-ar',
    category: { fr: 'Réalité augmentée', en: 'Augmented reality' },
    title: { fr: 'Émulateur de groupe électrogène + AR', en: 'Generator emulator + AR app' },
    summary: {
      fr: 'Un émulateur physique et une application AR immersive pour former les techniciens sans immobiliser une vraie machine.',
      en: 'A physical emulator and an immersive AR app to train technicians without tying up a real machine.',
    },
    description: {
      fr: [
        'Application mobile en réalité augmentée (Vuforia, Unity, C#) pour explorer virtuellement chaque composant d’un groupe électrogène, avec quiz intégré.',
        'Composants modélisés sous SolidWorks et Blender ; émulateur physique réalisé avec Arduino et composants électriques.',
      ],
      en: [
        'Augmented-reality mobile app (Vuforia, Unity, C#) to virtually explore each component of a generator, with a built-in quiz.',
        'Components modelled in SolidWorks and Blender; physical emulator built with Arduino and electrical components.',
      ],
    },
    tech: ['Unity', 'Vuforia', 'C#', 'SolidWorks', 'Blender', 'Arduino'],
    images: ['/app.jpg', '/8.jpg'],
  },
  {
    id: 'crack-robot',
    category: { fr: 'Robotique · IA', en: 'Robotics · AI' },
    title: { fr: 'Robot autonome de détection de fissures', en: 'Autonomous crack-detection robot' },
    summary: {
      fr: 'Un robot mobile qui inspecte les structures et repère les fissures par intelligence artificielle.',
      en: 'A mobile robot that inspects structures and spots cracks using artificial intelligence.',
    },
    description: {
      fr: [
        'Conception et réalisation d’un robot autonome de détection de fissures : conception mécanique sous SolidWorks, traitement par intelligence artificielle et pilotage par carte ESP32.',
      ],
      en: [
        'Design and build of an autonomous crack-detection robot: mechanical design in SolidWorks, AI-based processing, and control via an ESP32 board.',
      ],
    },
    tech: ['SolidWorks', 'Intelligence artificielle', 'ESP32'],
    images: ['/crac.jpg'],
    videos: ['/video.mp4'],
  },
  {
    id: 'production-supervision',
    category: { fr: 'Automatisation · IoT', en: 'Automation · IoT' },
    title: { fr: 'Supervision de production temps réel', en: 'Real-time production supervision' },
    summary: {
      fr: 'Du capteur sur la ligne au tableau de bord : une chaîne complète pour suivre la production de câbles en direct.',
      en: 'From the sensor on the line to the dashboard: a full chain to track cable production live.',
    },
    description: {
      fr: [
        'Application desktop Python comptabilisant la production par ouvrier, avec tableau de bord de supervision.',
        'Poste de comptage conçu sous SolidWorks, partie électrique intégrant un capteur de proximité E3F-DS30C4 et une carte Arduino, données enregistrées dans l’application.',
      ],
      en: [
        'Python desktop application tracking output per worker, with a supervisory dashboard.',
        'Counting station designed in SolidWorks; electrical part integrating an E3F-DS30C4 proximity sensor and an Arduino board, with data logged into the app.',
      ],
    },
    tech: ['Python', 'SolidWorks', 'Arduino', 'E3F-DS30C4'],
    images: ['/gd.png', '/gd1.png', '/gd3.png', '/gd4.png', '/gd5.png', '/gd6.png', '/GD12.png', '/gd11.png'],
  },
  {
    id: 'fault-simulator',
    category: { fr: 'Automatisation', en: 'Automation' },
    title: { fr: 'Simulateur de pannes + app de diagnostic', en: 'Fault simulator + diagnosis app' },
    summary: {
      fr: 'Un banc de simulation de pannes et une application mobile qui rend chaque code défaut compréhensible.',
      en: 'A fault-simulation bench and a mobile app that makes every fault code understandable.',
    },
    description: {
      fr: [
        'Application mobile (Java) traduisant un code de panne en description claire.',
        'Simulateur de pannes à base d’un contrôleur Guardrevolution et de composants électriques.',
        'Dossier de fabrication, définition des besoins et travaux pratiques pédagogiques.',
      ],
      en: [
        'Java mobile app translating a fault code into a clear description.',
        'Fault simulator built around a Guardrevolution controller and electrical components.',
        'Manufacturing dossier, requirements definition and hands-on training material.',
      ],
    },
    tech: ['Java', 'Guardrevolution', 'Électronique'],
    images: ['/groupe.jpg', '/projet  groupe.jpg', '/Phone.jpg', '/phone1.jpg', '/phone 3.jpg', '/phone 4.jpg', '/phone 5.jpg'],
    videos: ['/video1.mp4', '/video2.mp4', '/video3.mp4'],
  },
  {
    id: 'robotic-arm',
    category: { fr: 'Robotique', en: 'Robotics' },
    title: { fr: 'Bras robotique — gravure sur bois', en: 'Robotic arm — engraving on wood' },
    summary: {
      fr: 'Programmation d’un bras robotique industriel pour reproduire des motifs précis sur le bois.',
      en: 'Programming an industrial robotic arm to reproduce precise patterns on wood.',
    },
    description: {
      fr: [
        'Commande d’un bras robotique réalisant des motifs sur le bois, programmé sous RT Tool Box, avec des pièces conçues sous CATIA V5.',
      ],
      en: [
        'Control of a robotic arm creating patterns on wood, programmed in RT Tool Box, with parts designed in CATIA V5.',
      ],
    },
    tech: ['RT Tool Box', 'CATIA V5', 'Robotique'],
    images: ['/rttoolbox.png'],
  },
  {
    id: 'line-follower',
    category: { fr: 'Robotique', en: 'Robotics' },
    title: { fr: 'Suiveur de ligne, anti-obstacles & parking', en: 'Line follower, obstacle avoidance & parking' },
    summary: {
      fr: 'Un robot mobile autonome combinant suivi de ligne, évitement d’obstacles et stationnement automatique.',
      en: 'An autonomous mobile robot combining line following, obstacle avoidance and automatic parking.',
    },
    description: {
      fr: [
        'Conception et réalisation d’un robot suiveur de ligne doté d’un détecteur d’obstacles et d’un système de parking, à base d’Arduino, avec structure conçue sous SolidWorks.',
      ],
      en: [
        'Design and build of a line-following robot with obstacle detection and a parking system, based on Arduino, with a structure designed in SolidWorks.',
      ],
    },
    tech: ['Arduino', 'SolidWorks'],
    // ➤ Ajouter votre image ici (photo du robot). Taille recommandée : 1200×750 px.
  },
  {
    id: 'smart-reservoir',
    category: { fr: 'IoT', en: 'IoT' },
    title: { fr: 'Réservoir intelligent — dashboard IoT', en: 'Smart reservoir — IoT dashboard' },
    summary: {
      fr: 'Supervision en temps réel d’un réservoir via un tableau de bord Node-RED connecté en MQTT.',
      en: 'Real-time monitoring of a reservoir via a Node-RED dashboard connected over MQTT.',
    },
    description: {
      fr: [
        'Développement d’un tableau de bord Node-RED relié à un ESP32 via MQTT, pour la supervision en temps réel d’un réservoir intelligent.',
      ],
      en: [
        'Built a Node-RED dashboard linked to an ESP32 over MQTT, for real-time monitoring of a smart reservoir.',
      ],
    },
    tech: ['Node-RED', 'MQTT', 'ESP32'],
    // ➤ Ajouter votre image ici (capture du dashboard Node-RED). Taille recommandée : 1200×750 px.
  },
]

/* ------------------------------------------------------------------ */
/* SKILLS                                                             */
/* ------------------------------------------------------------------ */
export interface SkillGroup {
  title: L
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: { fr: 'Conception mécanique & CAO', en: 'Mechanical design & CAD' },
    items: ['SolidWorks', 'CATIA V5', 'Blender', 'Conception 3D', 'Simulation', 'Prototypage'],
  },
  {
    title: { fr: 'Automatisation & électronique', en: 'Automation & electronics' },
    items: ['Arduino', 'ESP32', 'Capteurs industriels', 'Node-RED', 'MQTT', 'RT Tool Box'],
  },
  {
    title: { fr: 'Développement logiciel', en: 'Software development' },
    items: ['Python', 'C#', 'Java', 'Applications desktop', 'Applications mobiles'],
  },
  {
    title: { fr: 'IA, Machine Learning & AR', en: 'AI, Machine Learning & AR' },
    items: ['Machine Learning', 'Random Forest', 'LSTM', 'Maintenance prédictive', 'Unity', 'Vuforia'],
  },
]

/** Tools marquee (real tools from the CV/skills only) */
export const tools: string[] = [
  'SolidWorks', 'CATIA V5', 'Blender', 'Python', 'C#', 'Java',
  'Arduino', 'ESP32', 'Unity', 'Vuforia', 'Node-RED', 'MQTT', 'RT Tool Box', 'Machine Learning',
]

/* ------------------------------------------------------------------ */
/* CERTIFICATIONS (CV)                                                */
/* ------------------------------------------------------------------ */
export interface Certification {
  name: string
  issuer: 'SOLIDWORKS' | 'NVIDIA'
  file?: string
}

export const certifications: Certification[] = [
  { name: 'Simulation Professional', issuer: 'SOLIDWORKS', file: '/SOLIDWORKS Simulation Professional.jpg' },
  { name: 'CSWA – Mechanical Design', issuer: 'SOLIDWORKS', file: '/Certified SOLIDWORKS CAD Design Associate.jpg' },
  { name: 'Additive Manufacturing Associate', issuer: 'SOLIDWORKS', file: '/SOLIDWORKS Additive Manufacturing Associate.jpg' },
  { name: 'CSWPA – Sheet Metal', issuer: 'SOLIDWORKS' },
  { name: 'AI for Predictive Maintenance', issuer: 'NVIDIA', file: '/Certificate Applications of AI for Predictive Maintenance.pdf' },
  { name: 'Generative AI with Diffusion Models', issuer: 'NVIDIA', file: '/Certificate Generative AI with Diffusion Models.pdf' },
]

/* ------------------------------------------------------------------ */
/* EDUCATION (exact diploma titles provided by the owner; schools &    */
/* dates taken from the CV — see TODO.md re: the technician diploma).   */
/* ------------------------------------------------------------------ */
export interface Education {
  degree: L
  school: L
  period: string
  current?: boolean
}

export const education: Education[] = [
  {
    degree: { fr: 'Diplôme d’Ingénieur en Électromécanique', en: 'Engineering Degree in Electromechanics' },
    school: { fr: 'ESPRIT — École Supérieure Privée d’Ingénierie et de Technologies', en: 'ESPRIT — Private Higher School of Engineering and Technologies' },
    period: '2024',
    current: true,
  },
  {
    degree: { fr: 'Master Professionnel en Mécatronique', en: 'Professional Master’s in Mechatronics' },
    school: { fr: 'ISTIC — Institut Supérieur des Technologies de l’Information et des Communications', en: 'ISTIC — Higher Institute of Information and Communication Technologies' },
    period: '2023 – 2025',
  },
  {
    degree: { fr: 'Diplôme de Technicien en Génie Mécanique — Maintenance Industrielle', en: 'Technician Diploma in Mechanical Engineering — Industrial Maintenance' },
    school: { fr: 'ISETN — Institut Supérieur des Études Technologiques de Nabeul', en: 'ISETN — Higher Institute of Technological Studies of Nabeul' },
    period: '2020 – 2023',
  },
]

/* ------------------------------------------------------------------ */
/* ASSOCIATIONS / VOLUNTEERING (CV)                                   */
/* ------------------------------------------------------------------ */
export interface Association {
  title: L
  description: L
  period?: string
  file?: string
}

export const associations: Association[] = [
  {
    title: { fr: 'Association d’Éducation Relative à l’Environnement de Hammamet', en: 'Hammamet Environmental Education Association' },
    description: {
      fr: 'Membre — participation à plusieurs chantiers et formations.',
      en: 'Member — took part in several field projects and training sessions.',
    },
  },
  {
    title: { fr: 'AIESEC — Stage volontaire en Turquie (Izmit)', en: 'AIESEC — Volunteer internship in Turkey (Izmit)' },
    period: '06/2023 – 08/2023',
    description: {
      fr: 'Collaboration internationale : organisation d’événements communautaires, animation de sessions « Talk to Practice » en anglais et encadrement d’activités éducatives.',
      en: 'International collaboration: organizing community events, facilitating “Talk to Practice” sessions in English, and leading educational activities.',
    },
    file: '/Certification.pdf',
  },
]
