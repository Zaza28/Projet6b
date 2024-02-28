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

const uploadForm = document.getElementById('uploadForm');

uploadForm .addEventListener('submit', (event) => {
  // permet de ne pas envoyer les info automatiquement lors du submit : 
  event.preventDefault(); 

//compile les info à envoyé à l'api :
  const formData = new FormData(uploadForm);

//récupère l'autorisation de l'api
  fetch("http://localhost:5678/api/works",{
    method: "POST",
    body: formData,
    headers: {
      // récupère l'autorisation
      "Authorization": "Bearer " + sessionStorage.getItem("token")
  }

  })
.then(response =>{
  if (response.ok) {
 console.log("image récupérée");
 return response.json();
  }
throw new Error('erreur récupération');
})
.then(data => {
  console.log('Upload réussi:', data);
  works.push(data); //ajoute la new images au tableau qui contient les img 
  displayWorks(works);
  //permet d'afficher la new image 

})
.catch(error => {
  console.error('Erreur pendant le chargement:', error);
});

 });
