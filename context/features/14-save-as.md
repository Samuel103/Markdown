# Feature — Save As

## Goal

Permettre de sauvegarder le document sous un nouveau nom.

## Tasks

- Ajouter une action `Save As`.
- Demander un nouveau nom.
- Ajouter `.md` si nécessaire.
- Refuser un nom vide.
- Mettre à jour `fileName`.
- Télécharger le fichier.
- Mettre `isDirty` à `false`.

## Acceptance Criteria

- [x] L'utilisateur peut choisir un nouveau nom.
- [x] `.md` est ajouté automatiquement.
- [x] Le nouveau nom est conservé dans le document.
- [x] Le téléchargement utilise le nouveau nom.

## Depends On

- `13-save-document.md`
