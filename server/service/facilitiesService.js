const allFacilities = require('../data/facilities');
const notFound = (id) => ({statusCode: 404, message: `Facility with id ${id} not found`});


class FacilitiesService{
    async getAllFacilities()
    {
        return new Promise((resolve, _) => {
            resolve(allFacilities);
        }); 
    }

    async getFacilityWithId(id) {

        return new Promise((resolve, reject) => {
            if (typeof id === 'undefined') {
                return resolve(allFacilities);
            }
            
            id = parseInt(id);
            let facility = allFacilities.find((facility) => facility.id === id);

            if (facility) {
                resolve(facility.name);     
            } else {
                reject(notFound(id));
            }
        });
    }

    async getFacilitiesWithIds(idArray){
        return await new Promise((resolve, _) => {
            if (typeof idArray === 'undefined') {
                return resolve(null);
            }
            const facilityNamesArray = [];
            const foundFacilities = []
           allFacilities.forEach(facility => {
                if(idArray.includes(facility.id))
                    {facilityNamesArray.push(facility);
                        foundFacilities.push(facility.id);
                    }
           });
           if(facilityNamesArray.length !== idArray.length)
                console.log("WARNING: ", "Some facilities were not found in database: \n ids to be found: " + idArray + "\n Facilities found: " + foundFacilities);
            resolve(facilityNamesArray);
    
        });
    }

    async getFacilityWithName(name){
        return new Promise((resolve,reject) => {
            if(typeof id === 'undefined')
                return resolve(allFacilities);

                id = parseInt(id);
                let facility = allFacilities.find((facility) => facility.name === name);
    
                if (facility) {
                    resolve(facility)     
                } else {
                    reject(notFound(id));
                }
        })
    }

    async createFacility(facilityName) {
        return new Promise((resolve, _) => {
            let newFacility = {
                name: facilityName,
                id: allFacilities[allFacilities.length - 1].id + 1
            }

            allFacilities.push(newFacility);
            resolve(newFacility);
        });
    }

    async deleteFacility(id) {
        id = parseInt(id);

        return new Promise((resolve, reject) => {
            let facilityIndex = allFacilities.findIndex((location) => location.id === id);

            allFacilities.splice(facilityIndex, 1);
            if (facilityIndex !== -1) {
                resolve({message : 'Facility with id ' + id + ' deleted.'});
            } else {
                reject(notFound(id));
            }

        });
    }
}

module.exports = FacilitiesService;