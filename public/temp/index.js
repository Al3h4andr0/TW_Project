import Side from './side-content/side.js';
import Map from './map/map.js';
import {getLocationWithinBound} from './api/locations.js';
import map from './map/map.js';
import Account from './account/account.js';
import Suggestions from './api/suggestions.js';
import FilterModal from './modals/filter/filterModal.js'


const side = new Side(document.getElementById('content'));
const account = new Account(document.getElementById('account'));
const suggestions = new Suggestions(document.getElementById("searchInput"),document.getElementById("autocomplete-box"), side);
const filterModal = new FilterModal(document.getElementById("filter-zone"),document.getElementById("filters-modal-toggle"));

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
        account.addLoginListener();
        account.addRegisterListener();
        account.addAddApartmentListener();
    }
    async function recommendationsListeners()
    {
       
     Map.addBrasovListener();
     Map.addIasiListener();
     Map.addBucurestiListener();
     Map.addTimisoaraListener();

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
    recommendationsListeners();

    suggestions.bindListeners();
    filterModal.render();
}


init();
