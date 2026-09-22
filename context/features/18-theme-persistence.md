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

- [x] Le thème survit à un refresh.
- [x] Le thème survit à une nouvelle session.
- [x] La préférence système est utilisée par défaut.
- [x] Une préférence utilisateur explicite est prioritaire.

## Depends On

- `17-dark-mode.md`
