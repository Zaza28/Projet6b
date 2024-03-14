//page de connexion :

//fonction validation du formulaire de connexion : 
 function validateLoginForm (){
const email = document.getElementById("email_login").value;
const password = document.getElementById("password").value;

    // Vérification si les champs sont vides
    if (email.trim() === "" || password.trim() === "") {
      alert("Veuillez remplir tous les champs du formulaire de connexion.");
      return false;
  }

  return true;
}

    // Envoi de la requête de connexion si le formulaire est valide :

const connectBtn = document.querySelector("#connectBtn");
//récupère le token :
connectBtn.addEventListener("click", function () {

    // Validation du formulaire de connexion :
  if (!validateLoginForm()) {
    return; // Arrête l'exécution si le formulaire n'est pas valide :
}
    // Envoi de la requête de connexion si le formulaire est valide : 
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    //api renvoie les info sous format jsons sous les clés email et password
    body: JSON.stringify({
      email: document.querySelector("#email_login").value,
      password: document.querySelector("#password").value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        //récupère le token de l'api pour permettre la connexion :
        sessionStorage.setItem("token", data.token);
        const token = sessionStorage.getItem("token", data.token);
        console.log("token récupéré", token);

        //renvoie vers la page principale une fois la connexion réussit :
        window.location.href = "./";
      } else {
        //affiche une alert si les info de co sont incorrect : 
        alert("Veuillez vérifier vos informations de connexion.");
       
      }
     
    })
    .catch((error) => {
      console.error("erreur backend", error);
      alert("Une erreur s'est produite lors de la connexion");
    });
});







