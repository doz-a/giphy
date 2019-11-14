$(document).ready(function () {

    // Example queryURL for Giphy API
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&q=dinosaur&limit=10&offset=0&rating=PG-13&lang=en";
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response.data);
    // });
    //API

    // Topic is dinosaurs!
    var topics = ["Tyrannosaurus", "Balaur", "Psittacosaurus", "Sauroposeidon", "Torosaurus", "Camarasaurus", "Brachiosaurus",]

    // Limit results to not break computer memory lmaooo
    var limit = "&limit=5";

    // Rating 
    var rating = "PG";

    // My buttons showing up under header 
    function allButtons() {
        for (var i = 0; i < topics.length; i++) {
            var makeButton = $("<button>");
            makeButton.addClass("btn");
            makeButton.addClass("btn-info");
            makeButton.text(topics[i]);
            $("#button-box").append(makeButton, " ");

            $(".btn-info").on("click", function () {
                populateGifBox($(this).text());
                // console.log("click works");
            });
        }
    }

    function populateGifBox(dinosaur) {
        $.ajax({
            // api key is http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&rating=pg&limit=1 
            url: "http://api.giphy.com/v1/gifs/search?q=" + dinosaur +
                "&api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&rating=" + rating + "&limit=" + limit,
            method: "GET"
        }).then(function (response) {

            response.data.forEach(function (element) {
                newDiv = $("<div>");
                newDiv.addClass("individual-gif-container");
                newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
                var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
                newImage.addClass("gif-image");
                newDiv.append(newImage);
                $("#gif-box").append(newDiv);

                // console.log("ajax works");
            });

        });
    }
    // Call function to make buttons
    allButtons();


    // data.0.images.original.url
    // API testing 
    // var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&limit=1");
    // xhr.done(function (data) { console.log("success got data", data); });

})