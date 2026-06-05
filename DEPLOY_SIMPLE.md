# 🚀 Déploiement Rapide - 3 Étapes

## Méthode la plus simple (5 minutes)

### 1️⃣ Créer un compte GitHub
- Allez sur https://github.com
- Créez un compte gratuit

### 2️⃣ Mettre le code sur GitHub

Ouvrez PowerShell dans votre dossier portfolio et tapez :

```powershell
git init
git add .
git commit -m "Mon portfolio"
```

Puis allez sur https://github.com/new, créez un nouveau dépôt, et suivez les instructions pour "push" votre code.

### 3️⃣ Déployer sur Vercel

1. Allez sur https://vercel.com
2. Cliquez "Sign Up" → "Continue with GitHub"
3. Cliquez "Add New Project"
4. Sélectionnez votre dépôt
5. Cliquez "Deploy"

**C'est tout !** Vercel vous donnera une URL comme :
`https://votre-portfolio.vercel.app`

📧 Partagez cette URL dans vos emails !

---

## Mise à jour automatique

Quand vous modifiez votre portfolio :

```powershell
git add .
git commit -m "Mise à jour"
git push
```

Vercel met à jour automatiquement votre site ! ✨
