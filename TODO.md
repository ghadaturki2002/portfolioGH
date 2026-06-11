# TODO — Portfolio Ghada Turki

> Le portfolio est **terminé et fonctionnel** (build OK, testé en local, déployé sur Vercel). Il ne te reste qu'à compléter les éléments ci-dessous, puis à désactiver la protection Vercel pour le rendre public.

---

## 1. À COMPLÉTER (placeholders visibles dans le code)

Cherche ces marqueurs dans **`lib/content.ts`** : **`[À COMPLÉTER : …]`** / **`[TO COMPLETE: …]`**.

### PFE — Jumeau numérique (projet phare)
- **Entreprise**, **type de machine**, **grandeur prédite**, **résultats/précision** → dans le projet `jumeau-numerique` ET l'expérience `experiences[0]`.
- **Date de début** : j'ai mis `03/2026 – 09/2026` (PFE 6 mois, fin **09/09/2026**) — confirme la date de début.

### Autres projets
- **Robot de détection de fissures** → `result` : **précision de détection** (`[À COMPLÉTER : précision de détection]`).
- **GMAO** → la **technologie** de l'application est inconnue : `tech: ['[À COMPLÉTER : techno]', …]` (WinDev ? Java ? autre ?).
- **Liens « Voir le projet »** : chaque projet a `link: '[À COMPLÉTER : lien]'`. Tant que c'est un placeholder, **aucun bouton « Voir le projet » ne s'affiche** (volontaire). Ajoute une vraie URL (démo / dépôt GitHub / vidéo) pour faire apparaître le lien sur la carte et dans la modale.

### Images de projets manquantes (un visuel décoratif élégant s'affiche en attendant)
Ajoute tes captures dans `public/` puis renseigne `images: ['/ton-image.png']` du projet dans `lib/content.ts` :
- `jumeau-numerique` → dashboard / schéma du pipeline ML — **1200×750 px (16:10)**
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
