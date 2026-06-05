# Content Inventory — Ghada Turki Portfolio

> **Purpose:** Single source of truth for ALL existing site content, extracted verbatim before the visual redesign.
> Nothing here may be changed, rewritten, summarized, or invented. The redesign reuses this text exactly.
> Bilingual content is captured in both **FR** and **EN**. Hardcoded (non-translated) copy is marked `[HARDCODED]`.

---

## 0. Tech stack & architecture (current)

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS 3 (class-based dark mode), custom utilities in `app/globals.css`
- **Animation:** Framer Motion 10
- **Icons:** lucide-react, react-icons
- **i18n:** Custom `LanguageProvider` (FR default, EN) with `localStorage` persistence, `t(key)` lookup
- **Theme:** Custom `ThemeProvider` (dark default; respects `prefers-color-scheme`; `localStorage` persistence)
- **Page composition** (`app/page.tsx`): `Header → Hero → About → Experience → Projects → Contact → Footer`

### ⚠️ Important findings (content currently NOT shown on the page)
1. **`components/Skills.tsx` is NOT imported anywhere** — the 4 skill categories AND the SOLIDWORKS + NVIDIA certifications it contains are **not rendered on the live site**. Content captured in §7 below.
2. **`components/Education.tsx` (standalone) is NOT imported** — but its content (3 degrees + associative life) **is duplicated inline inside `About.tsx`**, so Education *is* shown. Captured in §5.
3. **Missing image files** referenced by Project 9 gallery: `phone 2.jpg` and `phone 6.jpg` do not exist in `public/` (code hides them via `onError`).
4. **Placeholder images:** Projects 4 and 6 use `/api/placeholder/600/400` (no real image — renders a first-letter fallback tile).
5. **Unused asset:** `public/controleur.jpg` exists but is not referenced anywhere.

---

## 1. Site metadata / SEO (`app/layout.tsx`)

- **`<html lang>`:** `fr`
- **Title:** `Ghada Turki | Ingénieure Électromécanique | Mécatronique`
- **Description:** `Portfolio de Ghada Turki - Ingénieure en Électromécanique spécialisée en Mécatronique, Automatisation, Robotique, IoT et Intelligence Artificielle`
- **Keywords:** `Ingénieur, Électromécanique, Mécatronique, Robotique, IoT, IA, Automatisation`
- **Font:** Inter (Google Fonts, latin subset)

---

## 2. Navigation (`Header.tsx`)

- **Logo/brand mark:** `GT` (links to `#home`)
- **Nav items** (desktop + mobile), with anchor targets:

| Key | FR | EN | Target |
|-----|----|----|--------|
| nav.home | Accueil | Home | `#home` |
| nav.about | À propos | About | `#about` |
| nav.experience | Expérience | Experience | `#experience` |
| nav.projects | Projets | Projects | `#projects` |
| nav.contact | Contact | Contact | `#contact` |

> Note: `nav.education` exists in translations (FR `Formation` / EN `Education`) but is **not** in the header nav array.
- **Controls:** Language selector (`FR` / `English` — labels "Français" / "English"), Theme toggle (dark/light).

---

## 3. Hero (`Hero.tsx`)

- **Profile photo:** `/ghada-turki-photo.jpg` (alt: "Ghada Turki")

| Key | FR | EN |
|-----|----|----|
| hero.name | Ghada Turki | Ghada Turki |
| hero.title | Étudiante ingénieure en Électromécanique – 5ᵉ année à ESPRIT | Engineering Student in Electromechanics – 5th year at ESPRIT |
| hero.master | Titulaire d'un Master professionnel en Mécatronique | Holder of a Professional Master's in Mechatronics |
| hero.tagline | Je transforme les idées en prototypes… et les problèmes industriels en solutions intelligentes | I transform ideas into prototypes… and industrial problems into intelligent solutions |
| hero.viewProjects | Voir mes projets | View my projects |
| hero.downloadCV | Télécharger mon CV | Download my CV |

- **CTA buttons:**
  - "Voir mes projets / View my projects" → smooth-scrolls to `#projects`
  - "Télécharger mon CV / Download my CV" → downloads CV by language:
    - FR: `/CV_Ghada_Turki.pdf`
    - EN: `/resume GhadaTurki.pdf`

---

## 4. About (`About.tsx`)

- **Profile photo (again):** `/ghada-turki-photo.jpg` (alt FR: "Ghada Turki - Ingénieure en Électromécanique")

| Key | FR | EN |
|-----|----|----|
| about.title | À propos | About |
| about.subtitle | Profil Ingénieur | Engineer Profile |
| about.professionalProfile | Profil professionnel | Professional profile |
| about.description | Titulaire d'un Master professionnel en Mécatronique et ingénieure en Génie Électromécanique, avec une expertise en conception mécanique, automatisation et développement logiciel. Passionnée par l'innovation et les systèmes automatisés, je cherche à appliquer mes compétences dans un environnement dynamique à travers un stage de fin d'études. | Holder of a Professional Master's in Mechatronics and Electromechanical Engineering student, with expertise in mechanical design, automation and software development. Passionate about innovation and automated systems, I seek to apply my skills in a dynamic environment through an end-of-study internship. |
| about.objective | Mon objectif est de contribuer à la transformation digitale de l'industrie en développant des solutions intelligentes qui combinent mécanique, électronique et intelligence artificielle. | My goal is to contribute to the digital transformation of industry by developing intelligent solutions that combine mechanics, electronics and artificial intelligence. |

### Key domains (`about.keyDomains` — FR "Domaines clés" / EN "Key domains")

| Domain | FR title | EN title | FR description | EN description |
|--------|----------|----------|----------------|----------------|
| 1 (Cpu icon) | Automatisation industrielle | Industrial automation | Conception et développement de systèmes automatisés pour l'industrie 4.0 | Design and development of automated systems for Industry 4.0 |
| 2 (Zap icon) | Robotique | Robotics | Développement de robots autonomes et systèmes robotiques intelligents | Development of autonomous robots and intelligent robotic systems |
| 3 (Target icon) | IoT & Systèmes embarqués | IoT & Embedded systems | Intégration de capteurs, microcontrôleurs et protocoles de communication | Integration of sensors, microcontrollers and communication protocols |
| 4 (Users icon) | Réalité augmentée | Augmented reality | Applications AR pour la formation et la maintenance industrielle | AR applications for training and industrial maintenance |

