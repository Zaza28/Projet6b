//partie affichage des images :

const getWorks = () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      works = data;
      displayWorks(works);
      displayWorksInModal(works);
    })
    .catch((e) => {
      console.log("erreur backend");
    });
};

const displayWorks = (works) => {
  gallery.innerHTML = "";

  works.forEach((work) => {
    let imgUrl = work.imageUrl;
    let imgTitle = work.title;

    let figure = document.createElement("figure");

    let image = document.createElement("img");
    image.setAttribute("src", imgUrl);
    image.setAttribute("alt", imgTitle);

    let caption = document.createElement("figcaption");
    caption.textContent = imgTitle;

    figure.appendChild(image);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
};

//partie création des catégories :

const getCategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
      const category = data;
      displayCategories(category);
    });
};

const displayCategories = (category) => {
  const categoryBtns = document.querySelector(".categoryBtns");
  categoryBtns.innerHTML = "";

  let firstBtn = document.createElement("button");
  firstBtn.textContent = "Tous";
  firstBtn.classList.add("button");
  firstBtn.classList.add("button_actif");
  categoryBtns.appendChild(firstBtn);

  firstBtn.addEventListener("click", () => {
    getWorks();
  });

  category.forEach((cat) => {
    let categoryName = cat.name;
    let categoryId = cat.id;

    let buttons = document.createElement("button");
    buttons.textContent = categoryName;
    categoryBtns.appendChild(buttons);
    buttons.classList.add("button");

    buttons.addEventListener("click", () => {
      const worksOfCategory = works.filter((work) => {
        return work.categoryId === categoryId;
      });
      displayWorks(worksOfCategory);
    });
  });
};
getWorks();
getCategories();

// user connected

const isLogin = () => {
  return sessionStorage.getItem("token") ? true : false;
};

const logOut = () => {
  return sessionStorage.clear();
  window.location.href = "./";
};

// fonction pour afficher les travaux dans la modale :

const displayWorksInModal = (works) => {
  const galleryContent = document.getElementById("gallery-content");

  galleryContent.innerHTML = "";

  works.forEach((work) => {
    let imgUrl = work.imageUrl;
    let imgTitle = work.title;

    let cardImg = document.createElement("div");
    cardImg.classList.add("cardImg");

    let image = document.createElement("img");
    image.setAttribute("src", imgUrl);
    image.setAttribute("alt", imgTitle);

    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-trash-can");
    trashIcon.classList.add("fa-solid");

    trashIcon.addEventListener("click", () => {
      deleteImg(work.id);
    });

    //ajout du style aux images ::
    // Append image de modale-gallery
    cardImg.appendChild(image);
    cardImg.appendChild(trashIcon);
    galleryContent.appendChild(cardImg);
  });
};

//supprimer les travaux depuis l'api :
const deleteImg = (imageId) => {
  fetch(`http://localhost:5678/api/works/${imageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  })
    //pas beosin de response.json car pas de format json à traduire :
    .then((data) => {
      console.log("image supprimer", data);
      getWorks();
    })
    .catch((error) => {
      console.error("Erreur suppression", error);
    });
};

// ajouter des travaux depuis le desktop :
const Btn_Valider = document.getElementById("Btn_Valider");
Btn_Valider.addEventListener("click", () => {
  const isValid = validateForm();
  if (isValid) {
    const Newtitle = document.getElementById("title").value;
    const Newcategory = document.getElementById("category").value;
    const Newimage = document.getElementById("imageInput").files[0];
    
    const addData = new FormData();
    addData.append("image", Newimage);
    addData.append("title", Newtitle);
    addData.append("category", parseInt(Newcategory));
    //*1 converti en valeur numé ou utiliser parseInt(NewCetgory)

    //récupère l'autorisation de l'api
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: addData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload réussi:", data);
        getWorks();
        //permet d'afficher la new image
      })
      .catch((error) => {
        console.error("Erreur pendant le chargement:", error);
      });

    Btn_Valider.classList.add("valider-ajout_active");
  } else {
    Btn_Valider.classList.remove("valider-ajout_active");
  }

});

//permet de vérifier le formulaire avant de l'envoyer : 
function validateForm(){
  





}



//Fait apparaître l'image ajouter dans la modale :
//récupère input file 
const imgInput = document.getElementById("imageInput");

 //"change" éxécute une fonction lorsque l'user séléctionne un new fichier
imgInput.addEventListener("change", (event) => {
  
  //récupère le 1er fichier séléctionné par l'user à partir de l'évent 
  //"change" si aucun fichier séléctionné var = null 
  const file = event.target.files[0];

//si un fichier est séléctionné on exécute le code :
  if (file) {

    //permet de lire le contenu des fichiers : 
    const reader = new FileReader();

    //éxécute function lorsque le chargement du fichier est fini
    //on donne les données du fichier chargé à event(e):
    reader.onload = function (e) {

      const img = document.createElement("img");
      img.classList.add("picture");
      //définit src de l'img en utilisant les données converti de l'url:
      img.src = e.target.result;

      const UploadImg = document.getElementById("upload-Img");
      //efface les éléments existants: 
      UploadImg.innerHTML = "";
      UploadImg.appendChild(img);

    };
//converti l'url en données :
    reader.readAsDataURL(file);
  }
});
