let lienAPI = "http://localhost:5678/api/"

/**
 * Recuperation depuis l'API et ajout des projets sur la page d'accueil avec attribution des
 * catégories dans les classes
 */
let tableauProjets = fetch(lienAPI + "works")
    .then(function (res) {

        if (res.ok) {
            return res.json()
            console.log(res.json)
        }
    })
    .then(function (value) {

        let gallery = document.getElementById("gallery")

        for (const e in value) {

            let figure = document.createElement('figure')
            figure.setAttribute('id', 'accueil-projet-' + value[e].id)
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

/**
 * Ajout projets dans modal editable
 **/

function listeTableauProjets(tableauProjets) {
    tableauProjets.then((value) => {
        for (const e in value) {
            createElement('div', {'id': 'projet' + value[e].id, 'class': ''}, '#grid-projets',)
            createElement('img', {
                'class': '', 'crossorigin': 'anonymous', 'src': value[e].imageUrl, 'id': 'img-projet-' + value[e].id
            }, '#projet' + value[e].id,)
            createElement('h3', {'class': ''}, '#projet' + value[e].id, value[e].title)
            const delElem = createElement('button', {
                'class': 'icon-delete', 'id': '#delete-icone' + value[e].id, 'data-id': value[e].id
            }, '#projet' + value[e].id, 'Paaaa')
            delElem.addEventListener('click', () => {
                delWork(delElem.dataset.id)
            })
        }
    })
}

listeTableauProjets(tableauProjets)


/**
 * SUPPRIME UN PROJET AVEC L'ID
 */

function delWork(id) {
    fetch(lienAPI + "works/" + id, {
        method: 'DELETE', headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'), "Content-Type": "application/json"
        }
    })
        .then((r) => {
            if (r.ok) {
                document.querySelector('#projet' + id).remove()
                document.querySelector('#accueil-projet-' + id).remove()
            }
        })
}


/**
 * Supprime tous les projets
 */
function removeAllProjets() {
    fetch(lienAPI + 'works')
        .then(data => data.json())
        .then(jsonListWork => {
            for (const i of jsonListWork) {
                delWork(i.id)
            }
        })
}


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

    projets.forEach(element => element.style.display = "")
}

function filterObjetsOnClick() {
    allDisplayNone()
    const projets = document.querySelectorAll('.figure-objets')

    projets.forEach(element => element.style.display = "")
}

function filterAppartementOnClick() {
    allDisplayNone()
    const projets = document.querySelectorAll('.figure-appartements')

    projets.forEach(element => element.style.display = "")
}

function filterHotelOnClick() {
    allDisplayNone()
    const projets = document.querySelectorAll('.figure-hotels')

    projets.forEach(element => element.style.display = "")
}

let divUserAuth = createElement('div', {'class': 'div-user-auth', 'data': 'test'})


/**
 * Fonction de création d'un élément html
 * @param tagName
 * @param attributes
 * @param elementParentId
 * @param text
 * @returns {*}
 */
function createElement(tagName, attributes = {}, elementParentId, text) {
    const element = document.createElement(tagName)

    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value)
    }

    if (text) {
        element.innerText = text
    }
    if (elementParentId) {
        const elemParent = document.querySelector(elementParentId)
        elemParent.appendChild(element)
    }
    return element
}


/**
 *Gestion des cookies pour l'authentification
 **/
let cookiesLogUser = document.cookie


if (localStorage.getItem('token')) {
    const entete = document.querySelector('.ajout-entete')
    const divEt = createElement('div', {'class': 'entete-edition'})

    divEt.innerHTML += `<div class="mode-edition">
    Mode Edition
    </div>
    <button class="btn-valider-changements">publier les changements</button>
    </div>`
    entete.appendChild(divEt)


    editIcone = createElement('a', {'class': 'fa-light fa-pen-to-square', 'href': "#id01"}, '#portfolioEdit', 'Editer')


    const grpBtnFlt = document.querySelector('.grp-btn-filter')
    grpBtnFlt.style.visibility = "hidden"

}


/**
 * Recuperer les catégories
 */

fetch(lienAPI + "categories")
    .then(data => data.json())
    .then(categories => {
        for (const i in categories) {

            const option = createElement('option', {'value': categories[i].id}, '#categorie-select', categories[i].name)

        }
    })

/**
 * Ajout un evenement pour supprimer tous les projets
 * @type {Element}
 *
 */
const btnSupProjets = document.querySelector('#supprimer-projets')
btnSupProjets.addEventListener('click', removeAllProjets)

