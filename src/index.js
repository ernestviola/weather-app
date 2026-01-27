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
  const cityName = getCity(pos.latitude, pos.longitude);
  const weatherData = getWeatherDataByLatLong(pos.latitude, pos.longitude);

  console.log(await weatherData);
  // const weatherData = await getWeatherData(pos);
  // console.log(weatherData);
  // const weatherDescription = document.getElementById("weather__description");
  // weatherDescription.innerText = weatherData.description;
}

function createDayForecastElement() {}

function createCurrentConditionElement() {}
