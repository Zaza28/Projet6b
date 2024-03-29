//partie modales :

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
      if (confirm("voulez-vous supprimer cet élément ?")) {
        deleteImg(work.id);
      }
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

//faire la mm chose pour les autres éléments du formulaire :
const InputTitle = document.getElementById("title");
InputTitle.addEventListener("keyup", () => {
  validateForm();
});
const InputCategory = document.getElementById("category");
InputCategory.addEventListener("keyup", () => {
  validateForm();
});
const InputImage = document.getElementById("imageInput");
InputImage.addEventListener("change", () => {
  validateForm();
});

//Fait apparaître l'image ajoutée dans la modale :
//récupère input file
const imgInput = InputImage;
//"change" éxécute une fonction lorsque l'user séléctionne un nouveau fichier
imgInput.addEventListener("change", (event) => {
  //récupère le premier fichier sélectionné par l'utilisateur à partir de l'événement "change"
  //si aucun fichier n'est sélectionné, "file" sera null
  const file = event.target.files[0];

  //si un fichier est sélectionné, on exécute le code :
  if (file) {
    //permet de lire le contenu des fichiers :
    const reader = new FileReader();

    //éxécute function lorsque le chargement du fichier est fini
    //on donne les données du fichier chargé à event(e):
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.classList.add("picture");
      //définit src de l'img en utilisant les données converties de l'URL:
      img.src = e.target.result;
      const uploadImgContainer = document.getElementById("upload-Img");
      //efface les éléments existants :
      uploadImgContainer.innerHTML = "";
      uploadImgContainer.appendChild(img);
    };
    //convertit l'URL en données :
    reader.readAsDataURL(file);
  }
  //vérifie la validité du formulaire après la sélection d'une image
  validateForm();
  //réinitialise l'élément imageInput pour effacer le fichier sélectionné
});

// ajouter des travaux depuis le desktop :
const Btn_Valider = document.getElementById("Btn_Valider");
Btn_Valider.addEventListener("click", () => {
  if (validateForm()) {
    const Newtitle = InputTitle.value;
    const Newcategory = InputCategory.value;
    const Newimage = InputImage.files[0];
    //formdata transmet les données de type binaires vers le backend
    //envoie la photo vers le backend tous les fichier upload
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
        alert("votre image a été ajouté avec succées ! ");
        getWorks();
      const uploadForm = document.getElementById("uploadForm");
       uploadForm.reset(); //faire dispaitre l'image de l'aperçu
       const uploadImgContainer = document.getElementById("upload-Img");
       uploadImgContainer.innerHTML = "";
      })
      .catch((error) => {
        console.error("Erreur pendant le chargement:", error);
      });
  }
});

//permet de vérifier le formulaire avant de l'envoyer :
function validateForm() {
  const title = InputTitle.value;
  const category = InputCategory.value;
  const imageInput = InputImage;
  // Vérifie si l'élément imageInput existe avant d'accéder à sa propriété files
  const image = imageInput ? imageInput.files[0] : null;
  const Btn_Valider = document.getElementById("Btn_Valider");
  //vérifie si les champs si les sont vides :
  if (title.trim() === "" || category === "0" || !image) {
    Btn_Valider.classList.remove("valider-ajout_active");
    return false;
  } else {
    //vérifie si le champ de l'img est rempli et avec une image valide :
    Btn_Valider.classList.add("valider-ajout_active");
    return true;
  }
}


