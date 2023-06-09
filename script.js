const apiKey = "90112e623e1840a2c1391b79bd2c9ed0";


const weatherInfo = document.getElementById("weather-info");

async function getWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const weatherIcon = weather[0].icon;
  const weatherDescription = weather[0].description;
  const iconURL = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

  weatherInfo.innerHTML = `
    <div class="weather-icon text-center mb-3">
      <img src="${iconURL}" alt="${weatherDescription}">
    </div>
    <h2>${name}</h2>
    <p>${weatherDescription}</p>
    <p>Temperature: ${main.temp} °C</p>
    <p>Feels like: ${main.feels_like} °C</p>
    <p>Humidity: ${main.humidity}%</p>
  `;
}

navigator.geolocation.getCurrentPosition(async (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherData(lat, lon);
});
