import Side from './side-content/side.js';
import Map from './map/map.js';
import {getLocationWithinBound} from './api/locations.js';
import map from './map/map.js';


const side = new Side(document.getElementById('content'));

function init () {

    async function onMapStateChange() {
        const bound = Map.getLocation();
        const locations = (await getLocationWithinBound(bound)).locations;
        Map.renderPins(locations);
        side.render(locations);
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
}

function showModal(id) {
    switch(id) {
        case 1:

    }
}

init();