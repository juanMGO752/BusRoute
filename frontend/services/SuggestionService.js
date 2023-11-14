
class SuggestionService {
    constructor(){
        this.URI = '/api/suggestions'
    }

    async getSuggestion(){
        // se realiza la peticion de get con el metodo fetch  la URI que tenemos arriba
        const response = await fetch(this.URI);
        const suggestions = await response.json();
        return suggestions;
    }

    async postSuggestion(suggestion){
        const response = await fetch(this.URI, {
            method: 'POST',
            body: suggestion,
        })
        const data = await response.json();
        console.log('suggestion saved')
    }

    async deleteSuggestion(suggestionId){
        const response = await fetch(`${this.URI}/${suggestionId}`,{
            headers:{
                'Content-Type':'application/json',
            },
            method: 'DELETE',
        })
        const data = await response.json();
        console.log(data);
    }

    

}

export default SuggestionService;