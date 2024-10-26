function showPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}

// Affichez la pop-up à l'ouverture de la page (commenter si non souhaité)
//window.onload = showPopup; // Décommentez cette ligne si vous souhaitez afficher la pop-up automatiquement