### Soft skills (`about.softSkills` — FR "Soft Skills" / EN "Soft Skills")

| FR | EN |
|----|----|
| Innovation | Innovation |
| Travail d'équipe | Teamwork |
| Autonomie | Autonomy |
| Esprit analytique | Analytical mind |
| Résolution de problèmes | Problem solving |
| Leadership | Leadership |

---

## 5. Education (rendered inline in `About.tsx`; also in standalone `Education.tsx`)

- **Section title** (`education.title`): FR "Formation" / EN "Education"
- **Subtitle** (`education.subtitle`): FR "Parcours académique" / EN "Academic journey"

### Degrees

**ESPRIT** — status FR "En cours" / EN "In progress" (highlighted yellow badge)
- Degree — FR: `Cycle d'ingénieur en Électromécanique – Spécialité Mécatronique` / EN: `Engineering cycle in Electromechanics – Mechatronics specialization`
- Institution — FR: `École Supérieure Privée d'Ingénierie et de Technologies - ESPRIT` / EN: `Private Higher School of Engineering and Technologies - ESPRIT`
- Period: `2024 - Présent` / `2024 - Present`
- Description — FR: `Formation approfondie en mécatronique, automatisation et systèmes intelligents` / EN: `In-depth training in mechatronics, automation and intelligent systems`

**ISTIC** — status FR "Diplômé" / EN "Graduated"
- Degree — FR: `Mastère Professionnel co-construit en Mécatronique` / EN: `Co-constructed Professional Master's in Mechatronics`
- Institution — FR: `Institut Supérieur des Technologies de l'Information et des Communications - ISTIC` / EN: `Higher Institute of Information and Communication Technologies - ISTIC`
- Period: `2023 - 2025`
- Description — FR: `Spécialisation en systèmes mécatroniques et intégration mécanique-électronique-informatique` / EN: `Specialization in mechatronic systems and mechanical-electronic-informatics integration`

**ISETN** — status FR "Diplômé" / EN "Graduated"
- Degree — FR: `Licence appliquée en génie mécanique` / EN: `Applied degree in mechanical engineering`
- Institution — FR: `Institut supérieur des études technologiques de Nabeul - ISETN` / EN: `Higher Institute of Technological Studies of Nabeul - ISETN`
- Period: `2020 - 2023`
- Description — FR: `Fondations en génie mécanique, conception et fabrication` / EN: `Foundations in mechanical engineering, design and manufacturing`

### Associative life (`education.associative` — FR "Vie associative" / EN "Associative life")

- **Member** — FR: `Membre dans l'association d'Education Relative à l'Environnement de Hammamet` / EN: `Member of the Environmental Education Association of Hammamet`
  - Desc — FR: `Participation dans plusieurs chantiers et formations.` / EN: `Participation in several projects and training sessions.`

- **AIESEC** —
  - Title — FR: `AIESEC – Stage volontaire en Turquie, Izmit (06/2023 - 08/2023)` / EN: `AIESEC – Volunteer internship in Turkey, Izmit (06/2023 - 08/2023)`
  - Description — FR: `Collaboration internationale pour organiser des événements communautaires, animation de sessions "Talk to Practice" en anglais et direction d'activités éducatives pour enfants et adultes. Certification obtenue en Leadership Development Experience dans le cadre du projet Global Volunteer "Youth 4 Impact" visant l'Objectif de Développement Durable #4 (Éducation de qualité).` / EN: `International collaboration to organize community events, animation of "Talk to Practice" sessions in English and direction of educational activities for children and adults. Certification obtained in Leadership Development Experience as part of the Global Volunteer project "Youth 4 Impact" targeting Sustainable Development Goal #4 (Quality Education).`
  - Download link — label FR: `Télécharger le certificat Leadership Development Experience` / EN: `Download Leadership Development Experience certificate` → file: `/Certification.pdf`

- **Bal des Projets** —
  - Title — FR: `Bal des Projets 2025 – ESPRIT` / EN: `Projects Ball 2025 – ESPRIT`
  - Description — FR: `Dans le cadre du Bal des Projets 2025 organisé par ESPRIT, j'ai eu l'opportunité de collaborer avec une équipe de 6 personnes sur un projet de détection automatique de fissures. Cette expérience m'a permis de renforcer mes compétences en travail d'équipe et en résolution de problèmes techniques.` / EN: `As part of the Projects Ball 2025 organized by ESPRIT, I had the opportunity to collaborate with a team of 6 people on an automatic crack detection project. This experience allowed me to strengthen my teamwork and technical problem-solving skills.`
  - Download link — label FR: `Télécharger l'attestation de participation` / EN: `Download participation certificate` → file: `/ESE_attestation_Ghada_Turki dit Gara ali.pdf`

- Generic download label (`education.download`): FR "Télécharger" / EN "Download"
- Certifications heading (`education.certifications`): FR "Certifications" / EN "Certifications"

---

## 6. Experience (`Experience.tsx`)

- **Section title** (`experience.title`): FR "Expérience" / EN "Experience"
- **Subtitle** (`experience.subtitle`): FR "Parcours professionnel" / EN "Professional journey"

Displayed as a vertical timeline (newest → oldest):

### 1. MATECH — 2025
- Company: `MATECH` · Location: `Megrine, Tunisia` · Period: `03/2025 - 09/2025` · Icon: Smartphone
- Position — FR: `Mémoire de fin d'études` / EN: `End-of-study thesis`
- Description — FR: `Conception et réalisation d'un émulateur de groupe électrogène et développement de son application mobile en réalité augmentée` / EN: `Design and development of a generator emulator and its augmented reality mobile application`
- Technologies: `Unity, C#, Vuforia, Arduino, SolidWorks, Blender`

### 2. GD Tunisie — 2025
- Company: `GD Tunisie` · Location: `Birbouragba, Tunisia` · Period: `07/2025 - 08/2025` · Icon: Settings
- Position — FR: `Stage d'ingénieur` / EN: `Engineering internship`
- Description — FR: `Développement d'une solution innovante de supervision de la production avec application desktop Python et système de comptage automatisé` / EN: `Development of an innovative production supervision solution with Python desktop application and automated counting system`
- Technologies: `Python, Arduino, SolidWorks, Capteurs`

