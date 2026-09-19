# Feature — Desktop Window Title

## Goal

Mettre à jour le titre de la fenêtre selon le document courant.

## Examples

```text
README.md — Markdown Editor
```

Avec modifications :

```text
README.md * — Markdown Editor
```

## Tasks

- Observer `fileName`.
- Observer `isDirty`.
- Mettre à jour le titre de la fenêtre.
- Réinitialiser le titre sur un nouveau document.

## Acceptance Criteria

- [ ] Le titre affiche le nom du fichier.
- [ ] `*` apparaît lorsque le document est modifié.
- [ ] Le titre se met à jour immédiatement.
- [ ] Le titre reste cohérent après New/Open/Save.

## Depends On

- `22-tauri-setup.md`
- `10-document-model.md`
