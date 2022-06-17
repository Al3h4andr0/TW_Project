import Map from '../map/map.js';
import { toggleRentFormOff, toggleRentFormOn } from './toggleForms.js';
export default class Side {
    constructor(rootElement) {
        if (!rootElement) {
            throw 'rootElement required so we know where we render the element';
        }
        this.rootElement = rootElement;
        this.locationsIds = [];
    }


    renderOverview(locationOverview, id) {
        let v = "Rent";
        let dates = `<span class="subtitleSmaller descText">Available dates:</span>`;
        if (locationOverview.for == "sale") {
            v = "Sale";
            dates = "";
        }
        return `
            <div class="locationOverview">
             <span class="subtitle" id="overview${id}">Overview</span>
             <p class="descText">${locationOverview.description}</p>
             <span class="subtitleSmaller descText">Facilities:</span>
             <p class="descText">${this.renderFacilities(locationOverview.facilities)}</p>
             <div class="locationSurfaceFor">
             <p class="subtitleSmaller">Surface: ${locationOverview.surface} mp</p>
             <p class="subtitleSmaller">For: <span id="locationFor${v}">${locationOverview.for}</span></p>
             </div>
             ${dates}
             <div class="locationDates">
             ${this.renderAvaliability(locationOverview.dates)}
             </div>
            </div>`
    }
    renderFacilities(locationOverviewFacilities)
    {
        let res=`<div class="locationFacilities">`;
        for(let value of Object.values(locationOverviewFacilities))
        {
            res+=`<div class="locationFacility subtitleSmaller">
            <p>${value}<p/>
            </div>`
        }
        res+=`</div>`
        return res;
    }
    renderAvaliability(locationOverviewDates) {
        let res = '';
        for (let value of Object.values(locationOverviewDates)) {
            res += `<div class="locationOverviewDates">
             <p>${value.start} </br> ${value.end}</p>
            </div>
            `
        }
        return res;
    }
    renderContact(locationContact, id) {
        return `
            <div class="locationContact" id="contact${id}">
            <span class="subtitle">Contact</span>
            <span class="subtitleSmaller descText">Website: </span>
            <a href="${locationContact.website.http}" class="descText"> ${locationContact.website.key}</a>
            <p class="descText"><span class="subtitleSmaller">Phone number: </span>${locationContact.phoneNumber}</p>
            </div>`
    }

    renderReviews(locationReviews, id) {
        let res = `<div class="locationReviews" id="reviews${id}">`;
        for (let value of Object.values(locationReviews)) {
            res += `<div class="locationReview descText" id="locationReview${id}">
           ${value.title}
           </br>
           ${value.description}
           </br>
           ${value.score}/5
           </div>
            <hr>`
        }
        res += "</div>";
        return res;
    }