### 3. MATECH — 2023
- Company: `MATECH` · Location: `Megrine, Tunisia` · Period: `02/2023 - 06/2023` · Icon: Cpu
- Position — FR: `Stage de fin d'études` / EN: `End-of-study internship`
- Description — FR: `Conception et réalisation d'un simulateur de pannes d'un groupe électrogène avec application mobile Java` / EN: `Design and development of a generator fault simulator and Java mobile application`
- Technologies: `Java, Industrial electronics, Controllers`

### 4. CSM-GIAS — 2022
- Company: `CSM-GIAS` · Location: `Bouargoub, Tunisia` · Period: `01/2022 - 02/2022` · Icon: Code
- Position — FR: `Stage de technicien` / EN: `Technician internship`
- Description — FR: `Amélioration de la machine Trepko Seau - Conception d'une machine pour la mise en place des récipients sur le tapis` / EN: `Improvement of the Trepko Seau machine - Design of a machine for placing containers on the conveyor`
- Technologies: `SolidWorks, Arduino`

### 5. WEWIRE — 2021
- Company: `WEWIRE` · Location: `Hammamet, Tunisia` · Period: `07/2021 - 07/2021` · Icon: Settings
- Position — FR: `Stage d'initiation` / EN: `Initiation internship`
- Description — FR: `Découverte des activités de l'entreprise, apprentissage de la fabrication des câbles et application des principes du Lean` / EN: `Discovery of company activities, learning cable manufacturing and application of Lean principles`
- Technologies: `Lean Manufacturing`

---

## 7. Skills & Certifications (`Skills.tsx`) — ⚠️ currently NOT rendered on the page

- **Section title:** `Compétences` [HARDCODED FR]
- **Intro:** `Technologies et outils que je maîtrise pour transformer vos idées en réalité` [HARDCODED FR]

### Skill categories

| Category | Skills |
|----------|--------|
| `Mécanique & Conception` (Wrench) | SolidWorks · CATIA V5 · Blender · Conception 3D · Simulation |
| `Automatisation & Embarqué` (Cpu) | Arduino · ESP32 · Capteurs industriels · Microcontrôleurs · Électronique |
| `Logiciel & Data` (Code2) | Python · Java · C# · Node-RED · MQTT · Développement logiciel |
| `IA & AR` (Brain) | Intelligence Artificielle · Maintenance prédictive · Unity · Vuforia · Computer Vision |

### Certifications [HARDCODED]
- **Heading:** `Certifications`

**SOLIDWORKS certificates available** (`Certificats SOLIDWORKS disponibles`) — each labeled "Par SOLIDWORKS", download label `Télécharger le certificat`:
1. `SOLIDWORKS Simulation Professional` → `/SOLIDWORKS Simulation Professional.jpg`
2. `SOLIDWORKS Additive Manufacturing Associate` → `/SOLIDWORKS Additive Manufacturing Associate.jpg`
3. `SOLIDWORKS CAD Design Associate` → `/Certified SOLIDWORKS CAD Design Associate.jpg`

**NVIDIA certificates available** (`Certificats NVIDIA disponibles`) — each labeled "Par NVIDIA", download label `Télécharger le certificat`:
1. `Applications of AI for Predictive Maintenance` → `/Certificate Applications of AI for Predictive Maintenance.pdf`
2. `Generative AI with Diffusion Models` → `/Certificate Generative AI with Diffusion Models.pdf`

---

## 8. Projects (`Projects.tsx`)

- **Section title** (`projects.title`): FR "Projets" / EN "Projects"
- **Subtitle** (`projects.subtitle`): FR "Découvrez mes réalisations en ingénierie, de la robotique à l'intelligence artificielle" / EN "Discover my engineering achievements, from robotics to artificial intelligence"
- **Modal labels:**
  - viewDetails: FR "Voir détails" / EN "View details"
  - description: FR "Description" / EN "Description"
  - problem: FR "Problématique" / EN "Problem"
  - solution: FR "Solution" / EN "Solution"
  - technologies: FR "Technologies utilisées" / EN "Technologies used"
  - close: FR "Fermer" / EN "Close"
- **Grid display order (by id):** 1, 2, 7, 3, 8, 9, 4, 5, 6, 10

---

### Project 1 — Crack detection robot · category `IA` · image `/crac.jpg`
- Title — FR: `Robot autonome de détection de fissures` / EN: `Autonomous crack detection robot`
- Description — FR: `Robot intelligent utilisant l'IA pour détecter automatiquement les fissures dans les structures` / EN: `Intelligent robot using AI to automatically detect cracks in structures`
- Problem — FR: `Détection manuelle des fissures coûteuse et sujette aux erreurs dans les inspections industrielles` / EN: `Manual crack detection is costly and error-prone in industrial inspections`
- Solution — FR: `Développement d'un robot autonome équipé de caméras et d'algorithmes d'IA pour la détection automatique` / EN: `Development of an autonomous robot equipped with cameras and AI algorithms for automatic detection`
- Technologies: `SolidWorks, Intelligence Artificielle, ESP32, Computer Vision`
- **Detail** (`project1.detail`) — FR: `Robot de détection des fissures réalisé par VGG16, qui est un modèle de réseau de neurones convolutifs profond (CNN) spécialisé dans la classification d'images. Le système utilise une carte ESP32 pour le contrôle du robot et le traitement en temps réel des images capturées par la caméra. Le modèle VGG16, pré-entraîné sur ImageNet, a été fine-tuné pour détecter et classifier les fissures dans les structures, permettant une inspection automatisée et précise.` / EN: `Crack detection robot implemented using VGG16, which is a deep convolutional neural network (CNN) model specialized in image classification. The system uses an ESP32 board for robot control and real-time processing of images captured by the camera. The VGG16 model, pre-trained on ImageNet, was fine-tuned to detect and classify cracks in structures, enabling automated and precise inspection.`
- **Modal media:** video `/video.mp4`

---

### Project 2 — Generator emulator + AR · category `AR` · image `/app.jpg`
- Title — FR: `Émulateur de groupe électrogène + AR` / EN: `Generator emulator + AR`
- Description — FR: `Application mobile en réalité augmentée pour explorer virtuellement les composants d'un groupe électrogène` / EN: `Mobile augmented reality application to virtually explore the components of a generator`
- Problem — FR: `Formation technique complexe et coûteuse pour les techniciens sur les groupes électrogènes` / EN: `Complex and costly technical training for technicians on generators`
- Solution — FR: `Application AR immersive avec quiz intégré permettant l'apprentissage interactif des composants` / EN: `Immersive AR application with integrated quiz enabling interactive learning of components`
- Technologies: `Unity, C#, Vuforia, Blender, SolidWorks`
- **Modal media:** image `/8.jpg`

