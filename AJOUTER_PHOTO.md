# 📸 Comment ajouter votre photo

## ✅ Étape 1 : Préparer votre photo

1. Assurez-vous que votre photo est au format **JPG** ou **PNG**
2. Taille recommandée : **800x800 pixels** minimum (format carré de préférence)

## ✅ Étape 2 : Placer la photo

1. **Ouvrez le dossier du projet** : `C:\Users\indomieG\Desktop\portfolio`
2. **Allez dans le dossier** `public`
3. **Copiez votre photo** dans ce dossier
4. **Renommez-la** en : `ghada-turki-photo.jpg`

**Chemin final :**
```
portfolio/
  └── public/
      └── ghada-turki-photo.jpg  ← Votre photo ici
```

## ✅ Étape 3 : Vérifier

1. Le serveur devrait se recharger automatiquement
2. Si ce n'est pas le cas, redémarrez avec `npm run dev`
3. Ouvrez http://localhost:3000
4. Votre photo devrait apparaître :
   - **Dans le Hero** (photo circulaire en haut)
   - **Dans la section About** (grande photo à gauche)

## 🎨 Où la photo apparaît

✅ **Section Hero** - Photo circulaire avec effet hover
✅ **Section About** - Grande photo professionnelle avec ombre

## ❓ Problème ?

Si la photo ne s'affiche pas :
- Vérifiez que le fichier s'appelle exactement `ghada-turki-photo.jpg`
- Vérifiez qu'il est dans le dossier `public/` (pas dans `public/images/`)
- Redémarrez le serveur : `Ctrl+C` puis `npm run dev`
- Videz le cache du navigateur (Ctrl+Shift+R)

---

**C'est tout ! Votre photo sera automatiquement intégrée dans le portfolio.** 🎉
