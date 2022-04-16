const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  const url = `https://api.ipify.org/?format=json`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(error, data.ip);
  });
};

// Our next function, fetchCoordsByIP will be one that takes in an IP address and returns the latitude and longitude for it.
const fetchCoordsByIp = (ip, callback) => {
  const url = `https://api.freegeoip.app/json/${ip}?apikey=61d208a0-bd07-11ec-a0de-25d15f52cfbb`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates visa IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const coords = JSON.parse(body);
    console.log("LAT, LONG:", coords.latitude, coords.longitude); 
    callback(null, {latitude: coords.latitude, longitude: coords.longitude});
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  console.log(url);
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISSFlyOverTimes. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = JSON.parse(body).response;
    console.log("PASSES", passes);
    callback(null, passes);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes };