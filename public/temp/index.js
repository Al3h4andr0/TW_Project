import Side from './side-content/side.js';
import Map from './map/map.js';
import {getLocationWithinBound} from './api/locations.js';
import map from './map/map.js';
import Account from './account/account.js';
import Suggestions from './api/suggestions.js';
import FilterModal from './modals/filter/filterModal.js'
import myEstatesModal from './modals/myEstates/myEstatesModal.js';



const myEstates = new myEstatesModal(document.getElementById('my_estates_content'), document.getElementById('myApartments_btn'));
const side = new Side(document.getElementById('content'));
const account = new Account(document.getElementById('account'));
const suggestions = new Suggestions(document.getElementById("searchInput"),document.getElementById("autocomplete-box"), side,Map);
const filterModal = new FilterModal(document.getElementById("filter-zone"),document.getElementById("filters-modal-toggle"),side,Map);

function init () {

    async function onMapStateChange() {
        const bound = Map.getLocation();
        const locations = (await getLocationWithinBound(bound)).locations;
        
        //Map.renderPins(locations);
        //side.render(locations);
        //side.addListener(locations);
    }
     
   async function onAccountStateChange()
    {
        account.addLoginListener();
        account.addRegisterListener();
        account.addAddApartmentListener();
    }
    async function recommendationsListeners()
    {
       
     Map.addBrasovListener(side);
     Map.addIasiListener(side);
     Map.addBucurestiListener(side);
     Map.addTimisoaraListener(side);

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
    Map.fetchLocationsAndUpdateSide("iasi", side);
    onMapStateChange();
    onAccountStateChange();
    recommendationsListeners();

    suggestions.bindListeners();
    filterModal.render();
    account.addAccountListener();

    myEstates.addListenersToElements();
}


init();
