$(document).ready(function() {


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



  
  // ----------------------------------------------------------
  // global variables:
  // ----------------------------------------------------------

  // test variable for call to utelly
  // var testMovieTitle = "jurassic+park";
  var testMovieCountry = "us";


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

      // // get movie title from session storage
      // this.movieTitle = manageSessionStorage.getSessionStorage("movieTitle");
      // console.log("movie title is: ", this.movieTitle);
    },


    // populate the detail page content
    populateDetailPage: function() {
      console.log("in detailPage.populateDetailPage");

      // need call to API for detailed information

      // need to load the page up with the detailed information

      // need to call method getUtelly to get Utelly API info

      // need to load page up with the Utelly info
      detailPage.getUtelly(this.movieTitle,testMovieCountry);

      }, // end of method populateDetailPage


    // // get streaming info from Utelly API
    // // parameter: movie title
    // // returns: string info on streaming available
    // getUtelly: function(title,country) {
    //   console.log("in detailPage.getUtelly");
    //   console.log("search title,country ", title,country);

    //   // this is API is being held back so that we can figure out how to secure it first
    //   // original code is saved aside for reintroduction
    // }, // end of method getUtelly


    // get streaming info from Utelly API
    // parameter: movie title
    // returns: string info on streaming available
    getUtelly: function(title,country) {
      console.log("in detailPage.getUtelly");
      console.log("search title,country ", title,country);

      const url ="https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + title
                  + "&country=" + country;

      // console.log("url: ", url);

      // build call to the API
      const options = {
      method: 'GET',
      headers: {
          "X-RapidAPI-Host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
          "X-RapidAPI-Key": "80549481bdmsha65d8ad2b7edcfap1d5cc3jsncf554c0fbd38"
          },
      };
      
      // ajax call to utelly API
      // 1.  loop through the results
      //     1.1 see if result matches target title exactly
      //     1.2 loop through the locations on each match
      //     1.3 surface the location and location url on the detail page
      $.ajax(url, options).then(function(response) { 
          console.log("in ajax call for utelly");
          
          // console.log(response.results);
          // console.log("results-length: ", response.results.length);
          // loop thru the results to find matches to the target movie
          response.results.forEach(element => {
            // console.log("result is: ",element);
            // console.log("results-name ",element.name);
            // check to see if this result matches target movie
            // console.log("target title: ", title.toLowerCase().replace('+',' '));
            // console.log("results name: ", element.name.toLowerCase());
            if (element.name.toLowerCase() === title.toLowerCase().replace('+',' ')) {
              console.log("match on title: ", title.toLowerCase().replace('+',' '));
              // loop thru locations to see where title can be streamed
              element.locations.forEach(element => {
                // console.log("this location is: ", element.display_name);
                // console.log("this location url is: ", element.url);
                // right here need to put the location and location url on the detail page 
                // think of un-ordered list 
                $("#stream-id").text(element.display_name);
                $("#stream-url").text(element.url);

              }); // end of locations forEach
            }; // end of title check loop
          }); // end of results forEach
      }); // end of the ajax call
    }, // end of method getUtelly

    // // other methods go below


  } // end of detailPage object
                      
  // ----------------------------------------------------------
  // START OF PROGRAM FLOW:
  // ----------------------------------------------------------
  console.log("In Landing Page");

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

  // redirect button event 
  $("#redirect-btn").on("click",function() {
    console.log("in global.redirect-btn click event");
    var testMovieTitle = "jurassic+park";

    // test local storage methods
    manageSessionStorage.clearSessionStorage("movieTitle");
    console.log("movieTitle is: ",manageSessionStorage.getSessionStorage("movieTitle"));
    manageSessionStorage.setSessionStorage("movieTitle",testMovieTitle);
    console.log("movieTitle is: ",manageSessionStorage.getSessionStorage("movieTitle"));
    // testMovieTitle = manageSessionStorage.getSessionStorage("movieTitle");
    // console.log("testMovieTitle is: ", testMovieTitle);
    
    
    // // example of detailPage.populateDetailPage call
    detailPage.redirectTo();
    
  // clear the variables

  });


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