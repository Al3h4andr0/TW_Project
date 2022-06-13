const url = require('url');
const allLocations = require('../data/locations');
const { getRequestData } = require('../utils/utils');
const LocationService = new (require('../service/locationService'))();
const authenticationService = new (require('../controller/authentication'))();
const notFound = (id) => ({ statusCode: 404,message: `Location with id ${id} not found` });

class LocationsControler {
    getLocationsWithinBound(geoLocation) {
        return allLocations.filter(location => {
            console.log(geoLocation, location.position);

            return location.position.lat <= geoLocation._northEast.lat &&
                location.position.lng <= geoLocation._northEast.lng &&
                location.position.lat >= geoLocation._southWest.lat && location.position.lng >= geoLocation._southWest.lng
        });
    }

    async getLocationsOwnedByUser(_,response,userPayload)
    {
        const locations = await LocationService.getLocationsForUser(userPayload.id);

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

    async getFilteredLocations(request,response)
    {
      const filtersMap = Object.assign({},url.parse(request.url,true).query);
            for(var key in filtersMap)
                if(filtersMap[key].includes(','))
                    filtersMap[key] = filtersMap[key].split(',');
               
      const locations = await LocationService.getFilteredLocations(filtersMap);

        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(locations));
    }

    async getTheLocation(request, response) {
    
        const urlData = request.url.split('/');
        const id = urlData[urlData.length - 1];
        const location = await LocationService.getLocation(id);

        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(location));
    }

    async addLocation(request, response, userPayload) {
        let location_data = JSON.parse(await getRequestData(request));
        location_data.ownerId = parseInt(userPayload.id);
        let location = await LocationService.createLocation(location_data);

        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(location));
    }

   async deleteLocation (request, response, userPayload){
        const urlData = request.url.split('/');
        const id = urlData[urlData.length - 1];
        const toBeDeleted = LocationService.getLocation(id);
        
        await authenticationService.verifyIfAuthorizedToModifyLocation(parseInt(id),userPayload);
        let deletedLocation = await LocationService.deleteLocation(id);
    
        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(deletedLocation));
    }

    async updateLocation(request, response, userPayload) {
        const urlData = request.url.split('/');
        const id = urlData[urlData.length - 1];
        let location_data = await getRequestData(request);
    
        await authenticationService.verifyIfAuthorizedToModifyLocation(parseInt(id),userPayload);
       
       let updatedLocation = await LocationService.updateLocation(id, JSON.parse(location_data));
        

        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(updatedLocation));
       
      
    }
}

module.exports = LocationsControler;