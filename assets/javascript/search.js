// Check List for Today
// 1. Make Rating to be star format
// 2. Show how many people voted



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
        var searchURL = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + searchTerm + "&include_adult=false";

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
        
                
                // Make a div for image and put the image tag in it
                var tempImgDiv = $("<div>");
                var tempImage = $("<img id='search-result-image'>");
                var imageURL;
                if(response.results[i].poster_path === null) {
                    imageURL = "./assets/images/no-image-available-icon-6.jpg"
                } else {
                    imageURL = "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path;    
                }
                tempImage.attr("src", imageURL);
                tempImage.addClass("search-result-poster");
                tempImgDiv.append(tempImage);


                // Retrieving title, release date, average vote, and vote count
                var tempDataDiv = $("<div id='search-result-data'>");
                var tempTitle = $("<h3>");
                
                // Some of the returned data does not have "original_title" data, some
                // of them had "original_name" instead.
                if(response.results[i].original_title !== undefined) {
                    tempTitle.text(response.results[i].original_title);
                } else {
                    tempTitle.text(response.results[i].original_name);
                }
                tempTitle.addClass("search-result-title");

                var tempRelease = $("<h3>");
                tempRelease.text(response.results[i].release_date);
                
                
                var tempVoteAvg = $("<h3>");
                tempVoteAvg.text(response.results[i].vote_average);
                
                var tempVoteCount = $("<h3>");
                tempVoteCount.text(response.results[i].vote_count);

                
                tempDataDiv.append(tempTitle).append(tempRelease).append(tempVoteAvg).append(tempVoteCount);

                
                
                tempDiv.append(tempImgDiv).append(tempDataDiv);
                
                
                $("#result-placehold").append(tempDiv);

            } 
            
        });    
    });
    
});




