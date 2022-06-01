const rootAPI = `http://localhost:8000/api/locations/bound`;


export const getLocationWithinBound = async (bound) => {
    try {
        let locations =  await fetch(rootAPI, {method: 'POST', body: JSON.stringify(bound), headers:{'Content-Type': 'application/json'}});
        locations = await locations.json();
        return locations;
    } catch (e) {
        throw e;
    }
}
export const getfacilities = async (bound) => {
    try {
        let facilities =  await fetch(rootAPI, {method: 'POST', body: JSON.stringify(bound), headers:{'Content-Type': 'application/json'}});
        facilities = await locations.json();
        return locations;
    } catch (e) {
        throw e;
    }
}