var citySearch = document.getElementById("city");
var searchButton = document.getElementById("searchBtn");
var searchList = document.querySelector("#searchList");
var APIKey = "80ef5c6717f3834714ead7f302cc767c";
var searchHist = ["No previous search"];
// vars for displaying weather data
var cityDate = document.getElementById("cityDate");
var todayTemp = document.getElementById("temp");
var todayWind = document.getElementById("wind");
var todayHum = document.getElementById("humidity");
var date1 = document.getElementById("b1");
var temp1 = document.getElementById("temp1");
var wind1 = document.getElementById("wind1");
var hum1 = document.getElementById("hum1");
var date2 = document.getElementById("b2");
var temp2 = document.getElementById("temp2");
var wind2 = document.getElementById("wind2");
var hum2 = document.getElementById("hum2");
var date3 = document.getElementById("b3");
var temp3 = document.getElementById("temp3");
var wind3 = document.getElementById("wind3");
var hum3 = document.getElementById("hum3");
var date4 = document.getElementById("b4");
var temp4 = document.getElementById("temp4");
var wind4 = document.getElementById("wind4");
var hum4 = document.getElementById("hum4");
var date5 = document.getElementById("b5");
var temp5 = document.getElementById("temp5");
var wind5 = document.getElementById("wind5");
var hum5 = document.getElementById("hum5");

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
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=imperial&appid=80ef5c6717f3834714ead7f302cc767c";
  
  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayWeather(data);
          storeSearch(searchCity);
        });
      } else {
        alert("Error: the city searched for is " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect");
    });
};

  var displayWeather = function(data) {
    /* display the weather and forecast for searchCity */
    console.log(data.city.name);
    var cName = data.city.name;
    for (var i=0; i<data.cnt; i+=8) {
      var dttm = convertDate(data.list[i].dt);
      var temp = data.list[i].main.temp;
      var descr = data.list[i].weather[0].main;
      var wind = data.list[i].wind.speed;
      var humid = data.list[i].main.humidity;
          console.log(dttm + ',' + temp + ',' + descr + ',' + wind + ',' + humid);
      if (i === 0) {
        cityDate.textContent = cName + " " + dttm + " " + descr;
        todayTemp.textContent = "Temperature: " + temp + "F";
        todayWind.textContent = "Wind speed: " + wind + "mph";
        todayHum.textContent = "Humidity: " + humid + "%";
      } else if (i === 8) {
        date1.textContent = "Date: " + dttm;
        temp1.textContent = "Temperature: " + temp + "F"; 
        wind1.textContent = "Wind speed: " + wind + "mph";
        hum1.textContent = "Humidity: " + humid + "%";
      } else if (i === 16) {
        date2.textContent = "Date: " + dttm;
        temp2.textContent = "Temperature: " + temp + "F";
        wind2.textContent = "Wind speed: " + wind + "mph";
        hum2.textContent = "Humidity: " + humid + "%";
      } else if (i === 24) {
        date3.textContent = "Date: " + dttm;
        temp3.textContent = "Temperature: " + temp + "F";
        wind3.textContent = "Wind speed: " + wind + "mph";
        hum3.textContent = "Humidity: " + humid + "%";
      } else if (i === 32) {
        date4.textContent = "Date: " + dttm;
        temp4.textContent = "Temperature: " + temp + "F";
        wind4.textContent = "Wind speed: " + wind + "mph";
        hum4.textContent = "Humidity: " + humid + "%";
      } 
    }
    var dttm = convertDate(data.list[39].dt);
    var temp = data.list[39].main.temp;
    var descr = data.list[39].weather[0].main;
    var wind = data.list[39].wind.speed;
    var humid = data.list[39].main.humidity;
    date5.textContent = "Date: " + dttm;
    temp5.textContent = "Temperature: " + temp + "F";
    wind5.textContent = "Wind speed: " + wind + "mph";
    hum5.textContent = "Humidity: " + humid + "%";
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