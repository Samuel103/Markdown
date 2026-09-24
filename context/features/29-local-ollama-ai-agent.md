# Feature — Assistant IA local avec Ollama

## Goal

Permettre à l’utilisateur de demander à un assistant IA local connecté à Ollama de modifier le document Markdown actuellement ouvert.

## Tasks

- [ ] Ajouter une interface compacte permettant de saisir une instruction destinée à l’assistant IA pour le document courant.
- [ ] Établir la communication avec un agent Ollama local configuré par l’utilisateur.
- [ ] Transmettre à l’agent l’instruction de l’utilisateur et le contenu du document Markdown courant.
- [ ] Afficher clairement les états d’envoi, de réponse et d’erreur de connexion à Ollama.
- [ ] Remplacer le contenu du document courant par la version modifiée renvoyée par l’agent après confirmation de l’utilisateur.
- [ ] Marquer le document comme modifié afin qu’il puisse être sauvegardé avec les mécanismes existants.

## Acceptance Criteria

- [ ] L’utilisateur peut saisir une instruction, telle que « ajoute une section Résumé », depuis l’éditeur.
- [ ] Lorsque Ollama est disponible localement, l’instruction et le contenu du document courant lui sont transmis.
- [ ] La réponse de l’agent contenant le Markdown modifié peut être appliquée au document courant.
- [ ] Après application, l’éditeur et l’aperçu affichent le même contenu mis à jour.
- [ ] Le document est signalé comme non sauvegardé après une modification appliquée par l’agent.
- [ ] Si Ollama est indisponible ou renvoie une erreur, le contenu du document reste inchangé et un message compréhensible est affiché.

## Depends On

- `10-document-model.md`
