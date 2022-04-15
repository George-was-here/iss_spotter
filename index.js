// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIp } = require('./iss');

fetchCoordsByIp;

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  fetchCoordsByIp(ip, (error, data) => {
  });
  console.log('It worked! Returned IP:' , ip);
});