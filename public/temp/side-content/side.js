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

            </div>`
    }

    renderContact(locationContact, id) {
        return `
            <div class="locationContact" id="locationReview${id}">

            </div>`
    }

    renderReviews(locationReviews, id) {
        return `
            <div class="locationReviews" id="locationReview${id}">

            </div>`
    }

    renderLocationTags(tags) {
        return `
            <div class="locationTags">
            
            </div>
        `
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
                            ${location.time}
                        </span>
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
                    ${this.renderLocationTags(location.tags)}
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