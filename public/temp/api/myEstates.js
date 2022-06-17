async function myEstates(){

    const rootAPI = `http://localhost:8000/api/locations/myLocations`;
    
    var response = await fetch(rootAPI, {method: 'GET', headers:{'Content-Type': 'application/json'}})
    .then((res) => {
       console.log(JSON.stringify(res));
    })
    .catch(ex => {
        throw ex;
    });
}