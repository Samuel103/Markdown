# Feature — Native Open File

## Goal

Ouvrir un fichier Markdown avec un dialog natif Tauri.

## Tasks

- Ajouter le dialog natif.
- Filtrer `.md` et `.markdown`.
- Lire le fichier depuis le disque.
- Ajouter `filePath` au document.
- Charger le contenu dans l'éditeur.
- Gérer les erreurs de lecture.

## Updated Model

```ts
export type MarkdownDocument = {
  fileName: string
  filePath?: string
  content: string
  isDirty: boolean
}
```

## Acceptance Criteria

- [x] Un dialog natif s'ouvre.
- [x] Le fichier est lu depuis son chemin réel.
- [x] Le path est conservé.
- [x] Les erreurs sont affichées proprement.

## Depends On

- `22-tauri-setup.md`
- `10-document-model.md`
