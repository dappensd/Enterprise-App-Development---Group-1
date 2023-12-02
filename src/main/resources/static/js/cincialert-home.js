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

    async function updateIncidentsOnMap() {

        const jsonEndPoint = await fetch('/trafficIncidentsJson');
        const jsonIncidents = await jsonEndPoint.json()

        if (incidentsMarker.length !== jsonIncidents.length) {

            trafficIncidents = jsonIncidents

            for (let i = incidentsMarker.length; i < jsonIncidents.length; i++) {

                latLngs = {
                    lat: parseFloat(jsonIncidents[i].latitude),
                    lng: parseFloat(jsonIncidents[i].longitude)
                }

                incidentsMarker.push(new google.maps.Marker({
                    map: map,
                    position: latLngs
                }))

                isIncidentInfoWindowOpen.push(false)

                incidentsMarker[i].addListener('click', (event) => {
                    if (!isIncidentInfoWindowOpen[i]){
                        closeAllIncidentMarkersInfoWindow()

                        incidentsInfoWindow[i].setPosition(event.latLng)
                        incidentsInfoWindow[i].open(map, incidentsMarker[i]);
                        isIncidentInfoWindowOpen[i] = true

                    }else{
                        incidentsInfoWindow[i].close();
                        isIncidentInfoWindowOpen[i] = false;
                    }
                });

                isMarkerInRange.push(false)

                const response = await geocoder.geocode({location: latLngs});

                let content = `
                <html>
                    <body>
                        <h4>Incident Info</h4>
                        <p><strong>Location: </strong> <br> ${response.results[0].formatted_address} </p>
                        <p><strong>Severity: </strong> <br> ${jsonIncidents[i].severity} </p>
                        <p><strong>Description: </strong> <br> ${jsonIncidents[i].description} </p>
                    </body>
                </html>
                `

                incidentsInfoWindow.push(new google.maps.InfoWindow({
                    content: content
                }))
            }
        }
    }

    const pageUpdateDelay = 5000
    setInterval(updateIncidentsOnMap, pageUpdateDelay);

    trafficIncidents.forEach((incident, index) => {
        incidentsMarker.push(new google.maps.Marker({
            map: map,
            position: {lat: incident.latitude, lng: incident.longitude},
        }))
    })

    for (const incident of trafficIncidents) {
        const response = await geocoder.geocode({ location: {lat: incident.latitude, lng: incident.longitude} });

        let content = `
        <html>
            <body>
                <h4>Incident Info</h4>
                <p><strong>Location: </strong> <br> ${response.results[0].formatted_address} </p>
                <p><strong>Severity: </strong> <br> ${incident.severity} </p>
                <p><strong>Description: </strong> <br> ${incident.description} </p>
            </body>
        </html>
        `

        incidentsInfoWindow.push(new google.maps.InfoWindow({
            content: content
        }))
    }

    var startMarker = new google.maps.Marker({
        map: map,
        draggable: true,
        icon: 'https://maps.google.com/mapfiles/marker_green.png'

    });

    var endMarker = new google.maps.Marker({
        map: map,
        draggable: true,
        icon: 'https://maps.google.com/mapfiles/marker_orange.png'
    });

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });

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

