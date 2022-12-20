const modal01 = document.querySelector("#etape-modal-1");
const modal02 = document.querySelector("#etape-modal-2");
const btnModal01 = document.querySelector("#lien-button");
const backModal = document.querySelector(".fa-thin");
let stateModal = false;

const modalGlobal = document.querySelector(".modalGlobal");

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

document.querySelectorAll(".closebtn").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });
});

/**
 * FERMETURE DE LA MODAL EN CAS DE CLIC EXTERIEUR
 */

document.addEventListener("click", (e) => {
  if (
    !e.target.closest("#etape-modal-1") &&
    !e.target.closest("#etape-modal-2") &&
    e.target.getAttribute("id") !== "btn-open-modif-modal" &&
    stateModal === true
  ) {
    console.log("fermeture modal");
    closeModal();
  }
});

function closeModal() {
  stateModal = false;
  modalGlobal.style.display = "none";
  //modalGlobal.visibility = "none";
}

function openModal1() {
  stateModal = true;
  modalGlobal.style.display = "table";
  modalGlobal.style.position = "absolute";
  modal01.style.display = "";
  modal02.style.display = "none";
}
