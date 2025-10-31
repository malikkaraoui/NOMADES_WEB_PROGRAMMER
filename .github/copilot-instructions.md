# Guide Copilot — NOMADES_WEB_PROGRAMMER

Ce dépôt est un prototype front statique pour NECTARX. Il n’y a pas de build ni de backend : une page HTML (`index.html`) et un module JS (`essai_clean.js`) suffisent. Objectif: permettre une itération rapide sur l’UI et une API JS minimale côté navigateur.

## Vue d’ensemble (architecture et rôles)
- Entrée unique: `index.html` sert l’UI, le style (inline) et la logique d’interaction (scripts `defer`).
- Logique métier légère: `essai_clean.js` expose une petite API globale via `window.App`:
  - `App.choisirRole(role): string` — retourne un message déterministe.
  - `App.premiereChoix(action): string` — appelle `choisirRole`, et si présent `App.showMessage(msg)` côté UI.
- Communication interne: l’UI (dans `index.html`) utilise l’API `window.App` (pas d’imports/bundler). Les composants UI sont construits avec le DOM (event delegation sur `.container`).
- Intégrations externes: connexion wallet optionnelle via `window.ethereum.request({ method: 'eth_requestAccounts' })` (ne doit pas casser si absent).

## Lancer et servir le site
- Dépendance locale: `serve` (déclaré dans `package.json`).
- Démarrage local: `npm run start` (sert le dossier courant, port 8000). Si 8000 est pris, `serve` choisit automatiquement un autre port — vérifier la sortie console.
- Pas de build/outputs: tout est servi tel quel. Conserver `index.html` comme point d’entrée unique pour éviter les 404 (voir note SPA ci‑dessous).

## Fichiers clés et responsabilités
- `index.html`
  - Structure et style (noir/vert), accessibilité basique (roles/aria), et logique d’interface.
  - Event delegation sur `.container` pour gérer les boutons `[data-action]` (“utilisateur” / “créateur”).
  - `showMessage(text)` est fourni à `window.App` via `window.App.showMessage = showMessage`.
  - Horloge temps réel: `const updateClock = () => { ... }`, puis `setInterval(updateClock, 1000)`.
  - Vitrine “Marketplace” rendue par `renderContracts()` avec `renderStars(rating)`; bouton “Installer” tente une connexion wallet (si dispo).
- `essai_clean.js`
  - IIFE qui isole le scope et attache `window.App`.
  - Normalisation des rôles (suppression diacritiques, lowercasing) avant décision.
  - Renvoie toujours un message (utile pour tests); utilise `App.showMessage` si défini par l’UI.

## Conventions du projet (à respecter)
- API publique minimale via `window.App` (pas d’autres globals). Préférer ajouter des méthodes à `App` plutôt que d’exposer des variables.
- Messages UI en français; conserver la normalisation des entrées utilisateur (accents/majuscules).
- Écoute d’événements par délégation (sur des conteneurs), pas d’attachements multiples sur chaque bouton.
- Scripts `defer`, CSS inline minimaliste. Aucune dépendance de bundler.

## Exemples d’usage (console navigateur)
- `window.App.choisirRole('utilisateur')  // "Bienvenue, utilisateur !"`
- `window.App.premiereChoix('créateur')    // "Bienvenue, créateur !"` (et appelle showMessage si fourni)
- Injection d’un afficheur custom: `window.App.showMessage = (m) => console.log('UI:', m)`

## Points d’attention (pièges courants)
- Mode SPA de `serve -s`: requêter `/page.html` peut rediriger vers `/page` (301) puis 404. Garder `index.html` comme seule page et naviguer via DOM (pas de liens durs vers d’autres .html).
- Wallet non présent: `window.ethereum` peut être absent. Toujours garder le code défensif (promesses catchées, retourner un message neutre via `showMessage`).
- Diacritiques: la logique de rôle enlève accents et compare en minuscules. Si vous ajoutez de nouveaux rôles, gérez les variantes accentuées.

## Comment étendre proprement
- UI: ajouter des comportements dans `index.html` en réutilisant la délégation d’événements et `showMessage`.
- Métier: ajouter des méthodes sous `window.App` dans `essai_clean.js` (garder des retours déterministes pour faciliter les tests en console).
- Intégration wallet: suivre le pattern existant (`connectWallet()` dans `index.html`). Ne pas lancer d’appel si l’objet `window.ethereum` est absent.

## Références rapides
- Entrée: `index.html`
- API: `essai_clean.js` (IIFE → `window.App`)
- Script local: `npm run start` (via `serve`)
- Docs projet: `README.md`, `SYNTHESE.md`