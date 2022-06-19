const rootAPIDelete = `http://localhost:8000/api/locations/`;
const rootAPIGet = `http://localhost:8000/api/locations/myLocations`;
import { deleteEstate } from "./deleteEstate.js";
export default class myEstatesModal{
    constructor(rootElement, triggerElement){
        if(!rootElement)
        throw 'rootElement required';
        this.rootElement = rootElement;
        this.triggerElement = triggerElement;
    }

    async render(){ 
        console.log("a fost apelat render");
        const rootAPI = 'http://localhost:8000/api/ping';
        var response = await fetch(rootAPI,  {method: 'GET', headers:{'Content-Type': 'application/json'}});
        if(response.status === 401){
            alert("session expired. you need to log in first before viewing you apartments");
        }else{
        this.modal = document.getElementById("estates-modal");
        const estates = await this.getEstates();
        const modalTemplate = await this.renderEverything(estates);
        this.rootElement.insertAdjacentHTML('beforeend', "");
        this.rootElement.insertAdjacentHTML('beforeend',modalTemplate);
        for(let estate of estates)
        {
         console.log("adding delete for","delete_btn" +estate);
         const element = document.getElementById("delete_btn"+estate.id);
         console.log("tsest",);
         element.addEventListener("click",(e) => {deleteEstate(estate.id);
         this.render();
    });
        element.param=estate.id;
         }
       // this.addListenersToElements();
            return estates;
        }
    }

    renderEverything(list){
        console.log('a fost apelat rendereverything');
        return `
        <div id="estates-modal" class="estates-modal"  style='background-color:beige; max-width: 20em; max-height: 50em; display: flex;'>
            <div class="estates-modal-body">
                ${this.renderEstates(list)}
            </div>
        </div>
            `
    }
    renderEstates(list){
        console.log('a fost apelat renderestates');
        let res='';
        console.log("List: ", list);
      

        if(list.length === 0)
        console.log("empty list for this user. try adding some apartments.");
        for(let estate of list){
            console.log(estate.id);
            res+= `
                    <div id="estate${estate.id}" style="padding-top: 1em; padding-left: 2em;">
                        <div class="estateImage">
                            <img src='${estate.imgSrc}' alt='${estate.imgAlt}' style="max-width: 10em; max-height:25em">
                        </div>
                        <div class="estateTitle">
                            <p>${estate.title}</p>
                        </div>
                        <div class="optionsEstates">
                            <button type="button" id="delete_btn${estate.id}" class="delete_btn">Delete</button>
                        </div>
                    </div>
                `
        }
        if(list.length === 0){
        res='';
            res= `
        <div id="estateundefined"  style='background-color:beige; max-width: 20em; max-height: 80%'>
        <div class="estateTitle">
            <p>You have no apartments listed here. Try adding one or viewing what are in the market already.</p>
        </div>
    </div>
        `;
    }
        return res;
    }

    async getEstates(){
        console.log("a fost apelat getestates");
        var response = await fetch(rootAPIGet, {method: 'GET', headers:{'Content-Type': 'application/json'}})
        response = await response.json();
        if(response.status == 401)
        {alert('session expire. you need to reconnect.');
        return;} 
        else
        return response;
    }

        
    addListenersToElements(){
        this.triggerElement.addEventListener('click', (_)=> {
            console.log('a fost apelat addlistenerstolements');
            const divv = document.querySelector(".my_estates_content");
            console.log("am trecut de document query...");
            if(divv.classList.contains('expanded')){
                console.log("am intrat .contains('expanded')")
                divv.classList.remove('expanded');
                divv.classList.add('hidden');
                document.getElementById("my_estates_content").innerHTML="";
            }else  if(divv.classList.contains('hidden')){
                console.log("am intrat pe .contains(hidden)");
            divv.classList.remove('hidden');
            divv.classList.add('expanded');
            this.render();

            }
            console.log("am trecut de ifuri");
        })
    }
  

   
}
