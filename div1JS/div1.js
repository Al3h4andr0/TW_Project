//OPEN FILTER SECTION
function openFilters() {
  const filterZone = document.getElementById("filter-div-desktop");

  if (filterZone.style.marginTop == "3.5em") {
    filterZone.style.marginTop = "-2em";
    filterZone.style.opacity = 0;
  } else {
    filterZone.style.marginTop = "3.5em";
    filterZone.style.opacity = 1;
  }
}
//END OPEN FILTER SECTION

//ADD FILTER BUTTON ON/OFF
document.getElementById("add-filter-button").addEventListener(
  "click",
  () => {
    const menu = document.getElementById("filter-options");
    console.log("HELLO 2");

    document
      .getElementById("filter-options-advanced")
      .classList.remove("active");

    menu.classList.toggle("active");
  },
  false
);

// END ADD FILTER BUTTON ON/OFF

//EACH FILTER HANDLERS
function filterHandler(button) {
  var filterOptionAdvanced = document.getElementById("filter-options-advanced");

  if (filterOptionAdvanced.classList.contains(button.id)) {
    //same option pressed twice
    filterOptionAdvanced.classList.toggle("active");
    return;
  }

  setAdvancedFilterTypeTo(filterOptionAdvanced, button.id);
  filterOptionAdvanced.style.top = computeAdvancedFilterTopProperty(
    button,
    getComputedStyle(button).height
  );
  if (!filterOptionAdvanced.classList.contains("active"))
    filterOptionAdvanced.classList.toggle("active");
}
//END EACH FILTER HANDLERS

//ADD FILTER AUTO CLOSE
document.addEventListener("click", (e) => {
  var filterZone = document.getElementById("filter-options");
  if (
    !filterZone.classList.contains("active") ||
    e.target.closest("[data-dropdown]")
  )
    return;

  document.getElementById("filter-options").classList.toggle("active");
  document.getElementById("filter-options-advanced").classList.remove("active");
});
//END ADD FILTER AUTO CLOSE

//ADVANCED FILTER FUNCTIONS
function setAdvancedFilterTypeTo(advancedFiltersSection, type) {
  //type can be filter-price/filter-location etc
  advancedFiltersSection.classList.forEach((element) => {
    if (element != "active") advancedFiltersSection.classList.remove(element);
  });
  advancedFiltersSection.classList.add(type);
  createFilterCustomTemplate(advancedFiltersSection, type);
}

function computeAdvancedFilterTopProperty(button, filterHeight) {
  var margin = filterHeight;
  const classNames = button.className.split(" ");
  if (classNames[1] == null)
    console.log("New filter, do not know where to put advanced filter");

  margin = "calc(" + filterHeight + "*" + classNames[1] + ")";
  console.log(margin);
  return margin;
}

function createFilterCustomTemplate(advancedFiltersSection, type) {
  //type can be filter-price/filter-location etc
  //clear section
  advancedFiltersSection.innerHTML = "";
  //end clear section

  
  var topSide = document.createElement("div");
topSide.setAttribute("class", "top-part")
topSide.appendChild(createAdvancedFilterP("Min."));
topSide.appendChild(createAdvancedFilterP("Max."));
advancedFiltersSection.appendChild(topSide);

var inputSide = document.createElement("div");
inputSide.setAttribute("class","input-part");
inputSide.appendChild(createAdvancedFilterInput("Minimum","filter-min-input"));
inputSide.appendChild(createAdvancedFilterInput("Maximum","filter-max-input"));
advancedFiltersSection.appendChild(inputSide);

var bottomSide = document.createElement("div");
bottomSide.setAttribute("class","buttons-part");
bottomSide.appendChild(createAdvancedFilterLabel("cancel","filter-cancel"));
bottomSide.appendChild(createAdvancedFilterLabel("Submit","filter-submit"));
advancedFiltersSection.appendChild(bottomSide);
}
// END ADVANCED FILTER FUNCTIONS

function createAdvancedFilterLabel(text, id="undefined"){
  var label = document.createElement("div");
  label.appendChild(document.createTextNode(text));
  if(id != "undefined")
    label.id = id;
  return label;
}

function createAdvancedFilterP(text, id="undefined"){
  var label = document.createElement("p");
  label.appendChild(document.createTextNode(text));
  if(id != "undefined")
    label.id = id;
  return label;
}

function createAdvancedFilterInput(defaultText, id="undefined")
{
  var inputDiv = document.createElement("input");
  inputDiv.setAttribute("type","text");
  inputDiv.setAttribute("placeholder",defaultText);
  if(id != "undefined")
    inputDiv.id = id;
  return inputDiv;
}