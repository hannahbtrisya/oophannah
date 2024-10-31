function addFavoriteCity(city) {
    // Get current favorite cities from local storage, or initialize as empty array
    const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    
    // Check if city is already in favorites
    if (!favoriteCities.includes(city)) {
        favoriteCities.push(city); // Add city to array
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities)); // Save to local storage
        alert(`Added ${city} to your favorites!`);
    } else {
        alert(`${city} is already in your favorites.`);
    }
}
function removeFavoriteCity(city) {
    const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    
    // Find the city in the array
    const cityIndex = favoriteCities.indexOf(city);
    if (cityIndex !== -1) {
        favoriteCities.splice(cityIndex, 1); // Remove city from array
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities)); // Save updated list
        alert(`Removed ${city} from your favorites.`);
    } else {
        alert(`${city} is not in your favorites.`);
    }
}
function displayFavoriteCities() {
    const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    const favoriteList = document.getElementById('favoriteCitiesList');
    favoriteList.innerHTML = ''; // Clear existing list

    favoriteCities.forEach(city => {
        const cityCard = document.createElement('li');
        cityCard.className = 'favorite-city-card';

        const cityName = document.createElement('span');
        cityName.className = 'city-name';
        cityName.textContent = city;

        // Fetch and display weather info when city name is clicked
        cityName.onclick = () => fetchWeatherData(city);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Remove';
        deleteButton.onclick = () => removeFavoriteCity(city);

        cityCard.appendChild(cityName);
        cityCard.appendChild(deleteButton);
        favoriteList.appendChild(cityCard);
    });
}
function fetchWeatherData(city) {
    
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${city}&days=1`)
        .then((response) => response.json())
        .then((data) => {
            // Extract weather data
            const locationName = data.location.name;
            const region = data.location.region;
            const country = data.location.country;
            const localTime = data.location.localtime;
            const currentTemp = data.current.temp_c;
            const windSpeed = data.current.wind_kph;
            const humidity = data.current.humidity;
            const condition = data.current.condition.text;
            const icon = data.current.condition.icon;
            const chanceOfRain = data.forecast.forecastday[0].day.daily_chance_of_rain;
            const chanceOfSnow = data.forecast.forecastday[0].day.daily_chance_of_snow;
            const feelsLike = data.current.feelslike_c;
            const uvIndex = data.current.uv;
            const visibility = data.current.vis_km;
            const sunrise = data.forecast.forecastday[0].astro.sunrise;
            const sunset = data.forecast.forecastday[0].astro.sunset;

            // Update the weather information in the HTML
            document.querySelector('.temp').innerHTML = `${currentTemp}°C`;
            document.querySelector('.city').innerHTML = `${locationName}, ${region}, ${country}`;
            document.getElementById('local-time').innerHTML = `<h3>Local Time: ${localTime}</h3>`;
            document.getElementById('weather-info').innerHTML = `
                <div class="weather-details">
                    <div class="column">
                        <h3>Current Condition:</h3>
                        <p>${condition}</p>
                        <img src="https:${icon}" alt="${condition}">
                        <p>Feels Like: ${feelsLike}°C</p>
                        <p>UV Index: ${uvIndex}</p>
                    </div>
                    <div class="column">
                        <h3>Weather Statistics:</h3>
                        <p>Visibility: ${visibility} km</p>
                        <p>Sunrise: ${sunrise}</p>
                        <p>Sunset: ${sunset}</p>
                        <p>Chance of Rain: ${chanceOfRain}%</p>
                        <p>Chance of Snow: ${chanceOfSnow}%</p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to retrieve weather data. Please try again.');
        });
}

function goToChecklist() {
    window.location.href = 'checklist.html'; // Adjust to checklist page
}
function goBack() {
    window.history.back(); // Go back to the previous page 
}
  