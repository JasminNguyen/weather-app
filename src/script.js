function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = `${day} ${hours}:${minutes}`;
  return formattedDate;
}
let currentDate = new Date();
//console.log(formatDate(currentDate));
let now = document.querySelector("#time");
now.innerHTML = formatDate(currentDate);

function displayRequestedCityInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar");
  console.log(city.value);
  let heading = document.querySelector("#requested-city");
  heading.innerHTML = city.value;
  let units = "metric";
  let apiKey = "6ffa018527e7247b065825d43d3cff99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#form");
form.addEventListener("submit", displayRequestedCityInfo);

function displayDefaultCity(city) {
  let heading = document.querySelector("#requested-city");
  heading.innerHTML = city;
  let units = "metric";
  let apiKey = "6ffa018527e7247b065825d43d3cff99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
displayDefaultCity("New York");

function showTemperature(response) {
  console.log(response);
  //let temperature = response.data.main.temp;
  //let bigTemperature = document.querySelector("#big-temperature");
  //bigTemperature.innerHTML = Math.round(temperature);
  //is the same as:
  document.querySelector("#big-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  //console.log(temperature);
  //let location = response.data.name;
  //let requestedCity = document.querySelector("#requested-city");
  //requestedCity.innerHTML = location;
  //same as:
  document.querySelector("#requested-city").innerHTML = response.data.name;
  //console.log(city);
  //let humidity = response.data.main.humidity;
  //let bigHumidity = document.querySelector("#big-humidity");
  //bigHumidity.innerHTML = `Humidity: ${humidity}% `;
  //same as:
  document.querySelector("#big-humidity").innerHTML =
    response.data.main.humidity;
  //let wind = Math.round(response.data.wind.speed);
  //let bigWind = document.querySelector("#big-wind");
  //bigWind.innerHTML = `Wind speed: ${wind}m/s`;
  // same as:
  document.querySelector("#big-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  //let description = response.data.weather[0].description;
  // console.log(description);
  // let bigDescription = document.querySelector("#description");
  //bigDescription.innerHTML = description;
  //same as:
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let apiKey = "6ffa018527e7247b065825d43d3cff99";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
  });
}
let currentButton = document.querySelector(".current-location-button");
currentButton.addEventListener("click", getPosition);
