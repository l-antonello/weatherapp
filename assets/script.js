var apiKey = 'd59fba86ab42879a295331b34b8a2417';
var searchForm = document.getElementById('search-form');
var locationInput = document.getElementById('location-input');
var weatherList = document.getElementById('weather-list');
var searchHistory = document.getElementById('search-history');

// Listen for form submit
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  var location = locationInput.value;
  var weatherData = await getWeatherData(location);
  renderWeatherData(weatherData);

  // Store search location in local storage
  localStorage.setItem(location, true);

  // Create and add button to search history
  var button = document.createElement('button');
  button.textContent = location;
  button.addEventListener('click', async () => {
    var weatherData = await getWeatherData(location);
    renderWeatherData(weatherData);
  });
  searchHistory.appendChild(button);
});

// Load previously searched locations from local storage
Object.keys(localStorage).forEach(async (key) => {
  if (/^[A-Z]/.test(key)) { // Test if key starts with capital letter (assumes locations are capitalized)
    var button = document.createElement('button');
    button.textContent = key;
    button.addEventListener('click', async () => {
      var weatherData = await getWeatherData(key);
      renderWeatherData(weatherData);
    });
    searchHistory.appendChild(button);
  }
});

async function getWeatherData(location) {
  var response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`);
  var data = await response.json();
  return data;
}

function renderWeatherData(weatherData) {
    weatherList.innerHTML = '';
  
    weatherData.forEach(async (location, index) => {
      var weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=imperial`);
      var weatherData = await weatherResponse.json();
  
      var weatherCard = document.createElement('div');
      weatherCard.classList.add('weather-card');
      
      var date = document.createElement('p');
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + index);
      date.textContent = currentDate.toDateString();
      weatherCard.appendChild(date);
  
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
  
      var weatherIcon = document.createElement('img');
      weatherIcon.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
      weatherIcon.alt = weatherData.weather[0].description;
      weatherCard.appendChild(weatherIcon);
      
      weatherList.appendChild(weatherCard);
    });
  }
  
