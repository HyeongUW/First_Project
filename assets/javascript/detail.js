$(document).ready(function() {

    
  // ----------------------------------------------------------
  // global variables:
  // ----------------------------------------------------------

  // test variable for call to utelly
  // var testMovieTitle = "jurassic+park";
  var testMovieCountry = "us";


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
    utellyHost: "",
    utellyKey: "",
    
    // methods:

    // populate the detail page content
    populateDetailPage: function() {
      console.log("in detailPage.populateDetailPage");
      // get movie title from session storage
      this.movieTitle = manageSessionStorage.getSessionStorage("movieTitle");
      console.log("movie title is: ", this.movieTitle);

   
      this.utellyHost = manageSessionStorage.getSessionStorage("host");
      console.log("rapid api host is: ", this.utellyHost);
      this.utellyKey = manageSessionStorage.getSessionStorage("key");
      console.log("rapid api key is: ", this.utellyKey);

      // need call to API for detailed information

      // need to load the page up with the detailed information

      // need to call method getUtelly to get Utelly API info

      // need to load page up with the Utelly info
      detailPage.getUtelly(this.movieTitle,testMovieCountry);

      }, // end of method populateDetailPage


    // get streaming info from Utelly API
    // parameter: movie title
    // returns: string info on streaming available
    getUtelly: function(title,country) {
      console.log("in detailPage.getUtelly");
      console.log("search title,country ", title,country);

      const url ="https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + title
                  + "&country=" + country;

      console.log("rapid api host is: ", detailPage.utellyHost);
      console.log("rapid api key is: ",detailPage.utellyKey);
      
      // build call to the API
      const options = {
      method: 'GET',
      headers: {
          "X-RapidAPI-Host": detailPage.utellyHost,
          "X-RapidAPI-Key": detailPage.utellyKey
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

    // other methods go below

  } // end of detailPage object

                      
  // ----------------------------------------------------------
  // START OF PROGRAM FLOW:
  // ----------------------------------------------------------
  console.log("In Detail Page");
 
  detailPage.populateDetailPage();
      
}); // end of document ready