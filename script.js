const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('#search-btn');
const weatherIcon = document.querySelector('.weather-icon');
const city = document.querySelector('.city');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');

const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

const getWeatherData = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error);
    alert('Unable to get weather data for the specified city.');
  }
};

const updateUI = (data) => {
  weatherIcon.style.backgroundImage = `url('https://openweathermap.org/img/w/${data.weather[0].icon}.png')`;
  city.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = `${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} km/h`;
};

searchButton.addEventListener('click', async () => {
  const city = searchInput.value.trim();
  if (city) {
    const data = await getWeatherData(city);
    if (data) {
      updateUI(data);
      searchInput.value = '';
    }
  }
});

searchInput.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    const city = searchInput.value.trim();
    if (city) {
      const data = await getWeatherData(city);
      if (data) {
        updateUI(data);
        searchInput.value = '';
      }
    }
  }
});
