
class RouteService {
    constructor(){
        this.URI = 'http://localhost:3000/api/routes'
    }

    async getRoute(){
        // se realiza la peticion de get con el metodo fetch  la URI que tenemos arriba
        const response = await fetch(this.URI);
        const routes = await response.json();
        return routes;
    }

    async postRoute(route){
        const response = await fetch(this.URI, {
            method: 'POST',
            body: route,
        })
        const data = await response.json();
    }

    async deleteRoute(routeId){
        const response = await fetch(`${this.URI}/${routeId}`,{
            headers:{
                'Content-Type':'application/json',
            },
            method: 'DELETE',
        })
        const data = await response.json();
        console.log(data);
    }

    

}

export default RouteService;