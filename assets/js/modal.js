//DOM:
const InputTitle = document.getElementById("title");
const InputCategory = document.getElementById("category");
const InputImage = document.getElementById("imageInput");
const Btn_Valider = document.getElementById("Btn_Valider");

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

//Fait apparaître l'image ajoutée dans la modale :
//"change" éxécute une fonction lorsque l'user séléctionne un nouveau fichier
InputImage.addEventListener("change", (event) => {
  //récupère le premier fichier sélectionné par l'utilisateur à partir de l'événement "change"
  //si aucun fichier n'est sélectionné, "file" sera null
  const file = event.target.files[0];
  //si un fichier est sélectionné, on exécute le code :
  if (file){
    //permet de lire le contenu des fichiers :
    const reader = new FileReader();
    //éxécute function lorsque le chargement du fichier est fini
    //on donne les données du fichier chargé à event(e):
    reader.onload = function (e){
      const img = document.createElement("img");
      img.classList.add("picture");
      //définit src de l'img en utilisant les données converties de l'URL:
      img.src = e.target.result;
      const preventImg = document.querySelector(".prevent-img");
      //efface les éléments existants :
      preventImg.innerHTML = "";
      preventImg.appendChild(img);
     document.getElementById("add-picture-icon").style.display="none";
    };
    //convertit l'URL en données :
    reader.readAsDataURL(file);
  }
  //vérifie la validité du formulaire après la sélection d'une image
  validateForm();
  console.log("vérification img form ok");
});


//permet de vérifier le formulaire avant de l'envoyer :
InputTitle.addEventListener("keyup", () => {
  validateForm();
  console.log("vérification keyup ok");
});
InputCategory.addEventListener("change", () => {
  validateForm();
  console.log("vérification change ok");
});


//  Création & récupération des options pour le form d'ajout : 
const displayOptionsCategories = (category)=>{
  console.log(category);

  //creation de la première option null :
  const newOption = document.createElement("option");
  newOption.value="0";
  newOption.textContent="";
  InputCategory.appendChild(newOption);

 //creation des autres options :
 category.forEach((option) => {
  const newOptions = document.createElement("option");
  newOptions.value = option.id;
  newOptions.textContent = option.name;
  InputCategory.appendChild(newOptions);
});
}

// ajouter des travaux depuis le desktop :
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
       const preventImg = document.querySelector(".prevent-img");
       preventImg.innerHTML = "";
      document.getElementById("add-picture-icon").style.display="block";
    })
      .catch((error) => {
        console.error("Erreur pendant le chargement:", error);
      });
      console.log("vérification d'ajout image ok");
  }
  Btn_Valider.classList.remove("valider-ajout_active");
});

function validateForm() {
  const title = InputTitle.value;
  const category = InputCategory.value;
  const imageInput = InputImage;
  const msgErreur = document.querySelector(".Erreur-msg");
  // Vérifie si l'élément imageInput existe avant d'accéder à sa propriété files
  const image = imageInput ? imageInput.files[0] : null;
  const Btn_Valider = document.getElementById("Btn_Valider");
  //vérifie si les champs si les sont vides :
  if (title.trim() === "" || category === "0" || !image) {
    msgErreur.style.display="block";
    Btn_Valider.disabled = true;
    Btn_Valider.classList.remove("valider-ajout_active");
    return false;
  } else {
    //vérifie si le champ de l'img est rempli et avec une image valide :
    msgErreur.style.display="none";
    Btn_Valider.disabled = false;
    Btn_Valider.classList.add("valider-ajout_active");
    console.log("vérification validateForm ok");
    return true;
  }
}