---

### Project 7 — Generator fault simulator · category `Automatisation` · image `/groupe.jpg`
- Title — FR: `Simulateur de pannes de groupe électrogène` / EN: `Generator fault simulator`
- Description — FR: `Conception et réalisation d'un simulateur de pannes d'un groupe électrogène avec application mobile` / EN: `Design and development of a generator fault simulator with mobile application`
- Problem — FR: `Formation des techniciens sur les pannes de groupes électrogènes nécessite un équipement réel coûteux et complexe` / EN: `Training technicians on generator faults requires expensive and complex real equipment`
- Solution — FR: `Développement d'un simulateur de pannes avec contrôleur Guardrevolution et application mobile Java pour l'apprentissage` / EN: `Development of a fault simulator with Guardrevolution controller and Java mobile application for learning`
- Technologies: `Java, Électronique industrielle, Contrôleurs, SolidWorks`
- **Modal media:** images `/groupe.jpg`, `/projet  groupe.jpg` (note: double space in filename); video gallery with thumbnails:
  - `/realisation.mp4` — label [HARDCODED] `Vidéo de réalisation`
  - `/video1.mp4` — label [HARDCODED] `Présentation du projet`
  - `/video2.mp4` — label [HARDCODED] `Présentation du projet`
  - `/video3.mp4` — label [HARDCODED] `Présentation du projet`
  - Section heading [HARDCODED]: `Présentation du projet`

---

### Project 3 — Automated cable counting system · category `IoT` · image `/gd11.png`
- Title — FR: `Système automatisé de comptage des câbles` / EN: `Automated cable counting system`
- Description — FR: `Système automatisé de comptage des câbles en environnement industriel, intégrant une solution électronique, logicielle et mécanique` / EN: `Automated cable counting system in industrial environment, integrating an electronic, software and mechanical solution`
- Problem — FR: `Le comptage manuel des câbles produits est chronophage, sujet aux erreurs humaines et peu fiable pour le suivi en temps réel de la production` / EN: `Manual counting of produced cables is time-consuming, prone to human errors and unreliable for real-time production monitoring`
- Solution — FR: `Développement d'un poste de comptage automatisé basé sur un capteur de proximité, une carte Arduino et une communication série pour la transmission des données` / EN: `Development of an automated counting station based on a proximity sensor, an Arduino board and serial communication for data transmission`
- Technologies: `Arduino, Capteur E3F-DS30C4, SolidWorks, VS Code / Arduino IDE, Automatisation industrielle`
- **Detail** (`project3.detail`) — FR: `Système automatisé de comptage des câbles en environnement industriel, intégrant une solution électronique, logicielle et mécanique pour améliorer la supervision de la production et la fiabilité des données de fabrication.` / EN: `Automated cable counting system in industrial environment, integrating an electronic, software and mechanical solution to improve production supervision and manufacturing data reliability.`
- **Modal media:** video `/compateg.MOV`
- **Main features** (`project3.features` — FR "Fonctionnalités principales" / EN "Main features"):
  1. FR: `Détection automatique du passage des câbles` / EN: `Automatic detection of cable passage`
  2. FR: `Comptage fiable et précis en temps réel` / EN: `Reliable and accurate real-time counting`
  3. FR: `Transmission des données vers une application de supervision` / EN: `Data transmission to a supervision application`
  4. FR: `Intégration facile dans une ligne de production existante` / EN: `Easy integration into an existing production line`
- **Electronic design** (`project3.electronic` — FR "Conception électronique" / EN "Electronic design"):
  1. FR: `Remplacement de la carte initiale par une carte Arduino` / EN: `Replacement of the initial board with an Arduino board`
  2. FR: `Intégration d'un capteur de proximité E3F-DS30C4` / EN: `Integration of an E3F-DS30C4 proximity sensor`
  3. FR: `Réalisation du schéma de câblage complet` / EN: `Complete wiring diagram implementation`
  4. FR: `Tests de fiabilité en conditions industrielles` / EN: `Reliability testing under industrial conditions`
- **Programming** (`project3.programming` — FR "Programmation" / EN "Programming"):
  1. FR: `Programmation sous Arduino IDE` / EN: `Programming under Arduino IDE`
  2. FR: `Implémentation d'un algorithme de détection de front descendant pour garantir un comptage précis et éviter les doublons` / EN: `Implementation of a falling edge detection algorithm to ensure accurate counting and avoid duplicates`
  3. FR: `Incrémentation automatique du compteur` / EN: `Automatic counter increment`
  4. FR: `Communication série pour l'affichage et l'exploitation des données` / EN: `Serial communication for data display and processing`
- **Mechanical design & implementation** (`project3.mechanical` — FR "Conception mécanique & Réalisation" / EN "Mechanical design & Implementation"):
  1. FR: `Conception complète du poste de travail sous SolidWorks` / EN: `Complete workstation design under SolidWorks`
  2. FR: `Montage complet du système (Arduino + capteur + structure mécanique)` / EN: `Complete system assembly (Arduino + sensor + mechanical structure)`
  3. FR: `Validation du bon fonctionnement du comptage automatique` / EN: `Validation of proper automatic counting operation`

---

### Project 8 — Intelligent production management desktop app · category `IoT` · image `/gd.png`
- Title — FR: `Application desktop intelligente de gestion et suivi de production` / EN: `Intelligent desktop application for production management and monitoring`
- Description — FR: `Application desktop intelligente dédiée à la gestion et au suivi de la production industrielle, permettant de remplacer un système manuel basé sur des fiches papier par une solution numérique automatisée` / EN: `Intelligent desktop application dedicated to industrial production management and monitoring, enabling replacement of a manual system based on paper forms with an automated digital solution`
- Problem — FR: `Le suivi reposait sur des fiches papier remplies manuellement, un comptage physique via des courroies numérotées et un calcul a posteriori. Ce système était chronophage, sujet aux erreurs humaines et peu adapté au suivi en temps réel` / EN: `Monitoring relied on manually filled paper forms, physical counting via numbered belts and a posteriori calculation. This system was time-consuming, prone to human errors and poorly suited for real-time monitoring`
- Solution — FR: `Développement d'une application desktop complète intégrant la gestion des ouvriers, le suivi des shifts, la collecte et l'analyse des données, avec reconnaissance faciale et QR codes` / EN: `Development of a complete desktop application integrating worker management, shift monitoring, data collection and analysis, with facial recognition and QR codes`
- Technologies: `Python, VS Code, QR Code, Reconnaissance faciale, CSV / Excel, Supervision industrielle`
- **Modal gallery:** `/gd.png`, `/gd1.png`, `/gd3.png`, `/gd4.png`, `/gd5.png`, `/gd6.png`, `/GD12.png`
- **[HARDCODED] Description paragraph:** `Application desktop intelligente dédiée à la gestion et au suivi de la production industrielle, permettant de remplacer un système manuel basé sur des fiches papier par une solution numérique automatisée, fiable et centralisée.`
- **[HARDCODED] 🧩 Architecture de l'application:**
  - `Application développée sous **VS Code**`
  - `Interface divisée en deux modules : **Module Administrateur** et **Module Ouvrier**`
  - `Navigation simple et intuitive via des menus dédiés`
