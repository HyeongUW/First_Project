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


// ----------------------------------------------------------
  // START OF PROGRAM FLOW:
  // ----------------------------------------------------------
  console.log("In Search Page");

  // manageWatchList.getWatchListFromLocalStorage();
  // console.log("watch list titles: ", manageWatchList.watchListMovieTitleArray);
  // console.log("watch list id: ", manageWatchList.watchListMovieIdArray);
  // console.log("watch list year: ", manageWatchList.watchListMovieYearArray);
  // console.log("watch list time: ", manageWatchList.watchListMovieTimeArray);
  
  // manageWatchList.buildWatchListInTheDom();


// // watch list button event - show modal
// $("#watch-list-btn").on("click",function() {
//   console.log("in global.watch-list-btn click event")
//  // show watch list
//   $('#my-modal').modal('show');
// });

// // watch list modal content - Delete click
// // finda all checked items; remove them from the arrays; re-build/re-render DOM
// // **** this code should be moved to the commmon.js I believe
// $(document).on("click", "#delete-watch-items", function() {
//   console.log("in global.delete-watch-items click event");
//   // find items checked and remove them from the watch arrays
//   // remove checked items from the DOM - each item appended to
//   // var modalBody =   $("#watch-list-body");
//   // the items to remove are of type:
//   //  $('<div class="watch-list-item-container"></div>');

//   $('.watch-list-checkbox:checked').each(function () {
//     console.log("this item was checked: ", this.value);
//     // next - remove this from the watch arrays :
//     // manageWatchList.removeFromWatchList(this.value);
//     // if we are on the detail page we might have just removed 
//     // that title from the watch list so update the save to watch list button
//     // only do if on detail page
//     // detailPage.setTextForWatchListButton();
//     // now update the DOM by removing this watch list container item 
//     // this parent and child look like this:
//     // <div class="watch-list-item-container">
//     //   <input class="watch-list-checkbox" type="checkbox" name="delete" value="Aladdin">
//     // look up how to target its parent and them run a remove method on it
//     // something like this:
//     // $(this)>parent.remove
  
//   })
// });

// // watch list modal content - movie title click
// // should cause redirect to the detail page
// $(document).on("click", ".watch-list-item", function() {
//   console.log("in global.watch-list-item click event");
//   // console.log("you pressed " + $(this).data("movie-id"));
//   // console.log("you pressed " + $(this).data("movie-title"));
//   manageSessionStorage.setSessionStorage("movieId",$(this).data("movie-id"));
//   manageSessionStorage.setSessionStorage("movieTitle",$(this).data("movie-title"));
//   // console.log("saved movie id: ", manageSessionStorage.getSessionStorage("movieId"));
//   // console.log("saved movie title: ", manageSessionStorage.getSessionStorage("movieTitle"));
//   // redirect to the detail page
//   redirectToDetailPage();
// });

// }); // end of document 
