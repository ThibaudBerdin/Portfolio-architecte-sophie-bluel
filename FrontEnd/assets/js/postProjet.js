import { createElement } from "./modules/createElement.mjs";
import { delWork } from "./api.js";

const addProjetForm = document.querySelector("#add-projet");
addProjetForm.addEventListener("submit", postNewProjet);

function postNewProjet(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const url = form.action;
  const formData = new FormData(form);

  console.log(formData);

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      Accept: "application/Json",
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        form.reset();

        document.querySelector("#imageUpload").setAttribute("src", "");
        document
          .querySelector(".input-upload-image")
          .setAttribute("style", "display:");
        document
          .querySelector("#icon-form-upload")
          .setAttribute("style", "display:");
        return response.json();
      }
    })
    .then((responseJson) => {
      console.log(responseJson);
      createElement(
        "div",
        { class: "t-relative", id: "projet" + responseJson.id },
        "#grid-projets"
      );
      createElement(
        "div",
        { id: "bloc-img-" + responseJson.id },
        "#projet" + responseJson.id
      );

      createElement(
        "img",
        {
          class: "object-fit-cover",
          crossorigin: "anonymous",
          src: responseJson.imageUrl,
          id: "img-projet-" + responseJson.id,
        },
        "#bloc-img-" + responseJson.id
      );

      const delElem = createElement(
        "div",
        {
          class: "icon-delete",
          id: "delete-icone-" + responseJson.id,
          "data-id": responseJson.id,
        },
        "#bloc-img-" + responseJson.id
      );

      createElement(
        "i",
        { class: "icone-suppression fa-light fa-trash" },
        "#delete-icone-" + responseJson.id
      );

      createElement(
        "h3",
        { class: "t-flex-wrap" },
        "#projet" + responseJson.id,
        responseJson.title
      );

      delElem.addEventListener("click", () => {
        delWork(delElem.dataset.id);
      });
      const imageLoad = document.querySelector(".upload-image");
      imageLoad.removeEventListener("click", reloadImage);

      //Creation sur page Accueil
      let gallery = document.getElementById("gallery");
      let figure = document.createElement("figure");
      figure.setAttribute("id", "accueil-projet-" + responseJson.id);
      let figcaption = document.createElement("figcaption");
      figcaption.innerText = responseJson.title;
      let img = document.createElement("img");
      img.setAttribute("src", responseJson.imageUrl);
      img.setAttribute("crossorigin", "anonymous");
      figure.setAttribute("data-cat-id", "cat-" + responseJson.categoryId);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);

      //RETOUR MODALE
      resetWorkForm();
      activeButton();
      afficherModal01();
    });
}
