$(document).ready(function() {

  /* Top 20 trending movies (Linked with index.html) ------------------------------------------- */
  var apiKey = "4eb3939343ef4ca0932079284f76225d";
  var searchURL = "https://api.themoviedb.org/3/trending/movie/week?api_key=" + apiKey;

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
          tempImage.attr('data-movie-id', response.results[i].id);
          tempImage.addClass("trending-poster");
          
          
          var tempTitle = $("<h3>");
          
          // Some of the returned data does not have "original_title" data, some
          // of them had "original_name" instead.
          if(response.results[i].original_title !== undefined) {
            tempTitle.text(response.results[i].original_title);
            tempImage.attr('data-movie-title',response.results[i].original_title);
          } else {
            tempTitle.text(response.results[i].original_name);
            tempImage.attr('data-movie-title',response.results[i].original_name);
          }
          
          
          tempDiv.append(tempImage).append(tempTitle);
          
          $("#trending-placehold").append(tempDiv);
      }
  });
  /* ------------------------------------------------------------------------------------- */



  
  // ----------------------------------------------------------
  // global variables:
  // ----------------------------------------------------------

  var utellyHost = "";
  var utellyKey = "";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB1H_ADvSGImXyKOOntI52RX7wtiDRVGQg",
    authDomain: "moviefind-5e647.firebaseapp.com",
    databaseURL: "https://moviefind-5e647.firebaseio.com",
    projectId: "moviefind-5e647",
    storageBucket: "",
    messagingSenderId: "970398446632",
    appId: "1:970398446632:web:3738d7d5523d065c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // // variable to firebase database
  var database = firebase.database();




  // ----------------------------------------------------------
  // global functions:
  // ----------------------------------------------------------
    // redirect to detail page
    function redirectToDetailPage() {
      console.log("in global.redirectToDetailPage");
      // switch the browser to the detail page
      window.location ='detail.html';
    };


  // ----------------------------------------------------------
  // objects and classes:
  // ----------------------------------------------------------

  // ----------------------------------------------------------
  // events and listeners
  // ----------------------------------------------------------

  // get firebase snapshot on initial load
  database.ref("/stream").once("value", function (snap) {
    console.log("in global.database ref /stream");
    // console.log(snap.val());
    // get utelly API info
    utellyHost = snap.val().host;
    utellyKey = snap.val().key;
    manageLocalStorage.setLocalStorage("host",utellyHost);
    manageLocalStorage.setLocalStorage("key",utellyKey);
  });


  // go to detail page on trending movie click
  $(document).on("click",".trending-div>img", function() {
    console.log("in trending-div>img click event");
    // console.log("you pressed " + $(this).data("movie-id"));
    // console.log("you pressed " + $(this).data("movie-title"));
    manageSessionStorage.setSessionStorage("movieId",$(this).data("movie-id"));
    manageSessionStorage.setSessionStorage("movieTitle",$(this).data("movie-title"));
    // console.log("saved movie id: ", manageSessionStorage.getSessionStorage("movieId"));
    // console.log("saved movie title: ", manageSessionStorage.getSessionStorage("movieTitle"));
    // redirect to the detail page
    redirectToDetailPage();
  });


  // ----------------------------------------------------------
  // START OF PROGRAM FLOW:
  // ----------------------------------------------------------
  console.log("In Landing Page");
  manageSessionStorage.clearSessionStorage("search-term");


  manageWatchList.getWatchListFromLocalStorage();
  console.log("watch list titles: ", manageWatchList.watchListMovieTitleArray);
  console.log("watch list id: ", manageWatchList.watchListMovieIdArray);
  console.log("watch list year: ", manageWatchList.watchListMovieYearArray);
  console.log("watch list time: ", manageWatchList.watchListMovieTimeArray);

  manageWatchList.buildWatchListInTheDom();

  
}); // end of document ready
