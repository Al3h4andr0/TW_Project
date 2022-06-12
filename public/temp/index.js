import Side from './side-content/side.js';
import Map from './map/map.js';
import {getLocationWithinBound} from './api/locations.js';
import map from './map/map.js';
import Account from './account/account.js';

const side = new Side(document.getElementById('content'));
const account = new Account(document.getElementById('account'));

function init () {

    async function onMapStateChange() {
        const bound = Map.getLocation();
        const locations = (await getLocationWithinBound(bound)).locations;
        Map.renderPins(locations);
        side.render(locations);
        side.addListener(locations);
    }
     
   async function onAccountStateChange()
    {
        account.addRegisterListener();
        account.addAddApartmentListener();
    }

    // Render map
    Map.hookOnMapClick((e, self) => {
        let popup = L.popup();
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(self.map);
    });
    Map.hookOnMapZoomEnd((e, self) => {
        onMapStateChange();
    });
    Map.hookOnMapDragEnd((e, self) => {
        onMapStateChange();
    })

    Map.init();
    onMapStateChange();
    onAccountStateChange();
}

function showModal(id) {
    switch(id) {
        case 1:

    }
}

init();