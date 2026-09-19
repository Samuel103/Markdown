# Feature — Native Save File

## Goal

Sauvegarder directement sur le système de fichiers.

## Tasks

- Si `filePath` existe, écrire directement dans ce fichier.
- Sinon, lancer Save As natif.
- Mettre `isDirty` à `false`.
- Gérer les permissions refusées.
- Gérer les fichiers supprimés.
- Gérer les fichiers read-only.

## Acceptance Criteria

- [ ] Save modifie le fichier existant.
- [ ] Save As permet de choisir un nouveau path.
- [ ] Le nouveau path est conservé.
- [ ] Les erreurs filesystem sont gérées.
- [ ] Aucun téléchargement navigateur n'est utilisé en desktop.

## Depends On

- `23-native-open-file.md`
