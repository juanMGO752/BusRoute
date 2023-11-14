import RouteService from "./services/RouteService";
const routeService = new RouteService();

class UI {

    // funcion que pinta las rutas
    async renderRoutes() {
        const routes = await routeService.getRoute();
        const despliegueRutas = document.getElementById('despliegue-rutas');
        const itemsSearcherStart = document.getElementById('input-autocom-start');
        const itemsSearcherEnd = document.getElementById('input-autocom-end');
        const routeMapsContainer = document.getElementById('route-maps'); //** */
        routeMapsContainer.innerHTML = '';//** */
        despliegueRutas.innerHTML = ''

        const containerNewButtons = document.createElement('div');
        containerNewButtons.className = 'route-buttons-container container';

        routes.forEach(route => {
            if (route.collectionKeyPoints.includes(itemsSearcherStart.value) && route.collectionKeyPoints.includes(itemsSearcherEnd.value)) {
                const newButton = document.createElement('div');
                newButton.className = 'container-button'
                newButton.innerHTML = `
                    <a href="#" class="view" _id="${route._id}">${route.company} (${route.tittleRoute})</a>
                    `
                containerNewButtons.appendChild(newButton);
            };

        });
        despliegueRutas.appendChild(containerNewButtons);
        this.clearRouterForm();
    }

    async renderAllRoutes() {
        const routes = await routeService.getRoute();
        const despliegueRutas = document.getElementById('despliegue-rutas');
        const routeMapsContainer = document.getElementById('route-maps'); //** */
        routeMapsContainer.innerHTML = '';//** */
        despliegueRutas.innerHTML = ''

        const containerNewButtons = document.createElement('div');
        containerNewButtons.className = 'route-buttons-container container';

        routes.forEach(route => {
            if (route.tittleRoute != "ListToRouteStart") {
                const newButton = document.createElement('div');
                newButton.className = 'container-button'
                newButton.innerHTML = `
                    <a class="view" _id="${route._id}">${route.company} (${route.tittleRoute})</a>
                    `
                containerNewButtons.appendChild(newButton);
            };

        });
        despliegueRutas.appendChild(containerNewButtons);
        this.clearRouterForm();
        
    }

    async renderRoutesMaps(idMap) {
        const routes = await routeService.getRoute();
        const routeMapsContainer = document.getElementById('route-maps'); //** */
        routeMapsContainer.innerHTML = '';//** */

        const objMap = routes.find((route) =>route._id === idMap);

        
        const containerTitleRoute = document.createElement('div');
        const containerMap = document.createElement('div');//** */
        const lista = document.createElement('ul');//** */
        const imgMap = document.createElement('div');

        lista.className = 'list-rute';

        containerTitleRoute.className = 'container-title-point';
        containerTitleRoute.innerHTML =`<h2 class="title-route-map">${objMap.tittleRoute}</h2>`;

        imgMap.className = 'container-img-map';
        imgMap.innerHTML = `${objMap.iframe}`;

        lista.innerHTML = `<h3>${objMap.tittleRoute}</h3>`;

        containerMap.className='container-map container'
        objMap.collectionKeyPoints.forEach((point) =>{
            const itemLista = document.createElement('li');//** */
            itemLista.innerHTML=
            `
            ${point}
            `
            lista.appendChild(itemLista);
        })
        containerTitleRoute.appendChild(lista);
        containerMap.appendChild(containerTitleRoute);
        containerMap.appendChild(imgMap);

        
        routeMapsContainer.appendChild(containerMap);//** */
        return(false);
    }

    // funcion del autocompletar, intercepta los datos entrantes con los de la base
    async autocompletar(location) {
        const routes = await routeService.getRoute();

        const arraysRoutes = routes.find((route) => route.tittleRoute === "ListToRouteStart")
        const arrayRoutesStart = arraysRoutes.collectionRouteStart;

        return arrayRoutesStart.filter(e => {
            return e.toLocaleLowerCase().startsWith(location.toLocaleLowerCase())
        })

    }

    clearSuggestions(){
        let mapRoutes = document.getElementsByTagName("route-maps");
        mapRoutes.innerHTML=``;
        let sugerencias = document.getElementById("routes-end");
        sugerencias.innerHTML = ``;
        sugerencias = document.getElementById("routes-start");
        sugerencias.innerHTML = ``;
    }


    clearRouterForm() {
        document.getElementById('route-form').reset();
    }

    renderMessages(objeto, e){ 
        const message = document.createElement('div');
        message.innerHTML=`<p style="/* background-color: gray; */font-size: 30px;/* display: flex; *//* font-weight: bold; *//* align-self: center; *//* flex-direction: column; *//* flex-wrap: nowrap; *//* align-content: stretch; *//* justify-content: center; *//* align-items: center; */text-align: center;margin: 20px 0;">${e}</p>`;
        objeto.appendChild(message);
        
        setTimeout( () => message.remove() ,2300)
    }

}

export default UI;