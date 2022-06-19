const rootAPIDelete = `http://localhost:8000/api/locations/`;
const rootAPIGet = `http://localhost:8000/api/locations/myLocations`;
export default class myEstatesModal{
    constructor(rootElement, triggerElement){
        if(!rootElement)
        throw 'rootElement required';
        this.rootElement = rootElement;
        this.triggerElement = triggerElement;
    }

    async render(){ 
        this.modal = document.getElementById("estates-modal");
        const estates = await this.getEstates();
        const modalTemplate = this.renderEverything(estates);
        this.rootElement.insertAdjacentHTML('beforeend', `${modalTemplate}`);
       // this.addListenersToElements();
    }

    renderEverything(list){
        return `
        <div id="estates-modal" class="estates-modal" style="width">
            <div class="estates-modal-header">
                <button class="estates-modal-close" id="estates-modal-close" aria-label="Close">&times;</button>
            </div>
            <div class="estates-modal-body">
                ${this.renderEstates(list)}
            </div>
        </div>
            `
    }
    renderEstates(list){
        let res='';
        console.log("List: ", list);
       for(let estate of list)
        console.log("locations for my estates: " + estate.title);
        if(list.length === 0)
        console.log("empty list for this user. try adding some apartments.");
        for(let estate of list){
            res+= `
                    <div id="estate${estate.id}">
                        <div class="estateImage">
                            <img src='${estate.imgSrc}' alt='${estate.imgAlt}'>
                        </div>
                        <div class="estateTitle">
                            <p>${estate.title}</p>
                        </div>
                        <div class="optionsEstates">
                            <button type="button" id="delete_btn${estate.id}" class="delete_btn" action='deleteEstate(${estate.id})'>Delete</button>
                        </div>
                    </div>
                `
        }
        if(list.length === 0)
        res+= `
        <div id="estateundefined">
        <div class="estateImage">
            <img src="../temp/images/pink-clouds.png" alt='nothing to show here'>
        </div>
        <div class="estateTitle">
            <p>You have no apartments listed here. Try adding one or viewing what are in the market already.</p>
        </div>
    </div>
        `
        return res;
    }

    async addListener(locations){
        for(let location of locations){
            const element = document.getElementById('estate' + locations.id);
            element.addEventListener("click", renderEstates);
        }
    }

    async getEstates(){
        var response = await fetch(rootAPIGet, {method: 'GET', headers:{'Content-Type': 'application/json'}})
        response = await response.json();
        return response;
    }

    async deleteEstate(id){
        fetch(rootAPIDelete + '${id}', {method: 'DELETE', headers:{'Content-Type': 'application/json'}})
    .then((res) => {
        if(res.status >=200 && res.status <=399){
        alert("instance deleted successfully. ");
    }
    })
    .catch(ex => {
        throw ex;
    });
    }
        
    addListenersToElements(){
        this.triggerElement.addEventListener('click', (_)=> {
            this.render();
            const divv = document.querySelector(".my_estates_content");
            divv.classList.remove('hidden');
            divv.classList.remove('expanded');
        })
        let xButton = document.getElementById('estates-modal-close');
        xButton.addEventListener("click", (_)=>{
                   console.log("x buttton has been pressed. ");
                   const divv = document.querySelector(".my_estates_content");
                   divv.classList.remove('expanded');
                   divv.classList.remove('hidden');
               })
       
    }

    classListEstates(){
        return this.rootElement.classList;
    }
}
