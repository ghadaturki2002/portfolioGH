# TODO — Portfolio Ghada Turki

> Le portfolio est **terminé et fonctionnel** (build OK, site testé en local). Il ne te reste qu'à compléter les éléments ci-dessous, puis (si besoin) à désactiver la protection Vercel pour le rendre public.

---

## 1. À COMPLÉTER (placeholders visibles dans le site)

Cherche ces marqueurs dans le code (`lib/content.ts`) : **`[À COMPLÉTER : …]`** / **`[TO COMPLETE: …]`**.

### PFE — Jumeau numérique (ton projet phare, mis très en avant)
Le CV ne contenait pas les détails du PFE, donc j'ai mis des placeholders à compléter dans `lib/content.ts` :
- **Entreprise du PFE** → `experiences[0].company` et le projet `digital-twin` (description). Actuellement : `[À COMPLÉTER : entreprise du PFE]`.
- **Dates exactes** → j'ai mis `03/2026 – 09/2026` (PFE de 6 mois se terminant le **09/09/2026**). ⚠️ **Confirme la date de début.**
- **Type de machine** modélisée → `[À COMPLÉTER : type de machine]`.
- **Grandeur prédite / objectif** du modèle → `[À COMPLÉTER : grandeur prédite]`.
- **Résultats** (précision du modèle, indicateurs, gains) → `[À COMPLÉTER : résultats]`.

### Images de projets manquantes (placeholders graphiques élégants en attendant)
Ces projets affichent un **visuel décoratif** (line-art) au lieu d'une vraie image. Ajoute tes captures dans `public/` puis renseigne le champ `images: ['/ton-image.png']` du projet dans `lib/content.ts` :
- **Jumeau numérique** (`digital-twin`) → ➤ capture du dashboard / schéma du pipeline ML. **Taille recommandée : 1200×750 px (16:10).**
- **Suiveur de ligne** (`line-follower`) → ➤ photo du robot. 1200×750 px.
- **Réservoir intelligent** (`smart-reservoir`) → ➤ capture du dashboard Node-RED. 1200×750 px.

### Photo de profil
- `public/ghada-turki-photo.jpg` existe mais est peut-être **basse résolution**. ➤ Remplace-la par une version HD (portrait, ratio **4:5**, ex. 1000×1250 px) — même nom de fichier.

### Diplôme « Technicien »
- Tu m'as donné le titre exact « **Diplôme de Technicien en Génie Mécanique — Maintenance Industrielle** ». Le CV indiquait « Licence appliquée en génie mécanique (ISETN, 2020–2023) ». J'ai gardé **ton** titre + l'école/les dates du CV (ISETN, 2020–2023).
  ➤ **Confirme** : le titre exact, l'établissement et les dates (dans `lib/content.ts` → `education[2]`).

---

## 2. DÉCISIONS QUE J'AI PRISES (tu peux tout changer)

- **Direction "EMPLOI"** : tout le texte te présente comme **ingénieure prête à travailler**, disponible **à partir de septembre 2026** (après le PFE) — plus aucune mention de « stage » dans la présentation.
- **PFE = expérience la plus récente + projet phare** : le jumeau numérique apparaît en **première expérience** ET en **projet vedette** (carte plus grande, badge « En cours »).
- **Contenu reformulé** depuis le CV (plus pro, plus percutant) — **100 % vrai**, aucun fait inventé. J'ai retiré des inventions de l'ancienne version (projet « WinDev/MTTR », reconnaissance faciale/QR, « VGG16/ImageNet », modèle « AMF25 »).
- **Nouveau design « Signal » (thème électronique)** : palette **graphite + cyan électrique** (ni l'ancien orange, ni l'ancien émeraude, ni du bleu marine), typo **Sora** (titres) + **Inter** + **JetBrains Mono**. Thème **sombre par défaut**, clair/sombre disponible.
- **Effets "wow"** : écran de **boot/diagnostic** au démarrage, **réseau de particules** interactif (réagit à la souris) dans le hero, **engrenage 3D** (Three.js) qui réagit au scroll, **cartes projets tilt 3D** + spotlight, **scroll horizontal** pour les projets, **barre de progression** de lecture, **compteurs** qui montent, **titres révélés mot à mot**, **fond PCB animé** (section Compétences), **marquee** d'outils. Tout respecte `prefers-reduced-motion` et la 3D est lazy-loadée.
- **Certifications** : 6 affichées (4 SOLIDWORKS + 2 NVIDIA). « CSWPA – Sheet Metal » n'a pas de fichier de certificat dans le projet → listée **sans bouton de téléchargement**. La 2ᵉ NVIDIA (« Generative AI with Diffusion Models ») a été incluse car son certificat PDF est présent dans `public/`.
- **2 grandes vidéos** (`compateg.MOV` 88 Mo, `realisation.mp4` 45 Mo) avaient été **sorties du dépôt** (trop lourdes pour l'envoi) → sauvegardées dans `Bureau\portfolio-videos-backup`. Le code les réaffiche automatiquement si tu les remets dans `public/`.
- **Formulaire de contact** : sans serveur, il **ouvre ton client mail** pré-rempli vers ton adresse (le message n'est pas perdu).

---

## 3. MES QUESTIONS POUR TOI

1. **PFE** : quelle est l'entreprise, la date de début exacte, le type de machine, ce que le modèle prédit, et les résultats obtenus ?
2. **Diplôme Technicien** : titre exact + établissement + dates (le CV disait « Licence appliquée en génie mécanique, ISETN, 2020–2023 ») ?
3. Peux-tu fournir les **3 images de projets** manquantes et une **photo HD** ?
4. L'année du PFE (**2026**, fin le 09/09/2026) est-elle correcte ?
5. Veux-tu une **3ᵉ certification NVIDIA** ou d'autres credentials à ajouter ?

---

## 4. POUR METTRE EN LIGNE (rappel)
Le site est déployé sur Vercel via GitHub. S'il affiche « Authentication Required », va sur **Vercel → projet `portfolio` → Settings → Deployment Protection → Vercel Authentication → OFF**.

*(Pour lancer en local : `npm run dev` puis http://localhost:3000)*
