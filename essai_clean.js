// essai_clean.js
// Fonctions utilitaires pour la page de premier choix
function choisirRole(role) {
  const normalized = String(role).toLowerCase();
  if (normalized === 'utilisateur') {
    const msg = 'Bienvenue, utilisateur !';
    console.log(msg);
    return msg;
  } else if (normalized === 'créateur' || normalized === 'createur') {
    const msg = 'Bienvenue, créateur !';
    console.log(msg);
    return msg;
  } else if (normalized === 'découvrir' || normalized === 'decouvrir') {
    const msg = 'Découvrir : navigation vers le catalogue...';
    console.log(msg);
    return msg;
  } else {
    const msg = "Rôle non reconnu. Veuillez choisir 'utilisateur' ou 'créateur'.";
    console.log(msg);
    return msg;
  }
}

function premiereChoix(action) {
  const res = choisirRole(action);
  if (typeof showMessage === 'function') {
    showMessage(res);
  } else {
    try { alert(res); } catch (e) { /* ignore */ }
  }
}

// Exposer sur window pour utilisation depuis HTML
window.choisirRole = choisirRole;
window.premiereChoix = premiereChoix;
