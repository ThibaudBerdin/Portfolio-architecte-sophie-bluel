

let imageUpload = document.querySelector('#imageUpload')

function previewPicture(e){
    console.log("preview Picture")
    console.log(e.files)
    const [picture]= e.files
    if(picture) {
        const reader = new FileReader();

        reader.onload = function(e){
            console.log(e.target.result)
            imageUpload.src = e.target.result
            reader.readAsDataURL(picture)
        }
    }
}