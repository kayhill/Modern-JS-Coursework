class Weather {
  constructor(city, country) {
    this.apiKey = 'd2edfe484190f7b1e0904f428f742e28'
    this.city = city
    this.country = country
    
  }

  async getWeather() {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=imperial&appid=${this.apiKey}`
    )

    const weatherData = await weatherResponse.json()
    return {
      weatherData
    }
  }

  changeLocation(city, country) {
    this.city = city
    this.country = country
  }
}