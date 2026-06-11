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
    { value: '13', label: { fr: 'Projets d’ingénierie', en: 'Engineering projects' } as L },
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
    company: 'TUNIAOS',
    location: { fr: 'Tunisie', en: 'Tunisia' },
    period: '03/2026 – 09/2026',
    current: true,
    featured: true,
    role: { fr: 'Projet de fin d’études — Ingénieur (PFE)', en: 'Engineering final-year project (PFE)' },
    summary: {
      fr: 'Jumeau numérique d’une machine de gravure ionique : prédiction de la durée de vie restante (RUL) et du type de panne par machine learning (Random Forest & LSTM).',
      en: 'Digital twin of an ion-milling machine: predicting Remaining Useful Life (RUL) and fault type with machine learning (Random Forest & LSTM).',
    },
    bullets: {
      fr: [
        'Construction du jumeau numérique d’une machine de gravure ionique à partir de ses données capteurs (jeu PHM 2018 : 20 machines, ~80 M de mesures).',
        'Pipeline à deux étages — Random Forest (détection précoce) + LSTM (estimation de la RUL) — avec ingénierie des variables, dont un résiduel physique débit/pression, et un ensemble de modèles.',
        'Déploiement temps réel : ESP32 → MQTT → serveur Flask (7 modèles) → tableau de bord Node-RED (RUL, type de panne, alertes).',
        'Résultats : bat l’article de référence (RMSE jusqu’à ~12× meilleur) ; détection ROC AUC 0,98–0,999 avec un rappel de 100 %.',
      ],
      en: [
        'Built the digital twin of an ion-milling machine from its sensor data (PHM 2018 dataset: 20 machines, ~80 M measurements).',
        'Two-stage pipeline — Random Forest (early detection) + LSTM (RUL estimation) — with feature engineering including a physics-based flow/pressure residual, plus a model ensemble.',
        'Real-time deployment: ESP32 → MQTT → Flask server (7 models) → Node-RED dashboard (RUL, fault type, alerts).',
        'Results: beats the reference paper (RMSE up to ~12× better); early detection ROC AUC 0.98–0.999 with 100% recall.',
      ],
    },
    tech: ['Python', 'PyTorch', 'Random Forest', 'LSTM', 'ESP32', 'MQTT', 'Node-RED', 'Flask'],
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
/* PROJECT CATEGORIES (filter pills). `short` is used as the card      */
/* eyebrow (e.g. "Robotique · IA"); `label` is the full pill label.    */
/* ------------------------------------------------------------------ */
export interface ProjectCategory {
  id: string
  label: L
  short: L
}

export const projectCategories: ProjectCategory[] = [
  { id: 'all', label: { fr: 'Tout', en: 'All' }, short: { fr: 'Tout', en: 'All' } },
  { id: 'mecanique', label: { fr: 'Conception mécanique & CAO', en: 'Mechanical Design & CAD' }, short: { fr: 'CAO', en: 'CAD' } },
  { id: 'robotique', label: { fr: 'Robotique', en: 'Robotics' }, short: { fr: 'Robotique', en: 'Robotics' } },
  { id: 'automatisme', label: { fr: 'Automatisme & Supervision', en: 'Automation & Control' }, short: { fr: 'Automatisme', en: 'Automation' } },
  { id: 'iot', label: { fr: 'IoT & Systèmes embarqués', en: 'IoT & Embedded' }, short: { fr: 'IoT', en: 'IoT' } },
  { id: 'ia', label: { fr: 'IA, Vision & Données', en: 'AI, Vision & Data' }, short: { fr: 'IA', en: 'AI' } },
  { id: 'ar', label: { fr: 'Réalité augmentée', en: 'Augmented Reality' }, short: { fr: 'AR', en: 'AR' } },
  { id: 'energie', label: { fr: 'Énergie & Électrotechnique', en: 'Energy & Power' }, short: { fr: 'Énergie', en: 'Energy' } },
  { id: 'gestion', label: { fr: 'Gestion industrielle', en: 'Industrial Management' }, short: { fr: 'Gestion', en: 'Management' } },
]

