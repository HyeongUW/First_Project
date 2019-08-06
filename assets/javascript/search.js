// TMDB Api Key
var apiKey = "4eb3939343ef4ca0932079284f76225d";

$(document).ready(function() {

    $(".submit-btn").on("click", function(event) {
        event.preventDefault();
        $("#result-placehold").empty();
        var searchTerm = $("#search-term").val();

        // console logging the search term
        console.log(searchTerm);

        // Storing the search term into the session storage
        sessionStorage.clear();
        sessionStorage.setItem("search-term", searchTerm);
        // console.log("Session Storage: ", sessionStorage.getItem("search-term"));


        // Creating a relevant search query URL
        var searchURL = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + searchTerm + "&include_adult=true";

        // Passing the search-term to ajax function
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": searchURL,
            "method": "GET",
            "headers": {},
            "data": "{}"
        }
        
        $.ajax(settings).done(function (response) {
            
            console.log(response);
            
             // Goes over the entire retrieved data
            for(var i = 0; i < response.total_results; i++) {

                var tempDiv = $("<div>");
                tempDiv.addClass("search-result-div");
        
                var tempImage = $("<img>");
                var imageURL = "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path;
                tempImage.attr("src", imageURL);
                tempImage.addClass("search-result-poster");
                
                
                var tempTitle = $("<h3>");
                
                // Some of the returned data does not have "original_title" data, some
                // of them had "original_name" instead.
                if(response.results[i].original_title !== undefined) {
                tempTitle.text(response.results[i].original_title);
                } else {
                tempTitle.text(response.results[i].original_name);
                }
                
                
                tempDiv.append(tempImage).append(tempTitle);
                
                $("#result-placehold").append(tempDiv);

            } 
            
        });    
    });
    
});




