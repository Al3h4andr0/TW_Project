
const url = require('url');
const fs = require('fs');
var formidable = require('formidable');
// var multiparty = require('multiparty');
const allLocations = require('../data/locations');
const { getRequestData, getFormRequestData } = require('../utils/utils');
const LocationService = new (require('../service/locationService'))();
const authenticationService = new (require('../controller/authentication'))();
const notFound = (id) => ({ statusCode: 404, message: `Location with id ${id} not found` });




class LocationsControler {
    getLocationsWithinBound(geoLocation) {
        return allLocations.filter(location => {
            console.log(geoLocation, location.position);

            return location.position.lat <= geoLocation._northEast.lat &&
                location.position.lng <= geoLocation._northEast.lng &&
                location.position.lat >= geoLocation._southWest.lat && location.position.lng >= geoLocation._southWest.lng
        });
    }

    async getLocationsOwnedByUser(_, response, userPayload) {
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
    
    async getLocations(request,response)
    {
        fs.readFile( "./data/locations.json", (error, data) => {
            if(error) {
                throw error;
            }
            //console.log(data.toString());
            response.writeHead(200, '200', { 'Content-Type': 'application/json','Content-Disposition': 'attachment; filename="locations.json' });
            response.end(data);
        });
    }

    async getFilteredLocations(request, response) {
        const filtersMap = Object.assign({}, url.parse(request.url, true).query);
        for (var key in filtersMap)
            if (filtersMap[key].includes(','))
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

    async getMultipleLocations(request, response) {
        const urlData = request.url.split("?ids=");
        const ids = urlData[urlData.length - 1].split(",");
        const locations = await LocationService.getMultipleLocations(ids);
        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(locations));
    }

    async getSuggestions(request, response) {
        const keyword = request.url.split("keyword=")[1].replace("+", " ");;

        const suggestions = await LocationService.getSuggestions(keyword);
        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(suggestions));
    }

    async addLocation(request, response, userPayload) {
        let location_data = JSON.parse(await getRequestData(request));
        location_data.ownerId = parseInt(userPayload.id);
        let location = await LocationService.createLocation(location_data);

        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(location));
    }

    async deleteLocation(request, response, userPayload) {
        const urlData = request.url.split('/');
        const id = urlData[urlData.length - 1];
        const toBeDeleted = LocationService.getLocation(id);

        await authenticationService.verifyIfAuthorizedToModifyLocation(parseInt(id), userPayload);
        let deletedLocation = await LocationService.deleteLocation(id);

        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(deletedLocation));
    }
    
    // async deleteLocationAdmin(request, response) {
    //     const urlData = request.url.split('/');
    //     const id = urlData[urlData.length - 1];
    //     const toBeDeleted = LocationService.getLocation(id);

    //     let deletedLocation = await LocationService.deleteLocation(id);

    //     response.writeHead(200, '200', { 'Content-Type': 'application/json' });
    //     response.end(JSON.stringify(deletedLocation));
    // }

    async updateLocation(request, response, userPayload) {
        const urlData = request.url.split('/');
        const id = urlData[urlData.length - 1];
        let location_data = await getRequestData(request);

        await authenticationService.verifyIfAuthorizedToModifyLocation(parseInt(id), userPayload);

        let updatedLocation = await LocationService.updateLocation(id, JSON.parse(location_data));


        response.writeHead(200, '200', { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(updatedLocation));


    }

    async uploadTest(request, response, userPayload) {
        let form = new formidable.IncomingForm();
        form.parse(request, async function (error, fields, file) {
            console.log(fields);
            let filepath = file.images.filepath;
            __dirname
            let newpath = '../server/data/photos/';
            newpath += file.images.originalFilename;
            fs.rename(filepath, newpath, function () {
            });
            let fac = [];
            newpath = 'http://localhost:8000/api/photo?photo=';
            newpath += file.images.originalFilename;
            if (fields.facilities1 != null) {
                fac.push(fields.facilities1);
            }
            if (fields.facilities2 != null) {
                fac.push(fields.facilities2);
            }
            if (fields.facilities3 != null) {
                fac.push(fields.facilities3);
            }
            if (fields.facilities4 != null) {
                fac.push(fields.facilities4);
            }
            if (fields.facilities5 != null) {
                fac.push(fields.facilities5);
            }

            let location = {
                ownerId: userPayload.id,
                position: {
                    lat: fields.lat,
                    lng: fields.lng
                },
                title: fields.name,
                imgSrc: newpath,
                imagAlt: fields.name,
                address: fields.address,
                price: fields.price,
                condition: fields.condition,
                overview: {
                    description: fields.description,
                    facilities: fac,
                    surface: fields.mp,
                    for: fields.for,
                    dates: []
                },
                reviews: [],
                contact: {
                    website: {
                        key: fields.website,
                        http: fields.website
                    },
                    phoneNumber: fields.phone
                },
                theft: fields.theft,
                costOfliving: fields.costOfLiving,
                anualTemp: fields.anualTemp
            }

            let new_location = await LocationService.createLocation(location);
            console.log(new_location);

            response.writeHead(200, '200', { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(new_location));
        });
    }

    async uploadLocations(request,response)
    {
        let form = new formidable.IncomingForm();
        form.parse(request, async function (error, fields, file) {
            //console.log(file);
            let filepath = file.import_locations.filepath;
            let newpath = './data/locations.json';
            fs.rename(filepath, newpath, function () {
            });

            response.writeHead(200, '200', { 'Content-Type': 'application/json' });
            response.end();
        });
    }

}






module.exports = LocationsControler