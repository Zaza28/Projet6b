//partie affichage des images :
let works = [];
const gallery = document.querySelector(".gallery");


//partie création des catégories :

let category = [];




// vérifie si l'user est connecté : 

const isLogged = isLogin();

if(isLogged){
    //afficher les éléments de l'user connecté et masqué les autres éléments 
    //creer le bouton pour supprimer les travaux 
    
    displayCategories();

}else{
    //affiche les éléments masqués de l'user déconnecter
}


