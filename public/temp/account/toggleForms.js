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

export async function startLogIn(){
   
  const rootAPI = `http://localhost:8000/api/login`;
  console.log(document.getElementById('username_for_login').value);
  let body={
      username:document.getElementById('username_for_login').value,
      password:document.getElementById('password_for_login').value
  }


  fetch(rootAPI, {method: 'POST', body: JSON.stringify(body), headers:{'Content-Type': 'application/json'}})
  .then((res) => {
      if (res.status === 404) {
          alert("username or password incorrect brother");
      }else
      if(res.status >=200 && res.status <=399){
      alert("logged in");
    const form= document.querySelector('.login_form_container');
      form.classList.remove('expanded');
      form.classList.add('hidden');
      
  }
  })
  .catch(ex => {
      throw ex;
  });

      document.getElementById('username_for_login').value='';
      document.getElementById('password_for_login').value='';
}

document.getElementById('login').addEventListener("click",login);
