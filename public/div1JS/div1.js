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
  advancedFiltersSection.classList = "";
  advancedFiltersSection.classList.add(type);
  filterCustomTemplateHandler(advancedFiltersSection, type);
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

function createAdvancedFilterP(text, id = "undefined") {
  var label = document.createElement("p");
  label.appendChild(document.createTextNode(text));
  if (id != "undefined") label.id = id;
  return label;
}

function createAdvancedFilterInput(defaultText, id = "undefined") {
  var inputDiv = document.createElement("input");
  inputDiv.setAttribute("type", "text");
  inputDiv.setAttribute("placeholder", defaultText);
  if (id != "undefined") inputDiv.id = id;
  return inputDiv;
}
// END ADVANCED FILTER FUNCTIONS

// TEMPLATES FOR ADVANCED FILTER
function createAdvancedFilterMinMax(
  advancedFiltersSection,
  minPlaceholder,
  maxPlaceholder
) {

  var topSide = document.createElement("div");
  topSide.setAttribute("class", "top-part");
  topSide.appendChild(createAdvancedFilterP("Min."));
  topSide.appendChild(createAdvancedFilterP("Max."));
  advancedFiltersSection.appendChild(topSide);
  addMinMaxInput(advancedFiltersSection, minPlaceholder, maxPlaceholder);
  addCancelSubmitButtons(advancedFiltersSection);
}

function createAdvancedFilterTags(advancedFiltersSection) {
  var tagsList;
  var tagsZone = document.createElement("div");
  tagsZone.id = "tag-wrapper";
  if (advancedFiltersSection.classList.contains("filter-location")) {
    tagsList = getFilterLocations();
    tagsList.forEach((tag) => {
      tagsZone.appendChild(
        createAdvancedFilterButton(tag, "undefined", "tag location-tag", "tagHandler(this)")
      );
    });
  } else if (advancedFiltersSection.classList.contains("filter-hashtags")) {
    tagsList = getFilterHashtags();
    tagsList.forEach((tag) => {
      tagsZone.appendChild(
        createAdvancedFilterButton(tag, "undefined", "tag hashtag-tag", "tagHandler(this)")
      );
    });
  } else
    console.log(
      "Entered in createAdvancedFilterTags but button is not an accepted filter type"
    );
  advancedFiltersSection.appendChild(tagsZone);
  addCancelSubmitButtons(advancedFiltersSection);
}
//END TEMPLATES FOR ADVANCED FILTER

// ADDING SECTIONS FOR ADVANCED FILTER (REUSABLE)

function addMinMaxInput(
  advancedFiltersSection,
  minPlaceholder,
  maxPlaceholder
) {
  var inputSide = document.createElement("div");
  inputSide.setAttribute("class", "input-part");
  inputSide.appendChild(
    createAdvancedFilterInput(minPlaceholder, "filter-min-input")
  );
  inputSide.appendChild(
    createAdvancedFilterInput(maxPlaceholder, "filter-max-input")
  );
  advancedFiltersSection.appendChild(inputSide);
}

function addCancelSubmitButtons(advancedFiltersSection) {
  var bottomSide = document.createElement("div");
  bottomSide.setAttribute("class", "buttons-part");
  bottomSide.appendChild(createAdvancedFilterButton("Cancel", "filter-cancel"));
  bottomSide.appendChild(createAdvancedFilterButton("Submit", "filter-submit","undefined","sendFilterToBar(this)"));
  advancedFiltersSection.appendChild(bottomSide);
}

function createAdvancedFilterButton(
  text,
  id = "undefined",
  buttonClass = "undefined",
  onclickFunction = null
) {
  var label = document.createElement("div");
  label.appendChild(document.createTextNode(text));
  if (id != "undefined") label.id = id;
  if (buttonClass != "undefined") label.setAttribute("class", buttonClass);
  if(onclickFunction != null) label.setAttribute("onClick",onclickFunction )
  return label;
}

//END ADDING SECTIONS FOR ADVANCED FILTER (REUSABLE)

// ADVANCED FILTER HANDLER
function filterCustomTemplateHandler(advancedFiltersSection, type) {
  //type can be filter-price/filter-location etc
  //clear section
  advancedFiltersSection.innerHTML = "";
  //end clear section
  switch (type) {
    case "filter-price":
      createAdvancedFilterMinMax(
        advancedFiltersSection,
        "Min. in lei",
        "Max in lei"
      );
      break;

    case "filter-location":
      createAdvancedFilterTags(advancedFiltersSection);
      break;

    case "filter-surface":
      createAdvancedFilterMinMax(
        advancedFiltersSection,
        "Min. in sq. meters",
        "Max sq. meters"
      );
      break;

      case "filter-hashtags":
        createAdvancedFilterTags(advancedFiltersSection);
      break;

    default:
      createAdvancedFilterMinMax(
        advancedFiltersSection,
        "notImplemented",
        "notImplemented"
      );
  }
}

