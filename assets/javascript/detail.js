$(document).ready(function() {

    
  // ----------------------------------------------------------
  // global variables:
  // ----------------------------------------------------------
    youTubeVideoId = '';

  // ----------------------------------------------------------
  // objects and classes:
  // ----------------------------------------------------------

  // ----------------------------------------------------------
  // object for local storage:
  // ----------------------------------------------------------
  // var manageSessionStorage = {
  //   // local variables:

  //   // methods:

  //   // method to clear property from local storage
  //   clearSessionStorage: function(property) {
  //     console.log("in manageSessionStorage.clearSessionStorage");
  //     sessionStorage.removeItem(property);
  //   },

  //   // method to get property from local storage
  //   getSessionStorage: function(property) {
  //     console.log("in manageSessionStorage.getSessionStorage");
  //     var propVal = sessionStorage.getItem(property);
  //     return propVal;
  //   },

  //   // method to set property in local storage
  //   setSessionStorage: function(property,propVal) {
  //     console.log("in manageSessionStorage.setSessionStorage");
  //     sessionStorage.setItem(property,propVal);
  //   },
  // }

  // ----------------------------------------------------------
  // object for detail page:
  // ----------------------------------------------------------
  var detailPage = {
    // local variables:
    movieTitle: "",
    movieTitleId: "",
    country: "us",
    utellyHost: "",
    utellyKey: "",
    
    // methods:

    // populate the detail page content
    populateDetailPage: function() {
      console.log("in detailPage.populateDetailPage");
      // get movie title from session storage
      this.movieTitle = manageSessionStorage.getSessionStorage("movieTitle");
      console.log("movie title is: ", this.movieTitle);
      this.movieId = manageSessionStorage.getSessionStorage("movieId");
      console.log("movie id is: ", this.movieId);

   
      this.utellyHost = manageSessionStorage.getSessionStorage("host");
      //console.log("rapid api host is: ", this.utellyHost);
      this.utellyKey = manageSessionStorage.getSessionStorage("key");
      //console.log("rapid api key is: ", this.utellyKey);

      // call to API for detailed information
      detailPage.getTmdbMovieDetails(this.movieTitleId);

      // call to API for movie rating (pg, pg-13, etc.)
      detailPage.getOmdbMovieRating(this.movieTitle);

      // call to API for credit information
      detailPage.getTmdbMovieCredits(this.movieTitleId);

      // commment utelly call out during unit testing 
      // but keep commented during general testing
      // due to the limited call allowance of 1000 calls per month:
      // detailPage.getUtelly(this.movieTitle,this.country);

      // call to API for video information
      detailPage.getTmdbMovieVideo(this.movieTitleId);


      // call to API for related movie information
      detailPage.getTmdbRelatedMovies(this.movieTitleId);

     
      }, // end of method populateDetailPage



    // get movie info from TMDB API
    // parameter: movie title
    getTmdbMovieDetails: function(titleId) {
      console.log("in detailPage.getTmdbMovieDetails");
      console.log("detail titleId", titleId);

      var apiKey = "4eb3939343ef4ca0932079284f76225d";
      var searchURL = "https://api.themoviedb.org/3/movie/" + titleId + "?api_key=" + apiKey
                    + "&language=en-US";

      var settings = {
          "async": true,
          "crossDomain": true,
          "url": searchURL,
          "method": "GET",
          "headers": {},
          "data": "{}"
      }

      $.ajax(settings).done(function (response) {
        // Details for the movie
        
        console.log(response);
        // properties that should be mined for detail page
        // title
        console.log("title: ", response.original_title);
        console.log("overview: ", response.overview);
        console.log("release_date: ", response.release_date);
        console.log("runtime: ", response.runtime);
        console.log("vote_average: ", response.vote_average);
        console.log("title: ", response.original_title);
        console.log("homepage: ", response.homepage);
        response.genres.forEach(element => {
          console.log("genre: ", element.name)
        });

      });  
    },

    // get movie video info from TMDB API
    // parameter: movie title
    getTmdbMovieVideo: function(titleId) {
      console.log("in detailPage.getTmdbMovieVideo");
      console.log("detail titleId", titleId);

      var apiKey = "4eb3939343ef4ca0932079284f76225d";
      var searchURL = "https://api.themoviedb.org/3/movie/" + titleId + "/videos?api_key=" + apiKey
                    + "&language=en-US";

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
          response.results.forEach(element => {
            if(element.type === "Trailer" && element.site === "YouTube") {
              console.log("trailer: ",element.name);
              console.log("site: ",element.site);
              console.log("type: ",element.type);
              console.log("key: ",element.key);
              youTubeVideoId = element.key;
              console.log("youTubeVideoId: ",youTubeVideoId);
              
              // embed the trailer
              // youTubeSrc = "https://www.youtube.com/embed/" + element.key + "?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1"
              // console.log("src :", youTubeSrc);
              // $("#video-frame").attr('src',youTubeSrc);

            }
          });
      });  
    },

    // get movie credits info from TMDB API
    // parameter: movie title
    getTmdbMovieCredits: function(titleId) {
      console.log("in detailPage.getTmdbMovieCredits");
      console.log("detail titleId", titleId);

      var apiKey = "4eb3939343ef4ca0932079284f76225d";
      var searchURL = "https://api.themoviedb.org/3/movie/" + titleId + "/credits?api_key=" + apiKey 
                     + "&language=en-US";

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
          response.cast.forEach(element => {
              console.log("cast character: ",element.character);
              console.log("cast name: ",element.name);
          });
      });  
    },


    // get related movie info from TMDB API
    // parameter: movie id
    getTmdbRelatedMovies: function(titleId) {
      console.log("in detailPage.getTmdbRelatedMovies");
      console.log("detail titleId", titleId);

      // look up the API endpoint details and code as appropriate below:

      var apiKey = "4eb3939343ef4ca0932079284f76225d";
      var searchURL = "https://api.themoviedb.org/3/movie/" + titleId + "/similar?api_key=" + apiKey 
                     + "&language=en-US";

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
          response.results.forEach(element => {
              console.log("related movie id: ",element.id);
              console.log("related movie original title: ",element.original_title);
              console.log("related movie title: ", element.title);
              console.log("related movie overview: ",element.overview);
          });
      });  
    },


    // get related movie rating (pg, pg-13, etc.) from OMDB API
    // parameter: movie id
    getOmdbMovieRating: function(title) {
      console.log("in detailPage.getOmdbMovieRating");
      console.log("detail title", title);

      // look up the API endpoint details and code as appropriate below:
      
      // var apiKey = "4eb3939343ef4ca0932079284f76225d";
      // var searchURL = "https://api.themoviedb.org/3/movie/" + titleId + "/credits?api_key=" + apiKey 
      //                + "&language=en-US";

      // var settings = {
      //     "async": true,
      //     "crossDomain": true,
      //     "url": searchURL,
      //     "method": "GET",
      //     "headers": {},
      //     "data": "{}"
      // }

      // $.ajax(settings).done(function (response) {
      //     console.log(response);
      //     response.cast.forEach(element => {
      //         console.log("cast character: ",element.character);
      //         console.log("cast name: ",element.name);
      //     });
      // });  
    },




    // get streaming info from Utelly API
    // parameter: movie title
    // returns: string info on streaming available
    getUtelly: function(title,country) {
      console.log("in detailPage.getUtelly");
      console.log("search title,country ", title,country);
      var urlMovieTitle = title.split(' ').join('+');

      const url ="https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + urlMovieTitle
                  + "&country=" + country;

      console.log("url :", url);
      
      // console.log("rapid api host is: ", detailPage.utellyHost);
      // console.log("rapid api key is: ",detailPage.utellyKey);
      
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
          
          console.log(response.results);
          console.log("results-length: ", response.results.length);
          // loop thru the results to find matches to the target movie
          response.results.forEach(element => {
            console.log("result is: ",element);
            console.log("results-name ",element.name);
            // check to see if this result matches target movie
            console.log("target title: ", title.toLowerCase().replace('+',' '));
            console.log("results name: ", element.name.toLowerCase());
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

  detailPage.movieTitle = manageSessionStorage.getSessionStorage("movieTitle");
  detailPage.movieTitleId = manageSessionStorage.getSessionStorage("movieId")
  // detailPage.movieTitleId = 420817;
  // detailPage.movieTitle = 'Aladdin'
  detailPage.populateDetailPage();

}); // end of document ready

  //-----------------------------------------------------------------------------------------
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '100%', //'390',
      width: '100%', //'640',
      videoId: '', //youTubeVideoId, //'foyufD52aog',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange //,
        //'onError': onError
      }
    });
  }
  
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {

      event.target.loadVideoById(youTubeVideoId);
      event.target.setVolume(20);
      event.target.playVideo();
      // event.target.playVideoAt(0);
      // event.loadPlaylist(youTubeVideoId);
      // event.setLoop(true);
 
      // event.target.mute();

     
    }
  
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when vide ended (state=0),
    //    the player should start the video again
    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.ENDED) {
        event.target.playVideo();
      }
    }

    // function onError(event) {
    //   console.log("onError: ",event.data);
    //   event.target.playVideo()
    // }
  //------------------------------------------------------------------------------------------ 



      

