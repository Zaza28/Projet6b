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
  .then((response)=>response.json())
  .then ((data)=>{
    const category = data;
    displayCategories(category);
  })
  .catch((e) => {
    console.log("erreur backend");
  });
}

const displayCategories = (category) => {
   const categoryBtns = document.querySelector(".categoryBtns");
   categoryBtns.innerHTML = "";

    let firstBtn = document.createElement("button");
    firstBtn.textContent = "Tous";
    categoryBtns.appendChild(firstBtn);

    category.forEach((cat)=>{

    let categoryName = cat.name;
    let categoryId = cat.id;

    let buttons = document.createElement("button");
    buttons.textContent = categoryName;

    categoryBtns.appendChild(buttons);

  })

}