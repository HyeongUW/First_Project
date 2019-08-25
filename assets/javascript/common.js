 
  // ----------------------------------------------------------
  // global functions:
  // ----------------------------------------------------------
    // redirect to detail page
    function redirectToDetailPage() {
      console.log("in global.redirectToDetailPage");
      // switch the browser to the detail page
      window.location ='detail.html';
    };
 

  // watch list button event - show modal
  // **** this code should be moved to common.js I believe
  $("#watch-list-btn").on("click",function() {
    console.log("in global.watch-list-btn click event")
   // show watch list
    $('#my-modal').modal('show');
  });



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
      // be careful to get the below correct - first attempt delete the whole list
      // manageWatchList.removeFromWatchList(this.value);
      var title = this.value;
      console.log("remove from watch list checked: ", title);
      
      manageWatchList.removeFromWatchList(title);
      manageWatchList.getWatchListFromLocalStorage();

      // remove parent so as to remove the whole watch list item container
      $(this).parent().remove();

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


  //  watch list modal content - movie title click
  // should cause redirect to the detail page
    // **** this code should be moved to the commmon.js I believe
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




 // ----------------------------------------------------------
  // objects and classes:
  // ----------------------------------------------------------

  // ----------------------------------------------------------
  // object for session storage:
  // ----------------------------------------------------------
  var manageSessionStorage = {
    // local variables:

    // methods:

    // method to clear property from session storage
    clearSessionStorage: function(property) {
      console.log("in manageSessionStorage.clearSessionStorage");
      sessionStorage.removeItem(property);
    },

    // method to get property from session storage
    getSessionStorage: function(property) {
      console.log("in manageSessionStorage.getSessionStorage");
      var propVal = sessionStorage.getItem(property);
      return propVal;
    },

    // method to set property in session storage
    setSessionStorage: function(property,propVal) {
      console.log("in manageSessionStorage.setSessionStorage");
      sessionStorage.setItem(property,propVal);
    }
  }


  // ----------------------------------------------------------
  // object for local storage:
  // ----------------------------------------------------------
  var manageLocalStorage = {
    // local variables:

    // methods:

    // method to clear property from local storage
    clearLocalStorage: function(property) {
      console.log("in manageLocalStorage.clearLocalStorage");
      localStorage.removeItem(property);
    },

    // method to get property from local storage
    getLocalStorage: function(property) {
      console.log("in manageLocalStorage.getLocalStorage");
      var propVal = localStorage.getItem(property);
      return propVal;
    },

    // method to set property in local storage
    setLocalStorage: function(property,propVal) {
      console.log("in manageLocalStorage.setLocalStorage");
      localStorage.setItem(property,propVal);
    }
  }


  // ----------------------------------------------------------
  // object for watch list management:
  // ----------------------------------------------------------
  var manageWatchList = {
    // local variables:
    // watch list is an array of movie titles
    // and array of movie Id
    // array of release year
    // array of running time
    // will be used to redirct to Detail page 
    // on watch list modal form title click
    watchListMovieTitleArray: [],
    watchListMovieIdArray: [],
    watchListMovieYearArray: [],
    watchListMovieTimeArray: [],

    // methods:


    // // is watch list emtpy
    // isWatchListEmpty () {
    //   if (this.watchListMovieIdArray === null) {
    //     return true;
    //   } 
    //   else {
    //     return false;
    //   }
    // },

    // method to clear the watch list from local storage
    clearWatchListFromLocalStorage: function() {
      console.log("in manageWatchList.clearWatchListFromLocalStorage");
      manageLocalStorage.clearLocalStorage("watchListTitle");
      manageLocalStorage.clearLocalStorage("watchListId");
      manageLocalStorage.clearLocalStorage("watchListYear");
      manageLocalStorage.clearLocalStorage("watchListTime");
      console.log("haveing problems on last watch list item removal - trying to force it");
          localStorage.removeItem("watchListTitle");
          localStorage.removeItem("watchListId");
          localStorage.removeItem("watchListYear");
          localStorage.removeItem("watchListTime");
      
    },

    // method to get watch list from local storage
    getWatchListFromLocalStorage: function() {
      console.log("in manageWatchList.getWatchListFromLocalStorage");

      var checkWatchList = manageLocalStorage.getLocalStorage("watchListTitle");
      console.log("look up found : ", checkWatchList);
      if (checkWatchList !== null) { // save the parallel arrays 
        console.log("found saved watchlist on local storage");
        this.watchListMovieTitleArray =  manageLocalStorage.getLocalStorage("watchListTitle").split(',');
        this.watchListMovieIdArray =  manageLocalStorage.getLocalStorage("watchListId").split(',');
        this.watchListMovieYearArray =  manageLocalStorage.getLocalStorage("watchListYear").split(',');
        this.watchListMovieTimeArray =  manageLocalStorage.getLocalStorage("watchListTime").split(',');
      }
      else {
        console.log("no saved watchlist on local storage");
      }
    },

    // method to set watch list in local storage
    setWatchListInLocalStorage: function() {
      console.log("in manageWatchList.setWatchListInLocalStorage");
      console.log("watchListTitle is length: ", this.watchListMovieTitleArray.length);
      
      manageLocalStorage.setLocalStorage("watchListTitle",this.watchListMovieTitleArray);
      manageLocalStorage.setLocalStorage("watchListId",this.watchListMovieIdArray);
      manageLocalStorage.setLocalStorage("watchListYear",this.watchListMovieYearArray);
      manageLocalStorage.setLocalStorage("watchListTime",this.watchListMovieTimeArray);
    },

    // method to add new item to the watch list and save it
    addToWatchList: function(title,id,year,time) {
      console.log("in manageWatchList.addToWatchList");
      console.log("BUG - title is:  ", title);
      
      this.watchListMovieTitleArray.push(title);
      // this.watchListMovieTitleArray.push('McFarland, USA');
      this.watchListMovieIdArray.push(id);
      this.watchListMovieYearArray.push(year);
      this.watchListMovieTimeArray.push(time);
      // console.log("watch list: ", this.watchListMovieTitleArray);
      
      // clear watch list from local storage and re-save it
      manageWatchList.clearWatchListFromLocalStorage();
      manageWatchList.setWatchListInLocalStorage();
    },

    // method to remove item to the watch list and save it
    removeFromWatchList: function(title) {
      console.log("in manageWatchList.removeFromWatchList");
      // work within this object's watch list arrays
      // find the title index position
      console.log("title is: ",title);
      console.log(">>>>array is: ",this.watchListMovieTitleArray);
      
      var targetIndex = this.watchListMovieTitleArray.indexOf(title);
      console.log("target index is: ", targetIndex);
      console.log("array length is: ", this.watchListMovieTitleArray.length);
      if (this.watchListMovieTitleArray.length === 1) {
        // force removal of local storage and clear the arrays
        this.watchListMovieTitleArray = [];
        this.watchListMovieIdArray  = [];
        this.watchListMovieYearArray  = [];
        this.watchListMovieTimeArray  = [];
        manageLocalStorage.clearLocalStorage('watchListTitle');
        manageLocalStorage.clearLocalStorage('watchListId');
        manageLocalStorage.clearLocalStorage('watchListYear');
        manageLocalStorage.clearLocalStorage('watchListTime');
      }
      else {
        // remove that index position element from all four parallel arrays
        this.watchListMovieTitleArray.splice(targetIndex,1);
        this.watchListMovieIdArray.splice(targetIndex,1);
        this.watchListMovieYearArray.splice(targetIndex,1);
        this.watchListMovieTimeArray.splice(targetIndex,1);
        // clear watch list from local storage and re-save it
        manageWatchList.clearWatchListFromLocalStorage();
        manageWatchList.setWatchListInLocalStorage();
      };

      // // remove that index position element from all four parallel arrays
      // this.watchListMovieTitleArray.splice(targetIndex,1);
      // this.watchListMovieIdArray.splice(targetIndex,1);
      // this.watchListMovieYearArray.splice(targetIndex,1);
      // this.watchListMovieTimeArray.splice(targetIndex,1);
      // console.log("AFTER array length is: ", this.watchListMovieTitleArray.length);
      // console.log("AFTER: array is ", this.watchListMovieTitleArray );
      // // this is a band-aid until i figure out how to properly slice the array to 0 elements
      // if (this.watchListMovieTitleArray.length === 1) {
      //   console.log("SETTING TO ZERO");
      //    manageLocalStorage.clearLocalStorage('watchListTitle');
      //    manageLocalStorage.clearLocalStorage('watchListId');
      //    manageLocalStorage.clearLocalStorage('watchListYear');
      //    manageLocalStorage.clearLocalStorage('watchListTime');
      // };
     
        
      //   // this.watchListMovieTitleArray = [];
      //   // this.watchListMovieYearArray = [];
      //   // this.watchListMovieIdArray = [];
      //   // this.watchListMovieTimeArray = [];
      

      // // clear watch list from local storage and re-save it
      // manageWatchList.clearWatchListFromLocalStorage();
      // manageWatchList.setWatchListInLocalStorage();
    },

    // build watch list in the DOM
    buildWatchListInTheDom() {
      console.log("in manageWatchList.buildWatchListInTheDom");
      // as temporary short-cut not coding selective search
      // add/delete for line that could be used when/if this
      // is rendered on the detail page
      // Instead, the whole set of children will be removed
      // and re-added each this method is called
      
    // append the watch-list-container structure to the modal body
      // <div class="modal-body">
        // <div class="watch-list-item-container">
        //   <input class="watch-list-checkbox" type="checkbox" name="delete" value="aladdin">
        //   <div class="watch-list-item" data-movie-title="aladdin" data-movie-year="2018"
        //       data-movie-runtime="103 min" data-movie-id="123456" >Aladdin</div>
        //   <div class="watch-list-year">2018</div>
        //   <div class="watch-list-time">103 min</div>
        // </div>

      // if (!manageWatchList.isWatchListEmpty) {  // only build the DOM if the watch list has something in it

        console.log("watch list has values to build the DOM");
        // start by removing the children
        // $("#watch-list-body").empty();
        
        // i think below line is depracted and can be removed ***
        $(".watch-list-container").remove();

        // anchor point for the children - below the modal body
        var modalBody =   $("#watch-list-body");
        console.log("modal body : " , modalBody);

        // // anchor point for the children - above the modal footer
        // var modalFooter =   $("#watch-list-footer");
        // console.log("modal footer : " , modalFooter);
        

        // iterate over the title array (and 3 other parallel arrays) to re-build the children
        for (i = 0; i < this.watchListMovieTitleArray.length; i++) {
          console.log("Index is: " + i + " title to add to the DOM: " + this.watchListMovieTitleArray[i]);

          // make new child container 
          var childContainer = $('<div class="watch-list-item-container"></div>');
          console.log("child container is: ", childContainer);
          

          // create and append input div to the new child container
          var inputDiv = $('<input class="watch-list-checkbox" type="checkbox" name="delete" value="' + this.watchListMovieTitleArray[i] + '">');
          console.log("input Div is: ", inputDiv);
          
          childContainer.append(inputDiv);
          console.log("child container after input Div append: ", childContainer);

          // create and append inner child div to the new child container
          var innerDiv = $('<div class="watch-list-item" data-movie-title="' + this.watchListMovieTitleArray[i] 
                             + '" data-movie-year="' + this.watchListMovieYearArray[i]
                             + '" data-movie-runtime="' + this.watchListMovieTimeArray[i]
                             + '" data-movie-id="' + this.watchListMovieIdArray[i]
                             + '">' + this.watchListMovieTitleArray[i] 
                             + '</div>');
          console.log("inner Div is: ", innerDiv);
          childContainer.append(innerDiv);   
          console.log("child container after inner Div append");
                          

          // create and append watch list year div
          var yearDiv = $('<div class="watch-list-year">' + this.watchListMovieYearArray[i] + '</div>');
          console.log("year Div is: ", yearDiv);
          
          childContainer.append(yearDiv);
          console.log("child container after year Div append");
          

          // create and append watch list runtime div
          var timeDiv = $('<div class="watch-list-time">' + this.watchListMovieTimeArray[i] + '</div>');
          console.log("time Div is: ", timeDiv);
          
          childContainer.append(timeDiv);
          console.log("child container after time Div append");
          
          // append the fully formed new child container into the modal body anchor point
          modalBody.append(childContainer);

          // // insert the fully formed new child container before the modal footer anchor point
          // modalFooter.before(childContainer);
        }
        
    },




    // click event for detail page watchlist badge
    // do some stuff here
    // click should either remove the title, id, year, time from watch list or add to watch list
    // set the appropriate class / button text
    // call the appropriate methods to achieve the change in the watch list

  }


  
