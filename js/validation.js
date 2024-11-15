// Objet regex dont le pattern est de permettre seulement des chiffres
const REGEX_SEULEMENT_CHIFFRE = /^\d+$/;

// Les éléments html du formulaire utilisés dans le script
const inputNoDA = document.getElementById('numero_da');             // Le input du numéro de da
const declaration = document.getElementById('declaration');         // Le checkbox de la déclaration
const sliderNote = document.getElementById('note_estime');          // Le slider de sélection de la note estimée
const titreNote = document.getElementById('titre_note_estime');     // Le titre de la note estimé
const daIconeErreur = document.getElementById('da_icone_erreur');   // L'icone d'erreur associée au input du numéro de da
const daIconeSucces = document.getElementById('da_icone_succes');   // L'icone de succès associée au input du numéro de da
const soumettre = document.getElementById('submit');
const modifImage = document.getElementById('bouton_changer_image_fond')
let formulaireTest = false;


// Initialisation de l'affichage de la bonne icone associé au numéro de da
daIconeErreur.classList.remove('hidden');
daIconeSucces.classList.add('hidden');

/**
 * Modifie les classes d'un élément icone selon la valeur d'une note
 * @param {integer} note La note utilisée pour savoir quelle classe prendre
 */
function ModifierIconeNote(note) {
    // l'élément icone qui sera modifié
    const iconeNote = document.getElementById('icone_note');
    // On initialise les classes de l'élément à "vide"
    iconeNote.setAttribute("class", "");
    titreNote.textContent = `Ma note estimée = ${note} %`;
    // Ajout des bonnes classes selon la valeur de la note
    if (note >= 0 && note <= 19) {
        iconeNote.classList.add("far", "fa-sad-cry");
    } else if (note >= 20 && note <= 39) {
        iconeNote.classList.add("far", "fa-sad-tear");
    } else if (note >= 40 && note <= 59) {
        iconeNote.classList.add("far", "fa-frown");
    } else if (note >= 60 && note <= 79) {
        iconeNote.classList.add("far", "fa-smile");
    } else if (note >= 80 && note <= 100) {
        iconeNote.classList.add("far", "fa-grin-squint-tears");
    }
}
sliderNote.addEventListener('input', function () 
{
    const note = parseInt(sliderNote.value, 10);
    ModifierIconeNote(note);
});

/**
 * Affiche un message dans la première balise small du même niveau qu'un élément html
 * @param {HTMLElement} element L'élément html de départ
 * @param {string} message Le message à afficher
 */
function AfficherMessage(element, message = '') {
    const zoneMessage = element.parentElement.querySelector('small');
    zoneMessage.innerHTML = message;
}

/**
 * Génère un nombre entier aléatoirement
 * @param {int} min La valeur minimum du nombre généré
 * @param {int} max La valeur maximum du nombre généré
 * @returns Un nombre entier
 */
function ObtenirNombreAleatoire(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// point 2 
inputNoDA.addEventListener('input', validerNumeroDA);
function validerNumeroDA() {
    let valeurDA = inputNoDA.value;
    if (valeurDA.length === 7 && (valeurDA.startsWith('1') || valeurDA.startsWith('2')) && REGEX_SEULEMENT_CHIFFRE.test(valeurDA)) 
    {
        daIconeErreur.classList.add('hidden');
        daIconeSucces.classList.remove('hidden');
        AfficherMessage(inputNoDA, '');
        formulaireTest = true; 
    } else 
    {
        daIconeErreur.classList.remove('hidden');
        daIconeSucces.classList.add('hidden');
        AfficherMessage(inputNoDA, 'Le numéro de DA est mauvais');
    }
}


// point 4 

soumettre.addEventListener('submit', ValidationOnSubmit);

function ValidationOnSubmit() {

    if (!declaration.checked || !formulaireTest) {
        const messageDeclaration = document.getElementById('message_declaration');
        messageDeclaration.textContent = "Vous devez accepter la déclaration pour soumettre le formulaire et avoir un DA valide.";
        return false; 
    } else {
        
        const messageDeclaration = document.getElementById('message_declaration');
        messageDeclaration.textContent = '';
        return true;
    }
    
}
