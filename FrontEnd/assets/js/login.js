const exampleForm = document.querySelector("#login-form")
exampleForm.addEventListener("submit", submitLoginForm)


/**
 async function submitLoginForm(event){
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const r = await fetch(form.action, {
        method: 'POST',
        body:  formDataJsonString
    })

    if (r.ok) {
        return r.json()
    }
    throw new Error('Impossible de contacter le serveur')
}
 */


function submitLoginForm(event) {

    event.preventDefault()
    const form = event.currentTarget

    const url = form.action
    const formData = new FormData(form)
    console.log(formData)
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);


    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJsonString
    })
        .then((response) => {
            if (response.ok) {

                console.log(response)
                console.log(typeof response)
                return response.json()

            }
        })
        .then((rJson) => {
            console.log(rJson)
            localStorage.setItem('token', rJson.token)
            if (rJson.token) {
                location.href = "http://localhost:63342/Portfolio-architecte-sophie-bluel/FrontEnd/index.html"
            }
        })
        .catch((error) => {
            console.error('IDENTIFIANT INTROUVABLE')
            if(document.querySelector('.mauvais-login')){
                document.querySelector('.mauvais-login').remove()
            }
            createElement('div', {'class': 'mauvais-login'}, 'h2', 'MAUVAIS IDENTIFIANT OU MOT DE PASSE')
        })

}


/**
 *Ajoute un cookie
 *
 * @param name
 * @param value
 * @param expireDays

 function setCookie(name, value, expireDays) {
    const exDate = new Date()
    exDate.setDate(exDate.getDate() + expireDays)
    document.cookie = name + "=" + value + ((expireDays == null) ? "" : ";expires=" + exDate)
}

 */

