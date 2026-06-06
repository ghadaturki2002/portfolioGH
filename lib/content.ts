/**
 * SINGLE SOURCE OF CONTENT — every entry here is grounded strictly in Ghada
 * Turki's CV (public/CV_Ghada_Turki.pdf / resume GhadaTurki.pdf). No invented
 * claims. Localized fields carry { fr, en }; non-localized fields (dates, tools,
 * file paths, links) are shared. Components read `field[language]`.
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
    fr: 'Ingénieure en Électromécanique · Mécatronique',
    en: 'Electromechanical & Mechatronics Engineer',
  } as L,
  // From the CV profile, rewritten for a recruiter audience.
  tagline: {
    fr: 'Je conçois et réalise des systèmes mécatroniques — de la conception mécanique à l’automatisation, du code embarqué à l’intelligence artificielle.',
    en: 'I design and build mechatronic systems — from mechanical design and automation to embedded code and applied artificial intelligence.',
  } as L,
  availability: {
    fr: 'Disponible pour un stage de fin d’études',
    en: 'Available for an end-of-studies internship',
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
  // CV profile, faithfully rephrased.
  paragraphs: {
    fr: [
      'Titulaire d’un Master professionnel en Mécatronique et ingénieure en Génie Électromécanique, je réunis trois compétences clés : la conception mécanique, l’automatisation et le développement logiciel.',
      'Passionnée par l’innovation et les systèmes automatisés, j’aime mener un projet de bout en bout — de la conception 3D et de la partie électrique jusqu’aux applications qui pilotent ou supervisent la machine. Je cherche aujourd’hui à mettre ces compétences au service d’une équipe dynamique dans le cadre d’un stage de fin d’études.',
    ],
    en: [
      'Holder of a Professional Master’s in Mechatronics and an Electromechanical Engineer, I bring together three core skills: mechanical design, automation, and software development.',
      'Driven by innovation and automated systems, I enjoy carrying a project end to end — from 3D design and the electrical build to the applications that drive or supervise the machine. I am now looking to apply these skills within a dynamic team through an end-of-studies internship.',
    ],
  } as LList,
  // Honest, CV-derived highlight figures.
  stats: [
    { value: '5', label: { fr: 'Expériences en entreprise', en: 'Industry experiences' } as L },
    { value: '4+', label: { fr: 'Projets d’ingénierie', en: 'Engineering projects' } as L },
    { value: '6', label: { fr: 'Certifications', en: 'Certifications' } as L },
    { value: '3', label: { fr: 'Diplômes', en: 'Degrees' } as L },
  ],
}

/* ------------------------------------------------------------------ */
/* EXPERIENCE (5 — exactly as in the CV)                              */
/* ------------------------------------------------------------------ */
export interface Experience {
  company: string
  location: L
  period: string
  role: L
  summary: L
  bullets: LList
  tech: string[]
}

