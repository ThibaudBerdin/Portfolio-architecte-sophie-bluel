const modal01 = document.querySelector("#etape-modal-1");
const modal02 = document.querySelector("#etape-modal-2");
const btnModal01 = document.querySelector("#lien-button");
const backModal = document.querySelector(".fa-thin");

const modalGlobal = document.querySelector("#id01");

modal02.setAttribute("style", "display:none");

btnModal01.addEventListener("click", function () {
  modal02.setAttribute("style", "display:''");
  modal01.setAttribute("style", "display:none");
});

backModal.addEventListener("click", function () {
  modal02.setAttribute("style", "display:none");
  modal01.setAttribute("style", "display:''");
});

function afficherModal01() {
  modal02.setAttribute("style", "display:none");
  modal01.setAttribute("style", "display:''");
}
