export function toggleRegisterFormOn() {
    
    var divElement = document.getElementById('register_form_container');
    
    if (divElement.classList.contains("hidden")) 
    { divElement.classList.remove("hidden"); }
    divElement.classList.add("expanded");
  
}

export function toggleRegisterFormOff() {

var divElement = document.getElementById('register_form_container');
if (divElement.classList.contains("expanded"))
 { divElement.classList.remove("expanded"); }
divElement.classList.add("hidden");
}

export function toggleAddApartmentFormOn() {
    
    var divElement = document.getElementById('add_apartment_form_container');
    
    if (divElement.classList.contains("hidden")) 
    { divElement.classList.remove("hidden"); }
    divElement.classList.add("expanded");


   var body = document.querySelector('body');
   body.classList.add("stopScroll")
}

export function toggleAddApartmentFormOff() {

var divElement = document.getElementById('add_apartment_form_container');
if (divElement.classList.contains("expanded"))
 { divElement.classList.remove("expanded"); }
divElement.classList.add("hidden");

var body = document.querySelector('body');
   body.classList.remove("stopScroll");
}