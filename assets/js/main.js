var citySearch = document.getElementById("city");
var searchButton = document.getElementById("searchBtn");
var APIKey = "80ef5c6717f3834714ead7f302cc767c";

var getCity = function() {
  var searchCity = citySearch.value;
  searchCity.trim();
  console.log(searchCity);
  getWeather(searchCity);
}

var getWeather = function(searchCity) {
    // format the github api url
    //var apiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + searchCity + "&cnt=5&APPID=80ef5c6717f3834714ead7f302cc767c";
    //var apiUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Chicago&cnt=5&APPID=80ef5c6717f3834714ead7f302cc767c";
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=80ef5c6717f3834714ead7f302cc767c";
    
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            //displayRepos(data, user);
          });
        } else {
          alert("Error: the city searched for is " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to GitHub");
      });
  };

  var displayWeather = function(data) {
    /* display the weather and forecast for searchCity */
  }

  var storeSearch = function() {
    /* store in localstorage */
  }

  var getPreviousSearches = function() {
    /* get previous searches from local storage and display under search input */
  }
  
  
  searchButton.addEventListener("click", getCity);