export const experiences: Experience[] = [
  {
    company: 'MATECH',
    location: { fr: 'Megrine, Tunisie', en: 'Megrine, Tunisia' },
    period: '03/2025 – 09/2025',
    role: { fr: 'Mémoire de fin d’études', en: 'Final-year project' },
    summary: {
      fr: 'Conception et réalisation d’un émulateur de groupe électrogène et de son application mobile en réalité augmentée.',
      en: 'Design and build of a generator emulator and its augmented-reality mobile application.',
    },
    bullets: {
      fr: [
        'Développement d’une application mobile en réalité augmentée (Vuforia, Unity, C#) permettant aux techniciens d’explorer virtuellement les composants d’un groupe électrogène, avec un quiz intégré pour évaluer les connaissances.',
        'Conception des composants du groupe électrogène sous SolidWorks et Blender.',
        'Réalisation de l’émulateur à base d’Arduino et de composants électriques.',
      ],
      en: [
        'Built an augmented-reality mobile app (Vuforia, Unity, C#) letting technicians virtually explore a generator’s components, with an integrated quiz to assess their knowledge.',
        'Designed the generator components in SolidWorks and Blender.',
        'Built the emulator using Arduino and electrical components.',
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
      fr: 'Développement d’une solution innovante de supervision de la production.',
      en: 'Development of an innovative production-supervision solution.',
    },
    bullets: {
      fr: [
        'Développement d’une application desktop en Python enregistrant le nombre de câbles produits par chaque ouvrier, avec un tableau de bord de supervision.',
        'Conception d’un poste de comptage des câbles sous SolidWorks et réalisation de la partie électrique (capteur de proximité E3F-DS30C4, carte Arduino), avec enregistrement des données dans l’application.',
      ],
      en: [
        'Built a Python desktop application recording the number of cables produced by each worker, with a supervisory dashboard.',
        'Designed a cable-counting station in SolidWorks and built the electrical part (E3F-DS30C4 proximity sensor, Arduino board), with data logging into the application.',
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
      fr: 'Conception et réalisation d’un simulateur de pannes d’un groupe électrogène.',
      en: 'Design and build of a fault simulator for a generator.',
    },
    bullets: {
      fr: [
        'Développement d’une application mobile (Java) permettant de saisir un code de panne et d’en afficher la description.',
        'Réalisation d’un simulateur de pannes à base d’un contrôleur Guardrevolution et de composants électriques.',
        'Élaboration du dossier de fabrication, définition des besoins et création de travaux pratiques.',
      ],
      en: [
        'Developed a Java mobile application to enter a fault code and display its description.',
        'Built a fault simulator using a Guardrevolution controller and electrical components.',
        'Produced the manufacturing documentation, defined the requirements, and created practical exercises.',
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
      fr: 'Amélioration de la machine Trepko Seau.',
      en: 'Improvement of the Trepko bucket machine.',
    },
    bullets: {
      fr: [
        'Conception d’une machine de mise en place des récipients sur le tapis (SolidWorks, Arduino), réalisée en prototype.',
      ],
      en: [
        'Designed a machine to place containers onto the conveyor (SolidWorks, Arduino), built as a prototype.',
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
      fr: 'Découverte du milieu industriel et de la fabrication des câbles.',
      en: 'Introduction to the industrial environment and cable manufacturing.',
    },
    bullets: {
      fr: [
        'Découverte des activités de l’entreprise et de la procédure de fabrication des câbles.',
        'Participation à l’application des principes du Lean en aidant à organiser les espaces de travail.',
      ],
      en: [
        'Discovered the company’s activities and the cable-manufacturing process.',
        'Helped apply Lean principles by organizing the workspaces.',
      ],
    },
    tech: ['Lean Manufacturing'],
  },
]

/* ------------------------------------------------------------------ */
/* PROJECTS                                                           */
/*  - New digital-twin project (in progress)                          */
/*  - CV "Projets" + the concrete deliverables of the CV experiences  */
/*  - Invented items (WinDev/MTTR, biometric/QR, VGG16/ImageNet, etc.)*/
/*    have been removed.                                              */
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
    category: { fr: 'Machine Learning', en: 'Machine Learning' },
    status: { fr: 'En cours', en: 'In progress' },
    featured: true,
    title: {
      fr: 'Jumeau numérique d’une machine industrielle',
      en: 'Digital twin of an industrial machine',
    },
    summary: {
      fr: 'Modélisation d’une machine industrielle par jumeau numérique, à l’aide de modèles de machine learning (Random Forest et LSTM).',
      en: 'Digital-twin modelling of an industrial machine using machine-learning models (Random Forest and LSTM).',
    },
    description: {
      fr: [
        'Projet en cours visant à construire le jumeau numérique d’une machine industrielle à partir de ses données capteurs.',
        'L’approche combine un modèle Random Forest et un réseau de neurones récurrent LSTM afin de modéliser et prédire le comportement de la machine, dans une logique d’aide à la décision et de maintenance prédictive.',
      ],
      en: [
        'Ongoing project building the digital twin of an industrial machine from its sensor data.',
        'The approach combines a Random Forest model and an LSTM recurrent neural network to model and predict the machine’s behaviour, supporting decision-making and predictive maintenance.',
      ],
    },
    tech: ['Python', 'Machine Learning', 'Random Forest', 'LSTM', 'Jumeau numérique'],
    // TODO: ajouter une capture/visuel du projet jumeau numérique quand disponible
  },
  {
    id: 'generator-ar',
    category: { fr: 'Réalité augmentée', en: 'Augmented reality' },
    title: {
      fr: 'Émulateur de groupe électrogène + application AR',
      en: 'Generator emulator + AR application',
    },
    summary: {
      fr: 'Émulateur physique d’un groupe électrogène et application mobile en réalité augmentée pour la formation des techniciens.',
      en: 'Physical generator emulator and an augmented-reality mobile app for training technicians.',
    },
    description: {
      fr: [
        'Application mobile en réalité augmentée (Vuforia, Unity, C#) permettant d’explorer virtuellement les composants d’un groupe électrogène, avec un quiz intégré.',
        'Composants conçus sous SolidWorks et Blender ; émulateur réalisé avec Arduino et des composants électriques.',
      ],
      en: [
        'Augmented-reality mobile app (Vuforia, Unity, C#) to virtually explore a generator’s components, with an integrated quiz.',
        'Components designed in SolidWorks and Blender; emulator built with Arduino and electrical components.',
      ],
    },
    tech: ['Unity', 'Vuforia', 'C#', 'SolidWorks', 'Blender', 'Arduino'],
    images: ['/app.jpg', '/8.jpg'],
  },
  {
    id: 'crack-robot',
    category: { fr: 'Robotique · IA', en: 'Robotics · AI' },
    title: {
      fr: 'Robot autonome de détection de fissures',
      en: 'Autonomous crack-detection robot',
    },
    summary: {
      fr: 'Robot autonome détectant les fissures dans les structures grâce à l’intelligence artificielle.',
      en: 'Autonomous robot detecting cracks in structures using artificial intelligence.',
    },
    description: {
      fr: [
        'Conception et réalisation d’un robot autonome de détection de fissures, combinant la conception mécanique (SolidWorks), l’intelligence artificielle et une carte ESP32 pour le pilotage et le traitement.',
      ],
      en: [
        'Design and build of an autonomous crack-detection robot, combining mechanical design (SolidWorks), artificial intelligence, and an ESP32 board for control and processing.',
      ],
    },
    tech: ['SolidWorks', 'Intelligence artificielle', 'ESP32'],
    images: ['/crac.jpg'],
    videos: ['/video.mp4'],
  },
  {
    id: 'production-supervision',
    category: { fr: 'Automatisation · IoT', en: 'Automation · IoT' },
    title: {
      fr: 'Solution de supervision de la production',
      en: 'Production-supervision solution',
    },
    summary: {
      fr: 'Application desktop et poste de comptage automatisé pour suivre la production de câbles en temps réel.',
      en: 'Desktop application and automated counting station to track cable production in real time.',
    },
    description: {
      fr: [
        'Application desktop développée en Python enregistrant le nombre de câbles produits par chaque ouvrier, avec un tableau de bord de supervision.',
        'Poste de comptage conçu sous SolidWorks, avec une partie électrique intégrant un capteur de proximité E3F-DS30C4 et une carte Arduino, les données étant enregistrées dans l’application.',
      ],
      en: [
        'Python desktop application recording the number of cables produced by each worker, with a supervisory dashboard.',
        'Counting station designed in SolidWorks, with an electrical part integrating an E3F-DS30C4 proximity sensor and an Arduino board, logging data into the application.',
      ],
    },
    tech: ['Python', 'SolidWorks', 'Arduino', 'E3F-DS30C4'],
    images: ['/gd.png', '/gd1.png', '/gd3.png', '/gd4.png', '/gd5.png', '/gd6.png', '/GD12.png', '/gd11.png'],
  },
  {
    id: 'fault-simulator',
    category: { fr: 'Automatisation', en: 'Automation' },
    title: {
      fr: 'Simulateur de pannes + application mobile',
      en: 'Fault simulator + mobile application',
    },
    summary: {
      fr: 'Simulateur de pannes de groupe électrogène et application mobile d’interprétation des codes de panne, pour la formation des techniciens.',
      en: 'Generator fault simulator and a mobile app to interpret fault codes, for training technicians.',
    },
    description: {
      fr: [
        'Application mobile (Java) permettant de saisir un code de panne et d’en afficher la description.',
        'Simulateur de pannes réalisé à base d’un contrôleur Guardrevolution et de composants électriques.',
        'Élaboration du dossier de fabrication, définition des besoins et création de travaux pratiques.',
      ],
      en: [
        'Java mobile application to enter a fault code and display its description.',
        'Fault simulator built around a Guardrevolution controller and electrical components.',
        'Manufacturing documentation, requirements definition, and creation of practical exercises.',
      ],
    },
    tech: ['Java', 'Guardrevolution', 'Électronique'],
    images: ['/groupe.jpg', '/projet  groupe.jpg', '/Phone.jpg', '/phone1.jpg', '/phone 3.jpg', '/phone 4.jpg', '/phone 5.jpg'],
    videos: ['/video1.mp4', '/video2.mp4', '/video3.mp4'],
  },
  {
    id: 'robotic-arm',
    category: { fr: 'Robotique', en: 'Robotics' },
    title: {
      fr: 'Bras robotique — motifs sur bois',
      en: 'Robotic arm — patterns on wood',
    },
    summary: {
      fr: 'Programmation d’un bras robotique pour réaliser des motifs sur le bois.',
      en: 'Programming a robotic arm to create patterns on wood.',
    },
    description: {
      fr: [
        'Commande d’un bras robotique réalisant des motifs sur le bois, programmé via RT Tool Box, les pièces étant conçues sous CATIA V5.',
      ],
      en: [
        'Control of a robotic arm creating patterns on wood, programmed with RT Tool Box, with parts designed in CATIA V5.',
      ],
    },
    tech: ['RT Tool Box', 'CATIA V5', 'Robotique'],
    images: ['/rttoolbox.png'],
  },
  {
    id: 'line-follower',
    category: { fr: 'Robotique', en: 'Robotics' },
    title: {
      fr: 'Suiveur de ligne, détecteur d’obstacles & parking',
      en: 'Line follower, obstacle detector & parking',
    },
    summary: {
      fr: 'Robot mobile combinant suivi de ligne, détection d’obstacles et système de parking.',
      en: 'Mobile robot combining line following, obstacle detection, and a parking system.',
    },
    description: {
      fr: [
        'Conception et réalisation d’un robot suiveur de ligne, doté d’un détecteur d’obstacles et d’un système de parking, à base d’Arduino, avec une structure conçue sous SolidWorks.',
      ],
      en: [
        'Design and build of a line-following robot with obstacle detection and a parking system, based on Arduino, with a structure designed in SolidWorks.',
      ],
    },
    tech: ['Arduino', 'SolidWorks'],
    // TODO: ajouter un visuel pour ce projet si disponible
  },
  {
    id: 'smart-reservoir',
    category: { fr: 'IoT', en: 'IoT' },
    title: {
      fr: 'Réservoir intelligent — dashboard Node-RED',
      en: 'Smart reservoir — Node-RED dashboard',
    },
    summary: {
      fr: 'Supervision en temps réel d’un réservoir via un tableau de bord Node-RED et un ESP32.',
      en: 'Real-time monitoring of a reservoir via a Node-RED dashboard and an ESP32.',
    },
    description: {
      fr: [
        'Développement d’un tableau de bord en Node-RED et MQTT, relié à un ESP32, pour la supervision en temps réel d’un réservoir intelligent.',
      ],
      en: [
        'Development of a Node-RED and MQTT dashboard connected to an ESP32, for real-time monitoring of a smart reservoir.',
      ],
    },
    tech: ['Node-RED', 'MQTT', 'ESP32'],
    // TODO: ajouter un visuel pour ce projet si disponible
  },
]

/* ------------------------------------------------------------------ */
/* SKILLS (derived strictly from CV tools & experiences)              */
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
    title: { fr: 'IA, ML & réalité augmentée', en: 'AI, ML & augmented reality' },
    items: ['Machine Learning', 'Random Forest', 'LSTM', 'Maintenance prédictive', 'Unity', 'Vuforia'],
  },
]

