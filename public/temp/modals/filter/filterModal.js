const rootAPI = "http://localhost:8000/api/locations/filter";

export default class FilterModal {
  constructor(rootElement, triggerElement, side,Map) {
    if (!rootElement || !triggerElement)
      throw 'rootElement/triggerElement required so we know where we render the things and what button should the user press in order to pop the modal';

    this.rootElement = rootElement;
    this.triggerElement = triggerElement;
    this.side = side;
    this.Map=Map
  }


  async render() {
    const modalTemplate = this.renderModal();
    this.rootElement.insertAdjacentHTML('beforeend', `${modalTemplate}`);
    this.modal = document.getElementById("filters-modal");
    this.addListenersToElements();

   
  }


  renderModal() {
    return `  <div id="filters-modal" class="modal" role="dialog" tabindex="-1">
    <div class="modal-inner">
        <div class="modal-header">
            <h3>Filters</h3>
            <div><button id="filters-submit">Submit</button>
                <button class="modal-close" id="filters-modal-close" aria-label="Close">
                    &times;
                </button>
            </div>
        </div>
        <div class="modal-body">
            <form class="filters-form" id="filters-form">
                <h4>Price:</h4>

                <label for="price-min" class="price-min-max"> Minimum price: </label>
                <input type="number" name="price-min" id="price-min" class="price-min-max" placeholder="Lei"> </input>
                <label for="price-max" class="price-min-max"> Maximum price: </label>
                <input type="number" name="price-max" id="price-max" class="price-min-max" placeholder="Lei"> </input><br />


                <h4> Date Interval: </h4>
                <label for="date_start">Start:</label>
                <input type="date" name="date_start" id="date_start" class="date_interval">
                <br /><br /><label for="date_start">End:</label>
                <input type="date" name="date_end" id="date_end" class="date_interval">


                <h4>Condition:</h4>

                <input type="checkbox" id="condition-bad" class="condition" name="condition" value = "bad">
                <label for="condition"> Bad </label><br />
                <input type="checkbox" id="condition-mediocre" class="condition" name="condition" value = "mediocre">
                <label for="condition"> Mediocre </label><br />
                <input type="checkbox" id="condition-good" class="condition" name="condition" value = "good">
                <label for="condition"> Good </label><br />
                <input type="checkbox" id="condition-very-good" class="condition" name="condition" value = "very-good">
                <label for="condition"> Very good </label><br />
                <input type="checkbox" id="condition-perfect" class="condition" name="condition"
                    value="perfect">
                <label for="condition"> Perfect </label><br />

                <h4>Facilities:</h4>


                <input type="checkbox" class="facilities" value="air-conditioning" name = "facilities">
                <label for="condition"> Air Conditioning </label><br />
                <input type="checkbox" class="facilities" value="parking" name = "facilities">
                <label for="condition"> Parking </label><br />
                <input type="checkbox" class="facilities" value="fridge" name = "facilities">
                <label for="condition"> Fridge </label><br />
                <input type="checkbox" class="facilities" value="microwave" name = "facilities">
                <label for="condition"> Microwave </label><br />
                <input type="checkbox" class="facilities" value="bath-tub"  name = "facilities">
                <label for="condition"> Bath tub </label><br />
                <input type="checkbox" class="facilities" value="shop-nearby" name = "facilities" >
                <label for="condition"> Shop nearby </label><br />

                <h4>Surface: </h4>

                <label for="surface-min" class="surface-min-max"> Minimum surface: </label>
                <input type="number" name="surface-min" id="surface-min" class="surface-min-max" placeholder="mp"> </input>
                <label for="surface-max" class="surface-max"> Maximum surface: </label>
                <input type="number" name="surface-max" id="surface-max"class="surface-min-max" placeholder="mp"> </input><br />

                <h4> For: </h4>


                <label for="for">Are you selling or is it for renting?</label>
            
                <input type="checkbox" class="for_sale_rent" value = "rent" name = "for">
                <label for="condition"> Rent </label><br />
                <input type="checkbox" class="for_sale_rent" value = "sale" name = "for">
                <label for="condition"> Sale </label><br />



                <h4> Rating: </h4>
                <label for="min-rating" class = "min-max-rating"> Min. rating: </label>
                <select name="min-rating:" id="min-rating" class = "min-max-rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select> <br /><br />



                <label for="max-rating" class = "min-max-rating" > Max. rating: </label>
                <select name="max-rating:" id="max-rating" class = "min-max-rating">
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>

                <label for="theft-max" class="theft-max" >
                    Maximum thefts per month:
                </label>
                <input type="number" name="theft-max" class="theft-max" id="theft-max"> </input><br />

                <h4>Cost of living</h4>

                <label for="cost_of_living_min" class="cost_of_living_min_max"> Minimum price: </label>
                <input type="number" name="cost_of_living_min" id="cost_of_living_min" class="cost_of_living_min_max" placeholder="Lei">
                </input>
                <label for="cost_of_living_max" class="cost_of_living_max"> Maximum price: </label>
                <input type="number" name="cost_of_living_max" id="cost_of_living_max" class="cost_of_living_min_max" placeholder="Lei">
                </input><br />


                <h4>Anual average temperature:</h4>

                <label for="anual_temp_min" class="anual_temp_min_max"> Minimum temperature: </label>
                <input type="number" name="anual_temp_min" id="anual_temp_min"  class="anual_temp_min_max" placeholder="Lei"> </input>
                <label for="anual_temp_max" class="anual_temp_max"> Maximum tepmerature: </label>
                <input type="number" name="anual_temp_max" id="anual_temp_max"  class="anual_temp_min_max" placeholder="Lei">
                </input><br />




            </form>
        </div>


    </div>
</div>`;
  }

