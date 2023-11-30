window.onload = async () => {
    initMap();

    var geocoder = new google.maps.Geocoder();

    var searchResultStart = document.getElementById('location-start-bar');
    var searchResultEnd = document.getElementById('location-destination-bar');

    var startSearchAutocomplete = new google.maps.places.Autocomplete(searchResultStart)

    var endSearchAutocomplete = new google.maps.places.Autocomplete(searchResultEnd)

    var Markers_startLatLng = null;
    var Markers_endLatLng = null;

    var startInfoWindow = new google.maps.InfoWindow();

    var endInfoWindow = new google.maps.InfoWindow();

    var incidentsMarker = []
    var incidentsInfoWindow = []

}


const cincinnatiLatLng = {
    lat: 39.103119,
    lng: -84.512016
}
var mapStyles;
var map;
var currentLocationButton;

function initMap() {
    mapStyles  = [
        {
            featureType: "all",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "road",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
        }]

    map = new google.maps.Map(document.getElementById('map'), {
        center: cincinnatiLatLng,
        zoom: 13,
        draggableCursor: 'pointer',
        fullscreenControl: false,
        streetViewControl: false,
        minZoom: 1,
        mapTypeControl: false,
        gestureHandling: "greedy",
        styles: mapStyles
    });

    currentLocationButton = document.createElement("button");
    currentLocationButton.id = "current-location-button";
    currentLocationButton.textContent = "Use Current Location";
    currentLocationButton.className = 'btn btn-sm btn-secondary'
    currentLocationButton.type = 'button'
    currentLocationButton.style = 'font-size: 12px'

    filterIncidentsButton = document.createElement("button");
    filterIncidentsButton.id = "filter-incidents-button";
    filterIncidentsButton.textContent = "Show Incidents Only On Route";
    filterIncidentsButton.className = 'btn btn-sm btn-secondary'
    filterIncidentsButton.type = 'button'
    filterIncidentsButton.style = 'font-size: 12px'

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(filterIncidentsButton);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(currentLocationButton);

}

