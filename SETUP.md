# 🚀 Guide de démarrage rapide

## Installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 📝 Personnalisation rapide

### 1. Ajouter votre CV
- Placez votre fichier PDF dans `public/CV_Ghada_Turki.pdf`
- Le lien est déjà configuré dans `components/Hero.tsx`

### 2. Modifier les réseaux sociaux
- LinkedIn : `components/Footer.tsx` et `components/Contact.tsx`
- Ajoutez d'autres réseaux si nécessaire

### 3. Ajouter des images de projets
- Créez le dossier `public/images/projects/`
- Ajoutez vos images
- Mettez à jour les chemins dans `components/Projects.tsx`

### 4. Personnaliser les couleurs
- Modifiez `tailwind.config.js` pour changer les couleurs du thème

## 🎨 Fonctionnalités principales

✅ **Dark mode par défaut** - Toggle disponible dans le header
✅ **Animations fluides** - Framer Motion pour toutes les interactions
✅ **Responsive** - Optimisé pour mobile, tablette et desktop
✅ **SEO ready** - Métadonnées configurées dans `app/layout.tsx`

## 📦 Déploiement

### Vercel (recommandé)
1. Poussez sur GitHub
2. Importez sur [vercel.com](https://vercel.com)
3. Déploiement automatique !

### Autres options
- Netlify
- AWS Amplify
- GitHub Pages (avec configuration)

## 🔧 Problèmes courants

**Erreurs TypeScript au démarrage ?**
→ Exécutez `npm install` d'abord

**Les images ne s'affichent pas ?**
→ Vérifiez que les fichiers sont dans `public/`

**Le dark mode ne fonctionne pas ?**
→ Vérifiez que `ThemeProvider` est bien dans `app/layout.tsx`

---

**Bon développement ! 🎉**
