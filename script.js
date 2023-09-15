require("dotenv").config();

const apikey = process.env.API_KEY; // my api key from OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('search').value;
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Could not fetch weather data. Please try again later.');
    }
}

function displayWeatherData(data) {
    const cityName = document.getElementById('city-name');
    const weatherData = document.getElementById('weather-data');

    cityName.textContent = data.name;
    weatherData.innerText = `
        Temperature: ${data.main.temp}°C<br>
        Description: ${data.weather[0].description}<br>
        Humidity: ${data.main.humidity}%<br>
        Wind Speed: ${data.wind.speed} m/s
    `;
}
