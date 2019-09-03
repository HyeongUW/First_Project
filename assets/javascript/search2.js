// Check List for Today
// 1. Make Rating to be star format
// 2. Show how many people voted



// TMDB Api Key
var apiKey = "4eb3939343ef4ca0932079284f76225d";

$(document).ready(function() {
    //console.log(manageSessionStorage.getSessionStorage("search-term"));
    
    if(manageSessionStorage.getSessionStorage("search-term") !== null) {
        console.log("Search Term Was Already Defined!");

        var searchTerm = manageSessionStorage.getSessionStorage("search-term");

        //populateSearchResult(searchTerm);
        pageNumberReturner(searchTerm);

    }

    $(".submit-btn").on("click", function(event) {
        event.preventDefault();
        $("#result-placehold").empty();
        var searchTerm = $("#search-term").val();

        // console logging the search term
        console.log(searchTerm);

        // Storing the search term into the session storage
        sessionStorage.clear();
        sessionStorage.setItem("search-term", searchTerm);

        //populateSearchResult(searchTerm);
        pageNumberReturner(searchTerm)


    });
    
}); // end of document ready  - moved my myles to end of this document

$(document).on("click", ".search-result-title, .poster-div>img", function() {
    //console.log("in trending-div.img click event");
    //console.log("you pressed " + $(this).data("movie-id"));
    //console.log("you pressed " + $(this).data("movie-title"));
    
    manageSessionStorage.setSessionStorage("movieId",$(this).data("movie-id"));
    manageSessionStorage.setSessionStorage("movieTitle",$(this).data("movie-title"));
    
    console.log("saved movie id: ", manageSessionStorage.getSessionStorage("movieId"));
    console.log("saved movie title: ", manageSessionStorage.getSessionStorage("movieTitle"));
    // redirect to the detail page


    redirectToDetailPage();
});


var manageSessionStorage = {
    // local variables:

    // methods:

    // method to clear property from local storage
    clearSessionStorage: function(property) {
        console.log("in manageSessionStorage.clearSessionStorage");
        sessionStorage.removeItem(property);
    },

    // method to get property from local storage
    getSessionStorage: function(property) {
        console.log("in manageSessionStorage.getSessionStorage");
        var propVal = sessionStorage.getItem(property);
        return propVal;
    },

    // method to set property in local storage
    setSessionStorage: function(property,propVal) {
        console.log("in manageSessionStorage.setSessionStorage");
        sessionStorage.setItem(property,propVal);
    }
}

// probably can remove after testing this - it was moved to common.js
// function redirectToDetailPage() {
//     console.log("in global.redirectToDetailPage");
//     // switch the browser to the detail page
//     window.location = 'detail.html';
// }; 

function pageNumberReturner(searchTerm) {
    var searchURL = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&query=" + searchTerm + "&page=1&include_adult=false&region=us"
    
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
        var numOfPages = response.total_pages;


        populateSearchResult(searchTerm, numOfPages);

    });

}

function populateSearchResult(searchTerm, numOfPages) {
    //var numOfPages = pageNumberReturner(searchTerm);
    //console.log("Page Number (populateSearchResult): ", numOfPages);

    // page number should be defined here before the searchURL
    
    for(var i = 1; i <= numOfPages; i++) {
        //console.log("Call #" + i);
        var searchURL = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&query=" + searchTerm + "&page=" + i + "&include_adult=false&region=us";
    
    
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
    
    
                // Creating a div for each of the search results
                var tempDiv = $('<div style="text-align: left;">'); 
                tempDiv.addClass("search-result-div");
        
                
                // Make a div for image and put the image tag in it
                var tempImgDiv = $("<div class='poster-div'>");
                var tempImage = $("<img id='search-result-image'>");
                var imageURL;
                if(response.results[i].poster_path === null || response.results[i].poster_path === undefined) {
                    imageURL = "./assets/images/no-image-available-icon-6.jpg"
                } else {
                    imageURL = "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path;    
                }
                tempImage.attr("src", imageURL);
                tempImage.attr('data-movie-id', response.results[i].id);
                tempImage.addClass("search-result-poster");
                tempImgDiv.append(tempImage);
        
        
                // Retrieving title, release date, average vote, and vote count
                var tempDataDiv = $("<div id='search-result-data'>");
                var tempTitle = $("<h1>");
                tempTitle.attr('data-movie-id', response.results[i].id);
                
                // Some of the returned data does not have "original_title" data, some
                // of them had "original_name" instead.
                if(response.results[i].original_title !== undefined) {
                    tempTitle.text(response.results[i].original_title);
                    tempTitle.attr('data-movie-title', response.results[i].original_title);
                    tempImage.attr('data-movie-title', response.results[i].original_title);
                } else {
                    tempTitle.text(response.results[i].original_name);
                    tempTitle.attr('data-movie-title', response.results[i].original_title);
                    tempImage.attr('data-movie-title', response.results[i].original_name);
                }
                tempTitle.addClass("search-result-title");
        
                var tempRelease = $("<h3>");
                //tempRelease.text("Release Date: " + response.results[i].release_date);
                if(response.results[i].release_date === undefined) {
                    tempRelease.text("");
                } else {
                    tempRelease.text("(" + response.results[i].release_date + ")");
                }
                //tempRelease.text("(" + response.results[i].release_date + ")");
                
                
                var starIcon = $("<img class='star-icon' style='float: left';>");
                starIcon.attr('src', './assets/images/icons8-star-96.png');
                
                
        
                var tempVoteAvg = $("<h3 style='float: left';>");
                tempVoteAvg.text(response.results[i].vote_average);
        
                var userIcon = $("<img class='star-icon' style='float: left';>");
                userIcon.attr('src', './assets/images/icons8-people-96.png');
        
                
                var tempVoteCount = $("<h3>");
                tempVoteCount.text(response.results[i].vote_count);
        
                
                tempDataDiv.append(tempTitle).append(tempRelease).append(starIcon).append(tempVoteAvg).append(userIcon).append(tempVoteCount);
        
                
                
                tempDiv.append(tempImgDiv).append(tempDataDiv);
                
                
                $("#result-placehold").append(tempDiv);
            }     
             
            

        });    
    };
    


$(document).on("click", ".poster-div>img", function() {
    //console.log("in trending-div.img click event");
    //console.log("you pressed " + $(this).data("movie-id"));
    //console.log("you pressed " + $(this).data("movie-title"));
    
    manageSessionStorage.setSessionStorage("movieId",$(this).data("movie-id"));
    manageSessionStorage.setSessionStorage("movieTitle",$(this).data("movie-title"));
    
    console.log("saved movie id: ", manageSessionStorage.getSessionStorage("movieId"));
    console.log("saved movie title: ", manageSessionStorage.getSessionStorage("movieTitle"));
    // redirect to the detail page


    redirectToDetailPage();
});



function redirectToDetailPage() {
    console.log("in global.redirectToDetailPage");
    // switch the browser to the detail page
    window.location ='detail.html';
};
}
