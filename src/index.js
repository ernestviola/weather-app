/*
1. request to get the users location
2. fetch the weather data based on the users location
2.5 create some functions that make it easy to access the weather data
 - temp functions 
  async getFahrenheit() 
  async getCelsius()
  ? return an array to load for the entire day
 - sunrise and sunset
  async getSunrise()
  async getSunset()

3. load the users data into some of the elements by awaiting until we get the return values
*/

import "./styles.css";
import { getCity, getLatLong } from "./components/location";
import { getWeatherDataByLatLong } from "./components/weather";

await loadData();

async function loadData() {
  const pos = await getLatLong();
  const cityNameData = getCity(pos.latitude, pos.longitude);
  const weatherData = await getWeatherDataByLatLong(
    pos.latitude,
    pos.longitude,
  );
  const currentCityEl = document.getElementById("current-city-value");
  const currentTempEl = document.getElementById("current-temperature-value");
  const weeklyWeatherEl = document.querySelector(".weekly-weather");

  Promise.all([cityNameData, weatherData]).then((arr) => {
    const cityName = arr[0];
    const weatherData = arr[1];

    currentCityEl.innerText = cityName;
    currentTempEl.innerText = weatherData.currentConditions.temp;
    for (const day of weatherData.days) {
      weeklyWeatherEl.appendChild(createDayForecastElement(day));
    }
  });
}

function createDayForecastElement(day) {
  console.log(day);
  let dayData = {
    high: day.tempmax,
    low: day.tempmin,
    icon: day.icon,
    date: new Date(day.datetime).toLocaleDateString(undefined, {
      month: "2-digit",
      day: "2-digit",
    }),
  };

  const forecastEl = document.createElement("div");
  forecastEl.className = "day-forecast";

  const tempDateEl = document.createElement("span");
  tempDateEl.className = "forecast-date";
  tempDateEl.innerText = dayData.date;

  const tempHighEl = document.createElement("span");
  tempHighEl.className = "forecast-high";
  tempHighEl.innerText = dayData.high;

  const weatherIconEl = document.createElement("span");
  weatherIconEl.className = "forecast-icon";
  weatherIconEl.innerText = dayData.icon;

  const tempLowEl = document.createElement("span");
  tempLowEl.className = "forecast-low";
  tempLowEl.innerText = dayData.low;

  forecastEl.appendChild(tempDateEl);
  forecastEl.appendChild(tempHighEl);
  forecastEl.appendChild(weatherIconEl);
  forecastEl.appendChild(tempLowEl);

  return forecastEl;
}

function createCurrentConditionElement() {}
