# TODO — Portfolio Ghada Turki

> Le portfolio est **terminé et fonctionnel** (build OK, testé en local, déployé sur Vercel). Il ne te reste qu'à compléter les éléments ci-dessous, puis à désactiver la protection Vercel pour le rendre public.

---

## 1. À COMPLÉTER (placeholders visibles dans le code)

Cherche ces marqueurs dans **`lib/content.ts`** : **`[À COMPLÉTER : …]`** / **`[TO COMPLETE: …]`**.

### PFE — Jumeau numérique (projet phare) — ✅ contenu détaillé intégré
- Le contenu réel est intégré (TUNIAOS, machine de gravure ionique, pipeline Random Forest + LSTM, déploiement ESP32/MQTT/Node-RED, résultats chiffrés battant l'article de référence) — dans `jumeau-numerique` ET `experiences[0]`.
- 📷 **Photo** : dépose ta photo sous **`public/jumeau-numerique.jpg`** (emplacement déjà réservé ; un visuel décoratif s'affiche en attendant — rien n'est inventé). ~1200×750 px (16:10).
- ⚠️ **À confirmer** : j'ai écrit « machine de **gravure ionique (ion milling)** » (cohérent avec le dataset PHM 2018). Tu avais évoqué « gravure ionique réactive (**RIE**) » — confirme le terme exact (dans `jumeau-numerique` et `experiences[0]`).
- **Date de début** : `03/2026 – 09/2026` (fin 09/09/2026) — confirme la date de début.
- **Lien** : ajoute l'URL (démo / rapport / dépôt) dans `jumeau-numerique.link`.

### Autres projets
- **Robot de détection de fissures** → ✅ contenu détaillé intégré (équipe de 6, VGG16 + ESP32-CAM, **96 %** de précision). Le terme « autonome » a été remplacé par « piloté à distance » (seule la détection est automatique). Médias existants `crac.jpg` + `video.mp4` conservés — tu peux les remplacer par une meilleure photo/vidéo (même nom de fichier dans `public/`).
- **GenARino (réalité augmentée)** → ✅ contenu détaillé intégré (PFE Master, ISTIC × MATECH, **2025**, 6 mois ; AR Unity/Vuforia + 3D SolidWorks/Blender). Visuels `app.jpg` + `8.jpg` conservés. ⚠️ Le paragraphe « Ce que j'ai appris » est à **valider** (dis-moi ta vraie difficulté principale si tu veux le changer). La **maquette Arduino a été retirée** de ce projet → ce sera un **projet séparé** (même thème) à rédiger.
- **Simulateur de pannes + app de diagnostic** → ✅ contenu détaillé intégré (PFE Licence Génie mécanique, **ISETN, 2023, 4 mois**, binôme, avec MATECH ; banc Guard Revolution + Arduino, app Java ; **en cours d'utilisation chez MATECH**). Médias réels conservés. *Optionnel* : confirme que l'app de diagnostic est bien en **Java**.
- **Bras robotique — gravure** → ✅ contenu détaillé intégré (projet académique individuel, **2024** ; bras **6 axes**, CATIA V5 + RT ToolBox, motif « MECA »). Visuel `rttoolbox.png` conservé. *À confirmer* : **établissement** + **durée** ; le **matériau gravé** (« bois » gardé d'après ton portfolio) ; et le paragraphe « Ce que j'ai appris ».
- **Automatisme avancé Siemens (TIA Portal)** → ✅ contenu détaillé intégré (projet individuel, **ESPRIT 5ᵉ année Mécatronique, 2025**, un semestre ; servo S210, IO-Link, RFID RF210, energy-meter, HMI TP700). 📷 Emplacement image réservé → dépose une capture/photo sous **`public/siemens.jpg`** (un visuel décoratif s'affiche en attendant).
- **GMAO** → la **technologie** de l'application est inconnue : `tech: ['[À COMPLÉTER : techno]', …]` (WinDev ? Java ? autre ?).
- **Liens « Voir le projet »** : chaque projet a `link: '[À COMPLÉTER : lien]'`. Tant que c'est un placeholder, **aucun bouton « Voir le projet » ne s'affiche** (volontaire). Ajoute une vraie URL (démo / dépôt GitHub / vidéo) pour faire apparaître le lien sur la carte et dans la modale.

### Images de projets manquantes (un visuel décoratif élégant s'affiche en attendant)
Ajoute tes captures dans `public/` puis renseigne `images: ['/ton-image.png']` du projet dans `lib/content.ts` :
- `suiveur-ligne` → photo du robot
- `reservoir-iot` → capture du dashboard Node-RED
- `siemens-expert`, `photovoltaique`, `erp-sap`, `gmao` → une capture/photo chacun si tu en as

### Photo de profil
- `public/ghada-turki-photo.jpg` est peut-être basse résolution → remplace par une version **HD** (portrait ratio **4:5**, ~1000×1250 px, même nom).

### Diplôme « Technicien »
- Confirme le titre exact / l'établissement / les dates de **« Diplôme de Technicien en Génie Mécanique — Maintenance Industrielle »** (le CV indiquait « Licence appliquée en génie mécanique, ISETN, 2020–2023 »).

---

## 2. SECTION PROJETS — ce qui a été fait (selon ton brief)

- **13 projets** avec modèle de données enrichi (`type`, `status`, `categories`, `tech`, `title`, `description`, `role`, `learned`, `result`, `link`) — tout **bilingue FR/EN**.
- **Filtre par catégories** : barre de pills (Tout / CAO / Robotique / Automatisme / IoT / IA / AR / Énergie / Gestion), `aria-pressed`, transitions animées (layout/FLIP), responsive (passe à la ligne sur mobile).
- **Cartes homogènes** : visuel en haut (voile + teinte cyan unifiés), badge de **type** + **statut** (En cours), eyebrow catégorie, titre, description courte, puces tech (4 puis +N), lien « Voir le projet » (si `link` réel). **Tilt 3D + spotlight** au survol.
- **Modale détail** : Description, galerie (images/vidéos), puis les champs « vendeurs » **Mon rôle · Ce que j'ai appris · Résultat** (Résultat affiché seulement s'il existe), puis les technologies. Fermeture par Échap / clic extérieur, focus géré, `prefers-reduced-motion` respecté.

### Décisions que j'ai prises (modifiables)
- J'ai **gardé `Supervision de production` (Python/Arduino) et `MES` (WinDev) séparés** — technos et portée différentes. **Si c'est le même projet, dis-le-moi et je fusionne.**
- J'ai **retiré « calage »** des filtres (aucun projet ne s'y rattachait) et **regroupé ERP / GMAO / MES sous « Gestion industrielle »**.
- La catégorie **Réalité augmentée** ne contient qu'un projet (GenARino) — je l'ai gardée (atout rare) ; dis-moi si tu préfères la fusionner.
- L'eyebrow de carte affiche les catégories en **libellés courts** (ex. « Robotique · IA »).
- J'ai ajouté une section **Gestion industrielle** aux Compétences (SAP, GMAO, MES, MTTR/MTBF, PVSyst) et `TIA Portal`, `SAP S/4HANA`, `PVSyst` au bandeau d'outils — cohérent avec les nouveaux projets.

---

## 3. MES QUESTIONS POUR TOI
1. **PFE** : entreprise, date de début, type de machine, grandeur prédite, résultats ?
2. **GMAO** : développée avec quelle technologie ?
3. **Robot fissures** : précision de détection obtenue ?
4. Des **liens** (démos / GitHub) à mettre sur les cartes ?
5. `Supervision de production` et `MES` : à **fusionner** ou à laisser séparés ?
6. Diplôme Technicien : titre / école / dates exacts ?

---

## 4. POUR METTRE EN LIGNE
Déployé sur Vercel via GitHub. S'il affiche « Authentication Required » : **Vercel → projet `portfolio` → Settings → Deployment Protection → Vercel Authentication → OFF**.

*(En local : `npm run dev` → http://localhost:3000)*
