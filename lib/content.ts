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
    type: { fr: 'PFE Master — Individuel', en: 'Master’s final project — Individual' },
    status: null,
    categories: ['ar', 'mecanique'],
    tech: ['Unity', 'Vuforia', 'C#', 'SolidWorks', 'Blender'],
    title: { fr: 'GenARino — réalité augmentée pour groupe électrogène', en: 'GenARino — Generator Set AR App' },
    description: {
      fr: 'Application de réalité augmentée pour apprendre le fonctionnement d’un groupe électrogène VISA et guider sa maintenance à distance. Le composant à inspecter s’illumine en rouge sur la machine, et un simple toucher révèle son détail.',
      en: 'An augmented-reality app to learn how a VISA generator set works and to guide its maintenance remotely. The component to inspect lights up in red on the machine, and a single tap reveals its details.',
    },
    details: {
      fr: [
        'Projet de fin d’études Master (ISTIC, 2025, 6 mois), en lien avec la société MATECH — groupes électrogènes de marque VISA. Former les techniciens et utilisateurs à distance coûte cher : GenARino superpose l’information directement sur la machine grâce à la réalité augmentée.',
        'Mené intégralement seule, en deux volets. Modélisation 3D du groupe électrogène et de ses composants (SolidWorks pour la conception, Blender pour la préparation des modèles). Puis l’application AR sous Unity (Vuforia, C#) : pointé vers la machine, le téléphone fait apparaître le modèle 3D par-dessus le groupe réel ; le composant concerné ressort en rouge et un toucher l’isole en gros plan avec ses informations.',
        'Trois fonctions : identification AR des composants (assistance à la maintenance à distance), un quiz pour apprendre et valider ses connaissances, et un programme de maintenance préventive pour planifier les vérifications.',
      ],
      en: [
        'Master’s final-year project (ISTIC, 2025, 6 months), with the company MATECH — VISA-brand generator sets. Training technicians and users remotely is costly: GenARino overlays the information directly onto the machine using augmented reality.',
        'Run entirely on my own, in two parts. 3D modeling of the generator set and its components (SolidWorks for design, Blender to prepare the models). Then the AR app in Unity (Vuforia, C#): pointed at the machine, the phone brings up the 3D model over the real generator; the relevant component stands out in red and a tap isolates it in close-up with its information.',
        'Three functions: AR component identification (remote maintenance assistance), a quiz to learn and test knowledge, and a preventive-maintenance program to plan check-ups.',
      ],
    },
    role: {
      fr: 'Projet réalisé intégralement seule : modélisation 3D (SolidWorks, Blender) et développement complet de l’application de réalité augmentée (Unity, Vuforia, C#).',
      en: 'Built entirely on my own: 3D modeling (SolidWorks, Blender) and full development of the augmented-reality app (Unity, Vuforia, C#).',
    },
    learned: {
      fr: 'Le plus délicat : amener des modèles 3D issus de la CAO dans une application AR fluide sur téléphone — les alléger fortement sans perdre le réalisme et obtenir un suivi (tracking) stable pour que les composants restent alignés sur la vraie machine. J’ai aussi appris à concevoir pour un technicien non expert : l’AR n’a de valeur que si elle est immédiatement lisible sur le terrain.',
      en: 'The trickiest part: bringing CAD-based 3D models into a smooth phone AR app — simplifying them heavily without losing realism and achieving stable tracking so components stay aligned with the real machine. I also learned to design for a non-expert technician: AR is only valuable if it’s instantly readable in the field.',
    },
    result: {
      fr: 'Application fonctionnelle, testée par des enseignants, des techniciens et le gérant de MATECH : apprendre le groupe électrogène et guider la maintenance à distance, sans manipuler la vraie machine.',
      en: 'A functional app, tested by professors, technicians and MATECH’s manager: learning the generator set and guiding maintenance remotely, without handling the real machine.',
    },
    link: '[À COMPLÉTER : lien]',
    images: ['/app.jpg', '/8.jpg'],
  },
  {
    id: 'robot-fissures',
    type: { fr: 'Académique — équipe de 6', en: 'Academic — team of 6' },
    status: null,
    categories: ['robotique', 'ia', 'iot'],
    tech: ['Python', 'VGG16', 'Transfer Learning', 'Deep Learning', 'Computer Vision', 'ESP32-CAM'],
    title: { fr: 'Robot de détection de fissures', en: 'Crack-Detection Robot' },
    description: {
      fr: 'Robot mobile d’inspection de murs, piloté à distance, qui détecte automatiquement les fissures par IA. Une caméra ESP32-CAM transmet les images à un PC où un modèle VGG16 (transfer learning) les analyse en temps réel.',
      en: 'A remotely controlled wall-inspection robot that automatically detects cracks with AI. An ESP32-CAM streams images to a PC where a VGG16 model (transfer learning) analyzes them in real time.',
    },
    details: {
      fr: [
        'Projet académique en équipe de 6 (ESPRIT, 2025). Inspecter manuellement les murs d’un bâtiment est lent, subjectif et parfois risqué (zones hautes ou difficiles d’accès). L’équipe a conçu un robot mobile, piloté à distance via une application mobile, équipé d’une caméra et d’un modèle d’IA pour détecter automatiquement les fissures.',
        'Ma partie : la détection par vision et son intégration embarquée. Une carte ESP32-CAM capture les images des murs et les envoie à un PC, où le modèle les analyse en temps réel. J’ai utilisé VGG16 (réseau convolutif pré-entraîné) ré-entraîné par transfer learning sur un jeu d’images de fissures (Kaggle), après avoir d’abord exploré le traitement d’image classique sous MATLAB.',
        'Choix d’architecture déterminant : l’ESP32 ne peut pas exécuter un modèle aussi lourd que VGG16. J’ai donc séparé les rôles — la carte gère la capture et la transmission des images, le PC exécute l’inférence — ce qui rend la détection possible en embarqué.',
      ],
      en: [
        'Academic project in a team of 6 (ESPRIT, 2025). Manually inspecting a building’s walls for cracks is slow, subjective and sometimes risky (high or hard-to-reach areas). The team built a mobile robot, remotely controlled through a mobile app, fitted with a camera and an AI model to automatically detect cracks.',
        'My part: the vision-based detection and its embedded integration. An ESP32-CAM board captures wall images and sends them to a PC, where the model analyzes them in real time. I used VGG16 (a pretrained CNN) retrained via transfer learning on a crack-image dataset (Kaggle), after first exploring classic image processing in MATLAB.',
        'A key architecture choice: the ESP32 can’t run a model as heavy as VGG16. So I split the roles — the board handles image capture and transmission, the PC runs the inference — which makes embedded detection possible.',
      ],
    },
    role: {
      fr: 'Conception du modèle de détection de fissures par IA (VGG16, transfer learning) et son intégration sur carte ESP32-CAM ; mise en place de l’architecture déportée capture (ESP32) / inférence (PC).',
      en: 'Built the AI crack-detection model (VGG16, transfer learning) and integrated it on an ESP32-CAM board; designed the offloaded capture (ESP32) / inference (PC) architecture.',
    },
    learned: {
      fr: 'Ne pas s’enfermer dans la première méthode : j’ai fait basculer l’approche du traitement d’image classique (MATLAB) vers le deep learning (VGG16), plus simple et plus précis. J’ai découvert la vision par ordinateur par la recherche, et appris à raisonner « système » en répartissant capture et inférence entre la carte et le PC.',
      en: 'Don’t lock into the first method: I switched from classic image processing (MATLAB) to deep learning (VGG16), which was simpler and more accurate. I picked up computer vision through research, and learned to think at the “system” level by splitting capture and inference between the board and the PC.',
    },
    result: {
      fr: '96 % de précision (accuracy) sur la détection de fissures ; système complet fonctionnel de bout en bout : la caméra du robot transmet les images, le PC les analyse et signale les fissures en direct.',
      en: '96% accuracy on crack detection; full system working end to end: the robot’s camera streams images, the PC analyzes them and flags cracks live.',
    },
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
    type: { fr: 'PFE Licence — Binôme', en: 'Bachelor’s final project — Pair' },
    status: null,
    categories: ['automatisme', 'iot'],
    tech: ['Arduino', 'Guard Revolution', 'Électronique', 'Java'],
    title: { fr: 'Simulateur de pannes + application de diagnostic', en: 'Fault Simulator + Diagnostic App' },
    description: {
      fr: 'Banc interactif reproduisant un groupe électrogène, qui permet de provoquer des pannes à volonté (batterie, démarreur, surchauffe…) pour s’entraîner au diagnostic en toute sécurité. Une application associée explique chaque panne pour guider le dépannage.',
      en: 'An interactive bench that reproduces a generator set and lets you trigger faults at will (battery, starter, overheating…) to practise diagnosis safely. A companion app explains each fault to guide troubleshooting.',
    },
    details: {
      fr: [
        'Projet de fin d’études (Licence en Génie mécanique, ISETN, 2023 — 4 mois), en binôme et en lien avec la société MATECH. Apprendre à diagnostiquer les pannes d’un groupe électrogène suppose de pouvoir les reproduire — risqué, voire impossible, sur une machine en service.',
        'Le banc reproduit le fonctionnement d’un groupe électrogène autour d’un afficheur/contrôleur de marque Guard Revolution, d’une carte Arduino et de composants électriques. Des potentiomètres déclenchent des pannes à la demande (batterie déchargée, démarreur défaillant, surchauffe…), autant de scénarios à diagnostiquer dans un environnement sûr.',
        'En parallèle, j’ai développé seule une application de diagnostic (Java) : on y saisit le nom d’une panne et elle en affiche le détail, pour guider l’apprentissage du dépannage.',
      ],
      en: [
        'Final-year project (Bachelor’s in Mechanical Engineering, ISETN, 2023 — 4 months), as a pair and with the company MATECH. Learning to diagnose generator-set faults means being able to reproduce them — risky, if not impossible, on a machine in service.',
        'The bench reproduces a generator set’s operation around a Guard Revolution controller/display, an Arduino board and electrical components. Potentiometers trigger faults on demand (flat battery, faulty starter, overheating…), a range of scenarios to diagnose in a safe environment.',
        'In parallel, I developed a diagnostic app on my own (Java): you type a fault’s name and it displays the details, to guide troubleshooting practice.',
      ],
    },
    role: {
      fr: 'Conception du banc à deux ; développement seule de l’application de diagnostic (Java).',
      en: 'Designed the bench together; developed the diagnostic app on my own (Java).',
    },
    learned: {
      fr: 'La principale difficulté : comprendre l’afficheur/contrôleur Guard Revolution, une technologie entièrement nouvelle pour moi. J’ai appris à apprivoiser un équipement industriel inconnu par la documentation et l’expérimentation, puis à traduire son comportement en un outil réellement pédagogique.',
      en: 'The main challenge: understanding the Guard Revolution controller/display, a completely new technology for me. I learned to tame an unfamiliar industrial device through documentation and experimentation, then to translate its behavior into a genuinely educational tool.',
    },
    result: {
      fr: 'Banc fonctionnel, et même en cours d’utilisation chez la société MATECH — la meilleure preuve de son utilité réelle pour la formation et le diagnostic.',
      en: 'A functional bench, and even in use at the company MATECH — the best proof of its real value for training and diagnosis.',
    },
    link: '[À COMPLÉTER : lien]',
    images: ['/groupe.jpg', '/projet  groupe.jpg', '/Phone.jpg', '/phone1.jpg', '/phone 3.jpg', '/phone 4.jpg', '/phone 5.jpg'],
    videos: ['/video1.mp4', '/video2.mp4', '/video3.mp4'],
  },
  {
    id: 'bras-gravure',
    type: { fr: 'Académique — Individuel', en: 'Academic — Individual' },
    status: null,
    categories: ['robotique', 'mecanique'],
    tech: ['CATIA V5', 'RT ToolBox', 'Robot 6 axes'],
    title: { fr: 'Bras robotique — gravure sur bois', en: 'Robotic Arm — Wood Engraving' },
    description: {
      fr: 'Commande d’un bras robotisé 6 axes pour une opération de gravure : d’un motif conçu en CAO jusqu’au mouvement précis exécuté par le robot. Conception sous CATIA V5, programmation des trajectoires sous RT ToolBox.',
      en: 'Programming a 6-axis robotic arm for an engraving operation: from a CAD-designed pattern to a precise motion executed by the robot. Design in CATIA V5, toolpath programming in RT ToolBox.',
    },
    details: {
      fr: [
        'Projet académique libre (2024) dont j’ai choisi le sujet : prendre en main et commander un bras robotisé à 6 axes via son logiciel de programmation, pour lui faire réaliser une opération de gravure. L’enjeu : passer d’un motif conçu sur ordinateur à un mouvement précis exécuté par le robot dans le monde réel.',
        'J’ai d’abord utilisé CATIA V5 pour la conception : la pièce à graver — portant le motif « MECA » — ainsi que le support / la table monté sur le bras. J’ai ensuite programmé le bras 6 axes avec RT ToolBox, en définissant les trajectoires pour que le robot suive fidèlement le tracé du motif et le grave.',
      ],
      en: [
        'A free academic project (2024) whose topic I chose myself: getting hands-on with and programming a 6-axis robotic arm through its software, to have it perform an engraving operation. The challenge: going from a pattern designed on a computer to a precise motion executed by the robot in the real world.',
        'I first used CATIA V5 for the design: the part to be engraved — bearing the “MECA” pattern — and the support/table mounted on the arm. I then programmed the 6-axis arm with RT ToolBox, defining the toolpaths so the robot faithfully follows the pattern and engraves it.',
      ],
    },
    role: {
      fr: 'Projet mené seule : conception CAO (CATIA V5) et programmation du robot 6 axes (RT ToolBox), de la définition des trajectoires à l’exécution.',
      en: 'Run solo: CAD design (CATIA V5) and 6-axis robot programming (RT ToolBox), from toolpath definition to execution.',
    },
    learned: {
      fr: 'J’ai découvert la programmation d’un robot industriel : définir des trajectoires propres et sûres dans RT ToolBox et faire en sorte qu’un motif dessiné en CAO se traduise fidèlement en mouvement réel. J’ai surtout saisi le lien concret entre la conception (CATIA) et l’exécution par le robot.',
      en: 'I discovered industrial robot programming: defining clean, safe toolpaths in RT ToolBox and making a CAD-designed pattern translate faithfully into real motion. Above all I grasped the concrete link between design (CATIA) and execution by the robot.',
    },
    result: {
      fr: 'Un programme fonctionnel qui amène le bras 6 axes à suivre le tracé du motif « MECA » et à le graver — la chaîne complète, du modèle CAO jusqu’au mouvement réel du robot.',
      en: 'A working program that drives the 6-axis arm to follow and engrave the “MECA” pattern — the full chain, from the CAD model to the robot’s real motion.',
    },
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
    type: { fr: 'Académique — Individuel', en: 'Academic — Individual' },
    status: null,
    categories: ['automatisme', 'iot', 'energie'],
    tech: ['TIA Portal', 'SIMATIC S7', 'Servo S210', 'Startdrive', 'IO-Link', 'RFID RF210', 'Energy meter', 'HMI TP700'],
    title: { fr: 'Automatisme avancé Siemens (TIA Portal)', en: 'Advanced Siemens Automation (TIA Portal)' },
    description: {
      fr: 'Configuration, programmation et supervision d’un système d’automatisme avancé sur maquette Siemens réelle, sous TIA Portal : servo-moteur, IO-Link, RFID et compteur d’énergie, le tout piloté depuis un pupitre HMI.',
      en: 'Configuring, programming and supervising an advanced automation system on a real Siemens rig in TIA Portal: servo drive, IO-Link, RFID and an energy meter, all driven from an HMI panel.',
    },
    details: {
      fr: [
        'Projet d’automatisme avancé (Siemens) — ESPRIT, 5ᵉ année Mécatronique, 2025, un semestre, mené seule. Faire fonctionner ensemble des technologies très différentes (servo-moteur, capteurs en réseau, compteur d’énergie) dans un même système piloté est un vrai enjeu d’intégration.',
        'Sous TIA Portal, sur une maquette réelle : un servo-moteur S210 (mise en service Startdrive, régulation de vitesse et de position) ; la communication IO-Link et un capteur RFID (RF210, lecture/écriture des étiquettes) ; un energy-meter pour la qualité d’énergie ; et des interfaces HMI (pupitre TP700) pour superviser et piloter l’ensemble.',
        'J’ai pris en charge la configuration matérielle et réseau, la programmation de l’automate et la conception des écrans HMI.',
      ],
      en: [
        'Advanced automation project (Siemens) — ESPRIT, 5th-year Mechatronics, 2025, one semester, run solo. Making very different technologies work together (servo drive, networked sensors, energy meter) within a single controlled system is a real integration challenge.',
        'In TIA Portal, on a real rig: an S210 servo drive (Startdrive commissioning, speed and position control); IO-Link communication and an RFID sensor (RF210, reading/writing tags); an energy meter for power-quality monitoring; and HMI interfaces (TP700 panel) to supervise and drive the whole system.',
        'I handled the hardware and network configuration, the PLC programming and the design of the HMI screens.',
      ],
    },
    role: {
      fr: 'Projet mené seule : configuration matérielle et réseau, programmation de l’automate (SIMATIC S7) et conception des interfaces HMI de supervision et de pilotage.',
      en: 'Run solo: hardware and network configuration, PLC programming (SIMATIC S7) and design of the supervision/control HMIs.',
    },
    learned: {
      fr: 'Pas de blocage majeur — ce qui m’a marquée, c’est ma manière de travailler : je trouvais souvent la solution par moi-même avant même qu’elle soit expliquée en cours. J’ai appris à faire cohabiter des technologies très différentes (motion, IO-Link, RFID, mesure d’énergie) dans un projet cohérent, et à penser la supervision du point de vue de l’opérateur via les interfaces HMI.',
      en: 'No major roadblock — what stood out was my way of working: I often found the solution on my own before it was even explained in class. I learned to make very different technologies (motion, IO-Link, RFID, energy metering) coexist in one coherent project, and to think about supervision from the operator’s point of view through the HMI interfaces.',
    },
    result: {
      fr: 'Un système complet, configuré et fonctionnel sur la maquette : servo asservi en vitesse et en position, lecture/écriture RFID via IO-Link, suivi de l’énergie, le tout supervisé et piloté depuis le pupitre HMI.',
      en: 'A complete, configured and functional system on the rig: the servo controlled in speed and position, RFID read/write over IO-Link, energy monitoring, all supervised and driven from the HMI panel.',
    },
    link: '[À COMPLÉTER : lien]',
    images: ['/siemens.jpg'],
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
