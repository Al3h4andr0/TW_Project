
import { toggleRegisterFormOn , toggleRegisterFormOff, toggleAddApartmentFormOff, toggleAddApartmentFormOn } from "./toggleForms.js";

export default class Account{
    constructor(rootElement) {
        if (!rootElement) {
            throw 'rootElement required so we know where we render the element';
        }
        this.rootElement = rootElement;
    }
    async addRegisterListener()
    {
         const element = document.getElementById("register_btn");
         element.addEventListener("click",toggleRegisterFormOn);
         const element2=document.getElementById('register_form_cancel');
         element2.addEventListener("click",toggleRegisterFormOff);
    }

    async addAddApartmentListener(){
        const element = document.getElementById("add_apartment_btn");
         element.addEventListener("click",toggleAddApartmentFormOn);
         const element2=document.getElementById('add_apartment_form_cancel');
         element2.addEventListener("click",toggleAddApartmentFormOff);
    }
}

