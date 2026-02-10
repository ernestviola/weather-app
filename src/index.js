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
import weatherIcons from "./components/weatherIcons";

let fahrenheit = true; // maybe save in localStorage?

await initialLoad();

const degreeButton = document.getElementById("degree-button");
degreeButton.addEventListener("click", (e) => {
  e.preventDefault();
  fahrenheit = !fahrenheit;
  hideNonActiveTemps();
});

function hideNonActiveTemps() {
  const fahrenheitElArr = Array.from(
    document.getElementsByClassName("fahrenheit-temp"),
  );
  const celsiusElArr = Array.from(
    document.getElementsByClassName("celsius-temp"),
  );
  if (fahrenheit) {
    // hide celsius
    // unhide fahrenheit
    fahrenheitElArr.forEach((el) => {
      el.hidden = false;
    });
    celsiusElArr.forEach((el) => {
      el.hidden = true;
    });
  } else {
    //
    fahrenheitElArr.forEach((el) => {
      el.hidden = true;
    });
    celsiusElArr.forEach((el) => {
      el.hidden = false;
    });
  }
}

async function loadCityBySearch() {}

async function initialLoad() {
  const pos = await getLatLong();
  const cityNameData = getCity(pos.latitude, pos.longitude);
  const weatherData = getWeatherDataByLatLong(pos.latitude, pos.longitude);

  const currentCityEl = document.getElementById("current-city-value");
  const weeklyWeatherEl = document.querySelector(".weekly-weather");

  Promise.all([cityNameData, weatherData]).then((arr) => {
    const cityName = arr[0];
    const weatherData = arr[1];

    currentCityEl.innerText = cityName;
    populateCurrentConditionsEl(weatherData.currentConditions);
    for (const day of weatherData.days.slice(1)) {
      weeklyWeatherEl.appendChild(createDayForecastElement(day));
    }
    hideNonActiveTemps();
  });
}

function populateCurrentConditionsEl(currentConditions) {
  const root = document.getElementById("root");
  root.style.background = `radial-gradient(
  #FFFFFF,
  ${weatherIcons[currentConditions.icon].color}
  )`;

  const currentConditionsEl = document.getElementById("current-conditions");

  const currentTempFahrenheitEl = document.createElement("span");
  currentTempFahrenheitEl.innerText = `${currentConditions.temp} F°`;
  currentTempFahrenheitEl.classList.add("fahrenheit-temp");

  const currentTempCelsiusEl = document.createElement("span");
  currentTempCelsiusEl.innerText = `${fahrenheitToCelsius(currentConditions.temp)} C°`;
  currentTempCelsiusEl.classList.add("celsius-temp");

  const currentIcon = document.createElement("img");
  currentIcon.src = weatherIcons[currentConditions.icon].icon;
  currentIcon.className = "current-conditions-icon";

  currentConditionsEl.appendChild(currentTempCelsiusEl);
  currentConditionsEl.appendChild(currentTempFahrenheitEl);
  currentConditionsEl.appendChild(currentIcon);

  return true;
}

function fahrenheitToCelsius(f) {
  return (((f - 32) * 5) / 9).toFixed(1);
}

function createDayForecastElement(day) {
  const dateArr = day.datetime.split("-");

  const date = new Date(
    dateArr[0],
    Number(dateArr[1]) - 1,
    dateArr[2],
  ).toLocaleDateString(undefined, {
    month: "numeric",
    day: "numeric",
  });

  let dayData = {
    high: day.tempmax,
    low: day.tempmin,
    icon: day.icon,
    date,
  };

  const forecastEl = document.createElement("div");
  forecastEl.className = "day-forecast";
  forecastEl.style.backgroundColor = weatherIcons[dayData.icon].color;

  const tempDateEl = document.createElement("span");
  tempDateEl.className = "forecast-date";
  tempDateEl.innerText = dayData.date;

  const tempHighFahrenheitEl = document.createElement("span");
  tempHighFahrenheitEl.className = "forecast-high";
  tempHighFahrenheitEl.innerText = dayData.high + " F°";
  tempHighFahrenheitEl.classList.add("fahrenheit-temp");

  const tempHighCelsiusEl = document.createElement("span");
  tempHighCelsiusEl.className = "forecast-high";
  tempHighCelsiusEl.innerText = fahrenheitToCelsius(dayData.high) + " C°";
  tempHighCelsiusEl.classList.add("celsius-temp");

  const weatherIconEl = document.createElement("img");
  weatherIconEl.className = "forecast-icon";
  weatherIconEl.src = weatherIcons[dayData.icon].icon;

  const tempLowFahrenheitEl = document.createElement("span");
  tempLowFahrenheitEl.className = "forecast-low";
  tempLowFahrenheitEl.innerText = dayData.low + " F°";
  tempLowFahrenheitEl.classList.add("fahrenheit-temp");

  const tempLowCelsiusEl = document.createElement("span");
  tempLowCelsiusEl.className = "forecast-high";
  tempLowCelsiusEl.innerText = fahrenheitToCelsius(dayData.low) + " C°";
  tempLowCelsiusEl.classList.add("celsius-temp");

  forecastEl.appendChild(tempDateEl);
  forecastEl.appendChild(tempHighCelsiusEl);
  forecastEl.appendChild(tempHighFahrenheitEl);
  forecastEl.appendChild(weatherIconEl);
  forecastEl.appendChild(tempLowCelsiusEl);
  forecastEl.appendChild(tempLowFahrenheitEl);

  return forecastEl;
}

function createCurrentConditionElement() {}