- **[HARDCODED] 🔐 Module Administrateur:**
  - *Authentification sécurisée:* `Accès protégé par mot de passe` · `Fenêtre modale bloquant l'accès en cas d'échec` · `Gestion sécurisée des fonctionnalités sensibles`
  - *Gestion des ouvriers:* `Ajout d'un ouvrier avec saisie du nom` · `Capture photo via webcam` · `Génération automatique d'un **QR code unique**` · `Encodage facial pour la **reconnaissance biométrique**` · `Données sauvegardées (CSV, PNG, JSON)`
  - *Gestion des opérations:* `Génération automatique de QR codes d'opérations` · `Visualisation centralisée de tous les QR codes (ouvriers & opérations)` · `Suppression sécurisée des ouvriers avec nettoyage complet des données`
  - *Tableau de bord & supervision:* `Vue globale des opérations en cours et terminées` · `Filtrage des données par dates` · `Groupement par type de câble ou par opération` · `Indicateurs clés : nombre de shifts, efficacité moyenne, quantités demandées/produites/restantes`
  - *Export des données:* `Génération automatique de rapports **Excel multi-feuilles**` · `Historique des shifts, statistiques globales, liste des ouvriers` · `Résumé de production par câble et par opération`
- **[HARDCODED] 👷 Module Ouvrier:**
  - *Début de shift:* `Identification par **reconnaissance faciale** ou scan de QR code personnel` · `Sélection de l'opération via QR code` · `Choix du type de câble` · `Saisie de la quantité demandée` · `Enregistrement automatique du shift`
  - *Fin de shift:* `Identification de l'ouvrier` · `Affichage des données du shift en cours` · `Saisie de la quantité réellement produite` · `Validation et clôture automatique du shift` · `Enregistrement sécurisé dans le système`
- **[HARDCODED] 🎯 Valeur ajoutée du projet:**
  - `**Digitalisation complète** d'un processus industriel manuel`
  - `Amélioration de la **traçabilité et de la fiabilité** des données`
  - `**Suivi en temps réel** de la production`
  - `Base solide pour l'intégration d'automatisation (comptage câbles, IoT)`

---

### Project 9 — Mobile generator error-code interpreter · category `Automatisation` · image `/cappp.jpg`
- Title — FR: `Application mobile d'interprétation des codes d'erreur d'un groupe électrogène` / EN: `Mobile application for interpreting generator error codes`
- Description — FR: `Application mobile simple permettant aux techniciens de saisir un code d'erreur affiché sur le contrôleur Guard Revolution AMF25 et d'afficher instantanément la description détaillée du défaut` / EN: `Simple mobile application allowing technicians to enter an error code displayed on the Guard Revolution AMF25 controller and instantly display the detailed description of the fault`
- Problem — FR: `Les codes d'erreur affichés sur le contrôleur sont techniques et peu explicites, difficiles à interpréter sans documentation, source de perte de temps pour les techniciens lors des interventions` / EN: `Error codes displayed on the controller are technical and unclear, difficult to interpret without documentation, causing time loss for technicians during interventions`
- Solution — FR: `Développement d'une application mobile légère et intuitive permettant la saisie manuelle du code d'erreur et l'affichage instantané de sa signification détaillée` / EN: `Development of a lightweight and intuitive mobile application enabling manual entry of the error code and instant display of its detailed meaning`
- Technologies: `Application mobile, Maintenance industrielle, Groupes électrogènes`
- **Modal gallery:** `/Phone.jpg`, `/phone1.jpg`, `/phone 2.jpg` ⚠️ MISSING, `/phone 3.jpg`, `/phone 4.jpg`, `/phone 5.jpg`, `/phone 6.jpg` ⚠️ MISSING
- **[HARDCODED] Description paragraph:** `Application mobile simple permettant aux techniciens de saisir un code d'erreur affiché sur le contrôleur **Guard Revolution AMF25** d'un groupe électrogène et d'afficher instantanément la description détaillée du défaut correspondant.`
- **[HARDCODED] Fonctionnalité principale:**
  - `**Saisie manuelle du code d'erreur** affiché sur le générateur`
  - `**Affichage instantané** de la description correspondante`
  - `Aucun paramétrage complexe, **utilisation rapide sur le terrain**`
- **[HARDCODED] Développement & Programmation:**
  - `Application mobile développée`
  - `Gestion des entrées utilisateur (code d'erreur)`
  - `Association code → description via une **base de données locale**`
  - `Affichage dynamique du résultat à l'écran`
  - `Tests fonctionnels pour garantir la fiabilité de l'affichage`
- **[HARDCODED] Contexte industriel:**
  - `Utilisation en **maintenance de groupes électrogènes**`
  - `Outil d'**assistance rapide** pour les techniciens`
  - `Complément direct à l'afficheur **Guard Revolution AMF25**`
- **[HARDCODED] Avantages de la solution:**
  - `**Gain de temps** lors des interventions de maintenance`
  - `**Interprétation instantanée** des codes d'erreur techniques`
  - `Application **légère et intuitive**, facile à utiliser sur le terrain`
  - `Fonctionne **hors ligne** grâce à la base de données locale`

---

