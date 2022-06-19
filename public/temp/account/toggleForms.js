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
    var divElementRegister = document.getElementById("login_form_container");
    if (divElement.classList.contains("hidden") && divElementRegister.classList.contains("expanded")) 
    { divElement.classList.remove("hidden"); 
      divElementRegister.classList.remove("expanded");

    }
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

async function decide(){
  const rootAPI = 'http://localhost:8000/api/ping';
  var response = await fetch(rootAPI, {method: 'GET', headers:{'Content-Type': 'application/json'}});
  const acc_logged = document.querySelector('.logged_in_buttons');
  const acc = document.querySelector('.not_logged_in_buttons');
if(response.status === 401){
  acc_logged.classList.remove('expanded_acc');
  acc_logged.classList.add('hidden');
  acc.classList.remove('hidden');
  acc.classList.add('expanded_acc');
}else{
  acc.classList.remove('expanded_acc');
  acc.classList.add('hidden');
  acc_logged.classList.remove('hidden');
  acc_logged.classList.add('expanded_acc');
}
}

export function toggleAccountButtons(){
  var divElement=document.getElementById('account_buttons');
  decide();
  if (divElement.classList.contains("expanded_acc"))
 { divElement.classList.remove("expanded_acc"); divElement.classList.add("hidden");}
 
  else
 if (divElement.classList.contains("hidden"))
 { divElement.classList.remove("hidden"); divElement.classList.add("expanded_acc");}
}
