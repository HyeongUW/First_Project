// TMDB Api Key
var apiKey = "4eb3939343ef4ca0932079284f76225d";

$(document).ready(function() {
    //console.log(manageSessionStorage.getSessionStorage("search-term"));
    
    if(manageSessionStorage.getSessionStorage("search-term") !== null) {
        console.log("Search Term Was Already Defined!");

        var searchTerm = manageSessionStorage.getSessionStorage("search-term");
        var searchOption = manageSessionStorage.getSessionStorage("search-option");

        //populateSearchResult(searchTerm);
        pageNumberReturner(searchTerm, searchOption);

    }

    $(".submit-btn").on("click", function(event) {
        event.preventDefault();
        $("#result-placehold").empty();
        var searchTerm = $("#search-term").val();

        // console logging the search term
        console.log(searchTerm);

        
        /* Console Logging Which Option has been used on this */
        //console.log($('input:radio[name = advSearchOpt]:checked').val());
        var searchOption = $('input:radio[name = advSearchOpt]:checked').val();
        /*----------------------------------------------------*/

        // Storing the search term into the session storage
        sessionStorage.clear();
        sessionStorage.setItem("search-term", searchTerm);
        sessionStorage.setItem("search-option", searchOption);

        pageNumberReturner(searchTerm, searchOption);


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

function pageNumberReturner(searchTerm, searchOption) {
    switch(searchOption) {
        case "movieTitle":
            //console.log("movie Title searched");
            var searchURL = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&query=" + searchTerm + "&page=1&include_adult=false&region=us";
            console.log("Movie Search URL: ", searchURL);
            break;
        case "actor":
            //console.log("actor searched");
            
            var searchURL = 'https://api.themoviedb.org/3/search/person?api_key=' + apiKey + '&language=en-US&query=' + searchTerm + '&page=1&include_adult=false&region=us';
            console.log("Actor Search URL: ", searchURL);
            break;
        case "tvshows":
            //console.log("tv shows searched");
            var searchURL = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&query=" + searchTerm + "&page=1&include_adult=false&region=us";
            break;            
        default:
            break;
    }
    
    
    
    
    
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
        console.log("Number of Pages: ", numOfPages);

        switch(searchOption) {
            case "movieTitle":
                console.log("movie Title Search Result");
                populateSearchResult(searchTerm, numOfPages, "movie");
                break;
            case "actor":
                //console.log(response.results[0]);
                populateActorResult(searchTerm, response.results.length);
                break;
            case "tvshows":
                //console.log("tv shows searched");
                //var searchURL = "https://api.themoviedb.org/3/search/tv?api_key=" + apiKey + "&language=en-US&query=" + searchTerm;
                populateSearchResult(searchTerm, numOfPages, "tvshow");
                break;            
            default:
                break;
        }
        

    });

}

function populateActorResult(searchTerm, resultLength) {
    //console.log("Actor " + searchTerm + " has been searched, " + resultLength + " objects returned.");
    var searchURL = 'https://api.themoviedb.org/3/search/person?api_key=' + apiKey + '&language=en-US&query=' + searchTerm + '&page=1&include_adult=false&region=us';
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": searchURL,
        "method": "GET",
        "headers": {},
        "data": "{}"
    }
    
    $.ajax(settings).done(function (response) {
        // Goes over the entire retrieved data
        for(var i = 0; i < resultLength; i++) {
            console.log(response);
        
            // Creating a div for each of the search results
            var tempDiv = $('<div class="row" style="text-align: left;">'); 
            tempDiv.addClass("search-result-div");
    
            /* --------------------------------------------- */
            var tempActorDiv = $("<div class='actor-div col-3'>");
            
            // HTML image tag
            var tempActorImageDiv = $("<div class='actor-image-div'>");
            var tempActorImage = $("<img id='search-result-actor-image'>");
            var actorImageURL;
            if(response.results[i].profile_path === null || response.results[i].profile_path === undefined) {
                actorImageURL = "./assets/images/actor_image_not_available.png"
            } else {
                actorImageURL = "https://image.tmdb.org/t/p/w500" + response.results[i].profile_path;    
            }
            tempActorImage.attr("src", actorImageURL);
            tempActorImage.attr('data-actor-id', response.results[i].id);
            tempActorImage.addClass("search-result-actor");
            tempActorImageDiv.append(tempActorImage);
            tempActorDiv.append(tempActorImageDiv);

            // Actor info div
            var tempActorInfoDiv = $("<div class='actor-info-div'>");
            var tempActorName = $("<h1>").text(response.results[i].name);
            var tempProfession = response.results[i].known_for_department;
           // $("<h1>").text(response.results[i].known_for_department);
            
            // Possibilities Acting, Writing, Directing, Production, Editing
            if(tempProfession === "Acting") {
                tempProfession = "Actor";
            } else if(tempProfession === "Writing") {
                tempProfession = "Writer";
            } else if(tempProfession === "Directing") {
                tempProfession = "Director";
            } else if(tempProfession === "Production") {
                tempProfession = "Producer";
            } else if(tempProfession === "Editing") {
                tempProfession = "Editor";
            }
            var tempActorKnownFor = $("<h1>").text(tempProfession);

            var tempActorPopularity = $("<h1>").text(response.results[i].popularity);
            tempActorInfoDiv.append(tempActorName).append(tempActorKnownFor).append(tempActorPopularity);

            tempActorDiv.append(tempActorInfoDiv);

            /* --------------------------------------------- */
            tempDiv.append(tempActorDiv);
            /* --------------------------------------------- */
            for(var j = 0; j < response.results[i].known_for.length; j++) {
                //console.log(response.results[i].known_for[j].title);

                // Make a div for image and put the image tag in it
                var movieDiv = $("<div class='movie-div col-3'>");

                var tempImgDiv = $("<div class='poster-div'>");
                var tempImage = $("<img id='actor-search-result-image'>");
                tempImage.addClass("actor-movie-poster");
                var imageURL;
                if(response.results[i].known_for[j].poster_path === null || response.results[i].known_for[j].poster_path === undefined) {
                    imageURL = "./assets/images/no-image-available-icon-6.jpg"
                } else {
                    imageURL = "https://image.tmdb.org/t/p/w500" + response.results[i].known_for[j].poster_path;    
                }
                tempImage.attr("src", imageURL);
                tempImage.attr('data-movie-id', response.results[i].known_for[j].id);
                tempImage.addClass("search-result-poster");
                tempImgDiv.append(tempImage);
        
        
                // Retrieving title, release date, average vote, and vote count
                var tempDataDiv = $("<div id='actor-search-result-data'>");
                var tempTitle = $("<h1>");
                tempTitle.attr('data-movie-id', response.results[i].known_for[j].id);
                
                // Some of the returned data does not have "original_title" data, some
                // of them had "original_name" instead.
                if(response.results[i].known_for[j].original_title !== undefined) {
                    /* ------------------------------------------------------------ */
                    // 타이틀을 보내서 길이에 따른 처리를 하는 함수 만들기
                    //console.log("Title: ", response.results[i].known_for[j].original_title);
                    //console.log("The Length of the title: ", response.results[i].known_for[j].original_title.length);
                    //var titleArray = response.results[i].known_for[j].original_title.split(" ");
                    //console.log(titleArray);
                    /* ------------------------------------------------------------ */
                    tempTitle.text(response.results[i].known_for[j].original_title);
                    tempTitle.attr('data-movie-title', response.results[i].known_for[j].original_title);
                    tempImage.attr('data-movie-title', response.results[i].known_for[j].original_title);
                } else {
                    tempTitle.text(response.results[i].known_for[j].original_name);
                    tempTitle.attr('data-movie-title', response.results[i].known_for[j].original_name);
                    tempImage.attr('data-movie-title', response.results[i].known_for[j].original_name);
                }
                tempTitle.addClass("search-result-title");
        
                var tempRelease = $("<h3>");
                //tempRelease.text("Release Date: " + response.results[i].release_date);
                if(response.results[i].known_for[j].release_date === undefined) {
                    tempRelease.text("");
                } else {
                    tempRelease.text("(" + response.results[i].known_for[j].release_date + ")");
                }
                //tempRelease.text("(" + response.results[i].release_date + ")");
                
                
                var starIcon = $("<img class='star-icon' style='float: left';>");
                starIcon.attr('src', './assets/images/icons8-star-96.png');
                
                
        
                var tempVoteAvg = $("<h3 style='float: left';>");
                tempVoteAvg.text(response.results[i].known_for[j].vote_average);
        
                var userIcon = $("<img class='star-icon' style='float: left';>");
                userIcon.attr('src', './assets/images/icons8-people-96.png');
        
                
                var tempVoteCount = $("<h3>");
                tempVoteCount.text(response.results[i].known_for[j].vote_count);
        
                
                tempDataDiv.append(tempTitle).append(tempRelease).append(starIcon).append(tempVoteAvg).append(userIcon).append(tempVoteCount);
                
                movieDiv.append(tempImgDiv).append(tempDataDiv);
                tempDiv.append(movieDiv);
            }


    
            
            
            
            
            
            
            $("#result-placehold").append(tempDiv);
            
        }     

    });     
}

function populateSearchResult(searchTerm, numOfPages, option) {
    for(var i = 1; i <= numOfPages; i++) {
        
        var searchURL;
        if(option === "movie") {
            // If a movie title searched
            searchURL = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&query=" + searchTerm + "&page=" + i + "&include_adult=false&region=us";
        } else {
            // if tv Show searched
            searchURL = "https://api.themoviedb.org/3/search/tv?api_key=" + apiKey + "&language=en-US&query=" + searchTerm + "&page=" + i + "&include_adult=false&region=us";
        }
            
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
    


/* $(document).on("click", ".poster-div>img", function() {
    //console.log("in trending-div.img click event");
    //console.log("you pressed " + $(this).data("movie-id"));
    //console.log("you pressed " + $(this).data("movie-title"));
    
    manageSessionStorage.setSessionStorage("movieId",$(this).data("movie-id"));
    manageSessionStorage.setSessionStorage("movieTitle",$(this).data("movie-title"));
    
    console.log("saved movie id: ", manageSessionStorage.getSessionStorage("movieId"));
    console.log("saved movie title: ", manageSessionStorage.getSessionStorage("movieTitle"));
    // redirect to the detail page


    redirectToDetailPage();
}); */



function redirectToDetailPage() {
    console.log("in global.redirectToDetailPage");
    // switch the browser to the detail page
    window.location ='detail.html';
};
}
