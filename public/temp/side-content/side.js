import Map from '../map/map.js';
export default class Side {
    constructor (rootElement) {
        if (!rootElement) {
            throw 'rootElement required so we know where we render the element';
        }
        this.rootElement = rootElement;
        this.locationsIds = [];
    }
    
   
    renderOverview(locationOverview, id) {
        return `
            <div class="locationOverview" id="locationReview${id}">
             <p>${locationOverview.description}</p>
             <p>${locationOverview.facilities}</p>
             <p>${locationOverview.surface}</p>
             <p>${locationOverview.for}</p>
             ${this.renderAvaliability(locationOverview.dates)}
            </div>`
    }
    renderAvaliability(locationOverviewDates)
    {
        let res='';
        for(let value of Object.values(locationOverviewDates))
        {
            res+=`<div class="locationOverviewDates">
             <p>${value.start} ${value.end}</p>
            </div>
            `
        }
        return res;
    }
    renderContact(locationContact, id) {
        return `
            <div class="locationContact" id="locationReview${id}">
            <p>${locationContact.website.key}</p>
            <p>${locationContact.website.http}</p>
            <p>${locationContact.phoneNumber}</p>
            </div>`
    }

    renderReviews(locationReviews, id) {
        let res='';
        for(let value of Object.values(locationReviews)){
           res+= `<div class="locationReviews" id="locationReview${id}">
           ${value.title}
           </br>
           ${value.description}
           </br>
           ${value.score}
           </div>`
          }
          return res;
    }

    renderLocations(locations) {
        let res = '';

        for (let location of locations) {
            res += `
            <div class="location">
                <div class="locationImage">
                    <img src='${location.imgSrc}' alt='${location.imgAlt}'>
                <div/>
                <div class="locationTitle">
                    <p>${location.title}</p>
                </div>
                <div class="locationPrice">
                    <div class="locationAddress">
                        <i />
                        <p>${location.address}</p>
                    </div>
                    <div class="locationPrice">
                        <span>
                            <i />
                            ${location.price}
                            <i />
                            /
                            night
                        </span>
                        
                    </div>
                    <div class="locationCondition">
                        ${location.condition}
                        </div>
                </div>
                <div class="locationInfoCnt">
                    <a class="OvReCo_btn txt_btn" href="#overvieew${location.id}">
                        Overview
                    </a>
                    <a class="OvReCo_btn txt_btn" href="#contact${location.id}">
                        Contact
                    </a>
                    <a class="OvReCo_btn txt_btn" href="#reviews${location.id}">
                        Reviews
                    </a>
                </div>
                <div class="locationTags>
                    ${location.theft}
                    ${location.costOfLiving}
                    ${location.anualTemp}
                </div>
                <div class="locationInfo">
                
                    ${this.renderOverview(location.overview,location.id)}
                    ${this.renderContact(location.contact, location.id)}
                    ${this.renderReviews(location.reviews,location.id)}
                </div>
            </div>`
        }
        return res;
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
            this.rootElement.insertAdjacentHTML('beforeend',`${locationsInView}`);
        }
    }
}