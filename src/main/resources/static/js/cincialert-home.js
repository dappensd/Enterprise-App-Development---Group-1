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

    var isIncidentInfoWindowOpen = []

    incidentsMarker.forEach((marker, index) =>{
        isIncidentInfoWindowOpen.push(false)

        marker.addListener('click', (event) => {
            if (!isIncidentInfoWindowOpen[index]){
                closeAllIncidentMarkersInfoWindow()

                incidentsInfoWindow[index].setPosition(event.latLng)
                incidentsInfoWindow[index].open(map, marker);
                isIncidentInfoWindowOpen[index] = true

            }else{
                incidentsInfoWindow[index].close();
                isIncidentInfoWindowOpen[index] = false;
            }
        });
    })

    let isMarkerInRange = []

    trafficIncidents.forEach((incident) =>{
        isMarkerInRange.push(false)
    })


    var hasClickedFilterIncidentButton = false

    filterIncidentsButton.addEventListener("click", async () => {
        if (!hasClickedFilterIncidentButton) {
            if (endMarker.getVisible() && startMarker.getVisible()) {

                let pathOptions = {
                    origin: Markers_startLatLng,
                    destination: Markers_endLatLng,
                    travelMode: 'DRIVING',
                    provideRouteAlternatives: true
                };

                const dsResult = await directionsService.route(pathOptions);


                dsResult.routes[0].legs[0].steps.forEach((step) => {
                    step.lat_lngs.forEach((latLng) => {

                        trafficIncidents.forEach((incident, index) =>{


                            const metersToIncident = 30
                            let dist = google.maps.geometry.spherical.computeDistanceBetween(latLng, {lat: incident.latitude, lng: incident.longitude })

                            if (dist <= metersToIncident && !isMarkerInRange[index]){
                                isMarkerInRange[index] = true
                            }
                        })
                    })
                })

                incidentsMarker.forEach((incidentMarker, index) => {
                    if (!isMarkerInRange[index]) {
                        incidentMarker.setVisible(false)
                    }
                })

                filterIncidentsButton.classList.add("btn-success")
                filterIncidentsButton.classList.remove("btn-secondary")
                hasClickedFilterIncidentButton = true
            }

        } else {
            if (endMarker.getVisible() && startMarker.getVisible()){
                incidentsMarker.forEach((incidentMarker, index) => {
                    if (!isMarkerInRange[index]) {
                        incidentMarker.setVisible(true)
                    }

                    isMarkerInRange[index] = false
                })

                filterIncidentsButton.classList.remove("btn-success")
                filterIncidentsButton.classList.add("btn-secondary")

                hasClickedFilterIncidentButton = false
            }
        }
    })

    currentLocationButton.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition((position) => {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                geocoder.geocode({location: currentLocation}).then((response) => {
                    let address = response.results[0].formatted_address;
                    Markers_startLatLng = currentLocation
                    handleValidMarkerPlacementResult(true,address)
                    renderStartAndEndPath()
                })

            }, (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                    case error.POSITION_UNAVAILABLE:
                        startMarker.setPosition(map.getCenter())
                        startInfoWindow.setContent('<strong>Could not detect current location <br></strong> '
                            + 'Cannot use current location')
                        startInfoWindow.open(map, marker);
                }
            }
        );
    })
    function createDebounceWarning(marker, infoWindow, latLng){

        marker.setPosition(latLng)
        infoWindow.setContent('<strong>Woah! Slow down!' +
            ' <br>You\'re sending request too fast.<br> </strong> ')
        infoWindow.open(map, marker);

    }

    function renderStartAndEndPath() {

        let pathOptions = {
            origin: Markers_startLatLng,
            destination: Markers_endLatLng,
            travelMode: 'DRIVING',
            provideRouteAlternatives: true
        };

        directionsService.route(pathOptions, (result) => {
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(result);
        });
    }

    function closeAllIncidentMarkersInfoWindow(){
        incidentsMarker.forEach((marker, index) =>{
            if (isIncidentInfoWindowOpen[index]){
                incidentsInfoWindow[index].close();
                isIncidentInfoWindowOpen[index] = false;
            }
        })
    }
    function handleValidMarkerPlacementResult(isStartMarker, address){

        if (isStartMarker){
            map.panTo(Markers_startLatLng)
            startMarker.setPosition(Markers_startLatLng)
            startInfoWindow.setContent('<strong> Start Address <br> </strong> ' + address)
            startInfoWindow.open(map, startMarker);
            document.getElementById('location-start-bar').value = address
        }else{
            map.panTo(Markers_endLatLng)
            endMarker.setPosition(Markers_endLatLng)
            endInfoWindow.setContent('<strong> Destination Address <br> </strong> ' + address)
            endInfoWindow.open(map, endMarker);
            document.getElementById('location-destination-bar').value = address
        }
    }

    document.getElementById("location-start-bar").addEventListener('input',(event) =>{
        if (event.target.value === ''){
            startMarker.setVisible(false)
            startInfoWindow.close()
            directionsRenderer.setMap(null);
        }
    })

    document.getElementById("location-destination-bar").addEventListener('input',(event) =>{
        if (event.target.value === ''){
            endMarker.setVisible(false);
            endInfoWindow.close()
            directionsRenderer.setMap(null);
        }
    })

    var previousMapClickTime = 0;
    const mapClickDelay = 2000

    map.addListener('click', (event) => {
        const currentTime = Date.now();


        if (hasClickedFilterIncidentButton){
            filterIncidentsButton.dispatchEvent(new Event('click'));
        }

        closeAllIncidentMarkersInfoWindow()

        let clickedLatLng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }

        if (currentTime - previousMapClickTime >= mapClickDelay) {

            geocoder.geocode({location: clickedLatLng}).then((response) => {

                let address = null;

                if (response.results[0].types[0] === 'plus_code') {
                    address = response.results[0].formatted_address.substr(8);
                } else {
                    address = response.results[0].formatted_address
                }

                let isStartSearchBarEmpty = (document.getElementById('location-start-bar').value === '');
                let isDestinationSearchBarEmpty = (document.getElementById('location-destination-bar').value === '');

                if (isStartSearchBarEmpty) {
                    startMarker.setVisible(true)
                    Markers_startLatLng = clickedLatLng;

                    handleValidMarkerPlacementResult(true,address)
                    if (!isDestinationSearchBarEmpty){
                        renderStartAndEndPath()
                    }

                } else {
                    endMarker.setVisible(true);
                    Markers_endLatLng = clickedLatLng

                    handleValidMarkerPlacementResult(false,address)
                    renderStartAndEndPath()
                }

            })
        } else {
            let isStartSearchBarEmpty = (document.getElementById('location-start-bar').value === '');

            if (isStartSearchBarEmpty) {
                startMarker.setVisible(true)
                createDebounceWarning(startMarker,startInfoWindow, clickedLatLng)
            }else{
                endMarker.setVisible(true)
                createDebounceWarning(endMarker,endInfoWindow, clickedLatLng)
            }
        }

        previousMapClickTime = currentTime;
    })



    var previousSearchLocationTime = 0;

    const autoCompleteSearchDelay = 5000;

    startSearchAutocomplete.addListener('place_changed', () => {

        const currentTime = Date.now();
        if (currentTime - previousSearchLocationTime >= autoCompleteSearchDelay) {

            if (hasClickedFilterIncidentButton){
                filterIncidentsButton.dispatchEvent(new Event('click'));
            }

            let searchResult = startSearchAutocomplete.getPlace();

            geocoder.geocode({location: searchResult.geometry.location}).then((response) => {
                let isDestinationSearchBarEmpty = (document.getElementById('location-destination-bar').value === '');
                let address = response.results[0].formatted_address;
                Markers_startLatLng = searchResult.geometry.location;
                handleValidMarkerPlacementResult(true, address)

                if(!isDestinationSearchBarEmpty){
                    renderStartAndEndPath()
                }

            })
        } else {
            createDebounceWarning(startMarker,startInfoWindow, map.getCenter())
        }
        previousSearchLocationTime = currentTime;
    });

    endSearchAutocomplete.addListener('place_changed', () => {

        const currentTime = Date.now();

        if (currentTime - previousSearchLocationTime >= autoCompleteSearchDelay) {

            if (hasClickedFilterIncidentButton){
                filterIncidentsButton.dispatchEvent(new Event('click'));
            }

            let searchResult = endSearchAutocomplete.getPlace();

            geocoder.geocode({location: searchResult.geometry.location}).then((response) => {

                let isStartSearchBarEmpty = (document.getElementById('location-start-bar').value === '');

                Markers_endLatLng = searchResult.geometry.location;
                let address = response.results[0].formatted_address;
                handleValidMarkerPlacementResult(false,address)

                if(!isStartSearchBarEmpty){
                    renderStartAndEndPath()
                }
            })

        } else {
            createDebounceWarning(endMarker,endInfoWindow,map.getCenter())
        }
        previousSearchLocationTime = currentTime;
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

