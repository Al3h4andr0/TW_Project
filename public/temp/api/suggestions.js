
const rootAPI = "http://localhost:8000/api/locations/search"
const rootAPIGetLocation = "http://localhost:8000/api/locations"

export default class Suggestions{
    constructor(inputElement,suggestionsElement, side){
        if (!inputElement || !suggestionsElement) {
            throw 'inputElement,suggestionsElemen required so we know where we render the things';
        }
        this.inputElement = inputElement;
        this.suggestionsElement = suggestionsElement;
        this.suggestions = [];
        this.side = side;
    }

    async fetchSuggestions(keyword){
        this.suggestions = await fetch(rootAPI + '?' + new URLSearchParams({keyword:keyword}), {method: 'GET'});
        this.suggestions = await this.suggestions.json();
       return this.suggestions;
    }

    async bindListeners()
    {
    this.inputElement.addEventListener('input',async (_) => {
        const keyword = this.inputElement.value;
        if(keyword.length == 0)
               this.renderSuggestionsElement(null); //empty div
    
        if(keyword.length == 3)
            this.suggestions = await this.fetchSuggestions(this.inputElement.value);
        else
        {
            this.suggestions.sort((s1,s2) => { // is something like true - (minus) false, it sorts first elements to match the case; if the keyword is deleted, it fetches the new one from backend
                return (s2.title.toLowerCase()).includes(keyword.toLowerCase()) - (s1.title.toLowerCase()).includes(keyword.toLowerCase())});   
        }
        this.renderSuggestionsElement(this.suggestions); 
    });

    this.inputElement.addEventListener('keypress',async (e) => {
        if(e.key === "Enter")
       { var suggestionLiArray = Array.from(this.suggestionsElement.children);
        var listOfIds = "";
        suggestionLiArray.forEach(suggestion => listOfIds+=suggestion.id.split("ID")[1] + ",");
        listOfIds = listOfIds.slice(0, -1); //replace last character (in this case comma) with null;
     
        
        var locations =await fetch((rootAPIGetLocation + "/?ids=" + listOfIds), {method: 'GET'})
        // locations = await locations.json();
        console.log("LOCATIONS AFTER ENTER: ", locations);}
        //now they hould be rendered but idk how
    });

    }

    renderSuggestionsElement(suggestionsList)
    {
        this.suggestionsElement.innerHTML = '';
        if(suggestionsList !== null)
       
        for(var i in suggestionsList.slice(0,7)) //first 7 occurences
       this.suggestionsElement.innerHTML+=this.renderSuggestion(suggestionsList[i]);


   var suggestionLiArray = Array.from(this.suggestionsElement.children);
  suggestionLiArray.forEach(suggestion => this.redirectSuggestionAddListener(suggestion));
} 
    

    renderSuggestion(suggestion)
    {
      return `<li id=locationID${suggestion.id}>
       ${suggestion.title.toString()}
        </li>`;
    }

   redirectSuggestionAddListener(suggestion)
    {
        suggestion.addEventListener("click",async (_) => {
            const locationID = suggestion.id.split("ID")[1];
            var location = await fetch(rootAPIGetLocation + "/" + locationID,{method: 'GET'});
            location = await location.json();
            console.log("LOCATION AFTER CLICK" ,location);
            //now it should be rendered on side but idk how
            // this.side.render([location]);
            // this.side.addListener([location]);
        });
    }


    onSubmitSearch(){
        var ids = "";
        this.suggestions.forEach((suggestion) => ids+=suggestion.id + ",");
        console.log(ids);
    }
}