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
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=imperial&appid=80ef5c6717f3834714ead7f302cc767c";
    
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            //displayWeather(data);
            storeSearch(searchCity);
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
    console.log(data.city.name);
    console.log(data.cnt);
    for (var i=0; i< data.cnt; i++) {
      var dttm = convertDate(data.list[i].dt);
      var temp = data.list[i].main.temp;
      var minT = data.list[i].main.temp_min;
      var maxT = data.list[i].main.temp_max;
      var descr = data.list[i].weather[0].main;
      var wind = data.list[i].wind.speed;
      console.log(dttm + ',' + temp + ',' + minT + ',' + maxT + ',' + descr + ',' + wind);
    }
  }

  var storeSearch = function(searchCity) {
    /* store in localstorage */
    const searchHist = {
      cityName: searchCity
    };
    window.localStorage.setItem("city", JSON.stringify(searchHist));
  }

  var getPreviousSearches = function() {
    /* get previous searches from local storage and display under search input */
    var prevSearch = JSON.parse(window.localStorage.getItem("city"));
    console.log("previous: " + prevSearch);
  }
  
  var convertDate = function(date) {
    let timestamp = date;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var uFormDate = new Date(timestamp * 1000);
    var month = uFormDate.getMonth() + 1;
    var date = uFormDate.getDate();
    var year = uFormDate.getFullYear();
    // Will display date in MM/DD/YYYY formate
    var formattedDate = month + '\/' + date + '\/' + year;
    return formattedDate;
  }
  
  getPreviousSearches();
  searchButton.addEventListener("click", getCity);
