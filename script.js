function showPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}

// Affichez la pop-up � l'ouverture de la page (commenter si non souhait�)
//window.onload = showPopup; // D�commentez cette ligne si vous souhaitez afficher la pop-up automatiquement
