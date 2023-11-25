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

}
