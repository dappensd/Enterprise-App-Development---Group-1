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

        }
    })
});
