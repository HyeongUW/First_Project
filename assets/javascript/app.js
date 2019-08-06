$(document).ready(function() {
    var name;
    // ----------------------------------------------------------
    // global variables:
    // ----------------------------------------------------------
    
    // test variable for call to utelly
    var testMovieTitle = "jurasic+park";


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
        },
    

        // populate the detail page content
        populateDetailPage: function() {
        console.log("in detailPage.populateDetailPage");

        // need call to API for detailed information

        // need to load the page up with the detailed information

        // need to call method getUtelly to get Utelly API info

        // need to load page up with the Utelly info
        },

        // get streaming info from Utelly API
        // parameter: movie title
        // returns: string info on streaming available
        getUtelly: function(title,country) {
        console.log("in detailPage.getUtelly");
        console.log("search title: ", title);
    
        const url ="https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + title
                  + "&country=" + country;

        // console.log("url: ", url);

        // build call to the API - uses ES6 fetch method
        const options = {
        method: 'GET',
        headers: {
            "X-RapidAPI-Host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "80549481bdmsha65d8ad2b7edcfap1d5cc3jsncf554c0fbd38"
            },
        };
        

        // // API call 
        // fetch(url, options)
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(e => console.error(e));
                    
    
        // // API call 
        // fetch(url, options)
        //     .then(response => response.json())
        //     .then(function(data) {
        //         name = data.results[0].name 
                
        //     })
        //     .catch(e => console.error(e));


            // $.ajax(url, options).then(response=> console.log(response));

            $.ajax(url, options).then(function(response) { 
                console.log(response.results[0]);
                console.log(response.results.length);
                var name = response.results[0].name;
                console.log("name: ", name);
                manageSessionStorage.setSessionStorage("NewName",name);
            });
        



         
        // need to thru the results and 
        // 1.  find all that match the title exactly
        //     1.1. within matches build the unique set of streaming service names
        //     1.2. build an array and return the array
        //     1.3  or return it as a string

        // how many results are there
        // console.log("status_code: ",data.status_code);
        }
     


        // other methods go below
    
    };
  

    // ----------------------------------------------------------
    // START OF PROGRAM FLOW:
    // ----------------------------------------------------------
    console.log("Main program flow start");

    // test local storage methods
    manageSessionStorage.clearSessionStorage("movieTitle");
    console.log("movieTitle is: ",manageSessionStorage.getSessionStorage("movieTitle"));
    manageSessionStorage.setSessionStorage("movieTitle","jaws");
    testMovieTitle = manageSessionStorage.getSessionStorage("movieTitle");
    console.log("movieTitle is: ", testMovieTitle);
    // manageSessionStorage.clearSessionStorage("movieTitle");
    // console.log("movieTitle is: ",manageSessionStorage.getSessionStorage("movieTitle"));
    // example of detailPage object getUtelly method call
    console.log("calling utelly for: ", testMovieTitle);
    detailPage.getUtelly(testMovieTitle,"us");


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

    
});