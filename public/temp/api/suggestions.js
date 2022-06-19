
const rootAPI = "http://localhost:8000/api/locations/search"
const rootAPIGetLocation = "http://localhost:8000/api/locations"

export default class Suggestions{
    constructor(inputElement,suggestionsElement, side,Map){
        if (!inputElement || !suggestionsElement) {
            throw 'inputElement,suggestionsElement required so we know where we render the things';
        }
        this.inputElement = inputElement;
        this.suggestionsElement = suggestionsElement;
        this.suggestions = [];
        this.side = side;
        this.Map=Map;
    }

    async fetchSuggestions(keyword){
        this.suggestions = await fetch(rootAPI + '?' + new URLSearchParams({keyword:keyword}), {method: 'GET'});
        this.suggestions = await this.suggestions.json();
       return this.suggestions;
    }

    async bindListeners()
    {
    this.inputElement.addEventListener('input',async (e) => {

        const keyword = this.inputElement.value;
        
        if(keyword.length == 0) // if search is empty, then empty the suggestions too
            {this.suggestionsElement.innerHTML=''; return;}

        //  if(e.inputType !== "insertText"){  // if the user is deleting something from search, don't pull again until it writes something
        //     return;
        // }
        
        this.suggestions = await this.fetchSuggestions(this.inputElement.value);

        this.renderSuggestionsElement(this.suggestions); 
    });

    this.inputElement.addEventListener('keypress',async (e) => {
        if(e.key === "Enter")
       { var suggestionLiArray = Array.from(this.suggestionsElement.children);
        var listOfIds = "";
        suggestionLiArray.forEach(suggestion => listOfIds+=suggestion.id.split("ID")[1] + ",");
        listOfIds = listOfIds.slice(0, -1); //replace last character (in this case comma) with null;
     
        
        var locations =await fetch((rootAPIGetLocation + "/?ids=" + listOfIds), {method: 'GET'})
        locations = await locations.json();
        //console.log("LOCATIONS AFTER ENTER: ", locations);
        this.side.renderAndReplace(locations);
        this.Map.renderPins(locations);
        this.side.addListener(locations);
        //delete what is in search bar and suggestions
        this.inputElement.value = "";
        this.suggestionsElement.innerHTML = "";}
    
    });

    }

    renderSuggestionsElement(suggestionsList)
    {
        this.suggestionsElement.innerHTML = '';
       
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
        
        this.side.renderAndReplace([location]);
        this.Map.renderPins([location]);
        this.side.addListener([location]);
              //delete what is in search bar and suggestions
        this.inputElement.value = "";
        this.suggestionsElement.innerHTML = "";
     
        });
    }


    onSubmitSearch(){
        var ids = "";
        this.suggestions.forEach((suggestion) => ids+=suggestion.id + ",");
        console.log(ids);
    }
}

