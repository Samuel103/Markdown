## Current Stack

```text
React
├── TypeScript
├── Vite
├── Tailwind CSS
│
├── CodeMirror
│   └── Markdown editing
│
├── react-markdown
│   └── Markdown rendering
│
└── remark-gfm
    └── GitHub Flavored Markdown
```
## Project Philosophy

Commencer avec un éditeur Markdown minimal et fonctionnel.

Le projet doit éviter de devenir un clone complet de VS Code ou Obsidian dès le départ.

Le MVP doit avant tout bien faire trois choses :

1. Écrire du Markdown
2. Voir le résultat
3. Sauvegarder le fichier

Les fonctionnalités avancées seront ajoutées progressivement selon les besoins.

Éviter d'ajouter des dépendances ou fonctionnalités complexes tant qu'elles ne répondent pas à un besoin réel.

## Design Principles

L'application doit être :

* Simple
* Rapide
* Minimaliste
* Keyboard-friendly
* Responsive
* Facile à maintenir

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Markdown

* CodeMirror 6
* react-markdown
* remark-gfm

### Desktop Support

* Tauri

## Code reuse policy

Before implementing new code, always determine whether equivalent or
similar functionality already exists in the repository.

### Mandatory reuse-scout step

Before creating any new:

- function
- helper
- utility
- component
- hook
- shared state or effect pattern
- event handler or asynchronous request pattern
- CSS class
- Tailwind pattern or design token
- validator
- mapper
- API client
- type
- interface
- schema
- domain model
- context provider
- reducer
- abstraction

delegate a repository search to the `reuse-scout` agent.

The reuse-scout must run BEFORE implementation begins.

Provide the reuse-scout with:

1. A concise description of the functionality being implemented.
2. The expected inputs and outputs.
3. The likely architectural layer.
4. Any known related classes/components/files.
5. Relevant naming concepts or domain terminology.

Wait for the reuse-scout result before implementing.

Then use its findings as follows:

- REUSE → the main agent uses the existing implementation.
- EXTEND → the main agent may extend/refactor the existing implementation.
- CREATE → the main agent creates a new implementation only when reuse is not appropriate.

The reuse-scout only searches, compares, and reports evidence. It never edits,
refactors, or fixes code.

Do not create duplicate implementations merely because creating new code
would be easier.

### Exceptions

The reuse-scout does not need to run for:

- trivial typo fixes
- comments
- documentation-only changes
- configuration value changes
- obvious one-line modifications to existing code
- test assertion updates that introduce no new reusable behavior
