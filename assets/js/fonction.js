//partie affichage des images :

const getWorks = () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      works = data;
      displayWorks(works);
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
      displayWorksInModal(works);
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
 return sessionStorage.clear ();
 window.location.href = "./";

};

// fonction pour afficher les travaux dans la modale :

const displayWorksInModal = (works) => {
  const modaleGallery = document.getElementById("modale-gallery");
  
modaleGallery.innerHTML ="";
works.forEach((work) => {
  let imgUrl = work.imageUrl;
  let imgTitle = work.title;

  let image = document.createElement("img");
  image.setAttribute("src", imgUrl);
  image.setAttribute("alt", imgTitle);
 //ajout du style aux images ::
  image.classList.add("image");
  // Append image de modale-gallery
  modaleGallery.appendChild(image);
 
});

};

//supprimer les travaux depuis l'api :
const deleteImg = () => {
  fetch("http://localhost:5678/api/works/${imageId}",{
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
})
.then((response) => response.json())
.then(data =>{
  console.log ("image supprimer", data);

})
.catch(error => {
  console.error('Erreur suppression', error);
});
}
// écoute pour supprimer une img en cliquant l'icone bin : 
const remove = document.querySelector(".fa-trash-can");
remove.addEventListener("click", ()=>{
  const getToken = window.sessionStorage.getItem("token");
  window.sessionStorage.removeItem("imageUrl");
  console.log("icon clicked");

});

deleteImg();