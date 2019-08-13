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
    watchListMovieReleaseYear: [],
    watchListMovieRunningTime: [],

    // methods:


    // is watch list emtpy
    // this could be used to enable/disable the watch list button
    // on the home page
    isWatchListEmpty () {
      if (this.watchListMovieIdArray === null) {
        return true;
      } 
      else {
        return false;
      }
    },

    // method to clear the watch list from local storage
    clearWatchListFromLocalStorage: function() {
      console.log("in manageWatchList.clearWatchList");
      manageLocalStorage.clearLocalStorage("watchListTitle");
      manageLocalStorage.clearLocalStorage("watchListId");
      manageLocalStorage.clearLocalStorage("watchListYear");
      manageLocalStorage.clearLocalStorage("watchListTime");
    },

    // method to get watch list from local storage
    getWatchListFromLocalStorage: function() {
      console.log("in manageWatchList.getWatchList");

      var checkWatchList = manageLocalStorage.getLocalStorage("watchListTitle");
      if (checkWatchList === null) {
        // this fact should be used to toggle the watchlist button on homepage on/off
        console.log("no saved watchlist on local storage");
      }
      else { // save the parallel arrays 
        this.watchListMovieTitleArray =  manageLocalStorage.setLocalStorage("watchListTitle").split(',');
        this.watchListMovieIdArray =  manageLocalStorage.setLocalStorage("watchListId").split(',');
        this.watchListMovieYearArray =  manageLocalStorage.setLocalStorage("watchListYear").split(',');
        this.watchListMovieTimeArray =  manageLocalStorage.setLocalStorage("watchListTime").split(',');
      }
    },

    // method to set watch list in local storage
    setWatchListInLocalStorage: function() {
      console.log("in manageWatchList.setWatchList");
      manageLocalStorage.setLocalStorage("watchListTitle",this.watchListMovieTitleArray);
      manageLocalStorage.setLocalStorage("watchListId",this.watchListMovieIdArray);
      manageLocalStorage.setLocalStorage("watchListYear",this.watchListMovieYearArray);
      manageLocalStorage.setLocalStorage("watchListTime",this.watchListMovieTimeArray);
    },

    // method to add new item to the watch list and save it
    addToWatchList: function(title,id,year,time) {
      console.log("in manageWatchList.addToWatchList");
      this.watchListMovieTitleArray.push(title);
      this.watchListMovieIdArray.push(id);
      this.watchListMovieYearArray.push(year);
      this.watchListMovieTimeArray.push(time);
      // clear watch list from local storage and re-save it
      manageWatchList.clearWatchListFromLocalStorage();
      manageWatchList.setWatchListInLocalStorage();
    },

    // method to remove item to the watch list and save it
    removeFromWatchList: function(title) {
      console.log("in manageWatchList.removeFromWatchList");
      // WORK TO DO HERE...
      // work within this object's watch list arrays
      // find the title index position
      // remove that index position element from all four parallel arrays
      // clear watch list from local storage and re-save it
      manageWatchList.clearWatchListFromLocalStorage();
      manageWatchList.setWatchListInLocalStorage();
    },

    // method to determine toggle for detail page watch list badge
    // i.e. if title is in watch list the badge should be:
    // remove from watch list
    // if title is not in watch list the badge should be:
    // add to watch list
    setClassForDetailPageWatchListBadge() {
      console.log("in manageWatchList.setClassForDetailPageWatchListBadge");
      // do some stuff here
    },

    // click event for detail page watchlist badge
    // do some stuff here
    // click should either remove the title, id, year, time from watch list or add to watch list
    // set the appropriate class / button text
    // call the appropriate methods to achieve the change in the watch list

  }
