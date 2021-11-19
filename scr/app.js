//time and date
let span = document.querySelector("span");
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "Februray",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

span.innerHTML = `${date} ${month}, ${hours}:${minutes}  `;

//search
function search(event) {
  event.preventDefault();
  let searchInPut = document.querySelector("#search-input");
  console.log(searchInPut.value);
  callAPIreq(searchInPut.value);
}

function callAPIreq(searchCity) {
  let city = `${searchCity}`;
  let apiKey = "06e61b3b1916c0c5dffdf3f2accd815b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemprature);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "06e61b3b1916c0c5dffdf3f2accd815b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemprature(response) {
  let h1 = document.querySelector("h1");
  let temperatureElement = document.querySelector("#temperature");
  let todaysLow = document.querySelector("#todays-Low");
  let todaysHigh = document.querySelector("#todays-high");
  let descriptionElement = document.querySelector("#description");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;
  celsiusTempMin = response.data.main.temp_min;
  celsiusTempMax = response.data.main.temp_max;
  celsiusFeelLike = response.data.main.feels_like;

  h1.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  todaysLow.innerHTML = Math.round(response.data.main.temp_min);
  todaysHigh.innerHTML = Math.round(response.data.main.temp_max);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let form = document.querySelector("#location-search");
form.addEventListener("submit", search);

// current position
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "06e61b3b1916c0c5dffdf3f2accd815b";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiEndPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemprature);
}

console.log(retrievePosition);

function searchGeolocation(event) {
  event.preventDefault();
  let searchGeoInPut = document.querySelector("#current-location");
  navigator.geolocation.getCurrentPosition(retrievePosition);
  console.log(searchGeoInPut.value);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "06e61b3b1916c0c5dffdf3f2accd815b";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiEndPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemprature);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let todaysLow = document.querySelector("#todays-Low");
  let todaysHigh = document.querySelector("#todays-high");
  let feelsLike = document.querySelector("#feels-like");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  let fahrenheitTemperatureMin = (celsiusTempMin * 9) / 5 + 32;
  let fahrenheitTemperatureMax = (celsiusTempMax * 9) / 5 + 32;
  let fehrenheitFeelsLike = (celsiusFeelLike * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  todaysLow.innerHTML = Math.round(fahrenheitTemperatureMin);
  todaysHigh.innerHTML = Math.round(fahrenheitTemperatureMax);
  feelsLike.innerHTML = Math.round(fehrenheitFeelsLike);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let todaysLow = document.querySelector("#todays-Low");
  let todaysHigh = document.querySelector("#todays-high");
  let feelsLike = document.querySelector("#feels-like");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  todaysLow.innerHTML = Math.round(celsiusTempMin);
  todaysHigh.innerHTML = Math.round(celsiusTempMax);
  feelsLike.innerHTML = Math.round(celsiusFeelLike);
}

//display forecast
function formateDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
         <div class="col-2">
           <div class="weather-forcast-date">${formateDay(forecastDay.dt)}</div>
           <img src="http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png" 
           alt="weather icon" 
           width="65">
           <div class="weather-forecast-temperature">
             <span class="weather-forecast-low">${Math.round(
               forecastDay.temp.min
             )}°</span> |
            <span class="weather-forecast-high"></span>${Math.round(
              forecastDay.temp.max
            )}°</div>
         </div>
         `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemp = null;
let celsiusTempMin = null;
let celsiusTempMax = null;
let celsiusFeelLike = null;

let button = document.querySelector("#current-location");
button.addEventListener("click", searchGeolocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

callAPIreq("sydney");
