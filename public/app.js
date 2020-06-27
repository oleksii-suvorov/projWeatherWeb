  import Weather from './Weather.js';
document.addEventListener("DOMContentLoaded", function() {
  let body = document.getElementsByTagName("body")[0];
  let headers = document.getElementsByClassName("header")[0];
  let date = new Date();
  let currentHour = date.getHours();
  let cityTitle = document.querySelector('#city');
  let timesToPlay = 1;
  let isDay = currentHour > 4 && currentHour <= 20;

  if(isDay) {
    body.className = "";
  } else {
    body.className = "night";
  }

  Array.from(document.getElementsByTagName("input")).forEach( input => {
    input.addEventListener("keydown", event => {
        let button = event.which;
        if(button != 13 && button != 17 && button != 18 && button != 16 && button != 9 && button != 20 && button != 27) {
          playPrint();
        }
    })
    }, true);



  document.querySelector(".forms button").addEventListener("click", e => {
    e.preventDefault();
    const formEl = document.forms.WeatherForm;
    const formData = new FormData(formEl);
    let city = formData.get('city');
    let longitude = formData.get('long');
    let latitude = formData.get('lat');

    const weather = new Weather(city, latitude, longitude);
    weather.getWeather();

    if(isDay) {
      headers.className = 'header';
      document.querySelector(".header h1").style.opacity = "1";
      cityTitle.className = '#city';
      body.className = "";
      playSent();
    } else {
        if(timesToPlay === 0) {
          playSent();
        } else {
          playElectricity();
        }
      headers.className = 'nightText';
    }
    document.querySelector('.getWeather').reset();
  })

  function playElectricity(){
    if (timesToPlay) {
      var audio = new Audio("sounds/electricity.wav");
      audio.play();
      timesToPlay--;
    }
  }
  function playPrint(){
      var audio = new Audio("sounds/print.wav");
      audio.play();
  }
  function playSent(){
      var audio = new Audio("sounds/send.wav");
      audio.play();
  }
})
