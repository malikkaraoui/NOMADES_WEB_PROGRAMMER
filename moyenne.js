/**
 * moyenne.js
 * Retourne la moyenne d'un tableau de valeurs numériques.
 * - valeurs : tableau (par défaut []), peut contenir des nombres ou des chaînes numériques.
 * - comportement : on filtre les valeurs non numériques ; si aucune valeur valide -> retourne 0.
 */
const moyenne = (valeurs = []) => {
    // Si l'argument n'est pas un tableau, on retourne 0 (sécurité)
    if (!Array.isArray(valeurs)) return 0;

    // Convertir/filtrer : garder uniquement les nombres finis
    const nums = valeurs
        .map(v => (typeof v === 'string' ? v.trim() : v))
        .map(v => Number(v))
        .filter(n => Number.isFinite(n));

    if (nums.length === 0) return 0;

    // Somme et moyenne
    const total = nums.reduce((acc, val) => acc + val, 0);
    return total / nums.length;
};

// Exemples d'utilisation
console.log(moyenne([10, 20, 30, 40, 50])); // 30
console.log(moyenne()); // 0

// Export (décommente selon l'environnement si besoin)
// module.exports = moyenne; // CommonJS
// export default moyenne;   // ESM