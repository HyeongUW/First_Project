/* Top 20 trending movies (Linked with index.html) ------------------------------------------- */
var apiKey = "4eb3939343ef4ca0932079284f76225d";
var searchURL = "https://api.themoviedb.org/3/trending/all/day?api_key=" + apiKey;

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
    
    // Returns trending movies
    for(var i = 0; i < response.results.length; i++) {
        var tempDiv = $("<div>");
        tempDiv.addClass("trending-div");

        var tempImage = $("<img>");
        var imageURL = "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path;
        tempImage.attr("src", imageURL);
        tempImage.addClass("trending-poster");
        
        
        var tempTitle = $("<h3>");
        
        // Some of the returned data does not have "original_title" data, some
        // of them had "original_name" instead.
        if(response.results[i].original_title !== undefined) {
        tempTitle.text(response.results[i].original_title);
        } else {
        tempTitle.text(response.results[i].original_name);
        }
        
        
        tempDiv.append(tempImage).append(tempTitle);
        
        $("#trending-placehold").append(tempDiv);
    }
});
/* ------------------------------------------------------------------------------------- */


$(document).ready(function() {
  
  // ----------------------------------------------------------
  // global variables:
  // ----------------------------------------------------------

  // test variable for call to utelly
  // var testMovieTitle = "jurassic+park";
  // var testMovieCountry = "us";


  // ----------------------------------------------------------
  // global functions:
  // ----------------------------------------------------------


  // ----------------------------------------------------------
  // objects and classes:
  // ----------------------------------------------------------

  // ----------------------------------------------------------
  // object for local storage:
  // ----------------------------------------------------------
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
    },
  }

  // ----------------------------------------------------------
  // object for detail page:
  // ----------------------------------------------------------
  var detailPage = {
    // local variables:
    movieTitle: "",
    
    // methods:

    // redirect to detail page
    redirectTo: function() {
      console.log("in detailPage.redirectTo");
      // switch the browser to the detail page
      window.location ='detail.html';

      // get movie title from session storage
      this.movieTitle = manageSessionStorage.getSessionStorage("movieTitle");
      console.log("movie title is: ", this.movieTitle);
    },


    // populate the detail page content
    populateDetailPage: function() {
      console.log("in detailPage.populateDetailPage");

      // need call to API for detailed information

      // need to load the page up with the detailed information

      // need to call method getUtelly to get Utelly API info

      // need to load page up with the Utelly info
      detailPage.getUtelly(testMovieTitle,testMovieCountry);

      }, // end of method populateDetailPage


    // get streaming info from Utelly API
    // parameter: movie title
    // returns: string info on streaming available
    getUtelly: function(title,country) {
      console.log("in detailPage.getUtelly");
      console.log("search title,country ", title,country);

      // this is API is being held back so that we can figure out how to secure it first
      // original code is saved aside for reintroduction
    }, // end of method getUtelly

    // // other methods go below


  } // end of detailPage object
                      
  // ----------------------------------------------------------
  // START OF PROGRAM FLOW:
  // ----------------------------------------------------------
  console.log("Main program flow start");

  // // test local storage methods
  // manageSessionStorage.clearSessionStorage("movieTitle");
  // console.log("movieTitle is: ",manageSessionStorage.getSessionStorage("movieTitle"));
  // manageSessionStorage.setSessionStorage("movieTitle",testMovieTitle);
  // console.log("movieTitle is: ",manageSessionStorage.getSessionStorage("movieTitle"));
  // testMovieTitle = manageSessionStorage.getSessionStorage("movieTitle");
  // console.log("testMovieTitle is: ", testMovieTitle);
  
  
  // // example of detailPage.populateDetailPage call
  // detailPage.populateDetailPage();




  // ----------------------------------------------------------
  // events:
  // ----------------------------------------------------------

  $("#submit-btn").on("click", function(event) {
      // Search Input
      // console.log($("#search-input").val());
      
      var tokenizedTitle = $("#search-input").val().split(' ');
      var title = '';
      for(var i = 0; i < tokenizedTitle.length; i++) {
          title += tokenizedTitle[i] + "+";

      }
      console.log(title);
      //var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=6e5ba5d2";
      var queryURL = "https://www.omdbapi.com/?t=guardians+of+the+galaxy+vol.2&y=&plot=short&apikey=6e5ba5d2";
      
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(response) {
          console.log("Response Object: ", response);
          console.log(response.Actors.split(", ")[0]);
          console.log(response.Runtime);
          console.log(response.Released);
      });
  });

    
}); // end of document ready