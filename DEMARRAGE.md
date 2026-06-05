# 🚀 Guide de démarrage - Portfolio Ghada Turki

## ⚠️ État actuel

**Node.js n'est pas installé sur votre système.** C'est la seule chose qui manque pour lancer le projet.

---

## 📋 Étapes à suivre

### Étape 1 : Installer Node.js (5 minutes)

1. **Télécharger Node.js**
   - Ouvrez votre navigateur
   - Allez sur : **https://nodejs.org/**
   - Cliquez sur le bouton vert **"Download Node.js (LTS)"**
   - Le fichier `.msi` va se télécharger (environ 30-40 MB)

2. **Installer Node.js**
   - Double-cliquez sur le fichier téléchargé
   - Cliquez sur "Next" dans l'assistant d'installation
   - Acceptez les termes et conditions
   - ✅ **IMPORTANT** : Cochez "Automatically install the necessary tools" si proposé
   - Cliquez sur "Install"
   - Attendez la fin de l'installation
   - Cliquez sur "Finish"

3. **Redémarrer votre terminal**
   - Fermez complètement PowerShell/CMD
   - Rouvrez un nouveau terminal

4. **Vérifier l'installation**
   Dans le nouveau terminal, tapez :
   ```powershell
   node --version
   npm --version
   ```
   Vous devriez voir des numéros de version (ex: v20.x.x et 10.x.x)

---

### Étape 2 : Installer les dépendances du projet

Une fois Node.js installé, ouvrez un terminal dans le dossier du projet :

```powershell
cd C:\Users\indomieG\Desktop\portfolio
npm install
```

⏱️ Cette étape prend 2-5 minutes. Elle télécharge toutes les bibliothèques nécessaires.

---

### Étape 3 : Lancer le serveur

```powershell
npm run dev
```

Vous verrez :
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  ✓ Ready in Xs
```

---

### Étape 4 : Voir votre portfolio

Ouvrez votre navigateur et allez sur :
```
http://localhost:3000
```

🎉 **Votre portfolio est maintenant en ligne !**

---

## 🎯 Méthode rapide (après installation de Node.js)

**Option 1 : Double-cliquer sur `START.bat`**
- Le script fait tout automatiquement !

**Option 2 : Commandes manuelles**
```powershell
cd C:\Users\indomieG\Desktop\portfolio
npm install
npm run dev
```

---

## ❓ Problèmes courants

### "npm n'est pas reconnu"
→ Node.js n'est pas installé ou le terminal n'a pas été redémarré

### "Port 3000 déjà utilisé"
→ Une autre application utilise le port. Changez le port :
```powershell
$env:PORT=3001; npm run dev
```

### Erreurs de permissions
→ Exécutez PowerShell en tant qu'administrateur

---

## 📞 Besoin d'aide ?

- Consultez `INSTALLATION.md` pour plus de détails
- Consultez `README.md` pour la documentation complète

---

**Temps total estimé : 10-15 minutes** ⏱️
