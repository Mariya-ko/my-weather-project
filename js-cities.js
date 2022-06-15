let currentTime = new Date();
let h6 = document.querySelector("h6");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[currentTime.getDay()];
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10)  {
  minutes = `0${minutes}`;
}

h6.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather (response) {
  console.log(response.data);
let h1 = document.querySelector("h1");
h1.innerHTML = response.data.name;
document.querySelector("#temp-now").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#pressure").innerHTML = response.data.main.pressure;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

function search(event)  {
 event.preventDefault();
let apiKey = "0c21c4770c785ce0b3d68a397aeae129";
let city = document.querySelector("#search-text-input").value;
let apiUrl =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

function showFahrenheit (event)  {
  event.preventDefault ();
  let temp = document.querySelector("#temp");
  let fahrenheitTemperature = Math.round((19*9)/5+32);
  temp.innerHTML = `${fahrenheitTemperature}`;
}

let linkFahr = document.querySelector("#fahrenheit-link");
linkFahr.addEventListener("click", showFahrenheit);

function showCelsius (event)  {
  event.preventDefault();
  temp.innerHTML = `19`;
}

let linkCelsius = document.querySelector("#celsius-link");
linkCelsius.addEventListener("click", showCelsius);

function searchLocation(position) {
let apiKey = "0c21c4770c785ce0b3d68a397aeae129";
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let units = "metric";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let apiUrl =
`${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;  
axios.get(apiUrl).then(displayWeather);
}

function showLocation (event) {
 event.preventDefault();
 navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showLocation);




