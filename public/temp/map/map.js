class Map {
    constructor () {
            this.map = L.map('map_frame').setView([47.156864, 27.587282], 17);
            this.leafletLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 30,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1Ijoic3RlZmFuaGFnaXUiLCJhIjoiY2wzMnpqZ3FkMDJ5MjNkb3ViYTR4aWs3eCJ9.Q0K6cKyK622dzCAggZRnEQ'
            });
            this.locationsIds = [];
            this.markers = [];
            
    }

    onMapClick(cb) {
        let self = this;
        return (e) => {
            cb(e, self);
        }
    }

    onMapZoomEnd(cb) {
        let self = this;
        return (e) => {
            cb(e, self);
        }
    }

    onMapDragEnd(cb) {
        let self = this;
        return (e) => {
            cb(e, self);
        }
    }

    renderPrettyPopupDescription (location) {
        return `
        <div class="prettyPopup">
            <img src="${location.imgSrc}">
            <p><b>${location.title}</b></p>
            <a href="#location${location.id}">See more</a>
            <p>${location.overview.description}</p>
        </div>`
    }

    renderPins(locations) {
        let bounds = L.latLngBounds();
        for(var i = 0; i < this.markers.length; i++){
            this.map.removeLayer(this.markers[i]);
        }
        for(let location of locations) {
           
                //console.log("location to add marker",location)
                this.locationsIds.push(location.id);
                let marker = L.marker([location.position.lat, location.position.lng]).addTo(this.map);
                marker.bindPopup(this.renderPrettyPopupDescription(location));
                this.markers.push(marker);

                
                bounds.extend([location.position.lat, location.position.lng]); 
                console.log('extending map',bounds,locations.length);
        }
       if(locations.length==1)
       {
          for(let location of locations)
          {
            this.map.flyTo( [location.position.lat,location.position.lng],14,{duration:1})
          }
          
       }
       else
        {this.map.fitBounds(bounds);}
    }
    init() {
        this.leafletLayer.addTo(this.map)
    }

    getLocation() {
        return this.map.getBounds();
    }

    hookOnMapClick(cb) {
        this.map.on('click', this.onMapClick(cb));
    }

    hookOnMapZoomEnd(cb) {
        this.map.on('zoomend', this.onMapZoomEnd(cb));
    }

    hookOnMapDragEnd(cb) {
        this.map.on('dragend', this.onMapDragEnd(cb));
    }
    async addBrasovListener()
    {
       
         const element = document.getElementById("brasov_btn");
         let latlng = [45.652822,25.611141];
         element.addEventListener("click",async ()=>{moveView
            let rootAPI="http://localhost:8000/api/locations";
            let res = await fetch((rootAPI, {method: 'GET', headers:{'Content-Type': 'application/json'}}));
           // res=await res.json();
            console.log(res);
        },false);
         element.param=latlng;
         element.p=this.map;
         
        
    }
    async addIasiListener(){
        const element = document.getElementById("iasi_btn");
        let latlng = [47.158089,27.588944];
         element.addEventListener("click",moveView,false);
         element.param=latlng;
         element.p=this.map;
    }
    async addBucurestiListener(){
        const element = document.getElementById("bucuresti_btn");
        let latlng = [44.432278,26.102486];
         element.addEventListener("click",moveView,false);
         element.param=latlng;
         element.p=this.map;
    }
    async addTimisoaraListener(){
        const element = document.getElementById("timisoara_btn");
        let latlng = [45.756101,21.228719];
         element.addEventListener("click",moveView,false);
         element.param=latlng;
         element.p=this.map;
    }
}
function moveView(latlng)
    {
       latlng.currentTarget.p.flyTo(latlng.currentTarget.param,13,{duration:1});
    }
const map = (new Map());
export default map;