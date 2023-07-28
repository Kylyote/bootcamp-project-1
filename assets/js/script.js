// Adding potential variables to use to access the document elements
let addressCity = document.querySelector(".text");
let addressState = document.querySelector(".state-dropdown");
let addressCode = document.querySelector(".postal-code");
let distanceRadius = document.querySelector("#distanceRadius");
let submitBtn = document.querySelector("#searchBtn");
let distanceRadiusChange = 0;

//Smooth scroll on how-to
document.getElementById("how-to-link").addEventListener("click", function (event) {
  event.preventDefault();

  const targetElement = document.getElementById("class-card-section");

  targetElement.scrollIntoView({ behavior: "smooth" });
});

function fetchWeatherData(city, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}units=imperial`;

  // PUT IN WEATHER, TEMPERATURE, AND WIND SPEED  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const windSpeedMeters = data.wind.speed;
      const temperatureFahrenheit = data.main.temp;
      const humidity = data.main.humidity;
      const weatherConditions = data.weather[0].description;

      console.log("Wind Speed:", windSpeedMeters);
      console.log("Temperature:", temperatureFahrenheit);
      console.log("Humidity:", humidity);
      console.log("Weather Conditions:", weatherConditions);

      document.getElementById("windSpeed").textContent = `Wind Speed: ${windSpeedMeters.toFixed(2)} m/s`;
      document.getElementById("temperature").textContent = `Temperature: ${temperatureFahrenheit.toFixed(2)} F`;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
      document.getElementById("weatherConditions").textContent = `Weather Conditions: ${weatherConditions}`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Block of code copied from Google's maps platform
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

const apiKey = 'de499e2ee729b13656959965fb76984a';
const city = 'Sacramento';
fetchWeatherData(city, apiKey);

initMap();