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
import {
  getWeatherDataByLatLong,
  getWeatherDataByCityName,
} from "./components/weather";
import weatherIcons from "./components/weatherIcons";

let fahrenheit = localStorage.getItem("fahrenheit")
  ? localStorage.getItem("fahrenheit") == "true"
  : true; // maybe save in localStorage?

await initialLoad();

function hideNonActiveTemps() {
  const fahrenheitElArr = Array.from(
    document.getElementsByClassName("fahrenheit-temp"),
  );
  const celsiusElArr = Array.from(
    document.getElementsByClassName("celsius-temp"),
  );
  const fahrenheitButtonEl = document.getElementById("fahrenheit");
  const celsiusButtonEl = document.getElementById("celsius");
  if (fahrenheit) {
    // hide celsius
    // unhide fahrenheit
    fahrenheitElArr.forEach((el) => {
      el.hidden = false;
    });
    celsiusElArr.forEach((el) => {
      el.hidden = true;
    });
    fahrenheitButtonEl.classList.add("active");
    celsiusButtonEl.classList.remove("active");
  } else {
    //
    fahrenheitElArr.forEach((el) => {
      el.hidden = true;
    });
    celsiusElArr.forEach((el) => {
      el.hidden = false;
    });
    fahrenheitButtonEl.classList.remove("active");
    celsiusButtonEl.classList.add("active");
  }
}

async function initialLoad() {
  const degreeButton = document.getElementById("degree-button");
  degreeButton.addEventListener("click", (e) => {
    e.preventDefault();
    fahrenheit = !fahrenheit;
    localStorage.setItem("fahrenheit", fahrenheit);
    hideNonActiveTemps();
  });

  const searchEl = document.getElementById("search-form");
  searchEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    await loadWeatherElements(formData.get("location"));
    e.target.reset();
  });

  await loadWeatherElements();
}

async function loadWeatherElements(cityName = null) {
  let weatherData;
  if (cityName) {
    weatherData = getWeatherDataByCityName(cityName);
  } else {
    const pos = await getLatLong();
    weatherData = getWeatherDataByLatLong(pos.latitude, pos.longitude);
  }

  resetElements();

  const weeklyWeatherEl = document.querySelector(".weekly-weather");
  const currentCityEl = document.getElementById("current-city-value");

  weatherData.then(async (data) => {
    if (data) {
      cityName = await getCity(data.latitude, data.longitude);
      currentCityEl.innerText = cityName;
      populateCurrentConditionsEl(data.currentConditions);
      for (const day of data.days.slice(1)) {
        weeklyWeatherEl.appendChild(createDayForecastElement(day));
      }
    }
    hideNonActiveTemps();
  });
}

function resetElements() {
  const weeklyWeatherEl = document.querySelector(".weekly-weather");
  const currentCityEl = document.getElementById("current-city-value");
  const currentConditionsEl = document.getElementById("current-conditions");

  weeklyWeatherEl.replaceChildren();
  currentCityEl.replaceChildren();
  currentConditionsEl.replaceChildren();
}

function populateCurrentConditionsEl(currentConditions) {
  /*
  sunrise
  sunset
  feels like
  uv index
  */
  console.log(currentConditions);
  const root = document.getElementById("root");
  root.style.setProperty(
    "--weather-color",
    weatherIcons[currentConditions.icon].color,
  );

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

  const currentConditionsDetailsEl = document.createElement("div");
  currentConditionsDetailsEl.className = "current-conditions-details";
  const sunsetEl = document.createElement("span");
  sunsetEl.innerText = "Sunset: " + currentConditions.sunset;
  const sunriseEl = document.createElement("span");
  sunriseEl.innerText = "Sunrise: " + currentConditions.sunrise;
  const feelsLikeEl = document.createElement("span");
  feelsLikeEl.innerText = "Feels like: " + currentConditions.feelslike;
  const uvEl = document.createElement("span");
  uvEl.innerText = "UV Index: " + currentConditions.uvindex;

  currentConditionsDetailsEl.appendChild(sunriseEl);
  currentConditionsDetailsEl.appendChild(sunsetEl);
  currentConditionsDetailsEl.appendChild(feelsLikeEl);
  currentConditionsDetailsEl.appendChild(uvEl);

  currentConditionsEl.appendChild(currentTempCelsiusEl);
  currentConditionsEl.appendChild(currentTempFahrenheitEl);
  currentConditionsEl.appendChild(currentIcon);

  currentConditionsEl.appendChild(currentConditionsDetailsEl);

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
  let bgColor = weatherIcons[dayData.icon].color + "3e";
  forecastEl.style.backgroundColor = bgColor;

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
