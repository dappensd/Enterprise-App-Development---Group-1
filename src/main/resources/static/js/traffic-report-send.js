window.onload = () => {
    document.getElementById("location-search-bar").onkeypress = (event) => {
        if (event.charCode == 13) {
            event.preventDefault();
        }
    }

    document.getElementById("main-form").addEventListener('submit', (event) => {
        let noLocationPicked = (parseFloat(document.getElementById("latitude").value) === 0 &&
            parseFloat(document.getElementById("longitude").value) === 0)

        let noDescriptionPicked = ($("#description").val().trim() === "")

        let noSeverityLevelPicked = ($("#severity-level").val() === "default")

        if (noLocationPicked || noDescriptionPicked || noSeverityLevelPicked){

            $("#submit-form-sucess").addClass("d-none");
            $("#submit-form-sucess").removeClass("fade show");

            if (noLocationPicked){
                if (noDescriptionPicked || noSeverityLevelPicked){
                    $("#alert-info").text("Please fill out the missing fields below\nMake sure you have a chosen location")
                }else{
                    $("#alert-info").text("Make sure you have a chosen location")
                }
            }else{
                $("#alert-info").text("Please fill out the following fields below");
            }

            if (noDescriptionPicked){
                $("#description-area").addClass("input-fields-glow");
                $("#description-label").text('* Description')
            }

            if (noSeverityLevelPicked){
                $("#severity-level-area").addClass("input-fields-glow");
                $("#severity-level-label").text('* Severity Level')
            }

            $("#submit-form-alert").removeClass("d-none");
            $("#submit-form-alert").addClass("slide-down");
            $(".overlay").fadeIn();
            $("#submit-form-alert").addClass("fade show");
            event.preventDefault();

        }else{
            $("#submit-form-alert").addClass("d-none");
            $("#submit-form-alert").removeClass("fade show");

            $("#description-area").removeClass("input-fields-glow");
            $("#description-label").text('Description')

            $("#severity-level-area").removeClass("input-fields-glow");
            $("#severity-level-label").text('Severity Level')

            $('#location-input').text('Location: ' + $('#location-search-bar').val())
            $('#description-input').text('Description: ' + $('#description').val())
            $('#severity-input').text('Severity: ' + $('#severity-level').val());

            $("#submit-form-sucess").removeClass("d-none");
            $("#submit-form-sucess").addClass("slide-down");
            $(".overlay").fadeIn();
            $("#submit-form-sucess").addClass("fade show");
        }
    })

    initMap();

    var searchResult = document.getElementById('location-search-bar');
    var geocoder = new google.maps.Geocoder();

    var cincinnatiBounds = {
        north: 39.23,
        south: 39.0295,
        west: -84.73,
        east: -84.35
    }

    var cincylatLngBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(cincinnatiBounds.south, cincinnatiBounds.west),
        new google.maps.LatLng(cincinnatiBounds.north, cincinnatiBounds.east)
    );

    var autocomplete = new google.maps.places.Autocomplete(searchResult, {
        bounds: cincinnatiBounds,
        strictBounds: true
    })

    var infoWindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map
    });

    // use to draw outline / testing boundary
    var cincyRect = new google.maps.Rectangle({
        bounds: cincinnatiBounds,
        strokeColor: "red",
        strokeOpacity: .2,
        fillOpacity: 0,
        map: map,
        clickable: false
    });

    function outOfBoundsError(errorType){
        map.panTo(cincinnatiLatLng);
        marker.setPosition(cincinnatiLatLng);
        switch (errorType){
            case 'CAMERA_PAN':
                infoWindow.setContent('<strong> Leaving Cincy so soon? <br> </strong> Try to find traffic incidents within Cincinnati')
                break
            case 'MARKER_SET':
                infoWindow.setContent('<strong> Woah There! <br> </strong> Report must be near Cincinnati')
        }
        infoWindow.open(map, marker);
    }

    $("#close-success").click(() => {
        $("#submit-form-sucess").addClass("d-none");
        $("#submit-form-sucess").removeClass("fade show");

    });

    $("#close-error").click(() => {
        $("#submit-form-alert").addClass("d-none");
        $("#submit-form-alert").removeClass("fade show");

    });

    map.addListener('center_changed', () => {
        if (!cincylatLngBounds.contains(map.getCenter())){
            outOfBoundsError('CAMERA_PAN')
        }
    });

    currentLocationButton.addEventListener("click", () => {

        navigator.geolocation.getCurrentPosition((position) => {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                geocoder.geocode({location: currentLocation}).then((response) => {

                    if (cincylatLngBounds.contains(currentLocation)) {
                        handleMarkerPlacementResult(response, currentLocation, true)
                    }else{
                        marker.setPosition(map.getCenter())
                        infoWindow.setContent('<strong> Oh no! <br> </strong> Your current location is not near Cincy')
                        infoWindow.open(map, marker);
                    }
                })

            }, (error) => {
                switch (error.code){
                    case error.PERMISSION_DENIED:
                    case error.POSITION_UNAVAILABLE:
                        marker.setPosition(map.getCenter())
                        infoWindow.setContent('<strong>Could not detect current location <br></strong> '
                            + 'Cannot use current location')
                        infoWindow.open(map, marker);
                }
            }
        );
    })

    function handleMarkerPlacementResult(response, latLng, isDriving){

        // Geocode first result near marker isn't always accurate.
        // distance and type check is used to improve accuracy

        let shortestDist = Number.MAX_SAFE_INTEGER
        let shortestResult = null;

        response.results.forEach((result) =>{
            let dist = google.maps.geometry.spherical.computeDistanceBetween(latLng, result.geometry.location);

            if (dist < shortestDist && result.types[0] !== 'plus_code'
                && (result.types[0] === 'street_address' )
                || result.types[0] === 'route'
                || result.types[0] === 'intersection'){
                shortestDist = dist;
                shortestResult = result
            }
        })

        let markerOffset = 20
        if (shortestResult != null && shortestDist <= markerOffset) {
            marker.setPosition(shortestResult.geometry.location);
            infoWindow.setContent(shortestResult.formatted_address)
            infoWindow.open(map, marker);
        }else{
            if (isDriving){
                marker.setPosition(latLng)
                infoWindow.setContent('<strong>Marker detected was too far from a street address. <br></strong> '
                    + 'Cannot use current location')
                infoWindow.open(map, marker);
                return;
            }

            map.panTo(shortestResult.geometry.location)
            marker.setPosition(shortestResult.geometry.location)
            infoWindow.setContent('<strong>Marker detected was too far from a street address. ' +
                ' <br>Marker Readjusting to... <br> </strong> ' + shortestResult.formatted_address)
            infoWindow.open(map, marker);
        }

        document.getElementById('location-search-bar').value = shortestResult.formatted_address
        document.getElementById('latitude').value = shortestResult.geometry.location.lat()
        document.getElementById('longitude').value = shortestResult.geometry.location.lng()
    }


    var previousMapClickTime = 0;

    map.addListener('click', (event)=>{
        const currentTime = Date.now();

        if (currentTime - previousMapClickTime >= 2000) {
            let clickedLatLng = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            }
            geocoder.geocode({location: clickedLatLng}).then((response) => {
                if (cincylatLngBounds.contains(clickedLatLng)) {
                    marker.setPosition(event.latLng);
                    handleMarkerPlacementResult(response, event.latLng, false)

                }else{
                    outOfBoundsError('MARKER_SET')
                }
            })
        }else{
            marker.setPosition(event.latLng)
            infoWindow.setContent('<strong>Woah! Slow down!' +
                ' <br>You\'re sending too many request.<br> </strong> ')
            infoWindow.open(map, marker);
        }

        previousMapClickTime = currentTime;

    })


    var previousSearchLocationTime = 0;

    autocomplete.addListener('place_changed', () => {

        const currentTime = Date.now();
        if (currentTime - previousSearchLocationTime >= 5000) {

            let searchResult = autocomplete.getPlace();

            geocoder.geocode({location: searchResult.geometry.location}).then((response) => {
                // even with strict bounds, still can have error
                if (cincylatLngBounds.contains(searchResult.geometry.location)){
                    handleMarkerPlacementResult(response, searchResult.geometry.location, false)
                }else{
                    outOfBoundsError('MARKER_SET')
                }
            })
        }else{
            marker.setPosition(map.getCenter())
            infoWindow.setContent('<strong>Woah! Slow down!' +
                ' <br>You\'re sending too many request.<br> </strong> ')
            infoWindow.open(map, marker);
        }
        previousSearchLocationTime = currentTime;
    });

};


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

    const mapDiv = document.getElementById('map');

    map = new google.maps.Map(mapDiv, {
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
    currentLocationButton.className = 'btn btn-secondary'
    currentLocationButton.type = 'button'

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(currentLocationButton);
}
