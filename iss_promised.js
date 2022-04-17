const request = require('request-promise-native');

const fetchMyIP = function() {
  return request (`https://api.ipify.org/?format=json`);
};
const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request (`https://api.freegeoip.app/json/${ip}?apikey=61d208a0-bd07-11ec-a0de-25d15f52cfbb`)
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };

