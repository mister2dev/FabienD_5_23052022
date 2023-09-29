// Ciblage de la balise 'orderId'
const orderId = document.getElementById('orderId');

confirmation = () => {
    // Affichage du numéro de commande
    orderId.innerHTML = localStorage.getItem('orderId');

    // La méthode .clear() efface toutes les clés stockées
    localStorage.clear(); 
}

confirmation();