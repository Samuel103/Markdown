# Markdown Editor — Project Overview

## Overview

Markdown Editor est une application web permettant de créer, modifier et prévisualiser des fichiers Markdown simplement.

L'objectif principal est de fournir une interface légère et rapide pour travailler avec des fichiers `.md`, avec un éditeur à gauche et un aperçu rendu en temps réel à droite.

---

## Objectives

* Créer de nouveaux fichiers Markdown
* Modifier du contenu Markdown
* Prévisualiser le rendu Markdown en temps réel
* Sauvegarder le contenu
* Ouvrir des fichiers `.md`
* Fournir une interface simple et responsive
* Supporter le mode clair et sombre

---

## Main Features

### Markdown Editor

L'utilisateur peut écrire et modifier du Markdown directement dans l'éditeur.

Exemples de syntaxe supportée :

````md
# Title

## Subtitle

**Bold text**

*Italic text*

- Item 1
- Item 2

[Link](https://example.com)

```ts
const message = "Hello World";
````

````

---

## Live Preview

Le contenu Markdown est rendu automatiquement dans une zone de prévisualisation.

```text
┌──────────────────────┬──────────────────────┐
│ Editor               │ Preview              │
│                      │                      │
│ # Hello              │ Hello                │
│                      │                      │
│ **World**            │ World                │
│                      │                      │
└──────────────────────┴──────────────────────┘
````

---

## File Management

L'application doit permettre :

* New File
* Open File
* Save
* Save As
* Download `.md`
* Open File

Dans une future version desktop avec Tauri :

* Accès au système de fichiers local
* Ouverture directe de fichiers
* Sauvegarde automatique
* Recent files
* File explorer

---

## Application Structure

```text
src/
├── components/
│   ├── editor/
│   │   └── MarkdownEditor.tsx
│   │
│   ├── preview/
│   │   └── MarkdownPreview.tsx
│   │
│   ├── toolbar/
│   │   └── Toolbar.tsx
│   │
│   └── file-explorer/
│       └── FileExplorer.tsx
│
├── pages/
│   └── EditorPage.tsx
│
├── hooks/
│   └── useMarkdown.ts
│
├── types/
│   └── markdown.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Main Screen

```text
┌─────────────────────────────────────────────┐
│ Markdown Editor                             │
│                                             │
│ New   Open   Save                Light/Dark │
├──────────────────────┬──────────────────────┤
│                      │                      │
│      EDITOR          │       PREVIEW        │
│                      │                      │
│                      │                      │
│                      │                      │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

---

### Required

* [ ] React + TypeScript project
* [ ] Tailwind CSS configuration
* [ ] Markdown editor
* [ ] Markdown preview
* [ ] GitHub Flavored Markdown support
* [ ] New document
* [ ] Open `.md`
* [ ] Save / Download `.md`
* [ ] Light mode
* [ ] Dark mode
* [ ] Responsive layout

### Not Required for MVP

* Git integration
* Cloud synchronization
* Authentication
* Collaboration
* AI features
* Multiple users
* Backend

---


