//partie affichage des images :
let works = [];
const editBar = document.querySelector(".barre_edition");
const gallery = document.querySelector(".gallery");
const categoryBtns = document.querySelector(".categoryBtns");
const logInBtn = document.querySelector("#logInBtn");
const logOutBtn = document.querySelector("#logOutBtn");
const btnModif = document.querySelector(".modifier_works");
logOutBtn.addEventListener('click', ()=>{
    logOut();
});

//partie création des catégories :

let category = [];

// vérifie si l'user est connecté :

const isLogged = isLogin();

    if (isLogged) {
        //afficher les éléments de l'user connecté et masqué les autres éléments
        //creer le bouton pour modifier les travaux et afficher le modal
        //le modale icon de suppression sur chaque image
      //masque les boutons de catégories
       editBar.style.display="visible";
       categoryBtns.style.display=" none";
       logOutBtn.style.display=" inline";
       logInBtn.style.display="none";
       btnModif.style.display="visible";
      } else {
        //affiche les éléments masqués de l'user déconnecter :
        editBar.style.display="none";
        logOutBtn.style.display=" none";
        logInBtn.style.display="inline";
        btnModif.style.display="none";

      }



