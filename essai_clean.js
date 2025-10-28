/*
 * essai_clean.js
 * Fonctions légères et optimisées pour la page "premier_choix".
 * Ce fichier expose une API minimale via `window.App` :
 *   - App.choisirRole(role)  -> retourne un message (string)
 *   - App.premiereChoix(action) -> exécute le choix et renvoie message
 *   - Il est possible d'assigner une fonction d'affichage : App.showMessage = function(msg) { ... }
 *
 * Principes d'optimisation et de sécurité :
 * - IIFE pour isoler l'espace de noms et éviter la pollution globale.
 * - Normalisation unicode (suppression des diacritiques) pour comparer les rôles.
 * - Exposition d'une API minimale (évite d'ajouter beaucoup de globals).
 * - Comportement déterministe : fonctions retournent toujours le message (utile pour tests).
 */

(function (global) {
  'use strict';

  // Normalise une chaîne : supprimer diacritiques, mettre en minuscules et trimmer
  function _normalizeRole(role) {
    return String(role || '')
      .normalize('NFD') // sépare lettres + diacritiques
      .replace(/[0-6f]/g, '') // retire les diacritiques (sécurité fallback)
      .replace(/\p{Diacritic}/gu, '') // tentative moderne (si engine supporte) — safe fallback au dessus
      .toLowerCase()
      .trim();
  }

  // Fonction principale : retourne toujours un message (string)
  // Commentaires en français : ces messages sont destinés à l'UI
  function choisirRole(role) {
    var r = _normalizeRole(role);
    var msg;

    if (r === 'utilisateur') {
      msg = 'Bienvenue, utilisateur !';
    } else if (r === 'createur' || r === 'créateur') {
      msg = 'Bienvenue, créateur !';
    } else if (r === 'decouvrir' || r === 'découvrir') {
      msg = 'Découvrir : navigation vers le catalogue...';
    } else {
      msg = "Rôle non reconnu. Veuillez choisir 'utilisateur' ou 'créateur'.";
    }

    // Logging utile pour le debug sans casser l'UI
    if (typeof console !== 'undefined' && typeof console.log === 'function') {
      console.log('[choisirRole] ' + msg);
    }

    return msg;
  }

  // Fonction de haut niveau appelée par l'UI
  // Elle retourne le message et tente d'utiliser App.showMessage si fourni
  function premiereChoix(action) {
    var message = choisirRole(action);

    // Si l'UI a fournie une fonction d'affichage, on l'utilise
    if (global.App && typeof global.App.showMessage === 'function') {
      try { global.App.showMessage(message); } catch (e) { /* noop */ }
    }

    // Retour valeur pour tests / scripts
    return message;
  }

  // Exposer API minimale sous window.App
  global.App = global.App || {};
  global.App.choisirRole = choisirRole;
  global.App.premiereChoix = premiereChoix;

})(window);
