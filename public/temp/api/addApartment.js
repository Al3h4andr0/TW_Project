const rootAPI = `http://localhost:8000/api/locations/upload`;


const addApartmentListenerInit = () => {
    const myForm = document.getElementById("add_apartment_form");
    myForm.addEventListener("submit", e => {
        e.preventDefault();
        
    
        const formData = new FormData(myForm);
        var checkedBoxes = getCheckedBoxes("facilities");
        formData.append("facilities", checkedBoxes);
       fetch(rootAPI, {method: 'POST', body: formData});
    })

}



function getCheckedBoxes(className) {
    var checkboxes = document.getElementsByClassName(className);
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
       // And stick the checked ones onto an array...
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i].value);
       }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }
  


document.getElementById("add_apartment_btn").addEventListener("click", addApartmentListenerInit);

