# Feature — Keyboard Shortcuts

## Goal

Permettre de contrôler les principales actions au clavier.

## Shortcuts

| Shortcut | Action |
|---|---|
| Cmd/Ctrl + N | New |
| Cmd/Ctrl + O | Open |
| Cmd/Ctrl + S | Save |
| Cmd/Ctrl + Shift + S | Save As |

## Tasks

- Créer `useKeyboardShortcuts`.
- Détecter `metaKey` et `ctrlKey`.
- Prévenir les comportements navigateur.
- Nettoyer les event listeners.
- Appeler les mêmes handlers que la toolbar.

## Acceptance Criteria

- [x] Les shortcuts fonctionnent sur macOS.
- [x] Les shortcuts fonctionnent sur Windows/Linux.
- [x] Save n'ouvre pas le dialog HTML du navigateur.
- [x] Les event listeners sont nettoyés.

## Depends On

- `16-toolbar.md`
