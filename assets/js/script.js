//Smooth scroll on how-to
// Look into way to make this just CSS or HTML if possible. 
document.querySelector("#how-to-link").addEventListener("click", function (event) {
  event.preventDefault();

  const targetElement = document.querySelector(".card-section");

  targetElement.scrollIntoView({ behavior: "smooth" });
});


function fetchWeatherData(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  // PUT IN WEATHER, TEMPERATURE, AND WIND SPEED  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const windSpeedMeters = data.wind.speed;
      const temperatureFahrenheit = data.main.temp;
      const humidity = data.main.humidity;
      const weatherConditions = data.weather[0].description;

      console.log("Wind Speed:", windSpeedMeters);
      console.log("Temperature:", temperatureFahrenheit);
      console.log("Humidity:", humidity);
      console.log("Weather Conditions:", weatherConditions);

      document.querySelector(".wind-data").textContent = `Wind: ${windSpeedMeters.toFixed(2)} m/s`;
      document.querySelector(".temp-data").textContent = `${temperatureFahrenheit.toFixed(2)} °F`;
      document.querySelector(".humidity-data").textContent = `Humidity: ${humidity}%`;
      document.querySelector(".weather-description-data").textContent = `${weatherConditions}`;

      var weather = data.weather[0].main;
            
if (weather === 'Clouds'){
document.querySelector('.weather-icon').innerHTML = `<img src="./assets/images/weatherIcons/overcast.svg" alt="">`;
} else if (weather === 'Rain'){
document.querySelector('.weather-icon').innerHTML = `<img src="./assets/images/weatherIcons/rainy.svg" alt="">`;
} else if (weather === 'Clear'){
document.querySelector('.weather-icon').innerHTML = `<img src="./assets/images/weatherIcons/sunny.svg" alt="">`;           
} else if (weather === 'Snow'){
document.querySelector('.weather-icon').innerHTML = `<img src="./assets/images/weatherIcons/snow.svg" alt="">`;
}
       
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

const apiKey = '3345d74a687b8041b547bb45348451f6';
const city = 'Davis';
fetchWeatherData(city, apiKey);



