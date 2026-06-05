# Script PowerShell pour déployer votre portfolio
# Exécutez ce script dans PowerShell depuis votre dossier portfolio

Write-Host "🚀 Déploiement de votre portfolio" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Git est installé
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git n'est pas installé!" -ForegroundColor Red
    Write-Host "Téléchargez Git depuis: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git est installé" -ForegroundColor Green
Write-Host ""

# Initialiser Git (si pas déjà fait)
if (-not (Test-Path .git)) {
    Write-Host "📦 Initialisation de Git..." -ForegroundColor Cyan
    git init
}

# Ajouter tous les fichiers
Write-Host "📝 Ajout des fichiers..." -ForegroundColor Cyan
git add .

# Faire le commit
Write-Host "💾 Création du commit..." -ForegroundColor Cyan
git commit -m "Portfolio - Déploiement initial"

Write-Host ""
Write-Host "✅ Votre code est prêt!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 PROCHAINES ÉTAPES:" -ForegroundColor Yellow
Write-Host "1. Allez sur https://github.com/new" -ForegroundColor White
Write-Host "2. Créez un nouveau dépôt (nommez-le 'portfolio')" -ForegroundColor White
Write-Host "3. Copiez l'URL du dépôt (ex: https://github.com/VOTRE_NOM/portfolio.git)" -ForegroundColor White
Write-Host "4. Revenez ici et exécutez:" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin https://github.com/VOTRE_NOM/portfolio.git" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Ensuite, allez sur https://vercel.com et déployez!" -ForegroundColor White
