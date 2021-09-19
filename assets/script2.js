// Variable for my API Key
const apiKey = "b5b0893f5fb9ef23b8f5462f2201815e";

document.getElementById("btnSearchCity").addEventListener("click", function () {
  var textCity = document.getElementById("txtCity").value;
  console.log(textCity);
  var currentWeatherQuery =
    `https://api.openweathermap.org/data/2.5/weather?q=` +
    textCity +
    `&units=imperial&APPID=` +
    apiKey;
  var fiveDayWeatherQuery =
    `https://api.openweathermap.org/data/2.5/forecast?q=` +
    textCity +
    `,3166&units=imperial&APPID=` +
    apiKey;
  var cityName = document.getElementById("cityName");
  var humidity = document.getElementById("current-humidity");
  var windSpeed = document.getElementById("current-windSpeed");
  var temp = document.getElementById("current-temp");
  //Creating fetch for current weather
  fetch(currentWeatherQuery)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.main.temp);
      console.log(data.wind.speed);
      console.log(data.main.humidity);
      console.log(data.name);
      var getDate = moment();
      var todaysDate = getDate.format("MM/DD/YYYY");
      var getDay = moment();
      var currentDay = getDay.format("dddd");
      console.log(todaysDate);
      cityName.textContent = data.name + " " + todaysDate;
      humidity.textContent = "Humidity= " + data.main.humidity;
      windSpeed.textContent = "Wind Speed= " + data.wind.speed;
      temp.textContent = "Current Temp= " + data.main.temp;
      cityName.innerHTML = `${data.name} - (${todaysDate}) <span><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></span>`;
    });

  // Creating fetch for Five day weather
  fetch(fiveDayWeatherQuery)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Displaying five day temps
      document.getElementById(
        "tempDay1"
      ).innerHTML = `Temp: ${data.list[2].main.temp} <span>&#8457;</span>`;
      document.getElementById(
        "tempDay2"
      ).innerHTML = `Temp: ${data.list[10].main.temp} <span>&#8457;</span>`;
      document.getElementById(
        "tempDay3"
      ).innerHTML = `Temp: ${data.list[18].main.temp} <span>&#8457;</span>`;
      document.getElementById(
        "tempDay4"
      ).innerHTML = `Temp: ${data.list[26].main.temp} <span>&#8457;</span>`;
      document.getElementById(
        "tempDay5"
      ).innerHTML = `Temp: ${data.list[34].main.temp} <span>&#8457;</span>`;
    });
});
