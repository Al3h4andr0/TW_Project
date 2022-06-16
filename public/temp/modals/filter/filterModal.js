const rootAPI = "http://localhost:8000/api/locations/filter";

export default class FilterModal{
    constructor(rootElement,triggerElement)
    {
         if (!rootElement || !triggerElement)
            throw 'rootElement/triggerElement required so we know where we render the things and what button should the user press in order to pop the modal';
          
        this.rootElement = rootElement;
        this.triggerElement = triggerElement;
    }
  async render()
    {
       const modalTemplate = this.renderModal();
       //this.rootElement.insertAdjacentHTML('beforeend', `${modalTemplate}`);
       this.modal = document.getElementById("filters-modal");
       this.addListenersToElements();
    }


   renderModal()
  {
    return ``;
  }

  addListenersToElements()
  {
// Saved so I can unbind the listener after modal is closed
    const onEscapeListener = (e) => {
        if(e.key !== "Escape") return;

     this.modal.classList.toggle("open");
     document.removeEventListener("keydown",onEscapeListener);
    }
/////////////////////

// Added Listener to trigger (in this case filter button); In this listener I binded the onEscapeListener too
    this.triggerElement.addEventListener('click', (_) => {
      this.modal.classList.toggle("open");
      document.addEventListener("keydown", onEscapeListener);
    });
////////////////////////

// Added Listener to Inner close button; In this listener I unbinded the onEscapeListener too
    let xButton = document.getElementById("filters-modal-close");
    xButton.addEventListener('click', (_) => {
      this.modal.classList.toggle("open");
      document.removeEventListener("keydown",onEscapeListener);
  } );
////////////////////////

    // For submitting

    let submitButton = document.getElementById("filters-submit");
    submitButton.addEventListener('click', async (_) =>{
      this.modal.classList.toggle("open");
      var requestBody = this.generateSubmitBody();
      var urlparams = new URLSearchParams(requestBody).toString();
      urlparams = urlparams.replace("%2C",",");
      var response = await fetch(rootAPI + "?" + urlparams, {method : "GET"});
      response = await response.json();
      console.log("RESPONSE: ", response);
    })

    //
  }

   generateSubmitBody(){
    let form = document.getElementById("filters-form");
  
const requestBody = {};

// // ✅ Get all form elements
 const formElements = Array.from(form.elements);

 formElements.forEach(element => {
   console.log(element.name, element.value);
   switch(element.className)
   {
      case "price-min-max":
          if(element.name === "price-min")
              requestBody.price_min = element.value;
          else if(element.name === "price-max")
              requestBody.price_max = element.value;
      break;
      case "date_interval":
          if(element.name === date_start)
            requestBody.date_interval += element.value;
          else if(element.name === date_end)
            requestBody.date_interval += "/" + element.value;
      break;
      case "condition":
          if(requestBody.condition === undefined)
            requestBody.condition = "";
          if(element.checked)
            requestBody.condition += element.value + ",";
      break;
      case "facilities":
        if(requestBody.facilities === undefined)
          requestBody.facilities = "";
        if(element.checked)
        requestBody.facilities += element.value + ",";
      break;
      case "surface-min-max":
            if(element.name === "surface-min") 
                requestBody.surface_min=element.value;
            else if(element.name === "surface-max")
                requestBody.surface_max = element.value;
      break;
      case "for_sale_rent":
        console.log("FORSALE", element.value)
                requestBody.for = element.value;
      break;
      case "min-max-rating":
            if(element.name === "min-rating")
                requestBody.rating_min = element.value;
            else if(element.name === "max-rating")
                requestBody.rating_max = element.value;
      break;
      case "theft-max":
            requestBody.theft_max = element.value;
      break;
      case "cost_of_living_min_max":
            if(element.name === "cost_of_living_min")
              requestBody.cost_of_living_min = element.value;
            else if(element.name === "cost_of_living_max")
            requestBody.cost_of_living_max = element.value;
      break;
      case "anual_temp_min_max":
        if(element.name === "anual_temp_min")
        requestBody.anual_temp_min = element.value;
      else if(element.name === "anual_temp_max")
      requestBody.anual_temp_max = element.value;
      break;

      default:
        console.log("NO SUCH VALUE FOUND: ", element.className);
        console.log("ELEMENT WITH NO CLASS NAME",element);
   }
 });
      for(let key in requestBody){
        if(requestBody[key] === "" )
            delete requestBody[key];
        else if(key === "condition" || key === "facilities" )
            requestBody[key] = requestBody[key].slice(0,-1);
      }
    return requestBody;

  }
  
}
