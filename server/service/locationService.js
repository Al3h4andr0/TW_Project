const allFacilities = require('../data/facilities');
const allLocations = require('../data/locations');
const notFound = (id) => ({ statusCode: 404, message: `Location with id ${id} not found` });
const facilitiesService = new (require('./facilitiesService'))();

class LocationsService {
    async getAllLocations() {
        return new Promise((resolve, _) => {
            resolve(allLocations);
        });

    }

    async getFilteredLocations(filtersMap) {
        return new Promise((resolve, _) => {
            resolve(allLocations.filter(location => checkIfLocationValid(location, filtersMap)));
        })
    }

    async getLocation(id) {
        return new Promise((resolve, reject) => {
            if (typeof id === 'undefined') {
                return resolve(allLocations);
            }

            id = parseInt(id);
            let location = allLocations.find((location) => location.id === id);

            if (location) {
                resolve(location);
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

                return resolve(allLocations[locationIndex]);

            } else {
                console.log("GOT TO REJECT");
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
                resolve({ message: 'Location with id ' + id + ' deleted.' });
            } else {
                reject(notFound(id));
            }

        });
    }

    async getLocationsForUser(id) {
        return new Promise((resolve, _) => {
            let userId = parseInt(id);
            let locations = allLocations.filter((location) => location.ownerId === userId);
            resolve(locations);
        })
    }
}

const checkIfLocationValid = (location, filtersMap) => {
    var value;
    for (var key in filtersMap) {
        value = filtersMap[key];
        switch (key) {
            case 'price_min':
                let priceMin = getNumericalValueFromString(value);
                if (priceMin != null) {
                    if (location.price < priceMin)
                        return false;
                }
                else
                    raiseError("price_min", value);
                break;
            case 'price_max':
                let priceMax = getNumericalValueFromString(value);
                if (priceMax != null) {
                    if (location.price > priceMax)
                        return false;
                }
                else
                    raiseError("price_max", value);

                break;
            case 'keyword':
                let titleIncludesKeyword = (location.title.toLowerCase()).includes(value.toLowerCase());
                let descriptionIncludesKeyword = (location.overview.description.toLowerCase()).includes(value.toLowerCase());
                let addressIncludesKeyword = (location.address.toLowerCase()).includes(value.toLowerCase());
                if (!(titleIncludesKeyword || descriptionIncludesKeyword || addressIncludesKeyword))
                    return false;
                break;
            case 'condition':
                if (!Array.isArray(value))
                    value = [value];
                if (!value.includes(location.condition)) //if the condition is not from ones specified by user, then the location is not good
                    return false;
                break;
            case 'facilities':
                if (!Array.isArray(value))
                    value = [value];
                var allFacilitiesExist = value.every(facility => allFacilities.includes(facility));
                if (!allFacilitiesExist) {
                    raiseError("facilities", value);
                    return false;
                }
                for (let iterator in value)
                    if (!location.overview.facilities.includes(value[iterator]))
                        return false;
                break;
            case 'surface_min':
                let surfaceMin = getNumericalValueFromString(value);
                if (surfaceMin != null) {
                    if (location.overview.surface < surfaceMin)
                        return false;
                }
                else
                    raiseError("surface_min", value);
                break;
            case 'surface_max':
                let surfaceMax = getNumericalValueFromString(value);
                if (surfaceMax != null) {
                    if (location.overview.surface > surfaceMax)
                        return false;
                }
                else raiseError("price_max", value);
                break;
            case 'for':
                if (value !== location.overview.for)
                    return false;
                break;
            case 'rating_min':
                const ratingMin = getNumericalValueFromString(value);
                if (ratingMin === null)
                    raiseError("rating_min", value);
                else {
                    let ratingAvg = 0;
                    for (let iterator in location.reviews)
                        ratingAvg += location.reviews[iterator].score;
                    ratingAvg = ratingAvg / location.reviews.length;
                    if (ratingAvg < ratingMin)
                        return false;

                }
                break;
            case 'rating_max':
                const ratingMax = getNumericalValueFromString(value);
                if (ratingMax === null)
                    raiseError("rating_max", value);
                else {
                    let ratingAvg = 0;
                    for (let iterator in location.reviews)
                        ratingAvg += location.reviews[iterator].score;
                    ratingAvg = ratingAvg / location.reviews.length;
                    if (ratingAvg > ratingMax)
                        return false;

                }
                break;
            case 'theft_max':
                const theftMax = getNumericalValueFromString(value);
                if (theftMax === null)
                    raiseError("theft_max", value);
                else if (location.theft > theftMax)
                    return false;
                break;
            case 'cost_of_living_min':
                const costOfLivingMin = getNumericalValueFromString(value);
                if (costOfLivingMin === null)
                    raiseError("cost_of_living_min", value);
                else if (location.costOfLiving < costOfLivingMin)
                    return false;
                break;
            case 'cost_of_living_max':
                const costOfLivingMax = getNumericalValueFromString(value);
                if (costOfLivingMax === null)
                    raiseError("cost_of_living_max", value);
                else if (location.costOfLiving > costOfLivingMax)
                    return false;
                break;
            case 'anual_temp_min':
                const anualTempMin = getNumericalValueFromString(value);
                if (anualTempMin === null)
                    raiseError("anual_temp_min", value);
                else if (location.anualTemp < anualTempMin)
                    return false;
                break;
            case 'anual_temp_max':
                const anualTempMax = getNumericalValueFromString(value);
                if (anualTempMax === null)
                    raiseError("anual_temp_max", value);
                else if (location.anualTemp > anualTempMax)
                    return false;
                break;
            case 'date-interval':
                //values = "2022/02/23-2022/03/01"
                if (filtersMap.for !== "rent") {
                    raiseError("date-interval specified but the location is not for renting");
                    break;
                }

                const dates = value.split('/');
                if (dates.length != 2)
                    raiseError('dates-interval not found; expected format yyyy-mm-dd/yyyy-mm-dd', value);
                else {
                    const startDateValues = dates[0].split('-');
                    const endDateValues = dates[1].split('-');
                    try {
                        var startDate = new Date(startDateValues[0], startDateValues[1], startDateValues[2]);
                        var endDate = new Date(endDateValues[0], endDateValues[1], endDateValues[2]);
                        if (startDate.getTime() > endDate.getTime()) {
                            let a = startDate;
                            startDate = endDate;
                            endDate = a;
                        }
                        let isAvailable = false;
                        for (let iterator in location.overview.dates) {
                            var availableStartDate = location.overview.dates[iterator].start.split('-');
                            var availableEndDate = location.overview.dates[iterator].end.split('-');

                            availableStartDate = new Date(availableStartDate[0], availableStartDate[1], availableStartDate[2]);
                            availableEndDate = new Date(availableEndDate[0], availableEndDate[1], availableEndDate[2]);

                            if (availableStartDate.getTime() <= startDate.getTime() && availableEndDate.getTime() >= endDate.getTime()) // period preferred by user is in available period
                            {
                                isAvailable = true;
                                break; //from for-loop
                            }
                        }
                        if (!isAvailable)
                            return false;
                    }
                    catch (e) { raiseError('  date-interval invalid dates ', value); console.log(e); }

                }

                break;
            default:
                console.log("WARNING: Got a filter that is not recognized", key);
        }
    }

    return true;
}

const getNumericalValueFromString = (possibleNumber) => {
    if (!isNaN(possibleNumber))
        return parseInt(possibleNumber);
    return null;
}

const raiseError = (field, wrongValue) => {
    console.log("WARNING: In" + field + " | got a value that is invalid: ", wrongValue);
}



module.exports = LocationsService;