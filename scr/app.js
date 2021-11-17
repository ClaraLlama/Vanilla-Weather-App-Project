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

function showTemprature(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

let form = document.querySelector("#location-search");
form.addEventListener("submit", search);

// current position
function searchGeolocation(event) {
  event.preventDefault();
  let searchGeoInPut = document.querySelector("#current-location");
  navigator.geolocation.getCurrentPosition(retrievePosition);
  console.log(searchGeoInPut.value);
  //callAPIreq(searchGeoInPut.value);
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

let button = document.querySelector("#current-location");
button.addEventListener("click", searchGeolocation);
