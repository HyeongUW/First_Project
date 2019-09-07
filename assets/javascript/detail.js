$(document).ready(function() {

    
  // ----------------------------------------------------------
  // global variables:
  // ----------------------------------------------------------
    youTubeVideoId = '';
    isTrailerPlaying = false;
    genres = [];
    streaming = [];



  // ----------------------------------------------------------
  // objects and classes:
  // ----------------------------------------------------------

  // ----------------------------------------------------------
  // object for detail page:
  // ----------------------------------------------------------
  var detailPage = {
    // local variables:
    movieTitle: "",
    movieTitleId: "",
    movieTitleYear: "",
    movieTitleTime: "",
    country: "us",
    utellyHost: "",
    utellyKey: "",
    
    // methods:


  

    // populate the detail page content
    populateDetailPage: function() {
      console.log("in detailPage.populateDetailPage");
      // get movie title from session storage
      // this.movieTitle = manageSessionStorage.getSessionStorage("movieTitle");
      // console.log("movie title is: ", this.movieTitle);
      // this.movieId = manageSessionStorage.getSessionStorage("movieId");
      // console.log("movie id is: ", this.movieId);
      // // get utelly from local storage
      // console.log('utelly host: ',manageLocalStorage.getLocalStorage("host"));
      // console.log('utelly key: ',manageLocalStorage.getLocalStorage("key"));
      
      detailPage.utellyHost = manageLocalStorage.getLocalStorage("host"),
      console.log("rapid api host is: ", detailPage.utellyHost);
      detailPage.utellyKey = manageLocalStorage.getLocalStorage("key"),
      console.log("rapid api key is: ", detailPage.utellyKey);
   
      // detailPage.utellyHost = manageSessionStorage.getSessionStorage("host");
      // console.log("rapid api host is: ", this.utellyHost);
      // this.utellyKey = manageSessionStorage.getSessionStorage("key");
      // console.log("rapid api key is: ", this.utellyKey);

      // commment utelly call out during unit testing 
      // but keep commented during general testing
      // due to the limited call allowance of 1000 calls per month:
      streaming = [];

      // // call to API for movie review information
      detailPage.getNYTimesMovieReview(this.movieTitle);

      // placeholder to save utelly API calls during testing
      // $("#streaming-text").text('Netflix, Amazon Prime, iTunes');
      detailPage.getUtelly(this.movieTitle,this.country);
  
      detailPage.getTmdbMovieDetails(this.movieTitleId);

      // call to API for movie rating (pg, pg-13, etc.)
      detailPage.getOmdbMovieRating(this.movieTitle);

      // call to API for credit information
      detailPage.getTmdbMovieCredits(this.movieTitleId);


      // // call to API for video information
      detailPage.getTmdbMovieVideo(this.movieTitleId);


      // // call to API for related movie information
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
        console.log("name: ", response.original_name);
        console.log("release_date: ", response.release_date);
        $("#title-text").text(detailPage.movieTitle + ' (' + response.release_date.substring(0,4) + ')');
        detailPage.movieTitleYear = response.release_date.substring(0,4);

        console.log("overview: ", response.overview);
        $("#overview-text").text(response.overview);

        console.log("runtime: ", response.runtime);
        // $("#runtime-text").text("Running Time: " + response.runtime  + ' mins');    
        $("#runtime-text").text('Time: ' + response.runtime  + ' min.');   
        detailPage.movieTitleTime = 'Time: ' + response.runtime + ' min.';

        console.log("vote_average: ", response.vote_average);
        $("#ratings-text").text("Ratings: " + response.vote_average);   

        console.log("homepage: ", response.homepage);
        if (response.runtime != null) {
          $("#homepage").attr('href',response.homepage);
        }
        else {
          $("#homepage").text('');
        };
      
        detailPage.genres = [];
        
        response.genres.forEach(element => {
          console.log("genre: ", element.name)
          genres.push(element.name);
        });

        $("#genre-text").text(genres.join(', '));
      });  
    },

    // get movie video info from TMDB API
    // parameter: movie title
    getNYTimesMovieReview: function(title) {
      console.log("in detailPage.getNYTimesMovieReview");
      var urlMovieTitle = title.split(' ').join('+');
      console.log("detail title", urlMovieTitle);

      var apiKey = "fktEHhHIqR2YM2KALXsEB3bfkvxW38ZU";
      var searchURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + urlMovieTitle + "&api-key=" + apiKey;
      
      console.log("NyTimes Key: ", apiKey);
      console.log("NyTimes URL: ", searchURL);

      var settings = {
          "url": searchURL,
          "method": "GET",
      }
     
      $.ajax(settings).done(function (response) {
          console.log("MOVIE REVIEW: ",response);
          var noMatch = true;
          response.results.forEach(element => {
            // check to see if this result matches target movie
            console.log(">>>>>>>>>>>>>>>>>>>>>>>target title: ", title.toLowerCase().replace('+',' '));
            console.log(">>>>>>>>>>>>>>>>>>>>>>>results name: ", element.display_title.toLowerCase());
            if (element.display_title.toLowerCase() === title.toLowerCase().replace('+',' ')) {
              console.log("match on title: ", title.toLowerCase().replace('+',' '));
              // harvest details
              noMatch = false;
              console.log("headline: ",element.headline);
              $("#head-line").text(element.headline);

              console.log("summary: ",element.summary_short);
              $("#summary-short").text(element.summary_short);

              console.log("byline: ",element.byline);
              $("#by-line").text(element.byline);

              console.log("url: ",element.link.url);
              $("#review-link").attr('href',element.link.url);
              console.log("display title: ",element.display_title);
            }
            
          });

          if (noMatch) {
            // clear the DOM
            $("#review").text('');
            $("#review-link").text('');
          }


      });
    },


    // get movie Video info from TMDB API
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

      // var castUl = $("#cast-list");
      // var castTable = $("#cast-table");
      var castTable = $("tbody");

            // <div  id="cast" class="col-12 all-n">
            // <table  class="all-n">
            //   <caption><h4>CAST</h4></caption>
            //   <tr>
            //     <th>CHARACTER</th>
            //     <th>ACTOR/ACTRESS</th>
            //   </tr>
            //   <tr>
            //     <td>the wife</td>
            //     <td>Jane Smith</td>
            //   </tr>
            //  </table> 

      $.ajax(settings).done(function (response) {
          console.log(response);
          response.cast.forEach(element => {
              console.log("cast character: ",element.character);
              console.log("cast name: ",element.name);'>/'
              var newTr = $('<tr><td>' + element.character + '</td><td>' + element.name + '</td></tr>');
              castTable.append(newTr);
              // var newLi = $('<li>' + element.character + '  - (' + element.name + ')' + '</li>');
              // castUl.append(newLi);
          });
      });  
    },


 // get related movie info from TMDB API
    // parameter: movie id
    getTmdbRelatedMovies: function(titleId) {
      console.log("in detailPage.getTmdbRelatedMovies");
      console.log("detail titleId", titleId);

      // look up the API endpoint details and code as appropriate below:
      // try similiar and recommendations
      var apiKey = "4eb3939343ef4ca0932079284f76225d";
      var searchURL = "https://api.themoviedb.org/3/movie/" + titleId + "/recommendations?api_key=" + apiKey 
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
          var i = 1;
          response.results.forEach(element => {
            console.log("related movie id: ",element.id);
            console.log("related movie original title: ",element.original_title);
            console.log("related movie title: ", element.title);
            console.log("related movie overview: ",element.overview);
            console.log("poster_path: ",element.poster_path);


            if (i === 1) {
              var imageURL = "https://image.tmdb.org/t/p/w500" + element.poster_path;
              var carbox = $("#poster-photo1");
              carbox.attr("src",imageURL);
              carbox.attr('data-movie-id',element.id);
              // Some of the returned data does not have "original_title" data, some
              // of them had "original_name" instead.
              if(element.original_title !== undefined) {
                carbox.attr('data-movie-title',element.original_title);
              } else {
                carbox.attr('data-movie-title',element.original_name);
              }
            };

            if (i === 2) {
              var imageURL = "https://image.tmdb.org/t/p/w500" + element.poster_path;
              var carbox = $("#poster-photo2");
              carbox.attr("src",imageURL);
              carbox.attr('data-movie-id',element.id);
              // Some of the returned data does not have "original_title" data, some
              // of them had "original_name" instead.
              if(element.original_title !== undefined) {
                carbox.attr('data-movie-title',element.original_title);
              } else {
                carbox.attr('data-movie-title',element.original_name);
              }
            };

            if (i === 3) {
              var imageURL = "https://image.tmdb.org/t/p/w500" + element.poster_path;
              var carbox = $("#poster-photo3");
              carbox.attr("src",imageURL);
              carbox.attr('data-movie-id',element.id);
              // Some of the returned data does not have "original_title" data, some
              // of them had "original_name" instead.
              if(element.original_title !== undefined) {
                carbox.attr('data-movie-title',element.original_title);
              } else {
                carbox.attr('data-movie-title',element.original_name);
              }
            };

            if (i === 4) {
              var imageURL = "https://image.tmdb.org/t/p/w500" + element.poster_path;
              var carbox = $("#poster-photo4");
              carbox.attr("src",imageURL);
              carbox.attr('data-movie-id',element.id);
              // Some of the returned data does not have "original_title" data, some
              // of them had "original_name" instead.
              if(element.original_title !== undefined) {
                carbox.attr('data-movie-title',element.original_title);
              } else {
                carbox.attr('data-movie-title',element.original_name);
              }
            };

            if (i === 5) {
              var imageURL = "https://image.tmdb.org/t/p/w500" + element.poster_path;
              var carbox = $("#poster-photo5");
              carbox.attr("src",imageURL);
              carbox.attr('data-movie-id',element.id);
              // Some of the returned data does not have "original_title" data, some
              // of them had "original_name" instead.
              if(element.original_title !== undefined) {
                carbox.attr('data-movie-title',element.original_title);
              } else {
                carbox.attr('data-movie-title',element.original_name);
              }
            };

            if (i === 6) {
              var imageURL = "https://image.tmdb.org/t/p/w500" + element.poster_path;
              var carbox = $("#poster-photo6");
              carbox.attr("src",imageURL);
              carbox.attr('data-movie-id',element.id);
              // Some of the returned data does not have "original_title" data, some
              // of them had "original_name" instead.
              if(element.original_title !== undefined) {
                carbox.attr('data-movie-title',element.original_title);
              } else {
                carbox.attr('data-movie-title',element.original_name);
              }
            };

            if (i === 7) {
              var imageURL = "https://image.tmdb.org/t/p/w500" + element.poster_path;
              var carbox = $("#poster-photo7");
              carbox.attr("src",imageURL);
              carbox.attr('data-movie-id',element.id);
              // Some of the returned data does not have "original_title" data, some
              // of them had "original_name" instead.
              if(element.original_title !== undefined) {
                carbox.attr('data-movie-title',element.original_title);
              } else {
                carbox.attr('data-movie-title',element.original_name);
              }
            };

            if (i === 8) {
              var imageURL = "https://image.tmdb.org/t/p/w500" + element.poster_path;
              var carbox = $("#poster-photo8");
              carbox.attr("src",imageURL);
              carbox.attr('data-movie-id',element.id);
              // Some of the returned data does not have "original_title" data, some
              // of them had "original_name" instead.
              if(element.original_title !== undefined) {
                carbox.attr('data-movie-title',element.original_title);
              } else {
                carbox.attr('data-movie-title',element.original_name);
              }
            };

            if (i === 9) {
              var imageURL = "https://image.tmdb.org/t/p/w500" + element.poster_path;
              var carbox = $("#poster-photo9");
              carbox.attr("src",imageURL);
              carbox.attr('data-movie-id',element.id);
              // Some of the returned data does not have "original_title" data, some
              // of them had "original_name" instead.
              if(element.original_title !== undefined) {
                carbox.attr('data-movie-title',element.original_title);
              } else {
                carbox.attr('data-movie-title',element.original_name);
              }
            };

            if (i === 10) {
              var imageURL = "https://image.tmdb.org/t/p/w500" + element.poster_path;
              var carbox = $("#poster-photo10");
              carbox.attr("src",imageURL);
              carbox.attr('data-movie-id',element.id);
              // Some of the returned data does not have "original_title" data, some
              // of them had "original_name" instead.
              if(element.original_title !== undefined) {
                carbox.attr('data-movie-title',element.original_title);
              } else {
                carbox.attr('data-movie-title',element.original_name);
              }
            };

            // increment
            i++;
              
          });
      });  

   
    },


    // get related movie rating (pg, pg-13, etc.) from OMDB API
    // parameter: movie id
    getOmdbMovieRating: function(title) {
      console.log("in detailPage.getOmdbMovieRating");
      console.log("detail title", title);

      // construct our URL
      var queryURL = "https://www.omdbapi.com/?t=" + title + "&apikey=trilogy";

      console.log("OMDB URL: ", queryURL);
      

      // make API call
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        console.log("rated: ", response.Rated);
        $("#rated-text").text("Rated: " + response.Rated);
      });
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
      
      console.log("rapid api host is: ", detailPage.utellyHost);
      console.log("rapid api key is: ",detailPage.utellyKey);
      
      // this.streaming = [];

      // build call to the API

       console.log("rapid api host is: ", this.utellyHost);
      console.log("rapid api key is: ",this.utellyKey);
      const options = {
      method: 'GET',
      headers: {
          // "X-RapidAPI-Host": 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
          // "X-RapidAPI-Key": '80549481bdmsha65d8ad2b7edcfap1d5cc3jsncf554c0fbd38'
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
          console.log("in ajax call for Utelly");
          
          console.log(response.results);
          console.log("results-length: ", response.results.length);
          // loop thru the results to find matches to the target movie
          response.results.forEach(element => {
            console.log("result is: ",element);
            console.log("results-name ",element.name);
            // check to see if this result matches target movie
            console.log(">>>>>>>>>>>>>>>>>>>>>>>target title: ", title.toLowerCase().replace('+',' '));
            console.log(">>>>>>>>>>>>>>>>>>>>>>>results name: ", element.name.toLowerCase());
            if (element.name.toLowerCase() === title.toLowerCase().replace('+',' ')) {
              console.log("match on title: ", title.toLowerCase().replace('+',' '));
              // loop thru locations to see where title can be streamed
              element.locations.forEach(element => {
                // console.log("this location is: ", element.display_name);
                // console.log("this location url is: ", element.url);
                // right here need to put the location and location url on the detail page 
                // think of un-ordered list 
                  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                  console.log("streaming-: ", element.display_name);
                  console.log("going to push " + element.display_name + " into streaming array");
                  streaming.push(element.display_name);

                  
                  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                  
                // $("#stream-url").text(element.url);

              }); // end of locations forEach
            }; // end of title check loop
          }); // end of results forEach

        console.log("streaming array = ", streaming.join(', '));
        $("#streaming-text").text(streaming.join(', '));

      }); // end of the ajax call


    }, // end of method getUtelly


    // other methods go below

    // method to determine toggle for detail page watch list badge
    // i.e. if title is in watch list the badge should be:
    // remove from watch list
    // if title is not in watch list the badge should be:
    // add to watch list
    setTextForWatchListButton() {
      console.log("in manageWatchList.setTextForWatchListButton");
      // if title is not in watch list then button should read ADD else REMOVE
      console.log("title to check for in watch list is: ",detailPage.movieTitle);
      
      if (manageWatchList.watchListMovieTitleArray.indexOf(detailPage.movieTitle) === -1) {
        $("#add-fav-btn").text("Add Bookmark");
        $("#add-fav-btn").removeClass('btn-outline-danger');
        $("#add-fav-btn").addClass('btn-outline-success');
      }
      else {
        $("#add-fav-btn").text("Remove Bookmark");
        $("#add-fav-btn").removeClass('btn-outline-success');
        $("#add-fav-btn").addClass('btn-outline-danger');
      };
    },

  } // end of detailPage object


  // ----------------------------------------------------------
  // START OF PROGRAM FLOW:
  // ----------------------------------------------------------
  console.log("In Detail Page");

  manageWatchList.getWatchListFromLocalStorage();
  console.log("watch list titles: ", manageWatchList.watchListMovieTitleArray);
  console.log("watch list id: ", manageWatchList.watchListMovieIdArray);
  console.log("watch list year: ", manageWatchList.watchListMovieYearArray);
  console.log("watch list time: ", manageWatchList.watchListMovieTimeArray);
  
  // manageWatchList.buildWatchListInTheDom();

  detailPage.movieTitle = manageSessionStorage.getSessionStorage("movieTitle");
  detailPage.movieTitleId = manageSessionStorage.getSessionStorage("movieId");
  detailPage.setTextForWatchListButton();
  // detailPage.movieTitleId = 420817;
  // detailPage.movieTitle = 'Aladdin'
  detailPage.populateDetailPage();


  // add to fav button event - toggle into/out of watch list
  $("#add-fav-btn").on("click",function() {
    console.log("in global.add-fav-btn click event");
    
    // if title not in watch list add it and change badge class
    //  else remove it from watch list and change badge class
    if (manageWatchList.watchListMovieTitleArray.indexOf(detailPage.movieTitle) === -1) {
      // not in list - add it
      manageWatchList.addToWatchList(detailPage.movieTitle, detailPage.movieTitleId,detailPage.movieTitleYear,detailPage.movieTitleTime);
      detailPage.setTextForWatchListButton();
      manageWatchList.getWatchListFromLocalStorage();
      console.log("A:length of watch list is: ", manageWatchList.watchListMovieTitleArray.length);
      console.log("watch list titles: ", manageWatchList.watchListMovieTitleArray);
      console.log("watch list id: ", manageWatchList.watchListMovieIdArray);
      console.log("watch list year: ", manageWatchList.watchListMovieYearArray);
      console.log("watch list time: ", manageWatchList.watchListMovieTimeArray);
      // manageWatchList.buildWatchListInTheDom();
    }
    else {
      // in list already so remove it
      manageWatchList.removeFromWatchList(detailPage.movieTitle);
      detailPage.setTextForWatchListButton();
      manageWatchList.getWatchListFromLocalStorage();
      console.log("R:length of watch list is: ", manageWatchList.watchListMovieTitleArray.length);
      console.log("watch list titles: ", manageWatchList.watchListMovieTitleArray);
      console.log("watch list id: ", manageWatchList.watchListMovieIdArray);
      console.log("watch list year: ", manageWatchList.watchListMovieYearArray);
      console.log("watch list time: ", manageWatchList.watchListMovieTimeArray);
      // manageWatchList.buildWatchListInTheDom();
    };
  });


  // MOVED TO COMMON.JS
  // watch list button event - show modal
  $("#watch-list-btn").on("click",function() {
    console.log("in global.watch-list-btn click event")
   // show watch list
    $('#my-modal').modal('show');
  });

  // watch list modal content - Delete click
  // finda all checked items; remove them from the arrays; re-build/re-render DOM
  // **** this code should be moved to the commmon.js I believe
  $(document).on("click", "#delete-watch-items", function() {
    console.log("in global.delete-watch-items click event");
    // find items checked and remove them from the watch arrays
    // remove checked items from the DOM - each item appended to
    // var modalBody =   $("#watch-list-body");
    // the items to remove are of type:
    //  $('<div class="watch-list-item-container"></div>');

    $('.watch-list-checkbox:checked').each(function () {
      console.log("this item was checked: ", this.value);
      // next - remove this from the watch arrays :
      // manageWatchList.removeFromWatchList(this.value);
      // if we are on the detail page we might have just removed 
      // that title from the watch list so update the save to watch list button
      // only do if on detail page
      // detailPage.setTextForWatchListButton();
      // now update the DOM by removing this watch list container item 
      // this parent and child look like this:
      // <div class="watch-list-item-container">
      //   <input class="watch-list-checkbox" type="checkbox" name="delete" value="Aladdin">
      // look up how to target its parent and them run a remove method on it
      // something like this:
      // $(this)>parent.remove
    
    })
  });
  
  // watch list modal content - movie title click
  // should cause redirect to the detail page
  $(document).on("click", ".watch-list-item", function() {
    console.log("in global.watch-list-item click event");
    // console.log("you pressed " + $(this).data("movie-id"));
    // console.log("you pressed " + $(this).data("movie-title"));
    manageSessionStorage.setSessionStorage("movieId",$(this).data("movie-id"));
    manageSessionStorage.setSessionStorage("movieTitle",$(this).data("movie-title"));
    // console.log("saved movie id: ", manageSessionStorage.getSessionStorage("movieId"));
    // console.log("saved movie title: ", manageSessionStorage.getSessionStorage("movieTitle"));
    // redirect to the detail page
    redirectToDetailPage();
  });


  // go to detail page on recommended movie click
  // go to detail page on recommended movie click
