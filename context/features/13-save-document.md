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

- [ ] Save télécharge un fichier `.md`.
- [ ] Le contenu est correct.
- [ ] Le nom du fichier est correct.
- [ ] Aucun object URL ne reste inutilement actif.
- [ ] `isDirty` devient `false`.

## Depends On

- `10-document-model.md`
