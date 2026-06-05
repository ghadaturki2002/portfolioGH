# Portfolio Ghada Turki

Portfolio web ultra-moderne et technologique pour une ingénieure en Électromécanique/Mécatronique.

## 🚀 Technologies utilisées

- **Next.js 14** - Framework React avec SSR
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling moderne et responsive
- **Framer Motion** - Animations fluides et professionnelles
- **Lucide React** - Icônes modernes

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Lancer en production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🎨 Fonctionnalités

- ✅ Design moderne et industriel
- ✅ Dark mode par défaut avec toggle light mode
- ✅ Animations fluides avec Framer Motion
- ✅ Responsive 100% (mobile, tablette, desktop)
- ✅ Section Hero immersive avec animations
- ✅ Timeline animée pour l'expérience
- ✅ Galerie de projets avec filtres
- ✅ Section compétences par catégories
- ✅ Formulaire de contact
- ✅ Navigation fluide avec scroll smooth

## 📁 Structure du projet

```
portfolio/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Page d'accueil
│   └── globals.css         # Styles globaux
├── components/
│   ├── Header.tsx          # Navigation
│   ├── Hero.tsx            # Section hero
│   ├── About.tsx           # À propos
│   ├── Experience.tsx      # Expérience (timeline)
│   ├── Projects.tsx        # Projets
│   ├── Skills.tsx          # Compétences
│   ├── Education.tsx       # Formation
│   ├── Contact.tsx         # Contact
│   ├── Footer.tsx          # Footer
│   └── ThemeProvider.tsx   # Gestion du thème
├── public/                 # Assets statiques
└── package.json
```

## 🎯 Personnalisation

### Modifier les informations personnelles

Les données sont directement dans les composants :
- `components/Hero.tsx` - Informations principales
- `components/About.tsx` - Profil et domaines
- `components/Experience.tsx` - Expériences professionnelles
- `components/Projects.tsx` - Projets réalisés
- `components/Skills.tsx` - Compétences techniques
- `components/Education.tsx` - Formation académique
- `components/Contact.tsx` - Informations de contact

### Ajouter votre CV

Placez votre fichier PDF dans le dossier `public/` et mettez à jour le lien dans `components/Hero.tsx` :

```tsx
<a href="/votre-cv.pdf" download>
```

### Modifier les couleurs

Les couleurs sont définies dans `tailwind.config.js`. Vous pouvez modifier :
- `primary` - Couleur principale
- `industrial` - Couleurs industrielles (dark mode)

### Ajouter des images de projets

1. Placez vos images dans `public/images/projects/`
2. Mettez à jour les chemins dans `components/Projects.tsx`

## 📱 Responsive

Le site est entièrement responsive avec des breakpoints :
- Mobile : < 640px
- Tablette : 640px - 1024px
- Desktop : > 1024px

## 🌐 Déploiement

### Vercel (recommandé)

1. Poussez votre code sur GitHub
2. Importez le projet sur [Vercel](https://vercel.com)
3. Vercel détectera automatiquement Next.js et déploiera

### Autres plateformes

Le site peut être déployé sur :
- Netlify
- AWS Amplify
- GitHub Pages (avec configuration supplémentaire)

## 📝 Notes

- Les images de projets utilisent des placeholders. Remplacez-les par vos propres images.
- Le formulaire de contact nécessite une configuration backend pour fonctionner. Pour l'instant, il log les données dans la console.
- Le CV PDF doit être ajouté manuellement dans le dossier `public/`.

## 🔧 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue.

---

**Créé avec ❤️ pour Ghada Turki**
