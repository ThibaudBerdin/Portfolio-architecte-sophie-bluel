let lienAPI = "http://localhost:5678/api/"


fetch(lienAPI + "works")
    .then(function (res) {
        if (res.ok) {
            return res.json()
        }
    })
    .then(function (value) {
        let gallery = document.getElementById("gallery")


        for (const e in value) {

            let figure = document.createElement('figure')
            let figcaption = document.createElement('figcaption')
            figcaption.innerText = value[e].title
            let img = document.createElement('img')
            img.setAttribute('src', value[e].imageUrl)
            img.setAttribute('crossorigin', 'anonymous')
            if (value[e].categoryId === 1) {
                figure.setAttribute('class', 'projet figure-objets')
            }
            if (value[e].categoryId === 2) {
                figure.setAttribute('class', 'projet figure-appartements')
            }
            if (value[e].categoryId === 3) {
                figure.setAttribute('class', 'projet figure-hotels')
            }
            figure.appendChild(img)
            figure.appendChild(figcaption)
            gallery.appendChild(figure)
        }
    })

const btnFilterObjets = document.querySelector('#objets')
const bntFilterAppartement = document.querySelector('#appartements')
const bntFilterHotel = document.querySelector('#hotels')
const bntFilterTous = document.querySelector('#tous')

btnFilterObjets.addEventListener("click", filterObjetsOnClick)
bntFilterAppartement.addEventListener("click", filterAppartementOnClick)
bntFilterHotel.addEventListener("click", filterHotelOnClick)
bntFilterTous.addEventListener("click", filterTousOnClick)


function allDisplayNone(){
    const projets = document.querySelectorAll('.projet')
    projets.forEach(e => e.style.display = "none")
}

function filterTousOnClick() {
    const projets = document.querySelectorAll('.projet')
    console.log(projets)
    projets.forEach(element => element.style.display = "")
}
function filterObjetsOnClick() {
    allDisplayNone()
    const projets = document.querySelectorAll('.figure-objets')
    console.log(projets)
    projets.forEach(element => element.style.display = "")
}
function filterAppartementOnClick() {
    allDisplayNone()
    const projets = document.querySelectorAll('.figure-appartements')
    console.log(projets)
    projets.forEach(element => element.style.display = "")
}
function filterHotelOnClick() {
    allDisplayNone()
    const projets = document.querySelectorAll('.figure-hotels')
    console.log(projets)
    projets.forEach(element => element.style.display = "")
}
