//page de connexion :

//fonction de validation du formulaire de connexion :
function validateLoginForm() {
  const email = document.getElementById("email_login").value;
  const password = document.getElementById("password").value;
  // Vérification des champs :
  if (email.trim() === "" || password.trim() === "") {
    alert("Veuillez remplir tous les champs du formulaire de connexion.");
    return false;
  }
  return true;
}

// Envoi de la requête de connexion si le formulaire est valide :
const connectBtn = document.querySelector("#connectBtn");
connectBtn.addEventListener("click", function () {
  if (!validateLoginForm()) {
    return;
  }
  // Envoi de la requête de connexion si le formulaire est valide :
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.querySelector("#email_login").value,
      password: document.querySelector("#password").value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        //récupère et stock le token pour permettre la connexion :
        sessionStorage.setItem("token", data.token);
        const token = sessionStorage.getItem("token", data.token);
        console.log("token récupéré", token);
        //renvoie vers la page principale avec les fonctionnalités de l'user connecté une fois la connexion réussit :
        window.location.href = "./";
      } else {
        alert("Veuillez vérifier vos informations de connexion.");
      }
    })
    .catch((error) => {
      console.error("erreur backend", error);
      alert("Une erreur s'est produite lors de la connexion");
    });
});

