# Feature — Unsaved Changes Protection

## Goal

Éviter qu'un utilisateur perde accidentellement ses changements.

## Tasks

- Passer `isDirty` à `true` lors d'une modification.
- Afficher `*` après le nom de fichier.
- Détecter les actions destructives.
- Avertir avant :
  - New
  - Open
  - Refresh
  - Close tab
- Utiliser `beforeunload` pour le navigateur.
- Prévoir un dialog interne pour New/Open.

## Acceptance Criteria

- [ ] Une modification marque le document comme dirty.
- [ ] Un indicateur visuel apparaît.
- [ ] New n'écrase pas silencieusement un document modifié.
- [ ] Open n'écrase pas silencieusement un document modifié.
- [ ] Le navigateur avertit lors d'une fermeture/reload.

## Depends On

- `10-document-model.md`
- `11-new-document.md`
- `12-open-markdown-file.md`
- `13-save-document.md`
