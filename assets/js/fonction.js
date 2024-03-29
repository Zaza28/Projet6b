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

//fonction qui permet de donner la classe actif au btn séléctionné :
 function customForEach(elements, className, addClass){
  elements.forEach((element)=>{
    if (addClass){
      element.classList.add(className);
    }else{
      element.classList.remove(className);
    }
  });
 }


const displayCategories = (category) => {
  const categoryBtns = document.querySelector(".categoryBtns");
  categoryBtns.innerHTML = "";

  let firstBtn = document.createElement("button");
  firstBtn.textContent = "Tous";
  firstBtn.classList.add("button");
  firstBtn.classList.add("button_actif");
  categoryBtns.appendChild(firstBtn);

  firstBtn.addEventListener("click", () => {
    displayWorks(works);
   customForEach(categoryBtns.querySelectorAll("button"),"button_actif", false);
   firstBtn.classList.add("button_actif");
  });

  category.forEach((cat) => {
    let categoryName = cat.name;
    let categoryId = cat.id;

    let buttons = document.createElement("button");
    buttons.textContent = categoryName;
    categoryBtns.appendChild(buttons);
    buttons.classList.add("button");

    buttons.addEventListener("click", () => {
      customForEach(categoryBtns.querySelectorAll("button"), "button_actif", false);
      buttons.classList.add("button_actif");
      firstBtn.classList.remove("button_actif");

      const worksOfCategory = works.filter((work) => {
        return work.categoryId === categoryId;
      });

      displayWorks(worksOfCategory);
    });
  });
};
getWorks();
getCategories();

// user connected : 
function isLogin  () {
  return sessionStorage.getItem("token") ? true : false;
};

const logOut = () => {
  return sessionStorage.clear();
  window.location.href = "./";
};


