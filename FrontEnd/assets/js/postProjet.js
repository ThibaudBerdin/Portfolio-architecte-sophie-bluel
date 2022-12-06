


const addProjetForm = document.querySelector('#add-projet')
addProjetForm.addEventListener('submit', postNewProjet)

function postNewProjet(event){
    event.preventDefault()
    const form = event.currentTarget
    const url = form.action
    const formData = new FormData(form)

    console.log(formData)


    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),

        },
        body: formData
    })

        .then((response) => {
           if(response.ok){
               location.href = "/FrontEnd/index.html"
           }
        })

}


