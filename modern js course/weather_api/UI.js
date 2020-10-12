// select elements
class UI {
  constructor() {

    this.location = document.getElementById('w-location')
    this.desc = document.getElementById('w-desc')
    this.humidity = document.getElementById('w-humidity')
    this.temp = document.getElementById('w-temp')
    this.feelsLike = document.getElementById('w-feels-like')
    this.wind = document.getElementById('w-wind')
    this.icon = document.getElementById('w-icon')
  }
  
  displayWeather(weather) {
    this.location.innerText = `${weather.weatherData.name}, ${weather.weatherData.sys.country}`
    this.desc.innerText = weather.weatherData.weather[0].description 
    this.humidity.innerText = `Humidity: ${Math.round(weather.weatherData.main.humidity)}%`
    this.temp.innerText = `${Math.round(weather.weatherData.main.temp)}°`
    this.feelsLike.innerText = `Feels like: ${Math.round(weather.weatherData.main.feels_like)}°`
    this.wind.innerText = `Wind Speed: ${Math.round(weather.weatherData.wind.speed)} mph`
    this.icon.setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${weather.weatherData.weather[0].icon}@2x.png`
    )
  }
}
