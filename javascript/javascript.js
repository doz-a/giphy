$(document).ready(function () {

    // Topic is food!
    var topics = ["Pizza", "Tacos", "Burritos", "Avocados", "Potatoes", "Calamari", "Raspberries", "Pineapples", "Cat Food", "Croissants", "Burgers", "Cats", "Tide Pods"];

    // Limit results to not break computer memory lmaooo
    var limit = 10;

    // Rating 
    var rating = "PG";

    // My buttons showing up under header 
    function allButtons() {
        for (var i = 0; i < topics.length; i++) {
            var makeButton = $("<button>");
            makeButton.addClass("btn");

            // Bootstrap stylin these buttons, add buttons to button box
            makeButton.addClass("btn-light");
            makeButton.text(topics[i]);
            $("#button-box").append(makeButton, " ");
        }

        // On click of a button, populates the gif box
        $(".btn-light").on("click", function () {
            populateGifBox($(this).text());

            // Clears button box every click 
            $("#gif-box").empty();
        });

    }
    // End button function 

    // Populate Gif Box function 
    function populateGifBox(food) {
        $.ajax({

            // Test random endpoint (for future edits) https://api.giphy.com/v1/gifs/random?api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&tag=&rating=PG 

            // API is http://api.giphy.com/v1/gifs/search?q=food&api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&rating=pg&limit=1
            // Working API, 10 limit, rating PG, search q
            url: "http://api.giphy.com/v1/gifs/search?q=" + food +
                "&api_key=nPsGacEw599ZV3kh8FmX95ZE8WEXSxha&rating=" + rating + "&limit=" + limit,
            method: "GET"
        }).then(function (response) {

            // Creates div for each gif
            response.data.forEach(function (element) {
                newDiv = $("<div>");
                newDiv.addClass("individual-gif-container");

                // Displays still image to HTML 
                var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
                newImage.addClass("gif-image");

                // Adds still animate and still attributes to giphy so we can use clicks to change states
                newImage.attr("state", "still");
                newImage.attr("data-still", element.images.fixed_height_still.url);
                newImage.attr("data-animate", element.images.fixed_height.url);
                newDiv.append(newImage);

                // Adds rating
                newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");

                // Append to gif box 
                $("#gif-box").append(newDiv);
            });

            // Animate and still of the giphy using clicks
            $(".gif-image").on("click", function () {

                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");

                // Changes to animate gif if still, or still gif if animated 
                if (state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");

                } else {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
            });
        });
    }
    // End populate gif box function 

    // Call function to make buttons
    allButtons();

    // Add button function 
    function addButton(show) {
        if (topics.indexOf(show) === -1) {
            topics.push(show);
            $("#button-box").empty();
            allButtons();
        }
    }

    // Makes a button using the input from submit 
    $("#submit").on("click", function () {
        event.preventDefault();
        addButton($("#foodhere").val().trim());
        $("#foodhere").val("");
        console.log("buttonmaking worked");
    });
})