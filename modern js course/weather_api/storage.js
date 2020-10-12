class Storage {
  constructor() {
    this.city = city
    this.country = country
    this.defaultCity = 'Cartagena'
    this.defaultCountry = 'co'
  }

  getLocationData() {
    localStorage.getItem('city') === null
      ? (this.city = this.defaultCity)
      : (this.city = localStorage.getItem('city'))

    localStorage.getItem('country') === null
      ? (this.country = this.defaultCountry)
      : (this.country = localStorage.getItem('country'))

    return {
      city: this.city,
      country: this.country
    }
  }

  setLocationData(city, country) {
    localStorage.setItem('city', city)
    localStorage.setItem('country', country)
  }
}

