# Current feature overview / goals

## Feature 29 — Assistant IA local avec Ollama

Permettre à l’utilisateur de demander à un modèle Ollama local de réécrire le document Markdown courant à partir d’une instruction, puis de contrôler explicitement si la proposition remplace le document.

### Comportement attendu

- Fournir une interface compacte dans l’éditeur pour configurer l’adresse du serveur Ollama et le modèle, saisir une instruction et lancer la demande.
- Envoyer au serveur l’instruction ainsi que le contenu intégral du document courant, sans modifier le document pendant la génération.
- Rendre visibles les états prêt, envoi/génération, proposition reçue et erreur, avec un message compréhensible quand Ollama est inaccessible ou rejette la demande.
- Conserver la réponse comme proposition distincte et demander une confirmation explicite avant de l’appliquer; permettre également de l’annuler.
- Après confirmation, remplacer le contenu courant par le Markdown proposé, synchroniser automatiquement l’éditeur et l’aperçu, et positionner `isDirty` à `true` afin de réutiliser les mécanismes de sauvegarde et de protection contre la perte existants.
- Garder le contenu et l’état de sauvegarde inchangés en cas d’échec ou d’annulation.
- Préserver l’ergonomie responsive, les thèmes clair/sombre et l’accessibilité clavier de l’application.

### Contraintes techniques et produit

- L’intégration reste locale et appelle l’API Ollama configurée par l’utilisateur; aucun backend distant ni authentification n’est ajouté.
- Le transport doit fonctionner dans l’application Tauri et, autant que possible, dans le mode web de développement, en respectant les permissions réseau Tauri et les règles CORS d’Ollama.
- La réponse doit être non streamée et validée avant d’être exposée comme proposition de remplacement.
- Une seule demande doit pouvoir être active à la fois, et une réponse obsolète ne doit pas écraser un document qui aurait changé pendant la génération.

### Critères d’acceptation

- Une instruction telle que « ajoute une section Résumé » peut être envoyée avec le contenu du document courant à un Ollama local disponible.
- Une proposition Markdown reçue peut être confirmée puis appliquée au document courant.
- Après application, l’éditeur et l’aperçu affichent le même contenu et le document est signalé comme non sauvegardé.
- En cas d’indisponibilité, d’erreur HTTP ou de réponse invalide, un message utile est affiché et le document reste inchangé.

### Questions à confirmer dans le plan

- Persister ou non l’adresse du serveur et le nom du modèle entre les sessions.
- Présenter la proposition complète dans une zone de prévisualisation simple ou dans une comparaison avant/après.

# Plans

## Plan approuvé — Feature 29

1. Consulter `reuse-scout` avant de créer le composant d’interface ou le client Ollama, puis réutiliser ou étendre les patterns existants conformément à sa recommandation.
2. Créer un client Ollama ciblé dans `src/lib/ollama.ts` :
   - valider et normaliser une adresse loopback (`localhost` ou `127.0.0.1`) et un nom de modèle fournis par l’utilisateur;
   - appeler `POST /api/chat` avec `stream: false`, l’instruction et le contenu intégral du document;
   - demander une réponse structurée contenant le Markdown final, puis valider la réponse avant de la retourner;
   - utiliser le client HTTP Tauri dans l’application desktop et `fetch` dans le mode web;
   - convertir les problèmes de connexion, erreurs HTTP, modèles absents et réponses invalides en messages compréhensibles.
3. Créer `src/components/assistant/OllamaAssistant.tsx` avec une interface compacte et accessible :
   - champs pour l’adresse Ollama, le modèle et l’instruction;
   - persistance locale de l’adresse et du modèle seulement;
   - états prêt, génération, proposition reçue et erreur;
   - blocage d’une seconde demande pendant la génération;
   - affichage intégral de la proposition Markdown avec actions explicites `Apply` et `Discard`.
4. Intégrer l’assistant dans `src/pages/EditorPage.tsx` :
   - transmettre un instantané du contenu courant lors de l’envoi;
   - conserver le document inchangé tant que la proposition n’est pas confirmée;
   - refuser l’application si le contenu a changé depuis le départ de la demande et demander une nouvelle génération;
   - après confirmation, remplacer `currentDocument.content` et positionner `isDirty` à `true`, afin de synchroniser l’éditeur, l’aperçu, le titre et les protections contre la perte existantes.
5. Configurer le transport desktop Ollama :
   - ajouter `@tauri-apps/plugin-http` dans `package.json` et `package-lock.json`;
   - ajouter et initialiser `tauri-plugin-http` dans `src-tauri/Cargo.toml`, `src-tauri/Cargo.lock` et `src-tauri/src/main.rs`;
   - étendre `src-tauri/capabilities/default.json` avec une permission HTTP limitée aux adresses loopback nécessaires;
   - ne pas ouvrir l’accès réseau à des hôtes externes ni désactiver la validation TLS.
6. Préserver l’interface responsive, les thèmes clair/sombre et les interactions clavier existantes; ajuster `src/index.css` uniquement si les styles Tailwind locaux ne suffisent pas.
7. Valider l’implémentation :
   - exécuter `npm run lint`, `npm run build` et `cargo check`;
   - vérifier manuellement une génération réussie, l’application et l’abandon d’une proposition, une modification du document pendant la génération, une réponse invalide, un modèle absent et un serveur Ollama indisponible;
   - confirmer qu’une proposition appliquée met à jour l’éditeur et l’aperçu, marque le document comme non sauvegardé et reste sauvegardable avec les mécanismes existants.

### Hypothèses et risques acceptés

- La première version affiche la proposition complète plutôt qu’une comparaison visuelle avant/après.
- Le serveur reste strictement local; une URL non loopback est rejetée.
- En mode web, l’utilisateur peut devoir autoriser l’origine de l’application avec `OLLAMA_ORIGINS`; l’application Tauri utilise son client HTTP natif et n’en dépend pas.
- Un document trop volumineux peut dépasser la fenêtre de contexte du modèle; l’erreur Ollama sera affichée sans altérer le document.

# Notes

# Current bug status
