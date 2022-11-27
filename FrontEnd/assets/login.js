
const submitBtn = document.getElementById('submit-login')



/*
submitBtn.addEventListener("click",function(e)
{
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('mdp').value
    console.log('login')
    console.log(email)
    console.log('Password')
    console.log(password)

    if(email === "sophie.bluel@test.tld" && password === "Sophie") {
        location.href = "http://localhost:63342/Portfolio-architecte-sophie-bluel/FrontEnd/edit_projets.html"
    } else {
        alert("Mauvais identifiant au mot de passe")
        console.log("mausvais login")

    }

} )



fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
},
    body: JSON.stringify(jsonBody)
})
*/



const exampleForm = document.getElementById("login-form");
exampleForm.addEventListener("submit",handleFormSubmit);



/**
 * Event handler for a form submit event.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 *
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;

    console.log(form)

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });

        console.log({ responseData });
        setCookie('user',responseData.token, 1 )
        if(responseData.token) {
         location.href = "http://localhost:63342/Portfolio-architecte-sophie-bluel/FrontEnd/index.html"

        }


    } catch (error) {
        console.error(error);
    }
}


/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */
async function postFormDataAsJson({ url, formData }) {
    console.log('----------FORMDATA')
    console.log(formData)
    console.log(formData.get('email'))
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    console.log(formDataJsonString)


    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();

}

/**
 *Ajoute un cookie
 *
 * @param name
 * @param value
 * @param expireDays
 */
function setCookie(name, value, expireDays) {
    const exDate = new Date()
    exDate.setDate(exDate.getDate() + expireDays)
    document.cookie = name + "=" + value +
        ((expireDays==null) ? "" : ";expires="+exDate)
}

