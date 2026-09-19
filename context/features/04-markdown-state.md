# Feature — Markdown State

## Goal

Créer une source de vérité unique pour le contenu Markdown.

## Tasks

- Ajouter un state React dans `EditorPage`.
- Initialiser le state avec un petit exemple Markdown.
- Passer la valeur à l'éditeur.
- Passer la même valeur à la preview.
- Préparer un callback `onChange`.

## Example

```tsx
const [markdown, setMarkdown] = useState('# Hello')
```

## Acceptance Criteria

- [ ] Le state Markdown existe.
- [ ] La valeur est détenue par `EditorPage`.
- [ ] L'éditeur reçoit la valeur.
- [ ] La preview reçoit la même valeur.
- [ ] La logique n'est pas dupliquée.

## Depends On

- `03-app-layout.md`
