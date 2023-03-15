const apiKey = "90112e623e1840a2c1391b79bd2c9ed0";
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const weatherInfo = document.getElementById("weather-info");

searchBtn.addEventListener("click", async () => {
  const city = searchInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
});

function displayWeather(data) {
  const { name, main, weather } = data;
  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>${weather[0].description}</p>
    <p>Temperature: ${main.temp} °C</p>
    <p>Feels like: ${main.feels_like} °C</p>
    <p>Humidity: ${main.humidity}%</p>
  `;
}

