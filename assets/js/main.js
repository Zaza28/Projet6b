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

// vérifie si l'user est connecté :
const isLogged = isLogin();

//appel des éléments de la modale gallery :
const btnModif = document.querySelector(".modifier_works");
const modaleGallery = document.querySelector("#modale-gallery");
const modale = document.getElementById("modale");
const closeBtn = document.querySelector(".close");
const modaleTitle = document.querySelector(".modale-title");
const btnAjoutImg = document.querySelector(".Ajout-Img");

// les éléments de la modale Form :
const modaleForm = document.querySelector("#modale-form");
const closeBtnForm = document.querySelector(".close-form");
const arrowBack = document.querySelector(".fa-arrow-left");
const btnAddImg = document.querySelector(".add-picture");
const imageInput = document.getElementById("imageInput");
const validerAjoutForm = document.querySelector(".valider-ajout_active");
const BtnValider = document.getElementById("Btn_Valider");

//affiche les éléments de l'user connecté et masqué les autres éléments :

if (isLogged) {
  //masque les boutons de catégories
  editBar.style.display = "block";
  categoryBtns.style.display = " none";
  logOutBtn.style.display = " inline";
  logInBtn.style.display = "none";
  btnModif.style.display = "flex";
} else {
  //affiche les éléments masqués de l'user déconnecter :
  editBar.style.display = "none";
  logOutBtn.style.display = " none";
  logInBtn.style.display = "inline";
  btnModif.style.display = "none";
  modale.style.display = "none";
}

//ouverture de la fenêtre modale lors du click sur modifier :
btnModif.addEventListener("click", () => {
  console.log("clicked");
  modale.style.display = "block";
  modaleGallery.style.display = "block";
  modaleForm.style.display = "none";
  displayWorks(works);
});

// click sur la croix pour fermer la fenêtre :
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

//au click la modale formulaire apparait et la modale gallery disparait :
btnAjoutImg.addEventListener("click", () => {
  console.log("button clicked");
  modaleForm.style.display = "block";
  modaleGallery.style.display = "none";
  closeBtn.style.display = "none";
});

//click sur la flèche on affiche la modale précédente :
arrowBack.addEventListener("click", () => {
  modaleForm.style.display = "none";
  modaleGallery.style.display = "block";
  closeBtn.style.display = "block";
});

//click sur la croix du formulaire d'ajout pour fermer la modale :
closeBtnForm.addEventListener("click", () => {
  console.log("button close clicked");
  modale.style.display = "none";
});
