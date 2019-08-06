$(document).ready(function() {
    // ----------------------------------------------------------
    // global variables:
    // ----------------------------------------------------------
    
    // test variable for call to utelly
    var title = "jurasic+park";


    // ----------------------------------------------------------
    // global functions:
    // ----------------------------------------------------------
  

    // ----------------------------------------------------------
    // objects and classes:
    // ----------------------------------------------------------

    // ----------------------------------------------------------
    // object for detail page:
    // ----------------------------------------------------------
    var detailPage = {
        // local variables:
    
        // methods:
    
        // redirect to detail page
        redirectTo: function() {
        console.log("in detailPage.redirectTo");
        window.location ='detail.html';
        // will need various session data logic/methods
        // to pass data from movie click events to detail page
        },
    
        // get streaming info from Utelly API
        getUtelly: function(title) {
        console.log("in detailPage.getUtelly");
        console.log("search title: ", title);
    
        const url ="https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + title;
        // console.log("url: ", url);

        // build call to the API - uses ES6 fetch method
        const options = {
        method: 'GET',
        headers: {
            "X-RapidAPI-Host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "80549481bdmsha65d8ad2b7edcfap1d5cc3jsncf554c0fbd38"
            },
        };
    
        // API call 
        fetch(url, options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(e => console.error(e));
        }
    
        // other methods go below
    
    };
  

    // ----------------------------------------------------------
    // START OF PROGRAM FLOW:
    // ----------------------------------------------------------
    console.log("Main program flow start");

    // example of detailPage object getUtelly method call
    // console.log("calling utelly for: ", title);
    // detailPage.getUtelly(title);


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