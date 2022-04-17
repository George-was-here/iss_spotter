const { fetchMyIP } = require('./iss_promised');
const { fetchCoordsByIP } = require('./iss_promised');
const { fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');
const { displayUpcomingPasses } = require('./index');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

  nextISSTimesForMyLocation()
  .then((passes) => {
    displayUpcomingPasses(passes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

