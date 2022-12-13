//Variable d'état pour le boutton d'envoi d'un projet
let imgLoad = false;
let titleLoad = false;
let categoryLoad = false;

//Gestion de la récupération et de l'affichage de l'image en preview
let imageUpload = document.querySelector("#imageUpload");
const reader = new FileReader();

function previewPicture(e) {
  console.log("-----Preview Picture-----");
  const input = e.target;
  const inputFile = input.files[0];

  if (inputFile) {
    addListeners(reader);
    reader.readAsDataURL(inputFile);
  }
}

function addListeners(reader) {
  reader.addEventListener("load", handleEvent);
}

function handleEvent(event) {
  document
    .querySelector(".input-upload-image")
    .setAttribute("style", "display:none");

  document
    .querySelector("#p-format-accept")
    .setAttribute("style", "display:none");

  imageUpload.src = reader.result;
  imgLoad = true;
  activeButton();
  loadNewImage();
}

//Gestion des états du bouton
function activeButton() {
  if (imgLoad && titleLoad && categoryLoad) {
    document
      .querySelector("#submit-new-projet")
      .setAttribute("style", "background:#1D6154");
  } else {
    document
      .querySelector("#submit-new-projet")
      .setAttribute("style", "background:#a7a7a7");
  }
}

function activeTitleLoad(e) {
  if (e.target.value) {
    titleLoad = true;
    activeButton();
  } else {
    titleLoad = false;
    activeButton();
  }
}

function activeCategoryLoad(e) {
  if (e.target.value) {
    categoryLoad = true;
    activeButton();
  } else {
    categoryLoad = false;
    activeButton();
  }
}

function loadNewImage() {
  const imageLoad = document.querySelector(".upload-image");
  imageLoad.onclick = () => {
    console.log("Reload Image");
    window.location.reload();
  };


  //document.querySelector("#image").addEventListener("click", ());
}
