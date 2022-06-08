export function toggleRentFormOn(element) {
    
        var divElement = document.getElementById('rent_form_container'+element.currentTarget.param);
        if(element.currentTarget.for=="rent"){
        if (divElement.classList.contains("hidden")) 
        { divElement.classList.remove("hidden"); }
        divElement.classList.add("expanded");
        }
       else
       {
           alert("im buying");
       }
    
}

export function toggleRentFormOff(element) {

    var divElement = document.getElementById('rent_form_container'+element.currentTarget.param);
    if (divElement.classList.contains("expanded"))
     { divElement.classList.remove("expanded"); }
    divElement.classList.add("hidden");
}