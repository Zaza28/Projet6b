//page de connexion :

const connectBtn = document.querySelector("#connectBtn");
connectBtn.addEventListener("click", function () {
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

        //remplir les champs du formulaire avec les données de l'user :
        document.getElementById("email_login").value = data.userId;
        document.getElementById("password").value = "";

        //renvoie vers la page principale une fois la connexion réussit :
        window.location.href = "./";
      } else {
        alert("id incorrect");
      }
    })
    .catch((error) => {
      console.error("erreur backend", error);
      alert("Une erreur s'est produite lors de la connexion");
    });
});

//vérifie si l'user est bien connecter pour permettre d'afficher 
//les éléments de connexions :
const isLogin = () => {
  return sessionStorage.getItem("token") ? true : false;
};
