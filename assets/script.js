var currentDayDiv = $("#current-day-div");
var fiveDayDiv = $("#five-day-forecast");
var forecastResults = $("#forecast-results");
var citiesArr = [];

function setLocalStorageCities() {
  localStorage.setItem("searchedCities", JSON.stringify(citiesArr));
}

function getLocalStorageCities() {
  var storedCities = JSON.parse(localStorage.getItem("searchedCities"));

  if (storedCities !== null) {
    citiesArr = storedCities;
  }
}

//Calling this function to initialize retrieiving the cities in local storage
getLocalStorageCities();

// Ajax call to retrieve current and five day forecast based on city search
function ajaxGetWeather(city) {
  // setting local storage for last city searched
  localStorage.setItem("lastSearch", city);

  if (city != null) {
    var currentWeatherQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=b5b0893f5fb9ef23b8f5462f2201815e`;
    var fiveDayWeatherQuery = `https://api.openweathermap.org/data/2.5/forecast?q=${city},3166&APPID=b5b0893f5fb9ef23b8f5462f2201815e`;

    //Creating first AJAX call to get the current city weather attributes
    $.ajax({
      url: currentWeatherQuery,
      method: "GET",
    })
      .then(function (response) {
        // Moment JS for current date
        var getDate = moment();
        var todaysDate = getDate.format("MM/DD/YYYY");
        var getDay = moment();
        var currentDay = getDay.format("dddd");

        // Kelvin to Fahrenheit conversion
        var temp = Math.round(((response.main.temp - 273.15) * 9) / 5 + 32);
        $("#cityName").html(
          `${response.name} - ${currentDay} (${todaysDate}) <span><img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"></span>`
        );
        $("#current-temp").html(`Temperature: ${temp} <span>&#8457;</span>`);
        $("#current-humidity").text(`Humidity: ${response.main.humidity}%`);
        $("#current-windSpeed").text(`Wind Speed: ${response.wind.speed} MPH`);

        // Calling this function to retrieve the UV Index
        retrieveUVIndex(response);

        currentDayDiv.fadeIn(1000);
        forecastResults.fadeIn(1000);
        fiveDayDiv.fadeIn(1500);
      })
      .fail(function (response) {
        alert("No Data Retrieved " + response);
      });

    // Creating second AJAX call to get the five day weather attributes
    $.ajax({
      url: fiveDayWeatherQuery,
      method: "GET",
    })
      .then(function (response) {
        // Converting the temperature to fahrenheit
        var temp1 = Math.round(
          ((response.list[2].main.temp - 273.15) * 9) / 5 + 32
        );
        var temp2 = Math.round(
          ((response.list[10].main.temp - 273.15) * 9) / 5 + 32
        );
        var temp3 = Math.round(
          ((response.list[18].main.temp - 273.15) * 9) / 5 + 32
        );
        var temp4 = Math.round(
          ((response.list[26].main.temp - 273.15) * 9) / 5 + 32
        );
        var temp5 = Math.round(
          ((response.list[34].main.temp - 273.15) * 9) / 5 + 32
        );

        // Putting the response dates in variables
        var date1 = new Date(response.list[2].dt_txt);
        var date2 = new Date(response.list[10].dt_txt);
        var date3 = new Date(response.list[18].dt_txt);
        var date4 = new Date(response.list[26].dt_txt);
        var date5 = new Date(response.list[34].dt_txt);

        // Displaying five day dates using getMonth/getDate/getFullYear methods
        $("#dateDay1").text(
          `${date1.getMonth() + 1}/${date1.getDate()}/${date1.getFullYear()}`
        );
        $("#dateDay2").text(
          `${date2.getMonth() + 1}/${date2.getDate()}/${date2.getFullYear()}`
        );
        $("#dateDay3").text(
          `${date3.getMonth() + 1}/${date3.getDate()}/${date3.getFullYear()}`
        );
        $("#dateDay4").text(
          `${date4.getMonth() + 1}/${date4.getDate()}/${date4.getFullYear()}`
        );
        $("#dateDay5").text(
          `${date5.getMonth() + 1}/${date5.getDate()}/${date5.getFullYear()}`
        );

        // Displaying five day temps
        $("#tempDay1").html(`Temp: ${temp1} <span>&#8457;</span>`);
        $("#tempDay2").html(`Temp: ${temp2} <span>&#8457;</span>`);
        $("#tempDay3").html(`Temp: ${temp3} <span>&#8457;</span>`);
        $("#tempDay4").html(`Temp: ${temp4} <span>&#8457;</span>`);
        $("#tempDay5").html(`Temp: ${temp5} <span>&#8457;</span>`);

        // five day forecast icons
        $("#iconDay1").attr(
          "src",
          `https://openweathermap.org/img/wn/${response.list[2].weather[0].icon}@2x.png`
        );
        $("#iconDay2").attr(
          "src",
          `https://openweathermap.org/img/wn/${response.list[10].weather[0].icon}@2x.png`
        );
        $("#iconDay3").attr(
          "src",
          `https://openweathermap.org/img/wn/${response.list[18].weather[0].icon}@2x.png`
        );
        $("#iconDay4").attr(
          "src",
          `https://openweathermap.org/img/wn/${response.list[26].weather[0].icon}@2x.png`
        );
        $("#iconDay5").attr(
          "src",
          `https://openweathermap.org/img/wn/${response.list[34].weather[0].icon}@2x.png`
        );

        // Displaying five day humidity
        $("#humDay1").html(`Humidity: ${response.list[2].main.humidity}%`);
        $("#humDay2").html(`Humidity: ${response.list[10].main.humidity}%`);
        $("#humDay3").html(`Humidity: ${response.list[18].main.humidity}%`);
        $("#humDay4").html(`Humidity: ${response.list[26].main.humidity}%`);
        $("#humDay5").html(`Humidity: ${response.list[34].main.humidity}%`);
      })
      .fail(function (response) {
        console.log("No Data Retrieved");
      });
  } else {
    return;
  }
}

