# Script PowerShell pour demarrer le projet
# Met a jour le PATH et lance le serveur

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Portfolio Ghada Turki - Demarrage" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Mettre a jour le PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Verifier Node.js
Write-Host "Verification de Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js : $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] Node.js n'est pas trouve" -ForegroundColor Red
    Write-Host "Redemarrez votre terminal et reessayez." -ForegroundColor Yellow
    pause
    exit 1
}

# Verifier npm
Write-Host "Verification de npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "[OK] npm : $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] npm n'est pas trouve" -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""

# Installer les dependances si necessaire
if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dependances..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERREUR] Echec de l'installation" -ForegroundColor Red
        pause
        exit 1
    }
    Write-Host ""
}

Write-Host "Demarrage du serveur de developpement..." -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Le site sera accessible sur :" -ForegroundColor White
Write-Host "  http://localhost:3000" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arreter le serveur" -ForegroundColor Gray
Write-Host ""

npm run dev
