//page de connexion :


//page de connexion :


const connectBtn = document.querySelector("#connectBtn");
connectBtn.addEventListener("click", function () {


  const loginInfo = {
    email: document.querySelector("#email_login").value,
    password: document.querySelector("#password").value,
  };

  const infoUser = JSON.stringify(loginInfo);

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: infoUser,
  })
  .then((response)=> response.json())
  .then((data)=>{
    if(data.token){
        console.log(data)
    sessionStorage.setItem('token', data.token);
    window.location.href= './';
    }else{
      alert("id incorrect");
    }
  
  })
});


const verifyLogin = (login) => {

const baliseEmail = document.querySelector("#email_login");
baliseEmail.addEventListener("charge", function (event){
  const valeurEmail = event.targer.value;
  if (valeurEmail===""){
    console.log ("vide");
  }else{
    console.log ("rempli");
  }
})


};