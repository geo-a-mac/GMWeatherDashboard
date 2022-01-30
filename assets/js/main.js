var citySearch = document.getElementById("city");
var searchButton = document.getElementById("searchBtn");
var searchList = document.querySelector("#searchList");
var APIKey = "80ef5c6717f3834714ead7f302cc767c";
var searchHist = ["No previous search"];

var histSearch = function (event) {
  console.log("histSearch");
  //debugger;
  var element = event.target;
  if(element.matches(".histBtn")) {
    console.log("it's a .histBtn");
    var searchCity = element.textContent;
    getWeather(searchCity);
  }
}

var getCity = function() {
  if (citySearch.value === '') {
    return;
  } else {
    searchCity = citySearch.value;
    searchCity.trim(); 
    getWeather(searchCity);
    citySearch.value = '';
  }
}

var getWeather = function(searchCity) {
    // format the openweather api url
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
    /* add searchCity to searchHist array */
    if (searchHist.includes(searchCity)) {
      return;
    } else {
      searchHist.push(searchCity);
      // store in localStorage
      localStorage.setItem("history", JSON.stringify(searchHist));
      getPreviousSearches();
    }
  }

  var getPreviousSearches = function() {
    while(searchList.firstChild) searchList.removeChild(searchList.firstChild);

    /* get previous searches from local storage and display under search input */
    var tempArr = JSON.parse(localStorage.getItem("history"));
    if (!tempArr) {
      return;
    } else {
      searchHist = tempArr;
      for (var i=1; i<searchHist.length; i++) {
          console.log(searchHist[i]);
          var listEl = document.createElement("button");
          listEl.classList = "histBtn";
          listEl.setAttribute("id", "histBtn");
          listEl.setAttribute("data", searchHist[i]);
          listEl.textContent = searchHist[i];
          searchList.appendChild(listEl);
      }
    }
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
  searchList.addEventListener("click", histSearch);