const activityDetails = {
  Hiking: {
    description: "Explore scenic trails and enjoy nature.",
    preparation: [
      "Wear comfortable shoes", 
      "Bring water", 
      "Bring snacks"
    ],
    difficulty: "Easy",
    idealConditions: "Clear weather, mild temperatures",
    bestSeason: "Spring to Fall",
    imageUrl:"hiking.jpg"
  },
  Paragliding: {
    description: "Experience the thrill of flying over landscapes.",
    preparation: [
      "Wear a helmet", 
      "Wear comfortable clothing", 
      "Check weather conditions"
    ],
    difficulty: "Medium",
    idealConditions: "Light winds, clear skies",
    bestSeason: "Summer and Fall",
    imageUrl:"paragliding.jpg"
  },
  Skiing: {
    description: "Glide down snowy slopes and enjoy winter sports.",
    preparation: [
      "Wear ski gear", 
      "Bring safety equipment"
    ],
    difficulty: "Medium to Hard",
    idealConditions: "Snowy weather, low winds",
    bestSeason: "Winter",
    imageUrl:"skiing.jpg"
  },
  Biking: {
    description: "Ride through trails or roads, enjoying the scenery.",
    preparation: [
      "Wear a helmet", 
      "Bring water", 
      "Bring tools for bike maintenance"
    ],
    difficulty: "Easy to Medium",
    idealConditions: "Mild weather",
    bestSeason: "Spring to Fall",
    imageUrl:"biking.jpg"
  },
  Camping: {
    description: "Stay overnight in tents and enjoy nature.",
    preparation: [
      "Bring a tent", 
      "Bring sleeping bags", 
      "Bring food supplies"
    ],
    difficulty: "Easy",
    idealConditions: "Dry weather, comfortable temperatures",
    bestSeason: "Spring to Fall",
    imageUrl:"camping.jpg"
  },
  Fishing: {
    description: "Relax by water and catch fish.",
    preparation: [
      "Bring fishing gear", 
      "Bring licenses"
    ],
    difficulty: "Easy to Medium",
    idealConditions: "Calm weather, low winds",
    bestSeason: "Spring to Fall",
    imageUrl:"fishing.jpg"
  },
  Hunting: {
    description: "Hunt for game in natural habitats.",
    preparation: [
      "Wear appropriate clothing", 
      "Check hunting regulations"
    ],
    difficulty: "Medium to Hard",
    idealConditions: "Cool weather",
    bestSeason: "Fall and Winter",
    imageUrl:"hunting.jpg"
  },
  Rafting: {
    description: "Navigate through rivers and enjoy the adventure.",
    preparation: [
      "Wear a life jacket", 
      "Bring safety equipment"
    ],
    difficulty: "Medium to Hard",
    idealConditions: "Stable water levels, clear weather",
    bestSeason: "Spring and Summer",
    imageUrl:"rafting.jpeg"
  },
  Birding: {
    description: "Observe and identify various bird species.",
    preparation: [
      "Bring binoculars", 
      "Bring a field guide"
    ],
    difficulty: "Easy",
    idealConditions: "Clear weather, quiet surroundings",
    bestSeason: "Spring and Fall",
    imageUrl:"birding.jpg"
  }
};
function goToActivitiesPage() {
  window.location.href = 'activities.html';
}

document.addEventListener("DOMContentLoaded", () => {
  const selectedActivity = JSON.parse(localStorage.getItem('selectedActivity'));
  const activityName = localStorage.getItem('activityName');

  if (selectedActivity) {
    const detailsElement = document.getElementById('activity-details');
    detailsElement.innerHTML = `
      <h3>${activityName} Details</h3>
      <img src="${selectedActivity.imageUrl}" alt="${activityName}" class="activity-image" />
      <p><strong>Description:</strong> ${selectedActivity.description}</p>
      <p><strong>Preparation:</strong></p>
      <ul>
        ${selectedActivity.preparation.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <p><strong>Difficulty:</strong> ${selectedActivity.difficulty}</p>
      <p><strong>Ideal Conditions:</strong> ${selectedActivity.idealConditions}</p>
      <p><strong>Best Season:</strong> ${selectedActivity.bestSeason}</p>
    `;
  } else {
    document.getElementById('activity-details').innerHTML = '<p>No activity selected.</p>';
  }
});

function goBack() {
    window.history.back(); // Go back to the previous page 
  }
  
window.onload = function() {
  const lastSearchedCountry = localStorage.getItem('lastSearchedCountry');
  const lastWeatherInfo = localStorage.getItem('lastWeatherInfo');

  if (lastSearchedCountry && lastWeatherInfo) {
    // Display the last searched country and its weather info
    document.getElementById('country-display').innerText = `Last searched country: ${lastSearchedCountry}`;
    
    document.getElementById('weather-info-display').innerText = lastWeatherInfo;
  }
};
function goToChecklist() {
  window.location.href = 'checklist.html'; // Adjust to checklist page
}