  addListenersToElements() {
    // Saved so I can unbind the listener after modal is closed
    const onEscapeListener = (e) => {
      if (e.key !== "Escape") return;
      this.modal.classList.toggle("open");
      document.removeEventListener("keydown", onEscapeListener);
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
      document.removeEventListener("keydown", onEscapeListener);
    });
    ////////////////////////

    // For submitting

    let submitButton = document.getElementById("filters-submit");
    submitButton.addEventListener('click', async (_) => {
      this.modal.classList.toggle("open");
      var requestBody = this.generateSubmitBody();
      var locations = await this.fetchLocationsWithFilters(requestBody);
      console.log("RESPONSE: ", locations);

      this.side.renderAndReplace(locations);
      this.Map.renderPins(locations);
      this.side.addListener(locations);
    })

    //
  }

  async fetchLocationsWithFilters(requestBody)
  {
    var urlparams = new URLSearchParams(requestBody).toString();
    urlparams = urlparams.replace("%2C", ",");
    var response = await fetch(rootAPI + "?" + urlparams, { method: "GET" });
    response = await response.json();
    return response;
  }

  generateSubmitBody() {
    let form = document.getElementById("filters-form");

    const requestBody = {};

    // // ✅ Get all form elements
    const formElements = Array.from(form.elements);

    formElements.forEach(element => {
      switch (element.className) {
        case "price-min-max":
          if (element.name === "price-min")
            requestBody.price_min = element.value;
          else if (element.name === "price-max")
            requestBody.price_max = element.value;
          break;
        case "date_interval":
          if (element.name === date_start)
            requestBody.date_interval += element.value;
          else if (element.name === date_end)
            requestBody.date_interval += "/" + element.value;
          break;
        case "condition":
          if (requestBody.condition === undefined)
            requestBody.condition = "";
          if (element.checked)
            requestBody.condition += element.value + ",";
          break;
        case "facilities":
          if (requestBody.facilities === undefined)
            requestBody.facilities = "";
          if (element.checked)
            requestBody.facilities += element.value + ",";
          break;
        case "surface-min-max":
          if (element.name === "surface-min")
            requestBody.surface_min = element.value;
          else if (element.name === "surface-max")
            requestBody.surface_max = element.value;
          break;
        case "for_sale_rent":
            if(element.checked)
              if(requestBody.for === undefined)
                requestBody.for = element.value;
              else    //if there are both for sale and rent, just remove the filter
                requestBody.for ="";
          break;
        case "min-max-rating":
          if (element.name === "min-rating")
            requestBody.rating_min = element.value;
          else if (element.name === "max-rating")
            requestBody.rating_max = element.value;
          break;
        case "theft-max":
          requestBody.theft_max = element.value;
          break;
        case "cost_of_living_min_max":
          if (element.name === "cost_of_living_min")
            requestBody.cost_of_living_min = element.value;
          else if (element.name === "cost_of_living_max")
            requestBody.cost_of_living_max = element.value;
          break;
        case "anual_temp_min_max":
          if (element.name === "anual_temp_min")
            requestBody.anual_temp_min = element.value;
          else if (element.name === "anual_temp_max")
            requestBody.anual_temp_max = element.value;
          break;

        default:
          console.log("NO SUCH VALUE FOUND: ", element.className);
          console.log("ELEMENT WITH NO CLASS NAME", element);
      }
    });
    for (let key in requestBody) {
      if (requestBody[key] === "")
        delete requestBody[key];
      else if (key === "condition" || key === "facilities")
        requestBody[key] = requestBody[key].slice(0, -1);
    }
    return requestBody;

  }

}
