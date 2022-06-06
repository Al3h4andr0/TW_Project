const allLocations = require('../data/locations');
const notFound = (id) => ({statusCode: 404, message: `Location with id ${id} not found`});


class LocationsService{
    async getAllLocations()
    {
        return new Promise((resolve, _) => {
            resolve(allLocations);
        });
      
    }

    
    async getLocation(id) {
        return new Promise((resolve, reject) => {
            if (typeof id === 'undefined') {
                return resolve(allLocations);
            }

            id = parseInt(id);
            let location = allLocations.find((location) => location.id === id);

            if (location) {
                resolve(location)     
            } else {
                reject(notFound(id));
            }
        });
    }

    async createLocation(location) {
        return new Promise((resolve, _) => {
            let newLocation = {
                ...location,
                id: allLocations[allLocations.length - 1].id + 1
            }

            allLocations.push(newLocation);
            resolve(newLocation);
        });
    }

    async updateLocation(id, values) {
        id = parseInt(id);

        return new Promise((resolve, reject) => {
            let locationIndex = allLocations.findIndex((location) => {
                return location.id === id
            });

            if (locationIndex !== -1) {
                for (let key in values) {
                    allLocations[locationIndex][key] = values[key];
                }
                resolve(allLocations[locationIndex]);
            } else {
                reject(notFound(id));
            }
        })
    }

    async deleteLocation(id) {
        id = parseInt(id);

        return new Promise((resolve, reject) => {
            let locationIndex = allLocations.findIndex((location) => location.id === id);

            allLocations.splice(locationIndex, 1);
            if (locationIndex !== -1) {
                resolve({message : 'Location with id ' + id + ' deleted.'});
            } else {
                reject(notFound(id));
            }

        });
    }
}

module.exports = LocationsService;