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

loadData();

async function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      (error) => reject(error),
    );
  });
}

async function getWeatherData(location) {
  let locationString = "";
  if (typeof location === "object") {
    // geolocation object
    locationString = `${location.coords.latitude},${location.coords.longitude}`;
  } else {
    // string object from user
  }
  locationString = encodeURIComponent(locationString);
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationString}?unitGroup=us&key=EKV7KAENKYL3K8F82GTZXQ77W&contentType=json`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("Failed to fetch");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function getCityName(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
    );
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("Failed to fetch");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function loadData() {
  const pos = await getUserLocation();
  const cityName = await getCityName(pos.coords.latitude, pos.coords.longitude);
  console.log(cityName);
  const weatherData = await getWeatherData(pos);
  console.log(weatherData);
  const weatherDescription = document.getElementById("weather__description");
  weatherDescription.innerText = weatherData.description;
}

function createDayForecastElement() {}

function createCurrentConditionElement() {}
