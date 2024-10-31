function buttonClicked() {
  var city = document.getElementById("city_input").value;
  localStorage.setItem("lastSearchedCity", city);
  
  if (city.trim() === "") {
      document.getElementById("weather-info").innerHTML = "<p>Please enter a city name.</p>";
      return;
  }

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${city}&days=1`)
      .then((response) => response.json())
      .then((data) => {
          // Extract weather data
          var locationName = data.location.name;
          var region = data.location.region;
          var country = data.location.country;
          var localTime = data.location.localtime;
          var currentTemp = data.current.temp_c;
          var windSpeed = data.current.wind_kph;
          var humidity = data.current.humidity;
          var condition = data.current.condition.text;
          var icon = data.current.condition.icon;
          var chanceOfRain = data.forecast.forecastday[0].day.daily_chance_of_rain;
          var chanceOfSnow = data.forecast.forecastday[0].day.daily_chance_of_snow;
          var feelsLike = data.current.feelslike_c;
          var uvIndex = data.current.uv;
          var visibility = data.current.vis_km;
          var sunrise = data.forecast.forecastday[0].astro.sunrise;
          var sunset = data.forecast.forecastday[0].astro.sunset;

          // Update the weather information in the HTML
          document.querySelector('.temp').innerHTML = `${currentTemp}°C`;
          document.querySelector('.city').innerHTML = `${locationName}, ${region}, ${country}`;
          document.getElementById('local-time').innerHTML = `<h3>Local Time: ${localTime}</h3>`;
          document.querySelector('.humidity').innerHTML = `${humidity}%`;
          document.querySelector('.wind').innerHTML = `${windSpeed} km/h`;
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
          // Recommend activities based on weather conditions
          recommendActivities(currentTemp, windSpeed, chanceOfRain, chanceOfSnow, localTime, sunrise, sunset);
      })
      .catch((error) => {
          document.getElementById("weather-info").innerHTML = "<p>City not found. Please try again.</p>";
          console.error("Error fetching weather data:", error);
      });
}

function recommendActivities(temp, windSpeed, rainChance, snowChance, localTime, sunrise, sunset) {
  const recommendations = [];
  
  // Parse local time and sunrise/sunset times
  const localHour = new Date(localTime).getHours();
  const sunriseHour = new Date(sunrise).getHours();
  const sunsetHour = new Date(sunset).getHours();

  // Check if it's night time
  const isNightTime = localHour < sunriseHour || localHour > sunsetHour;

  // Check if it's too hot (above 30°C)
  const isTooHot = temp > 30;

  if (isNightTime || rainChance > 50 || isTooHot) {
      // If it's night time or raining heavily or too hot, display no activities
      displayActivities([]); 
      document.getElementById('activity-recommendations').innerHTML = '<h2>No activities recommended</h2>';
      return; 
  }

  // Add activity recommendations based on other conditions
  if (temp >= 15 && rainChance < 30 && windSpeed < 15) recommendations.push("Hiking");
  if (windSpeed > 5 && windSpeed < 25 && rainChance < 20) recommendations.push("Paragliding");
  if (snowChance > 50) recommendations.push("Skiing");
  if (temp >= 10 && rainChance < 20) recommendations.push("Biking");
  if (temp >= 10 && rainChance < 40) recommendations.push("Camping");
  if (temp >= 10 && rainChance < 30 && windSpeed < 20) recommendations.push("Fishing");
  if (temp >= 5 && windSpeed < 15 && rainChance < 20) recommendations.push("Hunting");
  if (temp >= 15 && windSpeed < 25 && rainChance < 20) recommendations.push("Rafting");
  if (temp >= 10 && rainChance < 20) recommendations.push("Birding");

  displayActivities(recommendations.slice(0, 2));
  localStorage.setItem('recommendations', JSON.stringify(recommendations));
}


function displayActivities(activities) {
    const activityContainer = document.getElementById('activity-recommendations');
    activityContainer.innerHTML = ''; 

    if (activities.length > 0) {
      const heading = document.createElement('h2');
      heading.innerText = 'Recommended Activities';
      activityContainer.appendChild(heading);
  }

    activities.forEach(activity => {
        const activityCard = document.createElement('div');
        activityCard.classList.add('activity-card');

        activityCard.innerHTML = `
            <p>${activity}</p>
            <button onclick="showActivityDetails('${activity}')">More Info</button>
        `;

        activityContainer.appendChild(activityCard);
    });
}

function showActivityDetails(activity) {
    const details = activityDetails[activity]; 

    if (details) {
        localStorage.setItem('selectedActivity', JSON.stringify(details));
        localStorage.setItem('activityName', activity);
        // Navigate to activities.html
        goToActivitiesPage();
    }
}

function goToActivitiesPage() {
    window.location.href = 'activities.html'; // Redirect to the activities page
}

function addItemToChecklist(item) {
    if (!checklist.includes(item)) {
        checklist.push(item);
        localStorage.setItem('checklist', JSON.stringify(checklist));
        displayChecklist();
    }
}

function displayChecklist() {
    var checklistHtml = checklist.map((item, index) => `
        <li>${item} <button onclick="removeItem(${index})">Remove</button></li>
    `).join('');
    document.getElementById('checklist').innerHTML = `<ul>${checklistHtml}</ul>`;
}

function removeItem(index) {
    checklist.splice(index, 1);
    localStorage.setItem('checklist', JSON.stringify(checklist));
    displayChecklist();
}

function goToChecklist() {
    window.location.href = 'checklist.html'; // Adjust to checklist page
}

// Load checklist from localStorage on page load
window.onload = function() {
  const storedWeatherData = localStorage.getItem('weatherData');
  const storedRecommendations = localStorage.getItem('recommendations');

  if (storedWeatherData) {
      const data = JSON.parse(storedWeatherData);
      displayWeather(data);
  }

  if (storedRecommendations) {
      const recommendations = JSON.parse(storedRecommendations);
      displayActivities(recommendations.slice(0, 2));
  }

  // Load checklist from localStorage on page load
  const storedChecklist = localStorage.getItem('checklist');
  if (storedChecklist) {
      checklist = JSON.parse(storedChecklist);
      displayChecklist();
  }
};

