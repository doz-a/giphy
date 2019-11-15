$(document).ready(function () {
    // To Do 
    // - Make the search into random endpoint
    // - When user clicks on image, change src to the moving giphy
    // - When user clicks on moving image, change src to still giphy

    // - User Input Box
    // - When text is input the box, it adds a functioning button to topics array



    // Example queryURL for Giphy API
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&q=dinosaur&limit=10&offset=0&rating=PG-13&lang=en";
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response.data);
    // });
    //API

    // Topic is food!
    var topics = ["Pizza", "Tacos", "Burritos", "Pineapples", "Cat Food", "Croissants", "Burgers", "Cats", "Tide Pods"];

    // Limit results to not break computer memory lmaooo
    var limit = 10;

    // Rating 
    var rating = "PG";

    // My buttons showing up under header 
    function allButtons() {
        for (var i = 0; i < topics.length; i++) {
            var makeButton = $("<button>");
            makeButton.addClass("btn");

            // Bootstrap Stylin 
            makeButton.addClass("btn-info");
            makeButton.text(topics[i]);
            $("#button-box").append(makeButton, " ");
        }
        $(".btn-info").on("click", function () {
            populateGifBox($(this).text());

            // Clears button box every click 
            $("#gif-box").empty();
            // console.log("click works");
        });

    }
    // End button function 

    // Populate Gif Box function 

    function populateGifBox(food) {
        $.ajax({
            // test random endpoint https://api.giphy.com/v1/gifs/random?api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&tag=&rating=PG 
            // api is http://api.giphy.com/v1/gifs/search?q=food&api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&rating=pg&limit=1 
            // url: "http://api.giphy.com/v1/gifs/search?q=" + food +
            //     "&api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&rating=" + rating + "&limit=" + limit,

            // Working API, 10 limit, rating PG
            url: "http://api.giphy.com/v1/gifs/search?q=" + food +
                "&api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&rating=" + rating + "&limit=" + limit,
            // url: "https://api.giphy.com/v1/gifs/random?api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&tag=" + food + "&rating=PG",

            // test random endpoint
            // url: "https://api.giphy.com/v1/gifs/random?q=" + food +
            //     "&api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&rating=" + rating + "&limit=" + limit,
            // url: "https://api.giphy.com/v1/gifs/random?api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&tag=" + food + "&rating=" + rating + "&limit=" + limit,

            method: "GET"
        }).then(function (response) {
            // test console
            console.log("it works");
            response.data.forEach(function (element) {
                newDiv = $("<div>");
                newDiv.addClass("individual-gif-container");
                newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");

                // Displays still image to HTML 
                var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
                newImage.addClass("gif-image");

                // Adds still animate and still attributes to giphy so we can use clicks to change states
                newImage.attr("state", "still");
                newImage.attr("data-still", element.images.fixed_height_still.url);
                newImage.attr("data-animate", element.images.fixed_height.url);
                newDiv.append(newImage);
                $("#gif-box").append(newDiv);

                // console.log("ajax works");
            });

            // Animate and still of the giphy using clicks
            $(".gif-image").on("click", function () {

                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }
    // End populate gif box function 

    // Call function to make buttons
    allButtons();


    // data.0.images.original.url
    // API testing 
    // var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&limit=1");
    // xhr.done(function (data) { console.log("success got data", data); });

})