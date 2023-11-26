window.addEventListener("load", (event) => {
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
});

function initMap() {
    const cincinnatiLatLng = {
        lat: 39.103119,
        lng: -84.512016
    }

    var mapStyles = [
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

    var map = new google.maps.Map(document.getElementById('map'), {
        center: cincinnatiLatLng,
        zoom: 13,
        options: {
            draggableCursor: 'pointer',
            fullscreenControl: false,
            streetViewControl: false,
            minZoom: 1
        },
        styles: mapStyles
    });

    var searchResult = document.getElementById('location-search-bar');
    var geocoder = new google.maps.Geocoder();
    document.getElementById('location-search-bar').value = 'Cincinnati, OH, USA'

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

    function handleMarkerPlacementResult(response, latLng){

        // Geocode first result near marker isn't always accurate.
        // distance calculation below is used to improve accuracy

        let shortestDist = 6371071.0272
        let shortestResult = null;
        let naturalResultType;

        response.results.forEach((result) =>{
            let dist = google.maps.geometry.spherical.computeDistanceBetween(latLng, result.geometry.location);

            // Use to filter out location code i.e (8 + 2 or 4 + 2 char). Dont know how to handle this
            // Might not  filter roads, routes. Google map sets types varied.
            if (dist < shortestDist && result.types[0] !== 'plus_code'
                && (result.types[0] === 'street_address' )
                || result.types[0] === 'route'){
                shortestDist = dist;
                shortestResult = result
            }
        })

        let markerOffset = 40
        if (shortestResult != null && shortestDist <= markerOffset) {
            infoWindow.setContent(shortestResult.formatted_address)
            infoWindow.open(map, marker);
        }else{
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

    map.addListener("click", (event) => {
        let clickedLatLng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }
        geocoder.geocode({location: clickedLatLng}).then((response) => {

            if (cincylatLngBounds.contains(clickedLatLng)) {
                marker.setPosition(event.latLng);
                handleMarkerPlacementResult(response, event.latLng)

            }else{
                outOfBoundsError('MARKER_SET')
            }
        })
    })

    autocomplete.addListener('place_changed', () => {
        let searchResult = autocomplete.getPlace();

        geocoder.geocode({location: searchResult.geometry.location}).then((response) => {
            // even with strict bounds, still can have error
            if (cincylatLngBounds.contains(searchResult.geometry.location)){
                marker.setPosition(searchResult.geometry.location);
                handleMarkerPlacementResult(response, searchResult.geometry.location)
            }else{
                outOfBoundsError('MARKER_SET')
            }
        })
    });


}
