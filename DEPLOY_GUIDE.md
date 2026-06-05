# 🚀 Guide de Déploiement Gratuit - Portfolio

## Option 1 : Vercel (RECOMMANDÉ - Le plus simple !)

Vercel est gratuit et parfait pour Next.js. Votre site sera en ligne en 5 minutes !

### Étape 1 : Créer un compte GitHub (si vous n'en avez pas)

1. Allez sur https://github.com
2. Cliquez sur "Sign up" (S'inscrire)
3. Créez votre compte (c'est gratuit)

### Étape 2 : Mettre votre code sur GitHub

1. **Installez Git** (si ce n'est pas déjà fait) :
   - Téléchargez depuis : https://git-scm.com/download/win
   - Installez avec les options par défaut

2. **Ouvrez PowerShell** dans le dossier de votre portfolio :
   - Clic droit sur le dossier `portfolio` → "Ouvrir dans le terminal" ou "Open in Terminal"

3. **Créez un nouveau dépôt GitHub** :
   - Allez sur https://github.com/new
   - Nommez-le : `portfolio` (ou un autre nom)
   - Cliquez sur "Create repository"

4. **Dans PowerShell, tapez ces commandes** (une par une) :

```powershell
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Faire le premier commit
git commit -m "Initial commit - Portfolio"

# Connecter à GitHub (remplacez VOTRE_NOM par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/VOTRE_NOM/portfolio.git

# Envoyer sur GitHub
git branch -M main
git push -u origin main
```

**Note** : GitHub vous demandera votre nom d'utilisateur et un token d'accès personnel. Suivez les instructions à l'écran.

### Étape 3 : Déployer sur Vercel

1. **Allez sur https://vercel.com**
2. Cliquez sur "Sign Up" (S'inscrire)
3. Choisissez "Continue with GitHub"
4. Autorisez Vercel à accéder à votre GitHub
5. Cliquez sur "Add New Project"
6. Sélectionnez votre dépôt `portfolio`
7. Vercel détectera automatiquement Next.js
8. Cliquez sur "Deploy" (Déployer)
9. Attendez 1-2 minutes... ✨

### Étape 4 : Votre site est en ligne !

Vercel vous donnera une URL comme : `https://portfolio-xyz.vercel.app`

**C'est votre lien à partager !** 📧

---

## Option 2 : Netlify (Alternative)

1. Allez sur https://www.netlify.com
2. Créez un compte (gratuit)
3. Cliquez sur "Add new site" → "Import an existing project"
4. Connectez votre GitHub et sélectionnez le dépôt
5. Cliquez sur "Deploy site"
6. Votre site sera en ligne avec une URL comme : `https://portfolio-xyz.netlify.app`

---

## 📧 Partager avec un recruteur

Envoyez simplement l'URL dans votre email :

```
Bonjour [Nom du recruteur],

Je vous partage mon portfolio en ligne :
https://votre-portfolio.vercel.app

Cordialement,
Ghada Turki
```

---

## ⚙️ Mettre à jour votre portfolio

Chaque fois que vous modifiez votre code :

1. Dans PowerShell :
```powershell
git add .
git commit -m "Mise à jour du portfolio"
git push
```

2. Vercel mettra à jour automatiquement votre site en 1-2 minutes !

---

## ❓ Besoin d'aide ?

Si vous avez des problèmes :
- Vérifiez que Git est installé : `git --version`
- Vérifiez que Node.js est installé : `node --version`
- Assurez-vous que votre code fonctionne en local : `npm run dev`
