var isOpen = false;

function togglePanel() {
  isOpen = !isOpen;
  var divElement = document.querySelector('.div2');

  if (isOpen) {
    divElement.classList.add("collapsed");
    divElement.classList.remove("expanded");
  }
  else {
    divElement.classList.add("expanded");
    divElement.classList.remove("collapsed");
  }
}


function toggleRentFormOn() {
  
  var divElement = document.querySelector('.rent_form_container');

  divElement.classList.remove("hidden"); 
    divElement.classList.add("expanded"); 
}

function toggleRentFormOff() {
  
  var divElement = document.querySelector('.rent_form_container');

  divElement.classList.remove("expanded"); 
    divElement.classList.add("hidden"); 
}