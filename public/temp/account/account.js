
import { toggleRegisterFormOn , toggleRegisterFormOff } from "./toggleForms.js";

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
}