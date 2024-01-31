// résultat : 
const displayGallery = () => {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {
            data.forEach((work) => {
                let imgUrl = work.imageUrl;
                let imgTitle = work.title;

                let figure = document.createElement("figure");

                let image = document.createElement("img");
                image.setAttribute('src', imgUrl);
                image.setAttribute('alt', imgTitle);

                let caption = document.createElement("figcaption");
                caption.textContent = imgTitle;

                figure.appendChild(image);
                figure.appendChild(caption);
                gallery.appendChild(figure);
            });
        })

}

displayGallery();


//exercice :
// const displayGallery = () =>{
//     const gallery = document.querySelector(".gallery")
//     gallery.innerHTML = '';
//     fetch("http://localhost:5678/api/works").then(
//     (Response)=>
//     Response.json()
//     )
//     .then((data)=>{
//     let imgUrl = data[2].url;
//     let imgTitle = data[1].url;
//     let image = document.createElement("img");
// image.setAttribute('src', `${imgUrl}`)
// image.setAttribute('alt',`${imgTitle}` )
// const gallery = document.querySelector(".gallery")
// gallery.appendChild(image);
//     });
// }
// displayGallery();



//exemple prof :
// const works = [
// ]
// const displayGallery = () =>{
// works.forEach((elem) => {
//gallery.innerHTML +=
//     `<figure>
// <img src="${elem.title}" alt="${elem.imageUrl}">
// <figcaption>${elem.works}</figcaption>
// </figure>`
// });
// }
// displayGallery();






