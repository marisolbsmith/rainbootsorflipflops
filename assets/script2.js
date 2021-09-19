// Variable for my API Key
const apiKey = "b5b0893f5fb9ef23b8f5462f2201815e";

document.getElementById("btnSearchCity").addEventListener("click", function () {
  var textCity = document.getElementById("txtCity").value;
  console.log(textCity);
  var currentWeatherQuery =
    `https://api.openweathermap.org/data/2.5/weather?q=` +
    textCity +
    `&APPID=b5b0893f5fb9ef23b8f5462f2201815e`;
  var fiveDayWeatherQuery =
    `https://api.openweathermap.org/data/2.5/forecast?q=` +
    textCity +
    `,3166&APPID=b5b0893f5fb9ef23b8f5462f2201815e`;
  var cityName = document.getElementById("cityName");
  var humidity = document.getElementById("current-humidity");
  var windSpeed = document.getElementById("current-windSpeed");
  var temp = document.getElementById("current-temp");
  //Creating fetch
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
    });
});

