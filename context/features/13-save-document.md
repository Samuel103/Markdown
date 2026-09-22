# Feature — Save Document

## Goal

Permettre de sauvegarder le document courant sous forme de fichier Markdown téléchargé.

## Tasks

- Créer un `Blob`.
- Utiliser `text/markdown`.
- Créer un object URL.
- Déclencher le téléchargement.
- Révoquer l'object URL.
- Utiliser le nom du document courant.
- Mettre `isDirty` à `false`.

## Acceptance Criteria

- [x] Save télécharge un fichier `.md`.
- [x] Le contenu est correct.
- [x] Le nom du fichier est correct.
- [x] Aucun object URL ne reste inutilement actif.
- [x] `isDirty` devient `false`.

## Depends On

- `10-document-model.md`
