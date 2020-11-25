let Bib = function () {
    let init = function () {
        $("#bibliotheek").click(function() {
            let url = $("#bibzoeken").val();
            $("#kaart").attr("src", "https://maps.google.com/maps?q=bibliotheek%20"+ url +"&t=&z=13&ie=UTF8&iwloc=&output=embed");
        });

        let bibzoek = $("#bibzoeken");
        bibzoek.on("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                $("#bibliotheek").click();
            }
        });
    };
    return {
        init: init
    };
}();