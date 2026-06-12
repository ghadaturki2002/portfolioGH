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
    { value: '15', label: { fr: 'Projets d’ingénierie', en: 'Engineering projects' } as L },
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
    role: { fr: 'Projet de fin d’études d’ingénieur — Jumeau numérique & maintenance prédictive', en: 'Engineering final-year project — Digital twin & predictive maintenance' },
    summary: {
      fr: 'Jumeau numérique d’une machine de gravure ionique : prédiction de la durée de vie restante (RUL) et du type de panne par machine learning (Random Forest & LSTM).',
      en: 'Digital twin of an ion-milling machine: predicting Remaining Useful Life (RUL) and fault type with machine learning (Random Forest & LSTM).',
    },
    bullets: {
      fr: [
        'Conçu le jumeau numérique d’une machine de gravure ionique à partir de ses données capteurs (jeu PHM 2018, ~80 M de mesures).',
        'Développé un pipeline Random Forest (détection précoce) + LSTM (prédiction de la durée de vie restante, RUL), avec un résiduel physique débit/pression et un ensemble de modèles.',
        'Déployé une démo temps réel ESP32 → MQTT → serveur Flask → tableau de bord Node-RED.',
        'Battu l’article de référence (RMSE jusqu’à ~12× meilleur ; ROC AUC 0,98–0,999, rappel 100 %).',
      ],
      en: [
        'Built the digital twin of an ion-milling machine from its sensor data (PHM 2018 dataset, ~80 M measurements).',
        'Developed a Random Forest (early detection) + LSTM (Remaining Useful Life prediction) pipeline, with a physics-based flow/pressure residual and a model ensemble.',
        'Deployed a real-time demo: ESP32 → MQTT → Flask server → Node-RED dashboard.',
        'Beat the reference paper (RMSE up to ~12× better; ROC AUC 0.98–0.999, 100% recall).',
      ],
    },
    tech: ['Python', 'PyTorch', 'Random Forest', 'LSTM', 'ESP32', 'MQTT', 'Node-RED', 'Flask'],
  },
  {
    company: 'MATECH',
    location: { fr: 'Megrine, Tunisie', en: 'Megrine, Tunisia' },
    period: '03/2025 – 09/2025',
    role: { fr: 'Mémoire de fin d’études (Master) — Réalité augmentée pour la maintenance industrielle', en: 'Master’s final-year project — Augmented reality for industrial maintenance' },
    summary: {
      fr: 'Application mobile en réalité augmentée (GenARino) et émulateur physique, pour la formation et la maintenance à distance d’un groupe électrogène.',
      en: 'An augmented-reality mobile app (GenARino) and a physical emulator, for training and remote maintenance of a generator set.',
    },
    bullets: {
      fr: [
        'Développé GenARino, application mobile AR (Unity, Vuforia, C#) de formation et d’aide à la maintenance à distance.',
        'Modélisé en 3D le groupe électrogène et ses composants (SolidWorks, Blender).',
        'Réalisé un émulateur physique (Arduino) et intégré un quiz d’évaluation + un programme de maintenance préventive ; validé par les techniciens et le gérant de MATECH.',
      ],
      en: [
        'Developed GenARino, an AR mobile app (Unity, Vuforia, C#) for training and remote-maintenance assistance.',
        'Modelled the generator set and its components in 3D (SolidWorks, Blender).',
        'Built a physical emulator (Arduino) and integrated an assessment quiz + a preventive-maintenance program; validated by MATECH’s technicians and manager.',
      ],
    },
    tech: ['Unity', 'Vuforia', 'C#', 'SolidWorks', 'Blender', 'Arduino'],
  },
  {
    company: 'GD Tunisie',
    location: { fr: 'Birbouragba, Tunisie', en: 'Birbouragba, Tunisia' },
    period: '07/2025 – 08/2025',
    role: { fr: 'Stage d’ingénieur — Digitalisation du suivi de production', en: 'Engineering internship — Digitizing production tracking' },
    summary: {
      fr: 'Logiciel de digitalisation du suivi de production chez un fabricant de câbles : gestion par QR code et comptage automatique par capteur.',
      en: 'Software digitizing production tracking at a cable manufacturer: QR-code management and automatic sensor-based counting.',
    },
    bullets: {
      fr: [
        'Développé un logiciel Python remplaçant le suivi papier : gestion des ouvriers et opérations par QR code, suivi des shifts, tableau de bord + export Excel.',
        'Mis en place un comptage automatique des câbles par capteur en bout de ligne.',
      ],
      en: [
        'Developed a Python software replacing paper tracking: worker/operation management via QR codes, shift tracking, dashboard + Excel export.',
        'Set up automatic cable counting via an end-of-line sensor.',
      ],
    },
    tech: ['Python', 'QR Code', 'Capteur E3F-DS30C4', 'Excel'],
  },
  {
    company: 'MATECH',
    location: { fr: 'Megrine, Tunisie', en: 'Megrine, Tunisia' },
    period: '02/2023 – 06/2023',
    role: { fr: 'Stage de fin d’études (Licence) — Émulateur de groupe électrogène + application de diagnostic', en: 'Final-year internship (Bachelor’s) — Generator-set emulator + diagnostic app' },
    summary: {
      fr: 'Émulateur interactif de groupe électrogène et application de diagnostic des pannes, pour la formation des techniciens.',
      en: 'An interactive generator-set emulator and a fault-diagnosis app, for training technicians.',
    },
    bullets: {
      fr: [
        'Réalisé un émulateur interactif de groupe électrogène (contrôleur Guard Revolution, Arduino) permettant de générer des pannes à la demande — aujourd’hui en service chez MATECH.',
        'Développé une application de diagnostic (Java) traduisant le nom d’une panne en description claire pour le technicien.',
        'Rédigé le dossier de fabrication, défini les besoins et créé les travaux pratiques pédagogiques.',
      ],
      en: [
        'Built an interactive generator-set emulator (Guard Revolution controller, Arduino) to trigger faults on demand — now in use at MATECH.',
        'Developed a diagnostic app (Java) translating a fault’s name into a clear description for the technician.',
        'Wrote the manufacturing dossier, defined the requirements and created hands-on training exercises.',
      ],
    },
    tech: ['Arduino', 'Guard Revolution', 'Électronique', 'Java'],
  },
  {
    company: 'CSM-GIAS',
    location: { fr: 'Bouargoub, Tunisie', en: 'Bouargoub, Tunisia' },
    period: '01/2022 – 02/2022',
    role: { fr: 'Stage de technicien — Automatisation d’un poste de conditionnement', en: 'Technician internship — Automating a packaging station' },
    summary: {
      fr: 'Conception d’un poste automatisé en amélioration de la machine Trepko Seau.',
      en: 'Designed an automated station, improving the Trepko bucket machine.',
    },
    bullets: {
      fr: [
        'Conçu et prototypé une machine de mise en place des récipients sur le tapis (SolidWorks, Arduino), en amélioration de la machine Trepko.',
      ],
      en: [
        'Designed and prototyped a machine to place containers onto the conveyor (SolidWorks, Arduino), improving the Trepko machine.',
      ],
    },
    tech: ['SolidWorks', 'Arduino'],
  },
  {
    company: 'WEWIRE',
    location: { fr: 'Hammamet, Tunisie', en: 'Hammamet, Tunisia' },
    period: '07/2021',
    role: { fr: 'Stage d’initiation — Fabrication de câbles & Lean', en: 'Introductory internship — Cable manufacturing & Lean' },
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
    type: { fr: 'Stage ingénieur — Entreprise (GD Tunisie)', en: 'Engineering internship — Company (GD Tunisie)' },
    status: null,
    categories: ['automatisme', 'iot', 'gestion'],
    tech: ['Python', 'QR Code', 'Capteur E3F-DS30C4', 'Excel', 'Base de données'],
    title: { fr: 'Gestion de production — tableau de bord', en: 'Production Management — Dashboard' },
    description: {
      fr: 'Logiciel qui remplace le suivi papier d’un fabricant de câbles : gestion des ouvriers et des opérations par QR code, suivi des shifts, comptage automatique des câbles par capteur, et tableau de bord avec historique exportable en Excel.',
      en: 'Software replacing a cable manufacturer’s paper tracking: worker and operation management via QR codes, shift tracking, automatic sensor-based cable counting, and a dashboard with history exportable to Excel.',
    },
    details: {
      fr: [
        'Stage d’ingénieur chez GD Tunisie (fabricant de câbles, 2025, 2 mois, en individuel). Le suivi de production se faisait entièrement sur papier : l’objectif était de le remplacer par un logiciel de gestion et de suivi en temps réel.',
        'Volet gestion : ajout d’un ouvrier (photo + QR code), génération de QR codes d’opération, suivi du début et de la fin de shift, et un tableau de bord avec détail et historique, exportable en fichier Excel.',
        'Volet temps réel : un capteur placé à la dernière étape de fabrication détecte chaque câble terminé et l’ajoute automatiquement au comptage. Faute d’équipement industriel (caméra / scanner) sur site, j’ai validé l’application sur mon PC, avec sa webcam, pour démontrer le fonctionnement complet.',
      ],
      en: [
        'Engineering internship at GD Tunisie (cable manufacturer, 2025, 2 months, individual). Production tracking was done entirely on paper: the goal was to replace it with real-time management and tracking software.',
        'Management side: adding a worker (photo + QR code), generating operation QR codes, tracking shift start and end, and a dashboard with details and history, exportable to Excel.',
        'Real-time side: a sensor placed at the last manufacturing step detects each finished cable and automatically adds it to the count. With no industrial hardware (camera / scanner) on site, I validated the app on my PC, using its webcam, to demonstrate the full functionality.',
      ],
    },
    role: {
      fr: 'Conception et développement complet du logiciel (Python) et du comptage par capteur, en autonomie sur site.',
      en: 'Full design and development of the software (Python) and of the sensor-based counting, autonomously on site.',
    },
    learned: {
      fr: 'La principale contrainte a été matérielle : sans caméra ni scanner industriels sur site, j’ai contourné la limite en validant l’application sur mon PC (avec sa webcam) pour prouver qu’elle fonctionnait. Surtout, j’ai appris à répondre à un vrai besoin d’entreprise : transformer un suivi papier en un outil numérique simple et utile au quotidien.',
      en: 'The main constraint was hardware: with no industrial cameras or scanners on site, I worked around it by validating the app on my PC (with its webcam) to prove it worked. Above all, I learned to answer a real business need: turning paper tracking into a simple, day-to-day digital tool.',
    },
    result: {
      fr: 'Un logiciel fonctionnel remplaçant le suivi papier : gestion ouvriers/opérations par QR code, suivi des shifts, comptage automatique, tableau de bord avec historique et export Excel. Fonctionnement validé sur PC ; le déploiement complet sur site reste conditionné à l’équipement (caméra / scanner).',
      en: 'A functional software replacing paper tracking: worker/operation management via QR codes, shift tracking, automatic counting, a dashboard with history and Excel export. Validated on PC; full on-site deployment remains conditional on the equipment (camera / scanner).',
    },
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
    type: { fr: 'Académique — Équipe de 3', en: 'Academic — Team of 3' },
    status: null,
    categories: ['iot', 'automatisme'],
    tech: ['ESP32', 'MQTT', 'Node-RED', 'Firebase', 'Wokwi', 'Capteur de niveau'],
    title: { fr: 'Réservoir intelligent — dashboard IoT', en: 'Smart Tank — IoT Dashboard' },
    description: {
      fr: 'Chaîne IoT complète qui surveille le niveau d’eau d’un réservoir et pilote automatiquement une pompe selon ce niveau. Suivi en temps réel sur un tableau de bord Node-RED, données historisées dans Firebase.',
      en: 'A full IoT chain that monitors a tank’s water level and automatically controls a pump based on it. Real-time tracking on a Node-RED dashboard, data logged in Firebase.',
    },
    details: {
      fr: [
        'Projet IoT (ESPRIT, 2026, en équipe de 3). Objectif : apprendre à construire une chaîne IoT complète et son tableau de bord, sur un cas concret — surveiller le niveau d’eau d’un réservoir et piloter automatiquement une pompe selon ce niveau.',
        'Un capteur de niveau immergé mesure le niveau ; un ESP32 récupère la mesure et la publie via MQTT. Un tableau de bord Node-RED affiche le niveau en temps réel et les données sont historisées dans Firebase. Selon le niveau, la pompe se déclenche automatiquement. Le système a été développé et testé en simulation (Wokwi) comme avec de vrais composants électroniques.',
      ],
      en: [
        'IoT project (ESPRIT, 2026, in a team of 3). Goal: learn to build a full IoT chain and its dashboard, on a concrete case — monitoring a tank’s water level and automatically controlling a pump based on it.',
        'An immersed level sensor measures the level; an ESP32 reads it and publishes it over MQTT. A Node-RED dashboard displays the level in real time and the data is logged in Firebase. Depending on the level, the pump turns on automatically. The system was developed and tested in simulation (Wokwi) and with real electronic components.',
      ],
    },
    role: {
      fr: 'Travail en équipe (3 personnes) sur la chaîne IoT complète (capteur → ESP32 → MQTT → Node-RED → Firebase) et le tableau de bord de supervision.',
      en: 'Teamwork (3 people) on the full IoT chain (sensor → ESP32 → MQTT → Node-RED → Firebase) and the supervision dashboard.',
    },
    learned: {
      fr: 'Concevoir un tableau de bord clair et utile : transformer un flux de données capteur en information lisible en temps réel. J’ai compris la logique publication/abonnement de MQTT et la façon de relier tous les maillons d’une chaîne IoT — capteur, ESP32, dashboard, base de données — pour fermer la boucle jusqu’au pilotage automatique de la pompe.',
      en: 'Designing a clear, useful dashboard: turning a stream of sensor data into readable, real-time information. I understood MQTT’s publish/subscribe logic and how to connect every link of an IoT chain — sensor, ESP32, dashboard, database — to close the loop all the way to automatic pump control.',
    },
    result: {
      fr: 'Système IoT fonctionnel : niveau suivi en direct sur le tableau de bord, pompe déclenchée automatiquement au bon niveau, données historisées — validé en simulation (Wokwi) comme en réel.',
      en: 'A functional IoT system: level tracked live on the dashboard, pump triggered automatically at the right level, data logged — validated in simulation (Wokwi) and in real life.',
    },
    link: '[À COMPLÉTER : lien]',
    images: ['/reservoir-iot.jpg'],
  },
  {
    id: 'stm32-embedded',
    type: { fr: 'Académique — Équipe de 3', en: 'Academic — Team of 3' },
    status: null,
    categories: ['iot'],
    tech: ['STM32', 'I2C', 'UART', 'Capteur ultrason', 'LCD', 'Proteus ISIS'],
    title: { fr: 'Projet embarqué STM32 — I2C & UART', en: 'STM32 Embedded Project — I2C & UART' },
    description: {
      fr: 'Système embarqué sur STM32 mettant en œuvre les protocoles de communication I2C et UART, avec capteur à ultrasons, moteur, boutons et afficheur LCD. Développé et validé en simulation sous Proteus ISIS.',
      en: 'An STM32 embedded system implementing the I2C and UART communication protocols, with an ultrasonic sensor, motor, buttons and an LCD display. Developed and validated in simulation with Proteus ISIS.',
    },
    details: {
      fr: [
        'Projet académique (ESPRIT, 2024, un semestre, en équipe de 3). Objectif : maîtriser deux protocoles incontournables des systèmes embarqués — I2C et UART — en les mettant en œuvre concrètement sur un microcontrôleur STM32, à travers un petit montage.',
        'Le montage, développé sur STM32 et simulé sous Proteus ISIS, réunit un capteur à ultrasons, un moteur, des boutons et un afficheur LCD, et met en œuvre la communication I2C ainsi qu’une liaison série UART.',
      ],
      en: [
        'Academic project (ESPRIT, 2024, one semester, in a team of 3). Goal: master two essential embedded-systems protocols — I2C and UART — by implementing them concretely on an STM32 microcontroller through a small setup.',
        'The setup, developed on STM32 and simulated in Proteus ISIS, combines an ultrasonic sensor, a motor, buttons and an LCD display, and implements I2C communication as well as a UART serial link.',
      ],
    },
    role: {
      fr: 'Mise en œuvre des communications I2C et UART sur STM32, et réalisation du montage (capteur, moteur, boutons, LCD) développé et simulé sous Proteus ISIS.',
      en: 'Implementing I2C and UART communication on STM32, and building the setup (sensor, motor, buttons, LCD) developed and simulated in Proteus ISIS.',
    },
    learned: {
      fr: 'Mettre en œuvre concrètement les protocoles I2C et UART sur STM32 : comprendre comment des composants communiquent sur un même bus (I2C) et comment établir une liaison série (UART). La simulation sous Proteus m’a permis de valider le montage et le code avant tout matériel réel.',
      en: 'Implementing the I2C and UART protocols concretely on STM32: understanding how components communicate on a shared bus (I2C) and how to set up a serial link (UART). Simulating in Proteus let me validate the setup and the code before any real hardware.',
    },
    result: {
      fr: 'Montage fonctionnel en simulation (Proteus) démontrant les communications I2C et UART sur STM32.',
      en: 'A setup functional in simulation (Proteus) demonstrating I2C and UART communication on STM32.',
    },
    link: '[À COMPLÉTER : lien]',
    images: ['/stm32.jpg'],
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
    id: 'pick-place',
    type: { fr: 'Académique — Équipe de 5', en: 'Academic — Team of 5' },
    status: null,
    categories: ['automatisme'],
    tech: ['Siemens S7-1200', 'GRAFCET', 'Ladder', 'Factory IO'],
    title: { fr: 'Pick & Place automatisé (Siemens + Factory IO)', en: 'Automated Pick & Place (Siemens + Factory IO)' },
    description: {
      fr: 'Système pick & place qui empile des caisses de façon entièrement automatique, piloté par un automate Siemens S7-1200 et validé en simulation 3D sous Factory IO.',
      en: 'A pick & place system that stacks boxes fully automatically, driven by a Siemens S7-1200 PLC and validated in 3D simulation with Factory IO.',
    },
    details: {
      fr: [
        'Projet académique en équipe de 5 (ESPRIT, 2024, sur l’année). Objectif : automatiser une opération de pick & place — empiler des caisses les unes sur les autres, du bas vers le haut, entièrement automatiquement. Le système est développé et validé en simulation sous Factory IO, qui reproduit l’usine en 3D et permet de tester le programme automate sans matériel réel.',
        'Le système est piloté par un automate Siemens S7-1200. J’ai d’abord modélisé le fonctionnement en GRAFCET, puis je l’ai traduit en programme Ladder, le tout validé sous Factory IO. Le cœur du programme est la gestion de l’empilage : pour positionner chaque caisse et enchaîner correctement les étapes, j’ai utilisé deux compteurs — un horizontal et un vertical.',
      ],
      en: [
        'Academic project in a team of 5 (ESPRIT, 2024, over the year). Goal: automate a pick & place operation — stacking boxes on top of one another, from bottom to top, fully automatically. The system is developed and validated in simulation with Factory IO, which recreates the factory in 3D and lets you test the PLC program without real hardware.',
        'The system is driven by a Siemens S7-1200 PLC. I first modeled the operation in GRAFCET, then translated it into a Ladder program, all validated in Factory IO. The heart of the program is stacking management: to position each box and chain the steps correctly, I used two counters — one horizontal and one vertical.',
      ],
    },
    role: {
      fr: 'Travail collaboratif (équipe de 5) : modélisation GRAFCET et programmation Ladder de l’empilage.',
      en: 'Collaborative work (team of 5): GRAFCET modeling and Ladder programming of the stacking.',
    },
    learned: {
      fr: 'La principale difficulté : enchaîner correctement les étapes d’empilage, au bon moment. Résolue avec deux compteurs (horizontal et vertical) qui suivent la position de chaque caisse et déclenchent l’étape suivante. J’ai consolidé la méthode du GRAFCET au Ladder et mesuré l’intérêt de la simulation (Factory IO) pour valider un programme automate avant tout matériel.',
      en: 'The main challenge was chaining the stacking steps at the right moment. I solved it with two counters (horizontal and vertical) that track each box’s position and trigger the next step. I consolidated the GRAFCET-to-Ladder method and saw the real value of simulation (Factory IO) for validating a PLC program before any hardware.',
    },
    result: {
      fr: 'Système fonctionnant parfaitement en simulation : caisses empilées de façon fiable, du bas vers le haut, en cycle automatique complet.',
      en: 'The system works flawlessly in simulation: boxes stacked reliably, from bottom to top, in a full automatic cycle.',
    },
    link: '[À COMPLÉTER : lien]',
    images: ['/pick-place.jpg'],
  },
  {
    id: 'photovoltaique',
    type: { fr: 'Académique — Individuel', en: 'Academic — Individual' },
    status: null,
    categories: ['energie'],
    tech: ['PVSyst', 'Dimensionnement PV', 'Pompage solaire', 'Électrotechnique'],
    title: { fr: 'Atelier photovoltaïque — dimensionnement', en: 'Photovoltaic Workshop — System Sizing' },
    description: {
      fr: 'Dimensionnement complet de deux installations solaires — résidentielle et pompage solaire — du choix des composants au calcul des câbles, avec validation des performances sous PVSyst.',
      en: 'Full sizing of two solar installations — residential and solar pumping — from component selection to cable calculations, with performance validated in PVSyst.',
    },
    details: {
      fr: [
        'Atelier photovoltaïque (ESPRIT, 2026, un semestre, en individuel). Une installation mal dimensionnée, c’est de l’énergie perdue ou des coûts inutiles : l’objectif était de dimensionner correctement deux installations solaires et de valider leurs performances par simulation.',
        'Étude complète sous PVSyst : dimensionnement d’une installation résidentielle puis d’un système de pompage solaire ; choix des composants (panneaux et équipements) selon les besoins ; calcul des sections de câbles selon les normes ; et simulation des performances pour valider les choix.',
      ],
      en: [
        'Photovoltaic workshop (ESPRIT, 2026, one semester, individual). A poorly sized installation means wasted energy or needless cost: the goal was to correctly size two solar installations and validate their performance through simulation.',
        'Full study in PVSyst: sizing a residential installation then a solar pumping system; selecting the components (panels and equipment) based on the needs; computing cable sections to standards; and simulating performance to validate the choices.',
      ],
    },
    role: {
      fr: 'Étude et dimensionnement complets réalisés seule : choix des composants, calcul des câbles selon les normes et simulations PVSyst.',
      en: 'Full study and sizing done on my own: component selection, standards-based cable calculations and PVSyst simulations.',
    },
    learned: {
      fr: 'Le photovoltaïque était un domaine nouveau pour moi : j’ai dû en apprendre la méthode de dimensionnement et l’appliquer rigoureusement — chaque choix (panneaux, câbles) découle d’un calcul et d’une norme, jamais d’une approximation. PVSyst m’a permis de confronter mes calculs à une simulation réaliste et de mesurer l’écart entre le papier et le terrain.',
      en: 'Photovoltaics was a new field for me: I had to learn the sizing method and apply it rigorously — every choice (panels, cables) follows from a calculation and a standard, never a guess. PVSyst let me test my calculations against a realistic simulation and measure the gap between paper and the field.',
    },
    result: {
      fr: 'Projet validé : les deux installations correctement dimensionnées, les câbles calculés selon les normes, et les performances confirmées par la simulation PVSyst.',
      en: 'Project validated: both installations correctly sized, cables computed to standards, and performance confirmed by PVSyst simulation.',
    },
    link: '[À COMPLÉTER : lien]',
    images: ['/photovoltaique.jpg'],
  },
  {
    id: 'erp-sap',
    type: { fr: 'Académique — Binôme', en: 'Academic — Pair' },
    status: null,
    categories: ['gestion'],
    tech: ['SAP S/4HANA', 'Module MM', 'Module PP', 'Module EAM'],
    title: { fr: 'ERP — SAP S/4HANA', en: 'ERP — SAP S/4HANA' },
    description: {
      fr: 'Modélisation complète d’un produit — un vélo — sur SAP S/4HANA, de sa nomenclature à sa gamme de fabrication, avec les flux d’achats, de production et de maintenance.',
      en: 'Full modeling of a product — a bicycle — on SAP S/4HANA, from its bill of materials to its production routing, with the procurement, production and maintenance flows.',
    },
    details: {
      fr: [
        'Projet ERP (ESPRIT, 2026, un semestre, en binôme). Un ERP est le système nerveux d’une entreprise industrielle : il relie les achats, la production et la maintenance autour d’une même base de données. Objectif : modéliser entièrement un vélo sur SAP S/4HANA et faire tourner les flux de gestion correspondants.',
        'Trois modules clés mis en œuvre : MM (Materials Management) pour les achats et fournisseurs ; PP (Production Planning) pour la nomenclature (BOM) du vélo, les gammes de fabrication et les postes de travail ; EAM (Enterprise Asset Management) pour la maintenance des équipements.',
        'Travail réparti en binôme, mais nous avons toutes deux touché à l’ensemble des modules — création des données de base (articles, nomenclature, gammes) et suivi des flux d’un bout à l’autre.',
      ],
      en: [
        'ERP project (ESPRIT, 2026, one semester, as a pair). An ERP is the nervous system of an industrial company: it links procurement, production and maintenance around a single database. Goal: fully model a bicycle on SAP S/4HANA and run the corresponding management flows.',
        'Three key modules implemented: MM (Materials Management) for procurement and suppliers; PP (Production Planning) for the bicycle’s bill of materials (BOM), production routings and work centers; EAM (Enterprise Asset Management) for equipment maintenance.',
        'Work split as a pair, but we both worked across all the modules — creating the master data (items, BOM, routings) and following the flows end to end.',
      ],
    },
    role: {
      fr: 'Travail réparti en binôme ; nous avons toutes deux touché à l’ensemble des modules (MM, PP, EAM), de la création des données de base au suivi des flux.',
      en: 'Work split as a pair; we both worked across all the modules (MM, PP, EAM), from master-data creation to following the flows.',
    },
    learned: {
      fr: 'J’ai compris comment un ERP relie des métiers qui semblent séparés : un achat, un ordre de fabrication et une opération de maintenance parlent le même langage de données. L’exigence principale est la rigueur des données de base — une nomenclature ou une gamme mal saisie, et tout se dérègle. En tant qu’électromécanicienne, j’ai aussi découvert le versant gestion et organisation de l’industrie, complémentaire de la technique.',
      en: 'I understood how an ERP links jobs that seem separate: a purchase, a production order and a maintenance task speak the same data language. The key requirement is master-data rigor — one wrong BOM or routing and everything downstream goes off. As an electromechanical engineer, I also discovered the management and organizational side of industry, complementary to the technical one.',
    },
    result: {
      fr: 'Un paramétrage SAP fonctionnel : le produit modélisé, les modules configurés et les flux de gestion qui tournent de bout en bout.',
      en: 'A functional SAP setup: the product modeled, the modules configured and the management flows running end to end.',
    },
    link: '[À COMPLÉTER : lien]',
    images: ['/erp-sap.jpg'],
  },
  {
    id: 'gmao',
    type: { fr: 'Académique', en: 'Academic' },
    status: null,
    categories: ['gestion'],
    tech: ['Logiciel GMAO', 'Maintenance industrielle', 'Structuration de données'],
    title: { fr: 'GMAO — gestion de maintenance', en: 'CMMS — Maintenance Management' },
    description: {
      fr: 'Mise en œuvre d’un logiciel de GMAO pour structurer la maintenance d’un parc machines : déclarer une panne, gérer l’intervention, suivre l’état des équipements (en marche / en panne) et conserver l’historique.',
      en: 'Setting up a CMMS to structure a machine fleet’s maintenance: reporting a fault, managing the intervention, tracking equipment status (running / down) and keeping the history.',
    },
    details: {
      fr: [
        'Projet académique (ISETN, 2022). Découvrir et mettre en œuvre une GMAO (gestion de maintenance assistée par ordinateur) : structurer la maintenance d’un parc machines pour suivre les pannes, les interventions et l’état des équipements.',
        'Le projet s’appuyait sur un logiciel de GMAO existant. Mon travail : le paramétrer et l’alimenter avec les données du parc (machines, équipements, pièces de rechange, techniciens). Une fois structuré, l’outil permet de déclarer une panne, gérer l’intervention, suivre l’état des équipements et conserver l’historique de maintenance.',
      ],
      en: [
        'Academic project (ISETN, 2022). Discovering and setting up a CMMS: structuring a machine fleet’s maintenance to track breakdowns, interventions and equipment status.',
        'The project was based on existing CMMS software. My work: configuring and populating it with the fleet’s data (machines, equipment, spare parts, technicians). Once structured, the tool lets you report a fault, manage the intervention, track equipment status and keep the maintenance history.',
      ],
    },
    role: {
      fr: 'Paramétrage et alimentation du logiciel de GMAO avec les données du parc (machines, équipements, pièces de rechange, techniciens).',
      en: 'Configuring and populating the CMMS software with the fleet’s data (machines, equipment, spare parts, technicians).',
    },
    learned: {
      fr: 'J’ai découvert le fonctionnement d’une GMAO et l’importance de bien structurer les données de maintenance : sans un parc correctement décrit (machines, pièces, techniciens), le suivi des pannes et des interventions perd tout son sens. Une première approche concrète de l’organisation de la maintenance industrielle.',
      en: 'I discovered how a CMMS works and the importance of structuring maintenance data well: without a properly described fleet (machines, parts, technicians), tracking breakdowns and interventions makes no sense. A first hands-on look at how industrial maintenance is organized.',
    },
    result: {
      fr: 'Une GMAO opérationnelle, alimentée et structurée, capable de tracer le cycle complet panne → intervention → remise en service et de garder l’historique du parc.',
      en: 'An operational CMMS, populated and structured, able to trace the full breakdown → intervention → return-to-service cycle and keep the fleet’s history.',
    },
    link: '[À COMPLÉTER : lien]',
    images: ['/gmao.jpg'],
  },
  {
    id: 'mes',
    type: { fr: 'Académique — Individuel', en: 'Academic — Individual' },
    status: null,
    categories: ['automatisme', 'iot', 'gestion'],
    tech: ['WinDev', 'Arduino', 'Base de données', 'MTTR / MTBF'],
    title: { fr: 'MES — Manufacturing Execution System', en: 'MES — Manufacturing Execution System' },
    description: {
      fr: 'Système MES qui relie l’atelier au pilotage : à partir d’une carte d’acquisition, il suit les arrêts (avec MTTR/MTBF), la production conforme/non conforme et les consommations (matière, température) dans une interface de supervision.',
      en: 'A MES that bridges the shop floor and management: from an acquisition card, it tracks stoppages (with MTTR/MTBF), conforming/non-conforming production and consumption (material, temperature) in a supervision interface.',
    },
    details: {
      fr: [
        'Projet MES (ESPRIT, 2026, un semestre, mené seule). Un MES capte ce qui se passe sur la ligne et le transforme en indicateurs exploitables, reliant l’atelier au pilotage.',
        'Chaîne complète : côté acquisition, une carte Arduino lit les capteurs (niveau de matière première, température) ainsi que les signaux de production et d’arrêts. Côté logiciel, j’ai développé l’interface MES et sa base de données sous WinDev, en plusieurs vues : suivi des arrêts (type, date, heure) avec calcul du MTTR et du MTBF ; production journalière (conforme / non conforme / totale) ; consommations (matière première dans le temps, historique de température).',
      ],
      en: [
        'MES project (ESPRIT, 2026, one semester, run solo). A MES captures what happens on the line and turns it into usable indicators, bridging the shop floor and management.',
        'Full chain: on the acquisition side, an Arduino board reads the sensors (raw-material level, temperature) and the production and stoppage signals. On the software side, I built the MES interface and its WinDev database in several views: stoppage tracking (type, date, time) with MTTR and MTBF computation; daily production (conforming / non-conforming / total); consumption (raw material over time, temperature history).',
      ],
    },
    role: {
      fr: 'Projet réalisé seule : programmation de la carte d’acquisition (Arduino) et développement de l’interface MES avec sa base de données (WinDev).',
      en: 'Built on my own: programmed the acquisition card (Arduino) and built the MES interface with its database (WinDev).',
    },
    learned: {
      fr: 'La principale difficulté : coder le calcul du MTBF et du MTTR — passer des formules théoriques de fiabilité à un calcul correct à partir des données réelles d’arrêts (durées, fréquences). J’ai appris à traduire des indicateurs de maintenance en code fiable et à mener un MES de bout en bout, de l’acquisition Arduino jusqu’à la restitution dans l’interface.',
      en: 'The main challenge: coding the MTBF and MTTR calculations — going from theoretical reliability formulas to a correct computation based on real stoppage data (durations, frequencies). I learned to turn maintenance indicators into reliable code and to run a MES end to end, from Arduino acquisition to the interface.',
    },
    result: {
      fr: 'Un système fonctionnel et complet, qui acquiert les données en temps réel et restitue les indicateurs (MTTR, MTBF, production, consommations). Projet noté 19/20.',
      en: 'A functional, complete system that acquires data in real time and reports the indicators (MTTR, MTBF, production, consumption). Graded 19/20.',
    },
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
