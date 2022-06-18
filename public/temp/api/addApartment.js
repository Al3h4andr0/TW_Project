const rootAPI = `http://localhost:8000/api/locations/upload`;
const provider = new GeoSearch.OpenStreetMapProvider();


const addApartmentListenerInit = () => {
    const myForm = document.getElementById("add_apartment_form");
    myForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(myForm);
        const results = await provider.search({query:formData.get("address")});
        console.log(results);
        var lat;
        var lng;
        if(results.length === 0)
        console.log("nothing found");
        else
        {
            lat = results[0].y;
            lng = results[0].x;
        }
            formData.append("lat", lat);
            formData.append("lng", lng);
        

        fetch(rootAPI, {method: 'POST', body: formData});
        }
    )

}

document.getElementById("add_apartment_btn").addEventListener("click", addApartmentListenerInit);

