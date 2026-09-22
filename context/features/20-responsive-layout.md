# Feature — Responsive Layout

## Goal

Adapter l'application aux petits écrans.

## Desktop

Afficher :

```text
Editor | Preview
```

## Mobile

Afficher un seul panneau à la fois avec un switch :

```text
Editor | Preview
```

## Tasks

- Définir un breakpoint.
- Conserver le split view desktop.
- Ajouter un état `activePane`.
- Ajouter un switch Editor/Preview.
- Vérifier le resize dynamique.
- Vérifier le scroll.

## Acceptance Criteria

- [x] Desktop affiche deux panneaux.
- [x] Mobile affiche un seul panneau.
- [x] Le changement Editor/Preview fonctionne.
- [x] Aucun contenu important ne déborde.
- [x] L'application reste utilisable sur téléphone/tablette.

## Depends On

- `03-app-layout.md`
- `05-codemirror-editor.md`
- `07-markdown-preview.md`
