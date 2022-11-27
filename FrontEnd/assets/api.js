let lienAPI = "http://localhost:5678/api/"

/**
 * Recuperation depuis l'API et ajout des projets sur la page d'accueil avec attribution des
 * catégories dans les classes
 */
let tableauProjets = fetch(lienAPI + "works")
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

        return value
    })

tableauProjets.then((value) => {
    for(const e in value ) {
        console.log(value[e].title)
    }
})

/**
 *
 * Bloc d'utilisation des filtres du projet de l'index
 *
 */
const btnFilterObjets = document.querySelector('#objets')
const bntFilterAppartement = document.querySelector('#appartements')
const bntFilterHotel = document.querySelector('#hotels')
const bntFilterTous = document.querySelector('#tous')

btnFilterObjets.addEventListener("click", filterObjetsOnClick)
bntFilterAppartement.addEventListener("click", filterAppartementOnClick)
bntFilterHotel.addEventListener("click", filterHotelOnClick)
bntFilterTous.addEventListener("click", filterTousOnClick)


function allDisplayNone() {
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

let divUserAuth = createElement('div', {'class': 'div-user-auth', 'data': 'test'})


/**
 * Fonction de création d'un élément html
 * @param tagName
 * @param attributes
 * @param text
 * @returns {*}
 */
function createElement(tagName, attributes = {}, text) {
    const element = document.createElement(tagName)
    console.log('CRETATE ELEMENT')
    console.log(attributes)
    console.log(Object.entries(attributes))
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value)
    }
    if (text) {
        element.innerText = text
    }
    return element
}

let cookiesLogUser = document.cookie


console.log(cookiesLogUser)

if(cookiesLogUser){
    const entete = document.querySelector('.ajout-entete')
    const divEt = createElement('div', {'class': 'entete-edition'})

    divEt.innerHTML += `<div class="mode-edition">
    Mode Edition
    </div>
    <button class="btn-valider-changements">publier les changements</button>
    </div>`
    entete.appendChild(divEt)

    const portfolio = document.querySelector('#portfolio h2')
    editIcone = createElement('div', {'class': 'icone-edit'}, 'Editer')
    portfolio.appendChild(editIcone)

    const grpBtnFlt = document.querySelector('.grp-btn-filter')
    grpBtnFlt.style.visibility = "hidden"

}