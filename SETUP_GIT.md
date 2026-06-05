# 🔧 Configuration Git - Étapes Finales

## Étape 1 : Configurer Git avec votre identité

Ouvrez PowerShell dans votre dossier portfolio et tapez ces commandes :

**Remplacez par VOS informations :**
- VOTRE_EMAIL : L'email de votre compte GitHub
- VOTRE_NOM : Votre nom (ex: Ghada Turki)

```powershell
git config --global user.email "VOTRE_EMAIL"
git config --global user.name "VOTRE_NOM"
```

**Exemple :**
```powershell
git config --global user.email "ghada.turki@example.com"
git config --global user.name "Ghada Turki"
```

## Étape 2 : Créer un dépôt sur GitHub

1. Allez sur https://github.com/new
2. **Nom du dépôt** : `portfolio` (ou un autre nom)
3. **Description** (optionnel) : "Portfolio professionnel"
4. Choisissez **Public** (gratuit)
5. **NE COCHEZ PAS** "Initialize this repository with a README"
6. Cliquez sur **"Create repository"**

## Étape 3 : Connecter votre code à GitHub

Après avoir créé le dépôt, GitHub vous montrera des instructions.

**Dans PowerShell, tapez ces commandes** (remplacez VOTRE_NOM par votre nom d'utilisateur GitHub) :

```powershell
git remote add origin https://github.com/VOTRE_NOM/portfolio.git
git branch -M main
git push -u origin main
```

**Exemple si votre nom d'utilisateur est "ghada-turki" :**
```powershell
git remote add origin https://github.com/ghada-turki/portfolio.git
git branch -M main
git push -u origin main
```

**Note** : GitHub vous demandera votre nom d'utilisateur et un mot de passe/token. 
- Nom d'utilisateur : Votre nom d'utilisateur GitHub
- Mot de passe : Utilisez un **Personal Access Token** (voir ci-dessous)

## Étape 4 : Créer un Personal Access Token (si nécessaire)

Si GitHub demande un token au lieu d'un mot de passe :

1. Allez sur https://github.com/settings/tokens
2. Cliquez sur **"Generate new token"** → **"Generate new token (classic)"**
3. Donnez-lui un nom : "Portfolio Deploy"
4. Cochez **"repo"** (donne accès aux dépôts)
5. Cliquez sur **"Generate token"**
6. **COPIEZ LE TOKEN** (vous ne le verrez qu'une fois !)
7. Utilisez ce token comme mot de passe quand Git vous le demande

## Étape 5 : Déployer sur Vercel

Une fois votre code sur GitHub :

1. Allez sur https://vercel.com
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à votre GitHub
5. Cliquez sur **"Add New Project"**
6. Sélectionnez votre dépôt `portfolio`
7. Vercel détectera automatiquement Next.js
8. Cliquez sur **"Deploy"**
9. Attendez 1-2 minutes...

## ✨ Votre portfolio est en ligne !

Vercel vous donnera une URL comme :
`https://portfolio-xyz.vercel.app`

**C'est cette URL que vous partagez dans vos emails !** 📧
