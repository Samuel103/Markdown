# Feature — État du contenu Markdown

## Objectif

Conserver le contenu Markdown courant à un seul endroit dans l'application, puis le transmettre à l'éditeur et à la preview.

Ainsi, quand l'utilisateur modifiera le texte dans l'éditeur, la preview recevra toujours exactement le même contenu.

## Pourquoi ?

Un même contenu ne doit pas être sauvegardé séparément dans plusieurs composants : les copies pourraient finir par être différentes.

Pour cette étape, `EditorPage` est donc la **source de vérité unique** : c'est le composant qui possède la valeur `markdown`.

```text
EditorPage possède le contenu Markdown
       │
       ├── transmet ce contenu à MarkdownEditor
       └── transmet ce même contenu à MarkdownPreview
```

## Notions React utilisées

### State

Le state est une valeur mémorisée par React et qui provoque un nouvel affichage lorsqu'elle change.

```tsx
const [markdown, setMarkdown] = useState('# Bonjour')
```

- `markdown` : le contenu actuel du document ;
- `setMarkdown` : la fonction utilisée pour remplacer ce contenu ;
- `# Bonjour` : le contenu Markdown affiché au premier chargement.

### Props

Les props sont les informations qu'un composant parent donne à un composant enfant, comme les paramètres d'une fonction.

Dans cette feature :

```tsx
<MarkdownEditor value={markdown} onChange={setMarkdown} />
<MarkdownPreview markdown={markdown} />
```

- l'éditeur reçoit le contenu via `value` ;
- la preview reçoit ce même contenu via `markdown` ;
- l'éditeur utilise `onChange` pour signaler qu'une nouvelle valeur doit être enregistrée.

## Flux de données attendu

```text
L'utilisateur écrit dans MarkdownEditor
              │
              ▼
MarkdownEditor appelle onChange(nouveauContenu)
              │
              ▼
EditorPage appelle setMarkdown(nouveauContenu)
              │
              ▼
React transmet la nouvelle valeur à l'éditeur et à la preview
```

`MarkdownEditor` et `MarkdownPreview` ne doivent donc pas créer leur propre state pour le contenu Markdown.

## Périmètre de cette feature

Cette étape prépare seulement le partage de l'état entre les composants. Les placeholders restent en place.

La saisie avec CodeMirror sera ajoutée dans la feature `05-codemirror-editor.md` et le rendu du Markdown dans `07-markdown-preview.md`.

## Tâches

- Importer `useState` depuis React dans `EditorPage`.
- Créer le state `markdown` dans `EditorPage` avec un petit exemple Markdown non vide.
- Ajouter à `MarkdownEditor` les props `value` et `onChange`.
- Passer `value={markdown}` et `onChange={setMarkdown}` à `MarkdownEditor`.
- Ajouter à `MarkdownPreview` la prop `markdown`.
- Passer `markdown={markdown}` à `MarkdownPreview`.
- Ne pas créer de state Markdown local dans les composants enfants.

## Exemple cible

```tsx
const [markdown, setMarkdown] = useState('# Bonjour')

return (
  <main>
    <MarkdownEditor value={markdown} onChange={setMarkdown} />
    <MarkdownPreview markdown={markdown} />
  </main>
)
```

## Critères d'acceptation

- [x] `EditorPage` est le seul composant qui détient le contenu Markdown.
- [x] Le state `markdown` est initialisé avec un exemple Markdown non vide.
- [x] `MarkdownEditor` reçoit `value` et `onChange`.
- [x] `MarkdownPreview` reçoit `markdown`.
- [x] L'éditeur et la preview reçoivent toujours la même valeur.
- [x] Aucun état Markdown n'est dupliqué dans les composants enfants.

## Dépendance

- `03-app-layout.md`