/* ------------------------------------------------------------------ */
/* PROJECTS — rich model (filterable). All copy is owner-authoritative. */
/* `link` is a placeholder until real URLs are provided (no "view" link */
/* renders while it starts with "["). Images/videos added where assets  */
/* exist in /public.                                                    */
/* ------------------------------------------------------------------ */
export interface Project {
  id: string
  type: L
  status?: L | null
  categories: string[]
  tech: string[]
  title: L
  description: L
  /** optional rich, multi-paragraph story shown in the modal (flagship projects) */
  details?: LList
  role: L
  learned: L
  result?: L | null
  link?: string | null
  images?: string[]
  videos?: string[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'jumeau-numerique',
    type: { fr: 'PFE — Entreprise (TUNIAOS)', en: 'Final-year project — Company (TUNIAOS)' },
    status: { fr: 'En cours de finalisation', en: 'In final stages' },
    categories: ['ia', 'automatisme', 'iot'],
    tech: ['Python', 'PyTorch', 'scikit-learn', 'Random Forest', 'LSTM', 'ESP32', 'MQTT', 'Node-RED', 'Flask'],
    title: { fr: 'Jumeau numérique d’une machine industrielle', en: 'Digital Twin of an Industrial Machine' },
    description: {
      fr: 'Jumeau numérique d’une machine de gravure ionique qui prédit la durée de vie restante (RUL) et le type de panne, pour basculer vers la maintenance prédictive. Pipeline Random Forest + LSTM, déployé en temps réel (ESP32 → MQTT → Node-RED).',
      en: 'Digital twin of an ion-milling machine that predicts Remaining Useful Life (RUL) and the fault type, enabling predictive maintenance. A Random Forest + LSTM pipeline, deployed in real time (ESP32 → MQTT → Node-RED).',
    },
    details: {
      fr: [
        'PFE de 6 mois chez TUNIAOS (ESPRIT, 2026) : construire le jumeau numérique d’une machine de gravure ionique et prédire sa durée de vie restante (RUL) — quand la panne surviendra et de quel type — afin de réduire les arrêts de production et le rebut en salle blanche.',
        'Démarche : reproduction puis amélioration de l’article de Huang et al. (2018) sur le jeu de données PHM 2018 (20 machines, ~80 M de mesures, 33 Go). Pipeline à deux étages : un Random Forest par mode de panne sert de « porte » de détection précoce (malgré le fort déséquilibre des données), puis un LSTM estime la RUL à partir des ~5 dernières heures de signaux.',
        'Ingénierie des données : nettoyage et découpage en séquences « run-to-fault », RUL convertie en nombre de mesures, et un résiduel physique débit/pression qui révèle fuites et blocages. Conversion des 33 Go de CSV en Parquet (2,8 Go) pour tenir sur un PC, et ensemble de modèles pour réduire la variance.',
        'Déploiement temps réel (machine réelle indisponible) : un ESP32 rejoue une séquence d’avant-panne avec deux potentiomètres (pression et débit du refroidissement) ; les données partent en MQTT vers un serveur Flask exécutant les 7 modèles, et un tableau de bord Node-RED affiche en direct la RUL, le type de panne et les alertes.',
      ],
      en: [
        'A 6-month final-year project at TUNIAOS (ESPRIT, 2026): building the digital twin of an ion-milling machine and predicting its Remaining Useful Life (RUL) — when a failure will happen and of which type — to cut downtime and cleanroom scrap.',
        'Approach: reproducing then improving Huang et al. (2018) on the PHM 2018 dataset (20 machines, ~80 M measurements, 33 GB). A two-stage pipeline: one Random Forest per fault mode acts as an early-detection gate (despite heavy data imbalance), then an LSTM estimates the RUL from the last ~5 hours of signals.',
        'Data engineering: cleaning and splitting into run-to-fault sequences, RUL converted to a number of measurements, and a physics-based flow/pressure residual that reveals leaks and blockages. Converted 33 GB of CSV to Parquet (2.8 GB) to fit on a laptop, plus a model ensemble to reduce variance.',
        'Real-time deployment (no access to the real machine): an ESP32 replays a pre-failure trace with two potentiometers (cooling pressure and flow); data is sent over MQTT to a Flask server running the 7 models, and a Node-RED dashboard shows the RUL, fault type and alerts live.',
      ],
    },
    role: {
      fr: 'Projet mené de bout en bout : conception du pipeline de données, ingénierie des variables, entraînement et comparaison des modèles (Random Forest + LSTM), et déploiement IoT temps réel (ESP32 → MQTT → Flask → Node-RED).',
      en: 'End-to-end ownership: data pipeline design, feature engineering, training and comparison of the models (Random Forest + LSTM), and real-time IoT deployment (ESP32 → MQTT → Flask → Node-RED).',
    },
    learned: {
      fr: 'Montée en compétence rapide en machine learning hors de ma spécialité, maîtrise d’un très gros volume de données déséquilibré, et un réflexe clé : ne jamais croire un résultat « trop beau » sans le valider visuellement. Ma compréhension physique de la machine (relation débit/pression) a été un atout pour créer une variable décisive.',
      en: 'Fast upskilling in machine learning outside my specialty, handling a very large imbalanced dataset, and one key reflex: never trust a result that looks “too good” without validating it visually. My physical understanding of the machine (flow/pressure relationship) was an asset for creating a decisive feature.',
    },
    result: {
      fr: 'Bat l’article de référence sur les 3 modes de panne (RMSE ~12× meilleur sur le mode 1, ~3× sur le mode 2). Détection précoce : ROC AUC 0,98–0,999, rappel 100 %. RUL suivie à ±3 min sur 5 h. Pipeline complet (20 machines, 80 M de lignes) en ~90 min sur un PC portable.',
      en: 'Beats the reference paper on all 3 fault modes (RMSE ~12× better on mode 1, ~3× on mode 2). Early detection: ROC AUC 0.98–0.999, 100% recall. RUL tracked within ±3 min over 5 h. Full pipeline (20 machines, 80 M rows) in ~90 min on a laptop.',
    },
    link: '[À COMPLÉTER : lien]',
    images: ['/jumeau-numerique.jpg'],
    featured: true,
  },
  {
    id: 'genarino-ar',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['ar', 'mecanique'],
    tech: ['Unity', 'Vuforia', 'C#', 'SolidWorks', 'Blender', 'Arduino'],
    title: { fr: 'Émulateur de groupe électrogène + AR', en: 'Generator Set Emulator + AR' },
    description: {
      fr: 'Émulateur physique d’un groupe électrogène couplé à une application de réalité augmentée (GenARino) pour former les techniciens sans immobiliser une vraie machine. L’application superpose les composants en 3D et propose des quiz interactifs.',
      en: 'A physical generator-set emulator paired with an augmented-reality app (GenARino) to train technicians without tying up a real machine. The app overlays 3D components and offers interactive quizzes.',
    },
    role: {
      fr: 'Modélisation 3D (SolidWorks/Blender), développement de l’app AR (Unity/Vuforia) et de la maquette électronique (Arduino).',
      en: '3D modeling (SolidWorks/Blender), AR app development (Unity/Vuforia) and the electronic mock-up (Arduino).',
    },
    learned: {
      fr: 'Réalité augmentée, modélisation 3D temps réel, intégration matériel/logiciel.',
      en: 'Augmented reality, real-time 3D modeling, hardware/software integration.',
    },
    result: null,
    link: '[À COMPLÉTER : lien]',
    images: ['/app.jpg', '/8.jpg'],
  },
  {
    id: 'robot-fissures',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['robotique', 'ia', 'iot', 'mecanique'],
    tech: ['SolidWorks', 'VGG16', 'Deep Learning', 'ESP32', 'Computer Vision'],
    title: { fr: 'Robot autonome de détection de fissures', en: 'Autonomous Crack-Detection Robot' },
    description: {
      fr: 'Robot mobile autonome qui inspecte les structures et détecte les fissures par vision (modèle VGG16). Piloté par ESP32 avec une application de commande dédiée.',
      en: 'An autonomous mobile robot that inspects structures and detects cracks through computer vision (VGG16), driven by an ESP32 with a dedicated control app.',
    },
    role: {
      fr: 'Conception mécanique (SolidWorks), entraînement du modèle de détection VGG16, intégration ESP32 et application de commande.',
      en: 'Mechanical design (SolidWorks), training the VGG16 detection model, ESP32 integration and the control app.',
    },
    learned: {
      fr: 'Vision par ordinateur / deep learning (VGG16), robotique mobile, embarqué ESP32.',
      en: 'Computer vision / deep learning (VGG16), mobile robotics, ESP32 embedded systems.',
    },
    result: { fr: '[À COMPLÉTER : précision de détection]', en: '[À COMPLÉTER : detection accuracy]' },
    link: '[À COMPLÉTER : lien]',
    images: ['/crac.jpg'],
    videos: ['/video.mp4'],
  },
  {
    id: 'supervision-production',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['automatisme', 'iot', 'mecanique'],
    tech: ['Python', 'Arduino', 'SolidWorks', 'Capteur E3F-DS30C4'],
    title: { fr: 'Supervision de production en temps réel', en: 'Real-Time Production Monitoring' },
    description: {
      fr: 'Supervision en temps réel d’une ligne de production de câbles, du capteur sur la ligne jusqu’au tableau de bord : comptage des pièces et suivi de la production en direct.',
      en: 'Real-time monitoring of a cable production line, from the sensor on the line to the dashboard — counting parts and tracking output live.',
    },
    role: {
      fr: 'Conception du poste (SolidWorks), acquisition capteur (Arduino) et développement du tableau de bord temps réel (Python).',
      en: 'Designed the station (SolidWorks), sensor acquisition (Arduino) and the real-time dashboard (Python).',
    },
    learned: {
      fr: 'Acquisition de données capteurs, supervision temps réel, traitement des données de production.',
      en: 'Sensor data acquisition, real-time monitoring, production data processing.',
    },
    result: null,
    link: '[À COMPLÉTER : lien]',
    images: ['/gd.png', '/gd1.png', '/gd3.png', '/gd4.png', '/gd5.png', '/gd6.png', '/GD12.png', '/gd11.png'],
  },
  {
    id: 'simulateur-pannes',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['automatisme', 'iot'],
    tech: ['Java', 'Électronique', 'Microcontrôleur'],
    title: { fr: 'Simulateur de pannes + application de diagnostic', en: 'Fault Simulator + Diagnostic App' },
    description: {
      fr: 'Banc de simulation de pannes électriques couplé à une application de diagnostic qui traduit les codes défaut en messages clairs pour accélérer le dépannage.',
      en: 'An electrical fault-simulation bench paired with a diagnostic app that turns fault codes into clear messages to speed up troubleshooting.',
    },
    role: {
      fr: 'Conception du banc électronique et développement de l’application de diagnostic (Java).',
      en: 'Designed the electronic bench and built the diagnostic app (Java).',
    },
    learned: {
      fr: 'Diagnostic de pannes, électronique, développement applicatif Java.',
      en: 'Fault diagnosis, electronics, Java application development.',
    },
    result: null,
    link: '[À COMPLÉTER : lien]',
    images: ['/groupe.jpg', '/projet  groupe.jpg', '/Phone.jpg', '/phone1.jpg', '/phone 3.jpg', '/phone 4.jpg', '/phone 5.jpg'],
    videos: ['/video1.mp4', '/video2.mp4', '/video3.mp4'],
  },
  {
    id: 'bras-gravure',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['robotique', 'mecanique'],
    tech: ['CATIA V5', 'RT ToolBox', 'Robot industriel'],
    title: { fr: 'Bras robotique — gravure sur bois', en: 'Robotic Arm — Wood Engraving' },
    description: {
      fr: 'Programmation d’un bras robotique industriel pour graver des motifs précis sur bois, avec trajectoires définies et simulées avant exécution.',
      en: 'Programming an industrial robotic arm to engrave precise patterns on wood, with toolpaths defined and simulated before execution.',
    },
    role: {
      fr: 'Conception CAO (CATIA V5), programmation et simulation des trajectoires (RT ToolBox).',
      en: 'CAD design (CATIA V5), toolpath programming and simulation (RT ToolBox).',
    },
    learned: {
      fr: 'Programmation de robots industriels, trajectoires/usinage, CAO CATIA V5.',
      en: 'Industrial robot programming, toolpaths/machining, CATIA V5 CAD.',
    },
    result: null,
    link: '[À COMPLÉTER : lien]',
    images: ['/rttoolbox.png'],
  },
  {
    id: 'suiveur-ligne',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['robotique', 'iot', 'mecanique'],
    tech: ['Arduino', 'SolidWorks', 'Capteurs IR/Ultrason'],
    title: { fr: 'Suiveur de ligne, anti-obstacles & parking', en: 'Line Follower, Obstacle Avoidance & Parking' },
    description: {
      fr: 'Robot mobile autonome capable de suivre une ligne, d’éviter les obstacles et de se garer automatiquement, à base de capteurs infrarouges et ultrason.',
      en: 'An autonomous mobile robot that follows a line, avoids obstacles and parks itself, using infrared and ultrasonic sensors.',
    },
    role: {
      fr: 'Conception mécanique (SolidWorks), électronique et programmation des comportements (Arduino).',
      en: 'Mechanical design (SolidWorks), electronics and behavior programming (Arduino).',
    },
    learned: {
      fr: 'Robotique mobile, asservissement par capteurs, logique de contrôle embarquée.',
      en: 'Mobile robotics, sensor-based control, embedded control logic.',
    },
    result: null,
    link: '[À COMPLÉTER : lien]',
  },
  {
    id: 'reservoir-iot',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['iot', 'automatisme'],
    tech: ['ESP32', 'MQTT', 'Node-RED', 'Firebase'],
    title: { fr: 'Réservoir intelligent — dashboard IoT', en: 'Smart Tank — IoT Dashboard' },
    description: {
      fr: 'Système IoT de gestion d’un réservoir et d’une pompe à eau : mesure du niveau, communication MQTT vers un tableau de bord Node-RED en temps réel, et stockage Firebase.',
      en: 'An IoT system for a tank and water pump: level sensing, MQTT communication to a real-time Node-RED dashboard, and Firebase storage.',
    },
    role: {
      fr: 'Mise en place de la chaîne IoT complète : capteur → ESP32 → MQTT → dashboard Node-RED.',
      en: 'Built the full IoT chain: sensor → ESP32 → MQTT → Node-RED dashboard.',
    },
    learned: {
      fr: 'Chaîne IoT de bout en bout, MQTT, tableaux de bord Node-RED, Firebase.',
      en: 'End-to-end IoT chain, MQTT, Node-RED dashboards, Firebase.',
    },
    result: null,
    link: '[À COMPLÉTER : lien]',
  },
  {
    id: 'siemens-expert',
    type: { fr: 'Académique — Certification', en: 'Academic — Certification' },
    status: null,
    categories: ['automatisme', 'iot', 'energie'],
    tech: ['TIA Portal', 'SIMATIC S7', 'HMI TP700', 'IO-Link', 'RFID RF210', 'Servo S210', 'Startdrive'],
    title: { fr: 'Académie Siemens Expert — automatisme avancé', en: 'Siemens Expert Academy — Advanced Automation' },
    description: {
      fr: 'Certification Siemens niveau Expert : configuration, programmation et pilotage de technologies industrielles avancées (servo-moteur S210, IO-Link, RFID, energy-meter) sous TIA Portal, avec création d’interfaces HMI.',
      en: 'Siemens Expert-level certification: configuring, programming and driving advanced industrial technologies (S210 servo drive, IO-Link, RFID, energy meter) in TIA Portal, with HMI interfaces.',
    },
    role: {
      fr: 'Configuration matérielle et réseau, programmation de l’automate et conception des IHM de supervision et de pilotage.',
      en: 'Hardware and network configuration, PLC programming and design of the supervision/control HMIs.',
    },
    learned: {
      fr: 'TIA Portal, motion control (servo S210), IO-Link/RFID, supervision HMI, qualité d’énergie.',
      en: 'TIA Portal, motion control (S210 servo), IO-Link/RFID, HMI supervision, power quality.',
    },
    result: null,
    link: '[À COMPLÉTER : lien]',
  },
  {
    id: 'photovoltaique',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['energie'],
    tech: ['PVSyst', 'Dimensionnement PV', 'Électrotechnique'],
    title: { fr: 'Atelier photovoltaïque — dimensionnement', en: 'Photovoltaic Workshop — System Sizing' },
    description: {
      fr: 'Dimensionnement d’installations photovoltaïques (résidentielle et pompage solaire) : choix des composants, calcul des sections de câbles et simulation sous PVSyst.',
      en: 'Sizing photovoltaic installations (residential and solar pumping): component selection, cable-section calculations and PVSyst simulation.',
    },
    role: {
      fr: 'Étude et dimensionnement complet des installations, simulations PVSyst, calcul des câbles selon les normes.',
      en: 'Full study and sizing of the installations, PVSyst simulations, standards-based cable calculations.',
    },
    learned: {
      fr: 'Dimensionnement PV, simulation PVSyst, normes d’installation électrique.',
      en: 'PV sizing, PVSyst simulation, electrical installation standards.',
    },
    result: null,
    link: '[À COMPLÉTER : lien]',
  },
  {
    id: 'erp-sap',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['gestion'],
    tech: ['SAP S/4HANA', 'Module MM', 'Module PP', 'Module EAM'],
    title: { fr: 'ERP — SAP S/4HANA', en: 'ERP — SAP S/4HANA' },
    description: {
      fr: 'Mise en pratique d’un ERP sur SAP S/4HANA : gestion des achats (MM), de la production (PP) et de la maintenance (EAM), avec modélisation d’une nomenclature et de gammes de fabrication.',
      en: 'Hands-on ERP work on SAP S/4HANA: procurement (MM), production (PP) and maintenance (EAM), with a bill of materials and production routings modeled.',
    },
    role: {
      fr: 'Paramétrage et manipulation des modules MM, PP et EAM, création des données de base (articles, nomenclatures, postes de travail).',
      en: 'Configured and operated the MM, PP and EAM modules, created master data (items, BOM, work centers).',
    },
    learned: {
      fr: 'ERP SAP S/4HANA, processus achat/production/maintenance, gestion industrielle.',
      en: 'SAP S/4HANA ERP, procurement/production/maintenance processes, industrial management.',
    },
    result: null,
    link: '[À COMPLÉTER : lien]',
  },
  {
    id: 'gmao',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['gestion'],
    tech: ['[À COMPLÉTER : techno]', 'Base de données', 'GMAO'],
    title: { fr: 'GMAO — gestion de maintenance assistée par ordinateur', en: 'CMMS — Computerized Maintenance Management' },
    description: {
      fr: 'Application de GMAO développée pour gérer la maintenance d’un parc machines : suivi des pannes, des interventions et de l’état des équipements (en marche / en panne).',
      en: 'A CMMS application built to manage a machine fleet’s maintenance: tracking breakdowns, interventions and equipment status (running / down).',
    },
    role: {
      fr: 'Conception de l’application et de sa base de données, modélisation des workflows panne → intervention.',
      en: 'Designed the application and its database, modeled the breakdown → intervention workflows.',
    },
    learned: {
      fr: 'Gestion de maintenance (GMAO), modélisation de données, développement applicatif.',
      en: 'Maintenance management (CMMS), data modeling, application development.',
    },
    result: null,
    link: '[À COMPLÉTER : lien]',
  },
  {
    id: 'mes',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['automatisme', 'iot', 'gestion'],
    tech: ['WinDev', 'Carte d’acquisition', 'Base de données', 'MTTR/MTBF'],
    title: { fr: 'MES — Manufacturing Execution System', en: 'MES — Manufacturing Execution System' },
    description: {
      fr: 'Système d’exécution de la production (MES) basé sur une carte d’acquisition : suivi des arrêts (avec MTTR/MTBF), de la production conforme/non conforme et des consommations (matière, température) via une interface WinDev.',
      en: 'A production execution system (MES) based on an acquisition card: tracking stoppages (with MTTR/MTBF), conforming/non-conforming output and consumption (material, temperature) through a WinDev interface.',
    },
    role: {
      fr: 'Programmation de la carte d’acquisition et développement de l’interface MES avec sa base de données (WinDev).',
      en: 'Programmed the acquisition card and built the MES interface with its database (WinDev).',
    },
    learned: {
      fr: 'MES, indicateurs de maintenance (MTTR/MTBF), acquisition de données, WinDev.',
      en: 'MES, maintenance KPIs (MTTR/MTBF), data acquisition, WinDev.',
    },
    result: null,
    link: '[À COMPLÉTER : lien]',
    images: ['/mes1.png', '/MES2.png', '/MES3.png', '/mes4.png'],
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
    items: ['Arduino', 'ESP32', 'TIA Portal', 'Capteurs industriels', 'Node-RED', 'MQTT', 'RT ToolBox'],
  },
  {
    title: { fr: 'Développement logiciel', en: 'Software development' },
    items: ['Python', 'C#', 'Java', 'Applications desktop', 'Applications mobiles'],
  },
  {
    title: { fr: 'IA, Machine Learning & AR', en: 'AI, Machine Learning & AR' },
    items: ['Machine Learning', 'Random Forest', 'LSTM', 'Computer Vision', 'Maintenance prédictive', 'Unity', 'Vuforia'],
  },
  {
    title: { fr: 'Gestion industrielle', en: 'Industrial management' },
    items: ['SAP S/4HANA', 'GMAO / CMMS', 'MES', 'MTTR / MTBF', 'PVSyst'],
  },
]

/** Tools marquee (real tools from the CV/projects only) */
export const tools: string[] = [
  'SolidWorks', 'CATIA V5', 'Blender', 'Python', 'C#', 'Java',
  'Arduino', 'ESP32', 'TIA Portal', 'Unity', 'Vuforia', 'Node-RED', 'MQTT', 'RT ToolBox', 'SAP S/4HANA', 'PVSyst',
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
