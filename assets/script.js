var apiKey = 'd59fba86ab42879a295331b34b8a2417';
var searchForm = document.getElementById('search-form');
var locationInput = document.getElementById('location-input');
var weatherList = document.getElementById('weather-list');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    var location = locationInput.value;
    var weatherData = await getWeatherData(location);
    renderWeatherData(weatherData);
});

async function getWeatherData(location) {
    var response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`);
    var data = await response.json();
    return data;
}

function renderWeatherData(weatherData) {
    weatherList.innerHTML = '';
    weatherData.forEach(async (location) => {
        var weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`);
        var weatherData = await weatherResponse.json();

        var weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');

        var cityName = document.createElement('h2');
        cityName.textContent = location.name;
        weatherCard.appendChild(cityName);

        var temperature = document.createElement('p');
        temperature.textContent = `Temperature: ${weatherData.main.temp} degree F`;
        weatherCard.appendChild(temperature);

        var windSpeed = document.createElement('p');
        windSpeed.textContent = `Wind Speed: ${weatherData.wind.speed} m/s`;
        weatherCard.appendChild(windSpeed);

        var humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
        weatherCard.appendChild(humidity);

        weatherList.appendChild(weatherCard);
    });
}
