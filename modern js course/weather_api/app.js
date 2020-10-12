
const storage = new Storage();

const weatherLocation = storage.getLocationData();

const forecast = new Weather(weatherLocation.city, weatherLocation.country);

const ui = new UI;

const changeBtn = document.getElementById('w-change-btn');

//get weather on dom load
document.addEventListener('DOMContentLoaded', getWeather);
changeBtn.addEventListener('click', changeLocation);


function getWeather() {
    forecast.getWeather()
        .then(results => {
            ui.displayWeather(results);
        })
        .catch(err => console.log(err))
}

function changeLocation() {
  const newCity = document.getElementById('city').value;
  const newCountry = document.getElementById('country').value;

  if (newCity === '' || newCountry === '' || newCountry.length > 2) {
    alert('Please enter required information. Use two character country code')
  } else {
    storage.setLocationData(newCity, newCountry);
    forecast.changeLocation(newCity, newCountry);
  
    getWeather();

  }
}
