const rootAPI = `http://localhost:8000/api/locations/upload`;

const addApartmentListenerInit = () => {
    const myForm = document.getElementById("add_apartment_form");
    myForm.addEventListener("submit", e => {
        e.preventDefault();
        
    
        const formData = new FormData(myForm);
       fetch(rootAPI, {method: 'POST', body: formData});
    })

}

document.getElementById("add_apartment_btn").addEventListener("click", addApartmentListenerInit);