### Project 4 — Line follower & obstacle detector · category `Robotique` · image `/api/placeholder/600/400` ⚠️ NO IMAGE
- Title — FR: `Suiveur de ligne & détecteur d'obstacles` / EN: `Line follower & obstacle detector`
- Description — FR: `Robot autonome capable de suivre une ligne et d'éviter les obstacles de manière intelligente` / EN: `Autonomous robot capable of following a line and intelligently avoiding obstacles`
- Problem — FR: `Besoin de robots autonomes pour la navigation dans des environnements structurés` / EN: `Need for autonomous robots for navigation in structured environments`
- Solution — FR: `Développement d'un robot avec algorithmes de suivi de ligne et détection d'obstacles` / EN: `Development of a robot with line following algorithms and obstacle detection`
- Technologies: `Arduino, SolidWorks, Capteurs, Algorithmes`
- TODO: no real image — replace `/api/placeholder/600/400` with an actual photo if available.

---

### Project 5 — Robotic arm drawing on wood (Woodcraft) · category `Robotique` · image `/rttoolbox.png`
- Title — FR: `Bras robotique dessinant sur bois (Woodcraft)` / EN: `Robotic arm drawing on wood (Woodcraft)`
- Description — FR: `Commande précise d'un bras robotique pour réaliser des motifs complexes sur le bois` / EN: `Precise control of a robotic arm to create complex patterns on wood`
- Problem — FR: `Réalisation manuelle de motifs complexes sur bois longue et imprécise` / EN: `Manual creation of complex patterns on wood is long and imprecise`
- Solution — FR: `Programmation d'un bras robotique avec trajectoires précises pour l'usinage artistique` / EN: `Programming of a robotic arm with precise trajectories for artistic machining`
- Technologies: `SolidWorks, RT Tool Box, Robotique industrielle, Teaching method`
- **Modal media:** image `/rttoolbox.png`
- **Objective** (`project5.objective` — FR "Objectif du Projet" / EN "Project Objective"):
  - FR: `Le but de notre projet est de créer un woodcraft, où un robot sera capable d'écrire un mot ou de dessiner sur du bois de manière artisanale. Dans notre cas, le robot sera chargé d'écrire le mot "meca" sur une surface en bois.` / EN: `The goal of our project is to create a woodcraft, where a robot will be able to write a word or draw on wood in an artisanal manner. In our case, the robot will be tasked with writing the word "meca" on a wooden surface.`
- **Step 1** — FR title `Conception sur SolidWorks` / EN `Design on SolidWorks`
  - FR: `La première étape consiste à concevoir la table de travail, l'emplacement du robot et la pièce sur laquelle il écrira le mot "meca". Cette conception détaillée a été réalisée à l'aide du logiciel SolidWorks.` / EN: `The first step consists of designing the work table, the robot location and the piece on which it will write the word "meca". This detailed design was carried out using SolidWorks software.`
- **Step 2** — FR title `Programmation avec RT Tool Box - Création du Hand` / EN `Programming with RT Tool Box - Hand Creation`
  - FR: `Nous avons utilisé le logiciel RT Tool Box pour programmer le robot. Dans un premier temps, nous avons créé notre hand, définissant ainsi la configuration des outils et des effecteurs que le robot utilisera pour l'écriture sur bois.` / EN: `We used RT Tool Box software to program the robot. Initially, we created our hand, thus defining the configuration of tools and end effectors that the robot will use for writing on wood.`
- **Step 3** — FR title `Intégration des Pièces à RT Tool Box` / EN `Part Integration into RT Tool Box`
  - FR: `Suite à la création du hand, nous avons intégré les pièces conçues précédemment sur SolidWorks dans le logiciel RT Tool Box. Cette étape garantit la synchronisation entre les éléments mécaniques et la programmation, assurant une exécution cohérente des mouvements du robot.` / EN: `Following the creation of the hand, we integrated the parts previously designed in SolidWorks into RT Tool Box software. This step ensures synchronization between mechanical elements and programming, ensuring consistent execution of robot movements.`
- **Step 4** — FR title `Programmation Avancée avec la Méthode de Teaching de Robot` / EN `Advanced Programming with Robot Teaching Method`
  - FR: `Enfin, par le biais de la méthode de teaching de robot, nous avons affiné la programmation du robot. Cette approche interactive a permis au robot d'apprendre et de s'adapter dynamiquement à la surface du bois, améliorant ainsi sa capacité à écrire le mot "meca" avec précision et efficacité.` / EN: `Finally, through the robot teaching method, we refined the robot programming. This interactive approach allowed the robot to learn and dynamically adapt to the wood surface, thus improving its ability to write the word "meca" with precision and efficiency.`
- **Highlights** (`project5.highlights` — FR "Points forts du projet" / EN "Project highlights"):
  1. FR: `Intégration complète : De la conception 3D (SolidWorks) à la programmation robotique (RT Tool Box)` / EN: `Complete integration: From 3D design (SolidWorks) to robotic programming (RT Tool Box)`
  2. FR: `Précision artisanale : Réalisation de motifs complexes avec une grande précision` / EN: `Artisanal precision: Creation of complex patterns with high precision`
  3. FR: `Méthode de teaching : Adaptation dynamique du robot à la surface du bois` / EN: `Teaching method: Dynamic adaptation of the robot to the wood surface`
  4. FR: `Automatisation : Réduction du temps de production et amélioration de la reproductibilité` / EN: `Automation: Reduction of production time and improvement of reproducibility`
  5. FR: `Application industrielle : Solution applicable à la personnalisation de produits en bois` / EN: `Industrial application: Solution applicable to wood product personalization`

---

### Project 6 — Smart tank with Node-RED · category `IoT` · image `/api/placeholder/600/400` ⚠️ NO IMAGE
- Title — FR: `Réservoir intelligent avec Node-RED` / EN: `Smart tank with Node-RED`
- Description — FR: `Système de monitoring intelligent d'un réservoir avec dashboard temps réel et alertes` / EN: `Intelligent tank monitoring system with real-time dashboard and alerts`
- Problem — FR: `Surveillance manuelle des réservoirs inefficace et risque de débordement ou de pénurie` / EN: `Manual tank monitoring is inefficient and risks overflow or shortage`
- Solution — FR: `Dashboard Node-RED avec MQTT et ESP32 pour le monitoring en temps réel et alertes automatiques` / EN: `Node-RED dashboard with MQTT and ESP32 for real-time monitoring and automatic alerts`
- Technologies: `Node-RED, MQTT, ESP32, IoT, Dashboard`
- TODO: no real image — replace `/api/placeholder/600/400` with an actual image if available.

---