//  $(document).on("click",".poster>img", function() { 
 $(document).on("click",".carousel-cell>img", function() {
  //$(document).on("click",".carousel-item>img", function() {
    console.log("in carousel-item>img click event");
    // console.log("you pressed " + $(this).data("movie-id"));
    // console.log("you pressed " + $(this).data("movie-title"));
    manageSessionStorage.setSessionStorage("movieId",$(this).data("movie-id"));
    manageSessionStorage.setSessionStorage("movieTitle",$(this).data("movie-title"));
    // console.log("saved movie id: ", manageSessionStorage.getSessionStorage("movieId"));
    // console.log("saved movie title: ", manageSessionStorage.getSessionStorage("movieTitle"));
    // redirect to the detail page
    redirectToDetailPage();
  });


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
        'onReady': onPlayerReady,   // MRC - uncomment when done with CSS changes
        'onStateChange': onPlayerStateChange //,
        //'onError': onError
      }
    });
  }
  
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {

      event.target.loadVideoById(youTubeVideoId);
      event.target.setVolume(10);
      event.target.playVideo();    // MRC - uncomment when done with CSS changes
      isTrailerPlaying = true;
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
        event.target.playVideo(); // MRC - uncomment when done with CSS changes
        isTrailerPlaying = true;
      }
    }

    // function onError(event) {
    //   console.log("onError: ",event.data);
    //   event.target.playVideo()
    // }
  //------------------------------------------------------------------------------------------ 



    // toggle trailer on/off when users scrolls down/up
    window.onscroll = function() {trailerToggle()};

    function trailerToggle() {
      // console.log("in global.trailerToggle");
      // console.log(("isTrailerPlaying: ", isTrailerPlaying));
      // console.log("scrollTop: ", document.body.scrollTop);
      // console.log("elementTop: ", document.documentElement.scrollTop);
      if (document.documentElement.scrollTop > 350) {
          if (isTrailerPlaying) {
            //pause trailer
            isTrailerPlaying = false;
            player.pauseVideo();
          };
      } 
      else if (document.documentElement.scrollTop <= 350) {
              if (!isTrailerPlaying) {
                //un-pause trailer
                isTrailerPlaying = true;
                player.playVideo();  // MRC - uncomment when done with CSS changes
              }
      }
    }


  // pause trailer if user click external movie homepage link
  // should cause redirect to the detail page
  $(document).on("click", "#homepage", function() {
    console.log("in global.homepage click event");
    isTrailerPlaying = false;
    player.pauseVideo();
  });

  
 
    
