export function toggleRegisterFormOn() {
    
    var divElement = document.getElementById('register_form_container');
    var divElementLogin = document.getElementById('login_form_container');
    if (divElement.classList.contains("hidden") && divElementLogin.classList.contains("expanded")) 
    { divElement.classList.remove("hidden");
      divElementLogin.classList.remove("expanded");
  }
    divElement.classList.add("expanded");
    divElementLogin.classList.add("hidden");
  
}

export function toggleRegisterFormOff() {

var divElement = document.getElementById('register_form_container');
if (divElement.classList.contains("expanded"))
 { divElement.classList.remove("expanded"); }
divElement.classList.add("hidden");
}
export function toggleLoginFormOn() {
    
    var divElement = document.getElementById('login_form_container');
    var divElementRegister = document.getElementById("register_form_container");
    if (divElement.classList.contains("hidden") && divElementRegister.classList.contains("expanded")) 
    { divElement.classList.remove("hidden"); 
      divElementRegister.classList.remove("expanded");}
    divElement.classList.add("expanded");
    divElementRegister.classList.add("hidden");
}
export function toggleLoginFormOff() {

    var divElement = document.getElementById('login_form_container');
    if (divElement.classList.contains("expanded"))
     { divElement.classList.remove("expanded"); }
    divElement.classList.add("hidden");
}

export function toggleAddApartmentFormOn() {
    
    var divElement = document.getElementById('add_apartment_form_container');
    var divElementRegister = document.getElementById("register_form_container");
    var divElementLogin = document.getElementById('login_form_container');
    
    if (divElement.classList.contains("hidden")) 
    { divElement.classList.remove("hidden"); 
      divElementLogin.classList.remove("expanded");
      divElementRegister.classList.remove("expanded");
  }
    divElement.classList.add("expanded");
    divElementLogin.classList.add("hidden");
    divElementRegister.classList.add("hidden");


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