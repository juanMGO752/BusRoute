import './styles/app.css';
import UI from './UI.JS';
import SuggestionService from './services/SuggestionService';


// evento de carga de dom, ejecuta las funciones al cargar loa pagina
document.addEventListener('DOMContentLoaded',()=>{
    const ui = new UI();
});




// captura el evento del formulario de sugerencias y envio a DB
document.getElementById('suggestion-form')
    .addEventListener('submit',e =>{
        const ui = new UI();
        const nameUser = document.getElementById("name").value;
        const emailUser = document.getElementById("mail").value;
        const caseUser = document.getElementById("case").value;
        const messageUser = document.getElementById("userMessage").value;
        const suggestionForm = document.getElementById('suggestion-form');

        console.log(nameUser,emailUser,caseUser,messageUser);
        
        const formData = new FormData();
        formData.append('nameUser', nameUser)
        formData.append('emailUser', emailUser)
        formData.append('caseUser',caseUser)
        formData.append('messageUser',messageUser)
        
        console.log(formData);

        const suggestionService = new SuggestionService();
        suggestionService.postSuggestion(formData)

        e.preventDefault();
        suggestionForm.reset();

        ui.renderMessages(suggestionForm,"! Tu sugerencia se envió correctamente, muchas gracias ¡");

});


// captura el evento de envio de los puntos de ruta que el usuario necesita y pinta los mapas
// los cuales crucen ruta con los puntos que fueron enviados
document.getElementById('route-form').addEventListener('submit',e =>{
    const ui = new UI();
    ui.renderRoutes()
    e.preventDefault();
    ui.clearSuggestions()
})

// evento que muestra los mapas de las rutas encontradas
document.getElementById('despliegue-rutas').addEventListener('click', e => {
    const ui = new UI();
    if(e.target.classList.contains('view')){
        ui.renderRoutesMaps(e.target.getAttribute('_id'))
    };
});

// autocompletar del primer punto de ruta
document.getElementById('input-autocom-start').addEventListener('input',({target}) =>{
    const data = target.value;
    const ui = new UI();
    const sugerencias = document.getElementById("routes-start")
    sugerencias.innerHTML = ``
    if(data.length){
        const autoComplete = ui.autocompletar(data);
        autoComplete.then(e => e.forEach(location =>{
            const item = document.createElement('li');
            item.className = 'suggestions-start'
            item.innerHTML = `${location}`
            sugerencias.appendChild(item)
        }))
    }

});

// autocompletar del segundo punto de ruta
document.getElementById('input-autocom-end').addEventListener('input',({target}) =>{
    const data = target.value;
    const ui = new UI();
    const sugerencias = document.getElementById("routes-end");
    
    sugerencias.innerHTML = ``
    if(data.length){
        const autoComplete = ui.autocompletar(data);   
        autoComplete.then(e => e.forEach(location =>{
            const item = document.createElement('li');
            item.className = 'suggestions-end'
            item.innerHTML = `${location}`
            sugerencias.appendChild(item)
        }))
    }
    sugerencias.innerHTML = ``
    

})

// captura el click que se hace en el autocompletar y coloca el valor seleccionado
document.getElementById("route-form").addEventListener('click', e =>{
    const suggestionsEnd = document.getElementById("routes-end");
    const suggestionsStart = document.getElementById("routes-start");
    const inputRoutesStart = document.getElementById("input-autocom-start");
    const inputRoutesEnd = document.getElementById("input-autocom-end");

    if(e.target.classList.contains('suggestions-start')){
        inputRoutesStart.value = e.target.innerHTML;
        suggestionsStart.innerHTML= '';
    }else if(e.target.classList.contains('suggestions-end')){
        inputRoutesEnd.value = e.target.innerHTML
        suggestionsEnd.innerHTML= '';
    }
});

document.getElementById("show-all-routes").addEventListener('click', e =>{
    const ui = new UI();
    ui.renderAllRoutes();
});