/* ------------------------------------------------------------------ */
/* CERTIFICATIONS (CV — SOLIDWORKS x4, NVIDIA; file = downloadable)    */
/* ------------------------------------------------------------------ */
export interface Certification {
  name: string
  issuer: 'SOLIDWORKS' | 'NVIDIA'
  file?: string // public path; absent = listed without download
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
/* EDUCATION (3 — CV)                                                 */
/* ------------------------------------------------------------------ */
export interface Education {
  degree: L
  school: L
  period: string
  current?: boolean
}

export const education: Education[] = [
  {
    degree: { fr: 'Cycle d’ingénieur en Électromécanique — Spécialité Mécatronique', en: 'Engineering degree in Electromechanics — Mechatronics specialty' },
    school: { fr: 'ESPRIT — École Supérieure Privée d’Ingénierie et de Technologies', en: 'ESPRIT — Private Higher School of Engineering and Technologies' },
    period: '2024',
    current: true,
  },
  {
    degree: { fr: 'Mastère Professionnel co-construit en Mécatronique', en: 'Co-constructed Professional Master’s in Mechatronics' },
    school: { fr: 'ISTIC — Institut Supérieur des Technologies de l’Information et des Communications', en: 'ISTIC — Higher Institute of Information and Communication Technologies' },
    period: '2023 – 2025',
  },
  {
    degree: { fr: 'Licence appliquée en génie mécanique', en: 'Applied Bachelor’s in Mechanical Engineering' },
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
      fr: 'Collaboration internationale pour organiser des événements communautaires, animation de sessions « Talk to Practice » en anglais et encadrement d’activités éducatives pour enfants et adultes.',
      en: 'International collaboration organizing community events, facilitating “Talk to Practice” sessions in English, and leading educational activities for children and adults.',
    },
    file: '/Certification.pdf',
  },
]
