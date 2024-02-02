//partie affichage des images :
let works = [];

const gallery = document.querySelector(".gallery");

getWorks();

//partie création des catégories :

let category = [];

getCategories();









// mon première version partie des images :

// const displayGallery = () => {
//     const gallery = document.querySelector(".gallery");
//     gallery.innerHTML = '';
//       getWorks();

//     fetch("http://localhost:5678/api/works")
//         .then(response => response.json())
//         .then(data => {

//             works.forEach((work) => {
//                 let imgUrl = work.imageUrl;
//                 let imgTitle = work.title;

//                 let figure = document.createElement("figure");

//                 let image = document.createElement("img");
//                 image.setAttribute('src', imgUrl);
//                 image.setAttribute('alt', imgTitle);

//                 let caption = document.createElement("figcaption");
//                 caption.textContent = imgTitle;

//                 figure.appendChild(image);
//                 figure.appendChild(caption);
//                 gallery.appendChild(figure);
//             });

// }