    renderLocations(locations) {
        let res = '';
        console.log(locations);
        for (let location of locations) {
            res += `
            <div class="location" id="location${location.id}">
                <div class="locationImage">
                    <img src='${location.imgSrc}' alt='${location.imgAlt}'>
                <div/>
                <div class="locationTitle">
                    <p>${location.title}</p>
                </div>
                <hr>
                <div class="locationDesc">
                    <div class="locationAddress descText">
                    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="37" height="37" fill="url(#pattern0)"/>
                    <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_28_364" transform="scale(0.0104167)"/>
                    </pattern>
                    <image id="image0_28_364" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAE60lEQVR4nO2dTWhcVRTHf439Ikn9wFRR01KbokEQ0Si60I0rA60mGxfWla5daGvd6CoifoDgB9Sii1KqYmpbRayuxIUKLVbUhShUa6IUmtavNkVTm8TFnQl2yjAzb/7nnncz9wdnMwznnfO/791579zz7kAmk8lkMplMJpPpNJZ4B9AES4Eh4E5gELge6AcuBXqBeeAM8CfwK/AD8D3wGXAYOBc/5PRZDowC+4BTBJGL2F/AXmCk4jPTgNXA08BJiotez04CY0BftGwSohd4FphGL3ytTQPPAD1RMkuAEWASe+FrbQK4L0J+pWUl8BLxha+1XUC3ca6lox/4Gn/xq/YVcLVpxiViADiCv+i19jPhFndRMwhM4S92PTsOXGeWvTPXAEfxF7mR/QKsMdLAjZWUa85vZIeBFSZKOLEDf1FbtVdNlHBgFH8xi9omAz2i0k0a8349m8D4ifkiS+eE2stG42NYcglhID7xDqQIlwOn8T+L27VpDAt4XVaOgccIRbbU6QEe8Q6iVZZjU1L2shMYrSdYXQEbCVOQmrPAO8ADhKfq3ooNVj4br3xHTR8wbODXjH3oz8J3gfVNHHuAsAqmPv54ISUcWEpYClQlfg7YUiCOrcCsMI4/sL9rlHAH2jOviPhVtoljubWNWKKxBe200y77hfE8KojHnDfQJDtDmM/b5dqKL0VMOwTxnIfFXZCqnr4f+FHg5yjwvsAPGCzYWAyAqpauEk3pa63IzwIWA3CxyM+XIj9KX6tEfkxRzbfKMka1hbFd+0cYE2BzBZSx31SVpzw3iwE4I/KjbBO5SuRHldsCFgNwQuRnSOQH4DaRnymRnwUsBmBC5GdE5Ad0LYiTIj8LWAzAtyI/o8AGgZ/1wL0CPwDfiPwsYDEAB0V+lgHPCfy8iK6Wf0jkx5S1aAtgW9uI5QlxLP1txBKVY+iSngUeLxDDNrTl6GMFYnBjJ9ozb55QG2rmN2ED8J7B8XcWUsKJTegFmCcsN44Dm7lwSXIzsKfyHYtjmzRpWT21riDcM6vqQt6cBq4gkVIEhHrQASPfHnyAgfhg2xf0lqHv2LztHUARuki7L7RqExguxlteAXPA64b+Y7GdcDubJKsJc6f3WVzUZoAr5ar8D8srAEJlVNHZ4MUewntjSXMD2ifSWDYH3GighwvK3pxYttdECSduJpxR3qK2Ykl0wbXCAfxFbdY+NNLAlZtI47dgFu1yaKnYjb/AjWyXWfYlYB3wN/4i17MZmnsHIWlewF/oeva8Yd6l4TLKuWHHVCW2juBh/AWvtYdMMy4ZS4Av8Be9aoewL8uUjlsI7395iz+LrnMuOV7BfwBeNs+yxPQAP+En/gSJ9PxbMozfAKhaFpPnTeKLvztKZonQR1j4iCX+cfIWxhdwD/FK1snvhGXFa9iLvz1aNgnSTdj730r8IyyOPYxMGcKmv/Nf4PaIeSTNU+gH4MmoGSROF/ApOvE/J5GtZsrEAO39fUnVTqHZ9KMjuZ/2B+DB6FEvMtop2HV0oU3FMsIc3qr4B1lkG3B7sobQZ9qs+L8TNmrKCBmmub6iOTr8z3ksGaPxAIy5RdcBdBF2v6on/kfk+31zVhH2o6gV/zvCbueZCKzj/N6i39Bs7JFpgbsIrYRngbudYylMyvPlJOHM/5jwKlEmk8lkMplMJpPJJMF/2MHfjTuQmYwAAAAASUVORK5CYII="/>
                    </defs>
                    </svg>
                        <p>${location.address}</p>
                    </div>
                    <hr>
                    <div class="locationPriceCondition">
                        <div class="locationPrice">
                           <svg width="30" height="30" viewBox="-20 -10 51 41"  fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M20.1583 18.6208C16.2804 17.6129 15.0333 16.5708 15.0333 14.9479C15.0333 13.0858 16.7587 11.7875 19.6458 11.7875C22.6866 11.7875 23.8141 13.2396 23.9166 15.375H27.692C27.5725 12.4367 25.7787 9.7375 22.2083 8.86625V5.125H17.0833V8.815C13.7691 9.5325 11.1041 11.685 11.1041 14.9821C11.1041 18.9283 14.367 20.8929 19.1333 22.0375C23.4041 23.0625 24.2583 24.5658 24.2583 26.1546C24.2583 27.3333 23.4212 29.2125 19.6458 29.2125C16.1266 29.2125 14.7429 27.6408 14.555 25.625H10.7966C11.0016 29.3663 13.8033 31.4675 17.0833 32.1679V35.875H22.2083V32.2021C25.5395 31.57 28.1875 29.6396 28.1875 26.1375C28.1875 21.2858 24.0362 19.6287 20.1583 18.6208Z" fill="black"/>
                           </svg>
                            ${location.price}
                            
                            /
                            night
                        </div>
                        <span>
                        Condition: 
                        ${location.condition}
                        </span>
                    </div>
                </div>
                <hr>
                <div class="locationInfoCnt">
                    <a class="OvReCo_btn txt_btn" href="#overview${location.id}">
                        Overview
                    </a>
                    <a class="OvReCo_btn txt_btn" href="#contact${location.id}">
                        Contact
                    </a>
                    <a class="OvReCo_btn txt_btn" href="#reviews${location.id}">
                        Reviews
                    </a>
                </div>
                
                <div class="locationTags">
                   <p>theft rating/month:  ${location.theft}</p>
                   <p>cost of living/month: ${location.costOfLiving}</p>
                   <p>anual temperature: ${location.anualTemp}</p> 
                </div>
                <div class="locationInfo">
                    ${this.renderOverview(location.overview, location.id)}
                    ${this.renderContact(location.contact, location.id)}
                 <div class="rent_btn_form">
                    <div class="rent_btn_container">
                    <button type="button" class="rent_btn" id="rent_btn${location.id}">
                            ${this.renderBuyRent(location.overview)}
                    </button>
                    </div>
                   <div class="rent_form_container_container">
                         <div class="rent_form_container" id="rent_form_container${location.id}">
                             <form action="" class="rent_form">
                               <button type="button" class="rent_form_cancel" id="rent_form_cancel${location.id}"> Cancel </button>
                                 <div class="dates row">
                                   <label for="dates">Select your dates:</label>
                                   <input type="date" id="start" value="2022-06-20" min="2022-05-10">
                                   <input type="date" id="end" value="2022-06-20" max="2022-07-10">
                              </div>
                              <input type="submit" value="Rent" >
                              </form>
                         </div>
                     </div>
                 </div>
                 </div>
                 <span class="subtitle">Reviews</span>   
                   <div class="locationInfo">
                    ${this.renderReviews(location.reviews, location.id)}
                   
                </div>
                
            </div>`
        }
        return res;
    }
    renderBuyRent(locationOverview) {
        if (locationOverview.for == "sale")
            return "buy";
        else
            return "rent";
    }

    removeDuplicates(locations) {
        return locations.filter(location => {
            if (this.locationsIds.includes(location.id)) {
                return false;
            }

            this.locationsIds.push(location.id);
            return true;
        })
    }

    async render(locations) {
        let locationsToRender = this.removeDuplicates(locations);
        if (locationsToRender.length) {
            let locationsInView = this.renderLocations(locationsToRender);
            this.rootElement.insertAdjacentHTML('beforeend', `${locationsInView}`);
            
        }
    }

    
  async renderAndReplace(locations){
    this.rootElement.innerHTML = "";
    this.render(locations);
    }

    async addListener(locations)
    {
        for(let location of locations)
        {
            const element = document.getElementById('rent_btn'+location.id);
            element.addEventListener("click",toggleRentFormOn);
            element.param=location.id;
            element.for=location.overview.for;
            const element2=document.getElementById('rent_form_cancel'+location.id);
            element2.addEventListener("click",toggleRentFormOff);
            element2.param=location.id;
        }
       
    }
}