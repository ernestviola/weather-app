// Import all weather icons
import clearDay from "../images/weatherIcons/clear-day.svg";
import clearNight from "../images/weatherIcons/clear-night.svg";
import cloudy from "../images/weatherIcons/cloudy.svg";
import fog from "../images/weatherIcons/fog.svg";
import hail from "../images/weatherIcons/hail.svg";
import partlyCloudyDay from "../images/weatherIcons/partly-cloudy-day.svg";
import partlyCloudyNight from "../images/weatherIcons/partly-cloudy-night.svg";
import rainSnowShowersDay from "../images/weatherIcons/rain-snow-showers-day.svg";
import rainSnowShowersNight from "../images/weatherIcons/rain-snow-showers-night.svg";
import rainSnow from "../images/weatherIcons/rain-snow.svg";
import rain from "../images/weatherIcons/rain.svg";
import showersDay from "../images/weatherIcons/showers-day.svg";
import showersNight from "../images/weatherIcons/showers-night.svg";
import sleet from "../images/weatherIcons/sleet.svg";
import snowShowersDay from "../images/weatherIcons/snow-showers-day.svg";
import snowShowersNight from "../images/weatherIcons/snow-showers-night.svg";
import snow from "../images/weatherIcons/snow.svg";
import thunderRain from "../images/weatherIcons/thunder-rain.svg";
import thunderShowersDay from "../images/weatherIcons/thunder-showers-day.svg";
import thunderShowersNight from "../images/weatherIcons/thunder-showers-night.svg";
import thunder from "../images/weatherIcons/thunder.svg";
import wind from "../images/weatherIcons/wind.svg";

const ice_color_light = "#5ec6ec";
const ice_color_dark = "#5ec6ec";
const cloud_color_light = "#d3d6d7";
const cloud_color_dark = "#686969";
const partly_cloudy_color = "#e8e9c1";
const day_color = "#f1da0b";
const night_color = "#1a2326";

// Create icon map
export const weatherIcons = {
  "clear-day": {
    icon: clearDay,
    color: day_color,
  },
  "clear-night": {
    icon: clearNight,
    color: night_color,
  },
  cloudy: {
    icon: cloudy,
    color: night_color,
  },
  fog: {
    icon: fog,
    color: cloud_color_light,
  },
  hail: {
    icon: hail,
    color: ice_color_light,
  },
  "partly-cloudy-day": {
    icon: partlyCloudyDay,
    color: partly_cloudy_color,
  },
  "partly-cloudy-night": {
    icon: partlyCloudyNight,
    color: cloud_color_dark,
  },
  "rain-snow-showers-day": {
    icon: rainSnowShowersDay,
    color: ice_color_light,
  },
  "rain-snow-showers-night": {
    icon: rainSnowShowersNight,
    color: ice_color_dark,
  },
  "rain-snow": {
    icon: rainSnow,
    color: ice_color_light,
  },
  rain: {
    icon: rain,
    color: cloud_color_light,
  },
  "showers-day": {
    icon: showersDay,
    color: cloud_color_light,
  },
  "showers-night": {
    icon: showersNight,
    color: cloud_color_dark,
  },
  sleet: {
    icon: sleet,
    color: ice_color_light,
  },
  "snow-showers-day": {
    icon: snowShowersDay,
    color: ice_color_light,
  },
  "snow-showers-night": {
    icon: snowShowersNight,
    color: ice_color_dark,
  },
  snow: {
    icon: snow,
    color: ice_color_light,
  },
  "thunder-rain": {
    icon: thunderRain,
    color: cloud_color_dark,
  },
  "thunder-showers-day": {
    icon: thunderShowersDay,
    color: cloud_color_dark,
  },
  "thunder-showers-night": {
    icon: thunderShowersNight,
    color: cloud_color_dark,
  },
  thunder: {
    icon: thunder,
    color: cloud_color_dark,
  },
  wind: {
    icon: wind,
    color: cloud_color_light,
  },
};

export default weatherIcons;
