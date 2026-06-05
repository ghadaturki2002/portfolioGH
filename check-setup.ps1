# Script de verification de l'environnement
Write-Host "Verification de l'environnement..." -ForegroundColor Cyan
Write-Host ""

# Verifier Node.js
Write-Host "Verification de Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "OK Node.js installe : $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERREUR Node.js n'est PAS installe" -ForegroundColor Red
    Write-Host ""
    Write-Host "Pour installer Node.js :" -ForegroundColor Yellow
    Write-Host "   1. Allez sur https://nodejs.org/" -ForegroundColor White
    Write-Host "   2. Telechargez la version LTS" -ForegroundColor White
    Write-Host "   3. Installez et redemarrez ce terminal" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Verifier npm
Write-Host "Verification de npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "OK npm installe : $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "ERREUR npm n'est PAS installe" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Tout est pret !" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines etapes :" -ForegroundColor Cyan
Write-Host "   1. npm install" -ForegroundColor White
Write-Host "   2. npm run dev" -ForegroundColor White
Write-Host "   3. Ouvrir http://localhost:3000" -ForegroundColor White
Write-Host ""