function sendFilterToBar(button)
{
  var filterTopZone =document.getElementById("filter-div-desktop");
  var filterOptionsAdvancedType = document.getElementById("filter-options-advanced").className.split(" ")[0];
  console.log(filterOptionsAdvancedType);
var toBeSendArray =[];
  switch(filterOptionsAdvancedType){
    case "filter-price":
      if(document.getElementById("filter-min-input").value.length == 0 || document.getElementById("filter-max-input").value.length == 0) return;
      var minValue = document.getElementById("filter-min-input").value;
      var maxValue = document.getElementById("filter-max-input").value;
       toBeSendArray.push(generateTopBarFilterMinMax("price","top-filter","Price between",minValue,maxValue,"lei")); 
      break;
    case "filter-hashtags":
      var tagsArray = Array.from(document.getElementsByClassName("tag active"));
      tagsArray.forEach((item) =>{
          toBeSendArray.push(generateTopBarTag("tag-hashtag-" + item.innerHTML,"top-tag top-hashtag",item.innerHTML));
          item.classList.remove('active');
      })
    break;
    case "filter-location":
      var tagsArray = Array.from(document.getElementsByClassName("tag active"));

      tagsArray.forEach((item) =>{
          toBeSendArray.push(generateTopBarTag("tag-location-" + item.innerHTML,"top-tag","Located in " + item.innerHTML));
          item.classList.remove('active');
      })
      break;
     case "filter-surface":
      if(document.getElementById("filter-min-input").value.length == 0 || document.getElementById("filter-max-input").value.length == 0) return;
      var minValue = document.getElementById("filter-min-input").value;
      var maxValue = document.getElementById("filter-max-input").value;
      toBeSendArray.push(generateTopBarFilterMinMax("surface","top-filter","Surface between",minValue,maxValue, "sq. m"));
     break;

        


    case "filter-date":

    break;
    default:
      console.log("SendFilterToBar has unknown filter type");
  }
  document.getElementById("filter-options").classList.toggle("active");
  document.getElementById("filter-options-advanced").classList.remove("active");
  console.log("TOBESENDARRAYLENGTH: " + toBeSendArray.length)
  toBeSendArray.forEach((child) => {
    console.log("pushing");
    filterTopZone.appendChild(child);
  })
  
}
// END ADVANCED FILTER HANDLER

// TAGS HANDLER FOR EACH ONE
function tagHandler(button)
{
  button.classList.toggle("active");
}
// END TAGS HANDLER FOR EACH ONE

///FUNCTIONS THAT LINK WITH BACKEND

function getFilterLocations() {
  const locations = [
    "Copou",
    "Centru",
    "Nicolina",
    "Podu Ros",
    "Galata",
    "Cantemir",
  ];
  return locations;
}

function getFilterHashtags()
{
  const hashtags = [ "#noSMOG", "#noTheft", "#blessed"];
  return hashtags;
}

////

/// TOP BAR SENDERS
function generateTopBarFilterMinMax(id = null, topBarClass = null, text, minValue, maxValue, unit = null)
{
  var div = document.createElement('div');

  var p = document.createElement('p');
  if(id != null)
    div.id= id;
  if(topBarClass != null)
  div.className = topBarClass;
  //adding text
  var innerText = text + " " + minValue + " and " + maxValue + " "+  unit;
  p.innerHTML = innerText;
  div.appendChild(p);
  //adding delete button
  div.appendChild(generateTopBarFilterXMark(id));
  return div;
}

function generateTopBarTag(id = null, topBarClass = null,innerHTML)
{
  var div = document.createElement('div');
  if(id != null)
    div.id = id;
  var p = document.createElement('p');
  if(topBarClass != null)
    div.className = topBarClass;
  p.innerHTML = innerHTML;
  div.appendChild(p);
  div.appendChild(generateTopBarFilterXMark(id));
  return div;
}

function generateTopBarFilterXMark(filterID)
{
  var xMark = document.createElement('i');
  xMark.className = "fa-solid fa-xmark";
  xMark.addEventListener("click", () => {
    document.getElementById(filterID).remove();
  })
  return xMark;
}

/// END TOP BAR SENDERS
