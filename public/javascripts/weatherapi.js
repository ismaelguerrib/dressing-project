var weatherBox = document.getElementById("weather-box");

///// Fonctions Generique ////

function fromKtoC(k) {
  return parseInt(k - 273.15);
}

function getWeather() {
  axios
    .get(
      "http://api.openweathermap.org/data/2.5/weather?id=6455259&appid=c2e55112c6c0f6ad92cb23e454a5f0c5"
    )
    .then(apiRes => {
      console.log(apiRes);
      const weatherDescription = apiRes.data.weather[0].description;
      const temperature = fromKtoC(apiRes.data.main.temp);
      const temperatureMax = fromKtoC(apiRes.data.main.temp_max);
      const temperatureMin = fromKtoC(apiRes.data.main.temp_min);
      weatherBox.insertAdjacentHTML(
        "beforeend",
        `<div class="api-container"><p class="weatherDescription">Today's weather : ${weatherDescription}</p><p class="temperature">Current Temperature : ${temperature}</p><p class="temperatureMax">Maximum : ${temperatureMax}</p><p class="temperatureMin">Minimum : ${temperatureMin}</p></div>`
      );
    })
    .catch(err => console.log(err));
}

if (weatherBox) {
  getWeather();
}
