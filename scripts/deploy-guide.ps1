# Script d'aide pour le déploiement
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Guide de deploiement - Portfolio" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Option 1 : Vercel (RECOMMANDE)" -ForegroundColor Green
Write-Host "  1. Creer un compte GitHub (si pas deja fait)" -ForegroundColor Yellow
Write-Host "  2. Mettre votre projet sur GitHub" -ForegroundColor Yellow
Write-Host "  3. Aller sur vercel.com et connecter GitHub" -ForegroundColor Yellow
Write-Host "  4. Deployer en 2 minutes !" -ForegroundColor Yellow
Write-Host ""

Write-Host "Option 2 : Netlify" -ForegroundColor Green
Write-Host "  Alternative gratuite avec fonctionnalites similaires" -ForegroundColor Yellow
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Instructions detailees :" -ForegroundColor Cyan
Write-Host "  - DEPLOIEMENT_GRATUIT.md (guide complet)" -ForegroundColor White
Write-Host "  - DEPLOIEMENT_RAPIDE.md (guide rapide)" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Verification de Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "[OK] Git installe : $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] Git n'est pas installe" -ForegroundColor Red
    Write-Host "Telechargez-le ici : https://git-scm.com/download/win" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Verification de GitHub..." -ForegroundColor Yellow
Write-Host "Avez-vous un compte GitHub ? (y/n)" -ForegroundColor White
Write-Host "  Si non, allez sur https://github.com et creez-en un gratuitement" -ForegroundColor Gray
Write-Host ""
