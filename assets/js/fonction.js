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
    });
};

const displayCategories = (category) => {
  const categoryBtns = document.querySelector(".categoryBtns");
  categoryBtns.innerHTML = "";

  let firstBtn = document.createElement("button");
  firstBtn.textContent = "Tous";
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

const isLogin = ()=> {

}



//Création de la fenêtre modale :

// const DisplayModal = () => {
// portfolio.innerHTML= "";

// let button = document.createElement("button");
// button.textContent = "Modifier";
// portfolio.appendChild(button);

// let myModal = document.createElement("div");
// myModal.classList.add("modal");
// portfolio.appendChild(myModal);
// myModal.textContent ="Contenu de la fenêtre modale";

// let modal = document.querySelector(".modal");
// let modifBtn = document.querySelector("#portfolio button");

// modifBtn.addEventListener("click", ()=>{
//   modal.style.display = "block";
//   console.log("Button clicked!");
// });
// modal.addEventListener("click", (event) => {

// });

// }

// button pour supprimer des travaux :

// const btnSuppr = document.querySelector(".supprimer");
// btnSuppr.addEventListener("click", function (){
//   window.localStorage.removeItem(works);
// })
// let getItems = window.localStorage.getItem(works);
// window.localStorage.setItem(works);
