# Feature — Open Markdown File

## Goal

Ouvrir un fichier Markdown depuis le navigateur.

## Tasks

- Ajouter un input file invisible.
- Accepter `.md` et `.markdown`.
- Ouvrir le sélecteur depuis la toolbar.
- Lire le contenu avec `file.text()`.
- Mettre à jour le nom du fichier.
- Mettre à jour le contenu.
- Mettre `isDirty` à `false`.

## Acceptance Criteria

- [x] L'utilisateur peut choisir un fichier `.md`.
- [x] Le contenu apparaît dans l'éditeur.
- [x] La preview se met à jour.
- [x] Le nom du fichier est conservé.
- [x] `isDirty` est `false` après ouverture.

## Depends On

- `10-document-model.md`
