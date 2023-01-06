import { createElement } from "./modules/createElement.mjs";

let lienAPI = "http://localhost:5678/api/";

/**
 * Recuperation depuis l'API et ajout des projets sur la page d'accueil avec attribution des
 * catégories dans les classes
 */
let tableauProjets = fetch(lienAPI + "works")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    let gallery = document.getElementById("gallery");

    for (const projet of value) {
      let figure = document.createElement("figure");
      figure.setAttribute("id", "accueil-projet-" + projet.id);
      figure.setAttribute("class", "figure-work");
      let figcaption = document.createElement("figcaption");
      figcaption.innerText = projet.title;
      let img = document.createElement("img");
      img.setAttribute("src", projet.imageUrl);
      img.setAttribute("crossorigin", "anonymous");
      figure.setAttribute("data-cat-id", "cat-" + projet.categoryId);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }

    return value;
  });

/**
 * Fonction pour ajout des projets dans modal editable
 **/

function listeTableauProjets(tableauProjets) {
  tableauProjets.then((value) => {
    for (const e in value) {
      createElement(
        "div",
        { class: "t-relative", id: "projet" + value[e].id },
        "#grid-projets"
      );

      createElement(
        "div",
        { id: "bloc-img-" + value[e].id },
        "#projet" + value[e].id
      );

      createElement(
        "img",
        {
          class: "object-fit-cover",
          crossorigin: "anonymous",
          src: value[e].imageUrl,
          id: "img-projet-" + value[e].id,
        },
        "#bloc-img-" + value[e].id
      );

      const delElem = createElement(
        "div",
        {
          class: "icon-delete",
          id: "delete-icone-" + value[e].id,
          "data-id": value[e].id,
        },
        "#bloc-img-" + value[e].id
      );

      createElement(
        "i",
        { class: "icone-suppression fa-light fa-trash" },
        "#delete-icone-" + value[e].id
      );

      createElement(
        "h3",
        { class: "t-flex-wrap" },
        "#projet" + value[e].id,
        value[e].title
      );

      delElem.addEventListener("click", () => {
        delWork(delElem.dataset.id);
      });
    }
  });
}

//Appel de la fonction d'ajout de projets
listeTableauProjets(tableauProjets);

/**
 * SUPPRIME UN PROJET AVEC L'ID
 */

export function delWork(id) {
  fetch(lienAPI + "works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  }).then((r) => {
    if (r.ok) {
      document.querySelector("#projet" + id).remove();
      document.querySelector("#accueil-projet-" + id).remove();
    }
  });
}

/**
 * Fonction de suppression de tous les projets
 */
function removeAllProjets() {
  fetch(lienAPI + "works")
    .then((data) => data.json())
    .then((jsonListWork) => {
      for (const i of jsonListWork) {
        delWork(i.id);
      }
    });
}

/**
 *Gestion du local Storage pour l'authentification
 * Modification de la page d'accueil
 **/

if (localStorage.getItem("token")) {
  const entete = document.querySelector(".ajout-entete");
  const divEt = createElement("div", { class: "entete-edition" });
  document.querySelector("header").setAttribute("style", "margin-top:100px");
  divEt.innerHTML += `<div class="mode-edition">
    <i class="fa-light fa-pen-to-square"></i>
    Mode édition
    </div>
    <button class="btn-valider-changements">publier les changements</button>
    </div>`;
  entete.appendChild(divEt);

  const divEditLien = document.querySelector("#projets-edit-lien");
  divEditLien.innerHTML += `<a class="t-a-td" href="" id="btn-open-modif-modal"><i class="fa-light fa-pen-to-square"></i> modifier</a>`;
  divEditLien.addEventListener("click", (e) => {
    e.preventDefault();
    openModal1();
  });

  document
    .querySelector("#btn-open-modif-modal")
    .addEventListener("click", (e) => {
      openModal1();
    });

  const grpBtnFlt = document.querySelector(".grp-btn-filter");
  grpBtnFlt.style.visibility = "hidden";

  //MODIFICATION DU LOGIN / LOGOUT
  const login = document.querySelector(".menu-login");
  login.innerText = "logout";
  login.setAttribute("href", "./logout.html");
  login.addEventListener("click", logout);

  //modif intro
  document.querySelector(
    "#edit-intro"
  ).innerHTML = `<i class="fa-light fa-pen-to-square" style="padding: 20px 0"></i> modifier`;
}

/**
 * FONCTION LOGOUT
 */

function logout(event) {
  event.preventDefault();
  localStorage.clear();
  location.href =
    //"http://localhost:63343/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
    "index.html";
}

/**
 * Recuperer les catégories
 */

fetch(lienAPI + "categories")
  .then((data) => data.json())
  .then((categories) => {
    for (const i in categories) {
      const option = createElement(
        "option",
        { value: categories[i].id },
        "#categorie-select",
        categories[i].name
      );
    }
  });

/**
 * Ajout un evenement pour supprimer tous les projets
 * @type {Element}
 *
 */
const btnSupProjets = document.querySelector("#supprimer-projets");
btnSupProjets.addEventListener("click", removeAllProjets);

/**
 * AJOUT DES BOUTONS DE FILTRE DES PROJET
 *
 */
fetch("http://localhost:5678/api/categories", {
  headers: {
    Accept: "application/json",
  },
})
  .then(function (r) {
    if (r.ok) {
      return r.json();
    }
  })
  .then((categories) => {
    for (const category of categories) {
      const filter = createElement(
        "div",
        { class: "btn-filter", id: "cat-" + category.id },
        "#grp-btn-filter",
        category.name
      );
      filter.addEventListener("click", filterProjets);
    }
    const filterAll = createElement(
      "div",
      { class: "btn-filter", id: "all" },
      "#grp-btn-filter",
      "Tous"
    );
    filterAll.addEventListener("click", filterProjets);
  });

/**
 * FUNCTION DE FILTRE DES PROJETS
 *
 */
function filterProjets(e) {
  const projets = document.querySelectorAll(".figure-work");

  for (const projet of projets) {
    if (e.srcElement.getAttribute("id") !== "all") {
      if (
        projet.getAttribute("data-cat-id") === e.srcElement.getAttribute("id")
      ) {
        projet.style.display = "";
      } else {
        projet.style.display = "none";
      }
    } else {
      projet.style.display = "";
    }
  }

  return "OK";
}

document.querySelector("#titre").addEventListener("change", activeTitleLoad);

document
  .querySelector("#categorie-select")
  .addEventListener("change", activeCategoryLoad);
