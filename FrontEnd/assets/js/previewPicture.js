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
  document
    .querySelector("#submit-new-projet")
    .setAttribute("style", "background:#1D6154");
  imageUpload.src = reader.result;
}
