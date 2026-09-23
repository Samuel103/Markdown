# Carnet de test Markdown

> Ce document couvre les éléments Markdown et GitHub Flavored Markdown les plus courants pour vérifier l’éditeur et son aperçu.

## Aperçu rapide

Texte **en gras**, *en italique*, ***gras et italique***, ~~barré~~, `code en ligne`, ainsi qu’un [lien vers la documentation Markdown](https://www.markdownguide.org/).

Une URL détectable automatiquement : https://example.com.

---

## Listes

### Liste non ordonnée

- Premier niveau
  - Élément imbriqué
    - Troisième niveau avec `du code`
  - Retour au deuxième niveau
- Deuxième élément principal

### Liste ordonnée

1. Préparer le document
2. Vérifier l’aperçu
   1. Contrôler les titres
   2. Contrôler les listes
3. Enregistrer le résultat

### Liste de tâches

- [x] Titres
- [x] Mise en forme du texte
- [x] Tableaux
- [ ] Images locales ou distantes
- [ ] Vérification sur mobile

---

## Citations et alertes visuelles

> Une citation peut contenir plusieurs lignes.
>
> Elle peut aussi inclure **de la mise en forme** et une liste :
> - Une idée
> - Une autre idée

> [!NOTE]
> Une note apporte un complément d’information utile.

> [!TIP]
> Une astuce aide à utiliser l’éditeur plus efficacement.

> [!IMPORTANT]
> Cette information est essentielle pour comprendre le document.

> [!WARNING]
> Vérifiez le résultat avant de poursuivre.

> [!CAUTION]
> Cette action peut avoir des conséquences difficiles à annuler.

---

## Code

Voici un bloc TypeScript :

```ts
type Note = {
  titre: string
  tags: string[]
  publiee: boolean
}

const note: Note = {
  titre: "Tester le rendu",
  tags: ["markdown", "aperçu"],
  publiee: true,
}

console.log(`Document : ${note.titre}`)
```

Et une commande shell :

```bash
npm run dev
```

---

## Tableau GFM

| Fonction | Syntaxe | État |
| :-- | :--: | --: |
| Gras | `**texte**` | ✅ |
| Lien | `[libellé](url)` | ✅ |
| Tableau | `\| colonne \|` | ✅ |
| Tâche | `- [ ]` | À tester |

---

## Image et lien d’image

![Image de substitution — 640 × 220](https://placehold.co/640x220/1e293b/ffffff?text=Test+Markdown)

[![Miniature cliquable](https://placehold.co/180x80/2563eb/ffffff?text=Cliquer)](https://example.com)

---

## Détails, notes et caractères spéciaux

<details>
  <summary>Afficher le contenu repliable</summary>

  Ce contenu teste le passage de HTML dans le Markdown.

  - Un élément
  - Un autre élément
</details>

Les caractères suivants doivent rester lisibles : `&`, `<`, `>`, ©, émojis 🚀 et accents éàçù.

## Conclusion

Si tous les éléments ci-dessus sont correctement affichés, l’éditeur gère bien un document Markdown riche.
