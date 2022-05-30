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
            <p>${location.overview.description}</p>
        </div>`
    }

    renderPins(locations) {
        for(let location of locations) {
            if (!this.locationsIds.includes(location.id)) {
                this.locationsIds.push(location.id);
                let marker = L.marker([location.position.lat, location.position.lng]).addTo(this.map);
                marker.bindPopup(this.renderPrettyPopupDescription(location));
            }
        }
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
}

const map = (new Map());
export default map;