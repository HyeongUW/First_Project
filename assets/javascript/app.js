$(document).ready(function() {
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