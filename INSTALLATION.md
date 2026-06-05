# 📦 Guide d'installation complet

## Étape 1 : Installer Node.js

Node.js n'est pas installé sur votre système. Voici comment l'installer :

### Option A : Installation via le site officiel (Recommandé)

1. **Télécharger Node.js**
   - Allez sur [https://nodejs.org/](https://nodejs.org/)
   - Téléchargez la version **LTS** (Long Term Support)
   - Choisissez le fichier Windows Installer (.msi) pour votre système (64-bit)

2. **Installer Node.js**
   - Double-cliquez sur le fichier téléchargé
   - Suivez l'assistant d'installation
   - ✅ Cochez "Automatically install the necessary tools" si proposé
   - Cliquez sur "Install"
   - Redémarrez votre terminal/PowerShell après l'installation

3. **Vérifier l'installation**
   Ouvrez un nouveau terminal PowerShell et exécutez :
   ```powershell
   node --version
   npm --version
   ```
   Vous devriez voir les numéros de version s'afficher.

### Option B : Installation via Chocolatey (si vous avez Chocolatey)

```powershell
choco install nodejs-lts
```

### Option C : Installation via Winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

---

## Étape 2 : Installer les dépendances du projet

Une fois Node.js installé, ouvrez un terminal dans le dossier du projet et exécutez :

```powershell
cd C:\Users\indomieG\Desktop\portfolio
npm install
```

Cette commande va installer toutes les dépendances nécessaires (Next.js, React, Framer Motion, etc.)

---

## Étape 3 : Lancer le serveur de développement

Après l'installation des dépendances, lancez le serveur :

```powershell
npm run dev
```

Vous verrez un message comme :
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in Xs
```

---

## Étape 4 : Ouvrir dans le navigateur

Ouvrez votre navigateur et allez sur :
```
http://localhost:3000
```

Vous devriez voir votre portfolio s'afficher ! 🎉

---

## Commandes utiles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Créer une version de production
- `npm run start` - Lancer la version de production
- `npm run lint` - Vérifier le code

---

## Problèmes courants

### "npm n'est pas reconnu"
→ Node.js n'est pas installé ou pas dans le PATH. Réinstallez Node.js et redémarrez le terminal.

### Erreurs de permissions
→ Exécutez PowerShell en tant qu'administrateur

### Port 3000 déjà utilisé
→ Changez le port dans `package.json` ou arrêtez l'autre application

---

## Après l'installation

Une fois que tout fonctionne, vous pouvez :
1. Ajouter votre CV PDF dans `public/CV_Ghada_Turki.pdf`
2. Ajouter des images de projets dans `public/images/projects/`
3. Personnaliser les couleurs dans `tailwind.config.js`
4. Modifier les informations dans les composants

---

**Besoin d'aide ?** Consultez le README.md pour plus d'informations.
