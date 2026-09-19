# Feature — Theme Persistence

## Goal

Conserver le thème choisi entre deux sessions.

## Tasks

- Sauvegarder le thème dans `localStorage`.
- Relire le thème au démarrage.
- Si aucune préférence n'existe, utiliser le thème système.
- Écouter `prefers-color-scheme` si nécessaire.

## Storage Key

```text
markdown-editor-theme
```

## Acceptance Criteria

- [ ] Le thème survit à un refresh.
- [ ] Le thème survit à une nouvelle session.
- [ ] La préférence système est utilisée par défaut.
- [ ] Une préférence utilisateur explicite est prioritaire.

## Depends On

- `17-dark-mode.md`
