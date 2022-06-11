const allLocations = require('../data/locations');
const { getRequestData } = require('../utils/utils');
const LocationService = new (require('../service/locationService'))();
const authenticationService = new (require('../controller/authentication'))();
const notFound = (id) => ({ message: `Location with id ${id} not found` });

class LocationsControler {
    getLocationsWithinBound(geoLocation) {
        return allLocations.filter(location => {
            console.log(geoLocation, location.position);

            return location.position.lat <= geoLocation._northEast.lat &&
                location.position.lng <= geoLocation._northEast.lng &&
                location.position.lat >= geoLocation._southWest.lat && location.position.lng >= geoLocation._southWest.lng
        });
    }

    async getLocationsOwnedByUser(request,response)
    {
        const payload = await authenticationService.getJWTPayload(request);
        const locations = await LocationService.getLocationsForUser(payload.id);

        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(locations));
    }
    // TO BE REWRITTEN
    async getLocation(id, geoLocation) {
        let locations = this.getLocationsWithinBound(geoLocation);
        return new Promise((resolve, reject) => {
            if (typeof id === 'undefined') {
                return resolve(locations);
            }

            id = parseInt(id);
            let location = locations.find((location) => location.id === id);

            if (location) {
                resolve(location)
            } else {
                reject(notFound(id));
            }
        });
    }
    //////////////////////////////////////////////
    async getAllLocations(_, response) {
        const locations = await LocationService.getAllLocations();
        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(locations));
    }

    async getTheLocation(request, response) {
        console.log("GET THE LOCATION CALLED");
        const urlData = request.url.split('/');
        const id = urlData[urlData.length - 1];
        const location = await LocationService.getLocation(id);

        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(location));
    }

    async addLocation(request, response) {
        let location_data = JSON.parse(await getRequestData(request));
       let payload = await authenticationService.getJWTPayload(request);

        location_data.ownerId = parseInt(payload.id);
        let location = await LocationService.createLocation(location_data);

        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(location));
    }

   async deleteLocation (request, response){
        const urlData = request.url.split('/');
        const id = urlData[urlData.length - 1];

        await authenticationService.verifyIfAuthorizedToDelete(parseInt(id),request,response);
        let deletedLocation = await LocationService.deleteLocation(id);
    
        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(deletedLocation));
    }

    async updateLocation(request, response) {
        const urlData = request.url.split('/');
        const id = urlData[urlData.length - 1];
        let location_data = await getRequestData(request);
        let updatedLocation = await LocationService.updateLocation(id, JSON.parse(location_data));
        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(updatedLocation));
    }

   
}

module.exports = LocationsControler;