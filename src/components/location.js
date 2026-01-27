/**
 *
 * @returns An object containing latitude and longitude
 */
async function getLatLong() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (error) => {
        console.log("Failed to get user location: ", error);
        return null;
      },
    );
  });
}

/**
 *
 * @param {float} latitude
 * @param {float} longitude
 * @returns String of the city name
 */
async function getCity(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data.city;
    } else {
      throw new Error("Failed to fetch: ", response.status);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { getLatLong, getCity };
