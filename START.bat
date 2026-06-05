@echo off
echo ========================================
echo   Portfolio Ghada Turki - Demarrage
echo ========================================
echo.

REM Mettre a jour le PATH pour inclure Node.js
set "PATH=%PATH%;C:\Program Files\nodejs"

echo Verification de Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERREUR] Node.js n'est pas trouve dans le PATH
    echo.
    echo Node.js semble etre installe mais n'est pas dans le PATH.
    echo Redemarrez votre terminal et reessayez.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js est disponible
echo.

echo Verification de npm...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] npm n'est pas trouve
    pause
    exit /b 1
)

echo [OK] npm est disponible
echo.

if not exist "node_modules" (
    echo Installation des dependances...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERREUR] Echec de l'installation
        pause
        exit /b 1
    )
    echo.
)

echo Demarrage du serveur de developpement...
echo.
echo ========================================
echo   Le site sera accessible sur :
echo   http://localhost:3000
echo ========================================
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

call npm run dev

pause