// Function used to display the city HTML content
function displayCity(city) {
  city = $(this).attr("data-city");

  ajaxGetWeather(city);
}

//Function to retrieve the UV Index
function retrieveUVIndex(response) {
  var uvIndexQuery = `https://api.openweathermap.org/data/2.5/uvi?appidb5b0893f5fb9ef23b8f5462f2201815e==${response.coord.lat}&lon=${response.coord.lon}`;

  //Creating AJAX call to get the UV Index
  $.ajax({
    url: uvIndexQuery,
    method: "GET",
  }).then(function (response) {
    $("#current-uv").html(`UV Index: <span> ${response.value} <span>`);
  });
}

//Function to render the city buttons
function renderCityButtons() {
  $("#city-search-buttons").empty();

  // Looping through the array of cities to create buttons
  for (var i = 0; i < citiesArr.length; i++) {
    var cityBtn = $("<button>");

    cityBtn.addClass("btn btn-outline-dark cityBtn");

    cityBtn.attr("data-city", citiesArr[i]);

    cityBtn.text(citiesArr[i]);

    $("#city-search-buttons").append(cityBtn);
  }
}

renderCityButtons();

// Function to display the users last search on page load
function renderLastSearch() {
  var city = localStorage.getItem("lastSearch");

  if (city === null) {
    return;
  }

  ajaxGetWeather(city);
}

// Calling function to render the last searched city by the user
renderLastSearch();

$("#btnSearchCity").click(function () {
  if ($("#txtCity").val().trim() != "") {
    var city = $("#txtCity").val().trim();

    citiesArr.push(city);

    renderCityButtons();

    $("#txtCity").val("");

    ajaxGetWeather(city);
    setLocalStorageCities();
  } else {
    alert("Search cannot be blank!");
  }
});

// Adding a click event listener to buttons with a class of "cityBtn"
$(document).on("click", ".cityBtn", displayCity);
