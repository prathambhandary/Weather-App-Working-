const apiKey = 'd99c4d405e32346a63bbbde3bef9d202'; // Replace with your OpenWeather API key

// Function to fetch weather data for a city
function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.error('Error fetching data:', error));
}

// Function to display the fetched weather data in the HTML
function displayWeather(data) {
  if (data.cod === 200) {
    document.querySelector('.place-name').textContent = `${data.name}, ${data.sys.country}`;
    document.querySelector('.temp-big').textContent = `${Math.round(data.main.temp)}°`;
    document.querySelector('.high-low').textContent = `High: ${Math.round(data.main.temp_max)}° • Low: ${Math.round(data.main.temp_min)}°`;
    document.querySelector('.big-seven').textContent = data.wind.speed;
    document.querySelector('.wind-type').textContent = `From ${getWindDirection(data.wind.deg)}`;
    document.querySelector('.temp-big').textContent = `${Math.round(data.main.temp)}°`;
    document.querySelector('.small-mph').textContent = 'mph';
    document.querySelector('.sunrise-time').textContent = convertTimestamp(data.sys.sunrise);
    document.querySelector('.sunset-time').textContent = convertTimestamp(data.sys.sunset);
    document.querySelector('#pressure-value').textContent = data.main.pressure;
    document.querySelector('#humidity-value').textContent = `${data.main.humidity}%`;
  } else {
    console.error('City not found');
  }
}

// Helper to convert wind direction in degrees to compass direction
function getWindDirection(degrees) {
  const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

// Helper to convert Unix timestamp to 24-hour time
function convertTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  }
  

// Event listener for form submission
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const city = document.querySelector('.search').value;
  fetchWeather(city);
});