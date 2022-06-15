const url = require('url');
 const fs = require('fs');
 var formidable = require('formidable');
// var multiparty = require('multiparty');
const allLocations = require('../data/locations');
const { getRequestData, getFormRequestData } = require('../utils/utils');
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

    async uploadTest(request,response){
    const body = await getRequestData(request);
    // TODOs
         /*  am incercat cu diferite librarii, nu face niciuna ce trebuie sa faca.
             Din body-u asta raw ar trebui sa-mi apara toate datele din formular intr-un map, iar fisierele (pozele)
            sa fie salvate local (cum ar veni pe server), iar cand dau get la apartamente sa fie trimise si pozele, probabil tot ca BLOB.
            5 hours wasted on this :(  
         */


                let form= new formidable.IncomingForm();
                form.parse(request,function(error,fields,file) {
                   console.log(fields);
                   let filepath=file.images.filepath;
                   let newpath='C:/UPLOAD_TEST/';
                   newpath+=file.images.originalFilename;
                   fs.rename(filepath,newpath,function(){
                   });
                });


   //const boundary =request.headers["content-type"].split("boundary=")[1];
    // var form = new formidable.IncomingForm();
    // console.log(form);
    // form.parse(request, (err,fields,files) => {
    //     if(err)
    //     {
    //         console.error(err.message);
            
    //     }
    //     console.log("FIELDS", fields);
    //     console.log("FILES", files);

    // });
     }
}






module.exports = LocationsControler