const request = require('request');

  const fetchMyIP = function(callback) {
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

const fetchCoordsByIP = function(ip, callback) {
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

const fetchISSFlyOverTimes = function(coords, callback) {
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

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passes);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };