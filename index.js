// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIp } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

fetchCoordsByIp;

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  // fetchCoordsByIp(ip, (error, data) => {
  // });
  // console.log('It worked! Returned IP:' , ip);
});

const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
});