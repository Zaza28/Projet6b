//partie affichage des images :
let works = [];
const editBar = document.querySelector(".barre_edition");
const gallery = document.querySelector(".gallery");
const categoryBtns = document.querySelector(".categoryBtns");

// log in et log out :
const logInBtn = document.querySelector("#logInBtn");
const logOutBtn = document.querySelector("#logOutBtn");
logOutBtn.addEventListener("click", () => {
  logOut();
});
//partie création des catégories :

let category = [];


// vérifie si l'user est connecté :
const isLogged = isLogin();

//appel des éléments de la modale : 

const btnModif = document.querySelector(".modifier_works");
const modale = document.getElementById("modale");
const closeBtn = document.querySelector(".close");
const modaleTitle = document.querySelector(".modale-title");

//affiche les éléments de l'user connecté et masqué les autres éléments :

if (isLogged) {
  //masque les boutons de catégories
  editBar.style.display = "block";
  categoryBtns.style.display = " none";
  logOutBtn.style.display = " inline";
  logInBtn.style.display = "none";
  btnModif.style.display = "block";
  modale.style.display = "block";

} else {
  //affiche les éléments masqués de l'user déconnecter :
  editBar.style.display = "none";
  logOutBtn.style.display = " none";
  logInBtn.style.display = "inline";
  btnModif.style.display = "none";
  modale.style.display = "none";

}

//Création de la fenêtre modale lors du click sur modifier :
btnModif.addEventListener("click", () => {
  console.log("clicked");
  modale.style.display = "block";
  displayWorks(works);

});
// écoute sur la croix pour fermer la fenêtre : 
closeBtn.addEventListener("click", () => {
  console.log("Close button clicked");
  modale.style.display = "none";
});
// ferme la fenêtre lorsque l'on click en dehors de celle-ci : 
window.addEventListener("click", (event) => {
  if (event.target === modale) {
    console.log("Clicked outside modal");
    modale.style.display = "none";
  }
});











