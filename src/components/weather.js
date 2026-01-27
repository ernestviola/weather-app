/**
 *
 * @param {number} latitude Latitude of the location
 * @param {number} longitude Longitude of the location
 * @returns weather data
 */
async function getWeatherDataByLatLong(latitude, longitude) {
  let locationString = `${latitude},${longitude}`;
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

export { getWeatherDataByLatLong };
