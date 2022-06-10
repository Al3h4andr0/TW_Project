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