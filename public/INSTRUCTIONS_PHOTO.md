# 📸 Instructions pour ajouter votre photo

## Emplacement du fichier

Placez votre photo professionnelle dans le dossier `public/` avec le nom exact :
```
public/ghada-turki-photo.jpg
```

## Formats acceptés

- **Format recommandé :** JPG ou PNG
- **Nom du fichier :** `ghada-turki-photo.jpg` (ou `.png`)

## Taille recommandée

- **Pour la section About :** 800x800 pixels minimum (carré)
- **Pour le Hero :** La même image sera utilisée, optimisée automatiquement

## Comment ajouter la photo

1. **Copiez votre photo** dans le dossier `public/`
2. **Renommez-la** en `ghada-turki-photo.jpg`
3. **Redémarrez le serveur** si nécessaire :
   ```powershell
   npm run dev
   ```

## Emplacements de la photo dans le portfolio

✅ **Section Hero** - Photo circulaire en haut de la page d'accueil
✅ **Section About** - Grande photo à côté du texte de présentation

## Alternative : Utiliser une autre image

Si vous voulez utiliser un autre nom de fichier, modifiez dans :
- `components/Hero.tsx` - ligne avec `src="/ghada-turki-photo.jpg"`
- `components/About.tsx` - ligne avec `src="/ghada-turki-photo.jpg"`

---

**Note :** Si la photo ne s'affiche pas, vérifiez que :
- Le fichier est bien dans le dossier `public/`
- Le nom du fichier correspond exactement
- Le serveur a été redémarré
