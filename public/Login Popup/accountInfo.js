function openPopUp() {
    const filterZone = document.getElementById("filter-div-desktop");
  
    if (filterZone.style.marginTop == "3.5em") {
      filterZone.style.marginTop = "-2em";
      filterZone.style.opacity = 0;
    } else {
      filterZone.style.marginTop = "3.5em";
      filterZone.style.opacity = 1;
    }
  }


let click=document.querySelector('.click');
let list = document.querySelector('.optionsSettings');
click.addEventListener("click", ()=>{

    list.classList.toggle('newoptionsSettings');

})

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    
    // toggle the icon
    this.classList.toggle("bi-eye");
});

// prevent form submit
const form = document.querySelector("form");
form.addEventListener('submit', function (e) {
    e.preventDefault();
});