### Project 10 — Industrial supervision app & maintenance indicators · category `Automatisation` · image `/mes1.png`
- Title — FR: `Application de supervision industrielle & indicateurs de maintenance` / EN: `Industrial supervision application & maintenance indicators`
- Description — FR: `Application de supervision industrielle permettant l'acquisition, l'enregistrement et l'analyse des arrêts machine, données de production et paramètres process, avec calcul automatique des indicateurs de maintenance MTTR et MTBF` / EN: `Industrial supervision application enabling acquisition, recording and analysis of machine stops, production data and process parameters, with automatic calculation of MTTR and MTBF maintenance indicators`
- Problem — FR: `Dans un environnement industriel, l'absence d'un système de supervision structuré entraîne une mauvaise traçabilité des arrêts machine, un suivi limité de la production et de la consommation matière, et une difficulté à analyser les performances et la maintenance` / EN: `In an industrial environment, the absence of a structured supervision system leads to poor traceability of machine stops, limited monitoring of production and material consumption, and difficulty in analyzing performance and maintenance`
- Solution — FR: `Développement d'une application de supervision centralisée intégrant l'acquisition des signaux d'arrêt via une carte d'acquisition, l'enregistrement des données process dans une base de données, et une interface graphique multi-fenêtres pour le suivi, l'analyse et la prise de décision` / EN: `Development of a centralized supervision application integrating stop signal acquisition via an acquisition board, process data recording in a database, and a multi-window graphical interface for monitoring, analysis and decision-making`
- Technologies: `WinDev, Base de données, Carte d'acquisition, Supervision industrielle, Maintenance industrielle, MTTR / MTBF, Proteus 8`
- **Detail** (`project10.detail`) — FR: `Application de supervision industrielle permettant l'acquisition, l'enregistrement et l'analyse des arrêts machine, données de production et paramètres process, avec calcul automatique des indicateurs de maintenance MTTR et MTBF, développée sous WinDev.` / EN: `Industrial supervision application enabling acquisition, recording and analysis of machine stops, production data and process parameters, with automatic calculation of MTTR and MTBF maintenance indicators, developed under WinDev.`
- **Modal gallery:** `/mes1.png`, `/MES2.png`, `/MES3.png`, `/mes4.png`
- **Problématique** (`project10.problematic`) — FR "Problématique" / EN "Problem"
  - Intro — FR: `Dans un environnement industriel, l'absence d'un système de supervision structuré entraîne :` / EN: `In an industrial environment, the absence of a structured supervision system leads to:`
  1. FR: `une mauvaise traçabilité des arrêts machine` / EN: `poor traceability of machine stops`
  2. FR: `un suivi limité de la production et de la consommation matière` / EN: `limited monitoring of production and material consumption`
  3. FR: `une difficulté à analyser les performances et la maintenance` / EN: `difficulty in analyzing performance and maintenance`
- **Solution** (`project10.solutionTitle`) — FR "Solution" / EN "Solution"
  - Intro — FR: `Développement d'une application de supervision centralisée intégrant :` / EN: `Development of a centralized supervision application integrating:`
  1. FR: `l'acquisition des signaux d'arrêt via une carte d'acquisition` / EN: `stop signal acquisition via an acquisition board`
  2. FR: `l'enregistrement des données process dans une base de données` / EN: `process data recording in a database`
  3. FR: `une interface graphique multi-fenêtres pour le suivi, l'analyse et la prise de décision` / EN: `multi-window graphical interface for monitoring, analysis and decision-making`
- **Acquisition des arrêts machine** (`project10.acquisition`) — FR "Acquisition des arrêts machine" / EN "Machine stop acquisition"
  1. FR: `Pin 11 : Arrêt défaut alimentation` / EN: `Pin 11: Power fault stop`
  2. FR: `Pin 10 : Arrêt défaut pression` / EN: `Pin 10: Pressure fault stop`
  3. FR: `Pin 9 : Arrêt opérateur` / EN: `Pin 9: Operator stop`
  - Desc — FR: `Chaque arrêt est enregistré avec : type d'arrêt, date et heure, historique consultable` / EN: `Each stop is recorded with: stop type, date and time, consultable history`
- **Interface graphique (WinDev)** (`project10.interface`) — FR "Interface graphique (WinDev)" / EN "Graphical interface (WinDev)"
  - *Window 1* — FR: `Fenêtre 1 – Arrêts & Maintenance` / EN: `Window 1 – Stops & Maintenance`
    - FR: `Liste des arrêts avec type, date, heure. Filtrage par type et par période. Calcul et affichage des indicateurs : MTTR (Mean Time To Repair) et MTBF (Mean Time Between Failures)` / EN: `List of stops with type, date, time. Filtering by type and period. Calculation and display of indicators: MTTR (Mean Time To Repair) and MTBF (Mean Time Between Failures)`
  - *Window 2* — FR: `Fenêtre 2 – Suivi de la production` / EN: `Window 2 – Production monitoring`
    - FR: `Affichage de la production journalière : pièces conformes, pièces non conformes, production totale. Analyse rapide de la performance de production` / EN: `Display of daily production: conforming parts, non-conforming parts, total production. Quick analysis of production performance`
  - *Window 3* — FR: `Fenêtre 3 – Suivi process` / EN: `Window 3 – Process monitoring`
    - FR: `Suivi de la consommation de matière première en fonction du temps (par jour). Historique de la température. Détection et enregistrement des dépassements de seuil (température > 70 °C). Filtrage des données par date` / EN: `Monitoring of raw material consumption as a function of time (per day). Temperature history. Detection and recording of threshold exceedances (temperature > 70 °C). Data filtering by date`
  - *Main window* — FR: `Fenêtre principale` / EN: `Main window`
    - FR: `Menu central permettant l'accès aux différentes fenêtres. Navigation simple et intuitive` / EN: `Central menu allowing access to different windows. Simple and intuitive navigation`
- **Développement & Programmation** (`project10.development`) — FR "Développement & Programmation" / EN "Development & Programming"
  1. FR: `Programmation de la carte d'acquisition` / EN: `Acquisition board programming`
  2. FR: `Acquisition et enregistrement : des arrêts machine, des données de production, des données de température, de la consommation de matière première` / EN: `Acquisition and recording: machine stops, production data, temperature data, raw material consumption`
  3. FR: `Développement de l'interface graphique et de la base de données sous WinDev` / EN: `Development of graphical interface and database under WinDev`
  4. FR: `Implémentation des filtres et calculs statistiques` / EN: `Implementation of filters and statistical calculations`
