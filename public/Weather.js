const list = document.querySelector('.list');
const tempr = document.querySelector('.temp');
const coord = document.querySelector('.coord');
const descr = document.querySelector('.descr');
const other = document.querySelector('.other');
const temperature = document.querySelector('#temperature');
const long = document.querySelector('#long');
const lat = document.querySelector('#lat');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#windSpeed');
const pressure = document.querySelector('#pressure');
const description = document.querySelector('#description');
const pictureDiv = document.querySelector('.other');
const city = document.querySelector('#city');

export default class Weather {

  constructor(city = "Perugia", lat, lon, apiKey = '8654243a721ac45727b1a63b2e4082a7'){
    this.city = city.toLowerCase().trim();
    this.appid = apiKey;
    this.prefUrl = "http://api.openweathermap.org/data/2.5/";
    this.url = `${this.prefUrl}weather?q=${this.city}&units=metric&appid=${this.appid}`;
    this.lat = lat;
    this.lon = lon;
    this.sunr = 0;
    this.suns = 0;
    this.currentTime = Date.now().toString().substring(0,10);
    if (lat && lon) {
      this.url = `${this.prefUrl}weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.appid}`
    }
  }

  getWeather() {
    let myRequest = new Request(this.url);

    fetch(myRequest, {
      "method": "GET",
      "headers": {
          "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
          "x-rapidapi-key": "24f63a8aa6msh0c74994cbae8c4fp1940c3jsne2b0d7fa3a6a"
      }
    }).then(data => {
      if(!data.ok){
        document.querySelector(".list").style.display = "none";
        document.querySelector(".error").style.display = "block";
        document.querySelector("#city").style.display = "none";
        throw Error(data.status)
      }
      return  data.json().then( data => {
        const {
            main : { temp: temp },
            main : { temp_max: tempMax },
            main : { temp_min: tempMin },
            coord : { lon: lon },
            coord : { lat: lat },
            main : { humidity: humidity },
            weather : [{ main: desc}],
            wind : { speed: windSpeed },
            main : { pressure: pressure },
            name : city,
            sys : { sunset : sunset },
            sys : { sunset : sunrise }
        } = data;
        let arrayWeather = [
            this.floorNumber(temp),
            this.floorNumber(tempMax),
            this.floorNumber(tempMin),
            lon,
            lat,
            humidity,
            desc,
            windSpeed,
            pressure,
            city
        ];
        if(this.populateData(arrayWeather) && arrayWeather[0]) {
          document.querySelector(".list").style.display = "flex";
          document.querySelector(".error").style.display = "none";
          document.querySelector("#city").style.display = "block";
          let date = new Date();
          let currentHour = date.getHours();
          let isDay = currentHour > 5 && currentHour <= 20;
          // Date.now().toString().substring(0,10) < sunset && Date.now().toString().substring(0,10) < sunrise;
          this.setPicture(desc, isDay);
        }
      });
    })
    .catch(err => {
      console.log("Something went wrong!")
      console.log(err)
      });

  }

  populateData(arrayOfData) {
    temperature.innerHTML = arrayOfData[0];
    long.innerHTML = arrayOfData[3];
    lat.innerHTML = arrayOfData[4];
    humidity.innerHTML = arrayOfData[5];
    description.innerHTML = arrayOfData[6];
    windSpeed.innerHTML = arrayOfData[7];
    pressure.innerHTML = arrayOfData[8];
    city.innerHTML = arrayOfData[9];
    return true;
  }

  floorNumber(num) {
    return Math.floor(num);
  }

  setPicture(desc, day) {
    let isDay = day;
    switch (desc) {
      case "Clouds":
        pictureDiv.className = isDay ? 'other clouds' : 'other moon-cl';
        break;
      case "Clear":
        pictureDiv.className = isDay ? 'other sun' : 'other moon';
        break;
      case "Snow":
        pictureDiv.className = 'other snow';
        break;
      case "Rain":
        pictureDiv.className = isDay ? 'other sun-rain' : 'other moon-storm';
        break;
      case "Drizzle":
        pictureDiv.className = 'other rain';
        break;
      case "Thunderstorm":
        pictureDiv.className = isDay ? 'other storm' : 'other moon-storm';
        break;
      case "Haze" || "Mist" || "Dust" || "Fog" || "Sand" || "Ash" || "Squall":
        pictureDiv.className = 'other mist';
        break;
      default:
        pictureDiv.className = isDay ? 'other sun' : 'other moon';
    }
  }

}
