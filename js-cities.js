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

function formatDay(timestemp) {
let date = new Date(timestemp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];

}

function displayForecast(response) {
  let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index) {
  if (index < 5) {

  
  forecastHTML = forecastHTML +
  `
  <div class="col-2">
    <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
    
    <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="cloudy icon" class="weather-icon" />
    <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">
            ${Math.round(forecastDay.temp.max)}°</span>
        <span class="weather-forecast-temperature-min">
            ${Math.round(forecastDay.temp.min)}°</span>
    </div>
    </div>
  `;
  }

});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates)  {
console.log(coordinates);
let apiKey = "0c21c4770c785ce0b3d68a397aeae129";
let apiURL =  `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric `

axios.get(apiURL).then(displayForecast);
}

function displayWeather (response) {
  console.log(response.data);
let h1 = document.querySelector("h1");
h1.innerHTML = response.data.name;
document.querySelector("#temp-now").innerHTML = Math.round(response.data.main.temp);

document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = response.data.wind.speed;
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);
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

displayForecast();