- **Valeur ajoutée du projet** (`project10.value`) — FR "Valeur ajoutée du projet" / EN "Project added value"
  1. FR: `Vision complète acquisition → supervision → analyse` / EN: `Complete vision acquisition → supervision → analysis`
  2. FR: `Compétences en maintenance industrielle` / EN: `Industrial maintenance skills`
  3. FR: `Exploitation des données pour l'aide à la décision` / EN: `Data exploitation for decision support`
  4. FR: `Intégration WinDev et Proteus 8` / EN: `WinDev and Proteus 8 integration`

---

## 9. Contact (`Contact.tsx`)

| Key | FR | EN |
|-----|----|----|
| contact.title | Contact | Contact |
| contact.subtitle | Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter de vos projets | Interested in my profile? Feel free to contact me to discuss your projects |
| contact.info | Informations de contact | Contact information |
| contact.infoDesc | Je suis disponible pour discuter de projets, stages ou opportunités de collaboration dans le domaine de l'ingénierie et de l'innovation technologique. | I am available to discuss projects, internships or collaboration opportunities in the field of engineering and technological innovation. |
| contact.email | Email | Email |
| contact.phone | Téléphone | Phone |
| contact.location | Localisation | Location |
| contact.social | Réseaux sociaux | Social networks |
| contact.fullName | Nom complet | Full name |
| contact.namePlaceholder | Votre nom | Your name |
| contact.emailPlaceholder | votre.email@example.com | your.email@example.com |
| contact.subject | Sujet | Subject |
| contact.subjectPlaceholder | Sujet de votre message | Subject of your message |
| contact.message | Message | Message |
| contact.messagePlaceholder | Votre message... | Your message... |
| contact.send | Envoyer le message | Send message |
| contact.sent | Message envoyé ! | Message sent! |

### Contact details (hardcoded values)
- **Email:** `ghada.turkiditgaraali@esprit.tn` (mailto link)
- **Phone:** `216-26-016-352`
- **Location:** `Hammamet, Nabeul, Tunisia`
- **LinkedIn:** `https://www.linkedin.com/in/ghada-turki-20319b217`
- **Contact form:** fields = Full name, Email, Subject, Message. Currently NOT wired to a backend — `onSubmit` only `console.log`s and shows a 3-second "Message sent!" confirmation, then resets. (No email service / API endpoint.)

---

## 10. Footer (`Footer.tsx`)

- **Brand:** `Ghada Turki` [HARDCODED]

| Key | FR | EN |
|-----|----|----|
| footer.tagline | Transformer la mécanique en systèmes intelligents | Transforming mechanics into intelligent systems |
| footer.quickLinks | Liens rapides | Quick links |
| footer.about | À propos | About |
| footer.projects | Projets | Projects |
| footer.contact | Contact | Contact |
| footer.social | Réseaux sociaux | Social networks |
| footer.quote | "L'innovation distingue un leader d'un suiveur." - Steve Jobs | "Innovation distinguishes a leader from a follower." - Steve Jobs |
| footer.rights | Tous droits réservés | All rights reserved |

- **Quick links:** About → `#about`, Projects → `#projects`, Contact → `#contact`
- **Social:** LinkedIn (`https://www.linkedin.com/in/ghada-turki-20319b217`), Email (`mailto:ghada.turkiditgaraali@esprit.tn`)
- **Copyright line:** `© {current year} Ghada Turki. {Tous droits réservés / All rights reserved}.` (year computed dynamically via `new Date().getFullYear()`)

---

## 11. Asset inventory (`public/`)

### Documents
- `CV_Ghada_Turki.pdf` — French CV (Hero download, FR)
- `resume GhadaTurki.pdf` — English resume (Hero download, EN)
- `Certification.pdf` — AIESEC Leadership Development Experience certificate
- `ESE_attestation_Ghada_Turki dit Gara ali.pdf` — Bal des Projets participation attestation
- `Certificate Applications of AI for Predictive Maintenance.pdf` — NVIDIA cert
- `Certificate Generative AI with Diffusion Models.pdf` — NVIDIA cert
- `SOLIDWORKS Simulation Professional.jpg` — SOLIDWORKS cert
- `SOLIDWORKS Additive Manufacturing Associate.jpg` — SOLIDWORKS cert
- `Certified SOLIDWORKS CAD Design Associate.jpg` — SOLIDWORKS cert

### Photo
- `ghada-turki-photo.jpg` — profile photo (Hero + About)

### Project images
- `crac.jpg` (P1), `app.jpg` (P2), `8.jpg` (P2 modal), `groupe.jpg` (P7), `projet  groupe.jpg` (P7 modal, double-space filename), `gd11.png` (P3 card), `gd.png` `gd1.png` `gd3.png` `gd4.png` `gd5.png` `gd6.png` `GD12.png` (P8 gallery), `cappp.jpg` (P9 card), `Phone.jpg` `phone1.jpg` `phone 3.jpg` `phone 4.jpg` `phone 5.jpg` (P9 gallery), `rttoolbox.png` (P5), `mes1.png` `MES2.png` `MES3.png` `mes4.png` (P10)

### Videos
- `video.mp4` (P1), `compateg.MOV` (P3), `realisation.mp4` `video1.mp4` `video2.mp4` `video3.mp4` (P7)

### ⚠️ Missing / placeholder / unused
- **Missing (referenced, not present):** `phone 2.jpg`, `phone 6.jpg` (P9 gallery — hidden via `onError`)
- **Placeholder (no real image):** Projects 4 & 6 use `/api/placeholder/600/400`
- **Unused (present, not referenced):** `controleur.jpg`
- **Docs in public (not site assets):** `INSTRUCTIONS_PHOTO.md`, `README.md`

---

## 12. Functional behaviors to preserve

- **Bilingual FR/EN toggle** (default FR), persisted in `localStorage` (`language`).
- **Dark/Light theme toggle** (default dark; honors OS preference on first load), persisted in `localStorage` (`theme`).
- **Smooth anchor scrolling** with 80px header offset.
- **Project detail modals** (per-project custom content, image galleries, video players).
- **Video lightbox** (click thumbnail → fullscreen player).
- **Downloadable** CV (language-aware) and all certificates/attestations.
- **Contact form** (client-side only; no backend — preserve as-is unless told otherwise).
- **Responsive** layouts (mobile menu, grid breakpoints).
