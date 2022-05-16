const allLocations = require('../data/locations');
const notFound = (id) => ({message: `Location with id ${id} not found`});

class LocationsControler {

    getLocationsWithinBound(geoLocation) {
        return allLocations.filter(location => {
            console.log(geoLocation, location.position);

            return location.position.lat <= geoLocation._northEast.lat &&
                   location.position.lng <= geoLocation._northEast.lng &&
                   location.position.lat >= geoLocation._southWest.lat &&  location.position.lng >= geoLocation._southWest.lng
        });
    }

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

    async createLocation(location) {
        return new Promise.resolve();
    }

    async updateLocation(id, location) {
        id = parseInt(id);

        return new Promise.resolve();
    }

    async deleteLocation(id) {
        id = parseInt(id);

        return new Promise.resolve();
    }
}

module.exports = LocationsControler;