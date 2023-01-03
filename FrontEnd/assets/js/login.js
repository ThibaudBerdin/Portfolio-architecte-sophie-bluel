const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", submitLoginForm);

function submitLoginForm(event) {
  event.preventDefault();
  const form = event.currentTarget;

  const url = form.action;
  const formData = new FormData(form);

  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJsonString,
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        console.log(typeof response);
        return response.json();
      }
    })
    .then((rJson) => {
      console.log(rJson);
      localStorage.setItem("token", rJson.token);
      if (rJson.token) {
        location.href =
          "http://localhost:63343/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
      }
    })
    .catch((error) => {
      console.error("IDENTIFIANT INTROUVABLE");
      document.querySelector(".erreur-login").innerText =
        "Erreur dans l’identifiant ou le mot de passe";
    });
}
