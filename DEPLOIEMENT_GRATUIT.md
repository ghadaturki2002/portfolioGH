# 🚀 Guide de déploiement gratuit - Portfolio

## Option 1 : Vercel (RECOMMANDÉ - Le plus simple pour Next.js) ⭐

**Vercel est gratuit et créé par l'équipe de Next.js !**

### Étape 1 : Créer un compte GitHub (si vous n'en avez pas)

1. Allez sur [https://github.com](https://github.com)
2. Cliquez sur "Sign up"
3. Créez un compte gratuit

### Étape 2 : Mettre votre projet sur GitHub

1. **Installez Git** (si pas déjà fait) : [https://git-scm.com/download/win](https://git-scm.com/download/win)

2. **Ouvrez PowerShell** dans le dossier de votre projet :
   ```powershell
   cd C:\Users\indomieG\Desktop\portfolio
   ```

3. **Initialisez Git** (si pas déjà fait) :
   ```powershell
   git init
   ```

4. **Créez un fichier `.gitignore`** (déjà créé dans votre projet)

5. **Ajoutez tous les fichiers** :
   ```powershell
   git add .
   ```

6. **Faites un premier commit** :
   ```powershell
   git commit -m "Initial commit - Portfolio Ghada Turki"
   ```

7. **Allez sur GitHub** et créez un nouveau dépôt :
   - Cliquez sur "New repository"
   - Nommez-le : `portfolio-ghada-turki`
   - Laissez-le **Public** (gratuit)
   - NE cochez PAS "Initialize with README"
   - Cliquez sur "Create repository"

8. **Connectez votre projet à GitHub** :
   ```powershell
   git remote add origin https://github.com/VOTRE-USERNAME/portfolio-ghada-turki.git
   git branch -M main
   git push -u origin main
   ```
   (Remplacez VOTRE-USERNAME par votre nom d'utilisateur GitHub)

### Étape 3 : Déployer sur Vercel

1. **Allez sur [https://vercel.com](https://vercel.com)**
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"** (plus simple)
4. Autorisez Vercel à accéder à GitHub
5. Cliquez sur **"Add New Project"**
6. Sélectionnez votre dépôt `portfolio-ghada-turki`
7. Cliquez sur **"Import"**
8. Vercel détectera automatiquement Next.js
9. Laissez les paramètres par défaut
10. Cliquez sur **"Deploy"**

⏱️ **Attendez 2-3 minutes** et votre site sera en ligne !

### Résultat

Vous obtiendrez un lien comme :
```
https://portfolio-ghada-turki.vercel.app
```

**Ou vous pouvez choisir un nom personnalisé gratuit :**
- Allez dans les paramètres du projet
- Choisissez un nom de domaine personnalisé (ex: `ghada-turki-portfolio`)

---

## Option 2 : Netlify (Alternative gratuite)

### Étape 1 : Préparer le build

Dans votre projet, créez un fichier `netlify.toml` :
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Étape 2 : Déployer

1. Allez sur [https://www.netlify.com](https://www.netlify.com)
2. Créez un compte gratuit
3. Cliquez sur "Add new site" → "Import an existing project"
4. Connectez votre compte GitHub
5. Sélectionnez votre dépôt
6. Cliquez sur "Deploy site"

**Résultat :** `https://votre-site.netlify.app`

---

## Option 3 : GitHub Pages (Plus complexe pour Next.js)

⚠️ **Note :** Nécessite une configuration supplémentaire pour Next.js.

---

## 📋 Résumé - Quelle option choisir ?

| Plateforme | Difficulté | Temps | Lien gratuit |
|------------|-----------|-------|-------------|
| **Vercel** ⭐ | ⭐ Facile | 5 min | ✅ `votre-site.vercel.app` |
| **Netlify** | ⭐⭐ Moyen | 10 min | ✅ `votre-site.netlify.app` |
| **GitHub Pages** | ⭐⭐⭐ Complexe | 15+ min | ✅ `username.github.io` |

## 🎯 Recommandation

**Utilisez Vercel** car :
- ✅ Créé par l'équipe Next.js
- ✅ Configuration automatique
- ✅ Déploiement en 2 minutes
- ✅ Gratuit à vie
- ✅ Mises à jour automatiques (chaque push sur GitHub)
- ✅ HTTPS automatique
- ✅ Nom de domaine personnalisé gratuit possible

---

## 🔄 Mettre à jour votre site

Une fois déployé, chaque fois que vous modifiez votre code :

1. **Poussez les changements sur GitHub** :
   ```powershell
   git add .
   git commit -m "Description de vos modifications"
   git push
   ```

2. **Vercel/Netlify redéploiera automatiquement** en 2-3 minutes !

---

## 📧 Partager votre portfolio

Une fois déployé, vous pouvez partager ce lien avec les recruteurs :
```
https://votre-site.vercel.app
```

**Exemple d'email :**
```
Bonjour,

Je vous partage mon portfolio professionnel :
https://votre-site.vercel.app

Cordialement,
Ghada Turki
```

---

## ❓ Besoin d'aide ?

Consultez :
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js Deployment](https://nextjs.org/docs/deployment)
