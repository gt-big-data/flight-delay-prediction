console.log("Delta script started mk3");

let leastDelay = 121; // Start with a delay higher than the maximum possible (2 hours in minutes)
let leastDelayDivId = null;
let originAirport = '';
let destinationAirport = '';
let day = ''; // Declare the global variable 'day'
let fullFlightInformation = [];

const observer = new MutationObserver(function () {
  processFlightInfo();
});

observer.observe(document.body, { childList: true, subtree: true });

async function processFlightInfo() {
  console.log("Processing");
  let flightInfoArray = [];
  window.noDelayFlights = []; // Array to store flights with no delay

  // Extract origin and destination airport codes
  const airportCodesElements = document.querySelectorAll('.search-segment-cities__city');
  if (airportCodesElements && airportCodesElements.length >= 2) {
    originAirport = airportCodesElements[0].textContent.trim();
    destinationAirport = airportCodesElements[1].textContent.trim();
    console.log('Origin Airport:', originAirport);
    console.log('Destination Airport:', destinationAirport);
  }

  // Extract day of the week
  const dayElement = document.querySelector('.search-date');
  if (dayElement) {
    day = dayElement.textContent.trim().split(',')[0]; // Extract the day of the week
    console.log('Day of the Week:', day);
  }

  const flightCardDivs = document.querySelectorAll('.flight-card__body');

  if (flightCardDivs.length > 0) {
    observer.disconnect(); // Stop observing changes to prevent infinite loop

    for (const flightCardDiv of flightCardDivs) {
      const flightNumberSpan = flightCardDiv.querySelector('span[_ngcontent-shopping-slice-c250]');
      if (flightNumberSpan) {
        const flightNumber = flightNumberSpan.textContent.trim().split(' ')[0];
        flightInfoArray.push(flightNumber);

        try {
          const flightInfo = await getFlightCoordinates(flightNumber);
          if (flightInfo) {
            const distance = calculateDistance(flightInfo.originLat, flightInfo.originLon, flightInfo.destinationLat, flightInfo.destinationLon);
            const flightData = {
              DISTANCE: distance,
              OLAT: flightInfo.originLat,
              OLONG: flightInfo.originLon,
              DLAT: flightInfo.destinationLat,
              DLONG: flightInfo.destinationLon,
              DAY_OF_WEEK_FRI: day === 'Fri' ? 1 : 0,
              DAY_OF_WEEK_MON: day === 'Mon' ? 1 : 0,
              DAY_OF_WEEK_SAT: day === 'Sat' ? 1 : 0,
              DAY_OF_WEEK_SUN: day === 'Sun' ? 1 : 0,
              DAY_OF_WEEK_THU: day === 'Thu' ? 1 : 0,
              DAY_OF_WEEK_TUE: day === 'Tue' ? 1 : 0,
              DAY_OF_WEEK_WED: day === 'Wed' ? 1 : 0,
              AIRLINE_9E: 0,
              AIRLINE_AA: 0,
              AIRLINE_AS: 0,
              AIRLINE_B6: 0,
              AIRLINE_CO: 0,
              AIRLINE_DL: 1,
              AIRLINE_EV: 0,
              AIRLINE_F9: 0,
              AIRLINE_FL: 0,
              AIRLINE_G4: 0,
              AIRLINE_HA: 0,
              AIRLINE_MQ: 0,
              AIRLINE_NK: 0,
              AIRLINE_NW: 0,
              AIRLINE_OH: 0,
              AIRLINE_OO: 0,
              AIRLINE_UA: 0,
              AIRLINE_US: 0,
              AIRLINE_VX: 0,
              AIRLINE_WN: 0,
              AIRLINE_XE: 0,
              AIRLINE_YV: 0,
              AIRLINE_YX: 0
            };
            fullFlightInformation.push(flightData);
          }
        } catch (error) {
          console.error(`Error processing flight ${flightNumber}:`, error);
        }
      }
    }

    // Make a batch prediction request to the Vertex AI endpoint
    const normalizedData = {
      "instances": fullFlightInformation.map(data => normalizeData(data, means, standardDeviations))
    };

    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(normalizedData)
    };

    const endpoint = 'https://us-east1-aiplatform.googleapis.com/v1/projects/glassy-envoy-414219/locations/us-east1/endpoints/5332547831829889024:predict';

    fetch(endpoint, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        displayPredictions(data.predictions);
      })
      .catch(error => console.error('Error:', error));
  }
}

function displayPredictions(predictions) {
  const flightCardDivs = document.querySelectorAll('.flight-card__body');

  predictions.forEach((prediction, index) => {
    const delayText = document.createElement('div');
    const delayCategory = getDelayCategory(prediction);
    delayText.textContent = delayCategory;

    // Style adjustments
    delayText.style.color = delayCategory === 'On time' ? '#497849' : '#e31d35';
    delayText.style.fontSize = '1.2em'; // Larger font size
    delayText.style.marginBottom = '10px'; // Bottom margin

    flightCardDivs[index].appendChild(delayText);
  });
}

function getDelayCategory(prediction) {
  const maxIndex = prediction.indexOf(Math.max(...prediction));
  switch (maxIndex) {
    case 0:
      return 'On time';
    case 1:
      return '0-30 min delay';
    case 2:
      return '30-60 min delay';
    case 3:
      return '60+ min delay';
    default:
      return 'Unknown';
  }
}

async function getFlightCoordinates(flightNumber) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4bf2c12cfemsh5ceea540e69bf4bp17e9f8jsnd66ee82d72c2',
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(`https://aerodatabox.p.rapidapi.com/flights/number/${flightNumber}`, options);
    const data = await response.json();
    const flight = data[0]; // Assuming the first flight in the response is the desired one

    if (flight) {
      return {
        originLat: flight.departure.airport.location.lat,
        originLon: flight.departure.airport.location.lon,
        destinationLat: flight.arrival.airport.location.lat,
        destinationLon: flight.arrival.airport.location.lon
      };
    } else {
      console.log(`No flight found with number ${flightNumber}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching coordinates for flight ${flightNumber}:`, error);
    return null;
  }
}

function addMostPunctualButton(leastDelayDivId) {
  const button = document.createElement('button');
  button.textContent = "Best Punctual Flight";

  // Styling the button
  button.style.backgroundColor = '#497849'; // Green color
  button.style.color = 'white';
  button.style.padding = '10px 20px';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';
  button.style.marginTop = '10px';

  button.onclick = function () {
    document.getElementById(leastDelayDivId).scrollIntoView();
  };

  // Select the target container
  const container = document.querySelector('.search-date-and-disclaimer');
  if (container) {
    container.appendChild(button);
  } else {
    console.error('Target container not found');
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const means = {
  DISTANCE: 789.404628,
  OLAT: 36.683523,
  OLONG: -95.414015,
  DLAT: 36.684935,
  DLONG: -95.417249,
  DAY_OF_WEEK_FRI: 0.148858,
  DAY_OF_WEEK_MON: 0.148651,
  DAY_OF_WEEK_SAT: 0.121597,
  DAY_OF_WEEK_SUN: 0.140578,
  DAY_OF_WEEK_THU: 0.148729,
  DAY_OF_WEEK_TUE: 0.144770,
  DAY_OF_WEEK_WED: 0.146816,
  AIRLINE_9E: 0.016993,
  AIRLINE_AA: 0.108597,
  AIRLINE_AS: 0.027325,
  AIRLINE_B6: 0.040371,
  AIRLINE_CO: 0.012099,
  AIRLINE_DL: 0.128372,
  AIRLINE_EV: 0.075484,
  AIRLINE_F9: 0.014779,
  AIRLINE_FL: 0.019830,
  AIRLINE_G4: 0.001369,
  AIRLINE_HA: 0.012263,
  AIRLINE_MQ: 0.051400,
  AIRLINE_NK: 0.009556,
  AIRLINE_NW: 0.004794,
  AIRLINE_OH: 0.009131,
  AIRLINE_OO: 0.101614,
  AIRLINE_UA: 0.078905,
  AIRLINE_US: 0.043326,
  AIRLINE_VX: 0.006368,
  AIRLINE_WN: 0.197376,
  AIRLINE_XE: 0.017825,
  AIRLINE_YV: 0.017170,
  AIRLINE_YX: 0.005053
};

const standardDeviations = {
  DISTANCE: 594.768115,
  OLAT: 5.897370,
  OLONG: 18.183444,
  DLAT: 5.897820,
  DLONG: 18.190081,
  DAY_OF_WEEK_FRI: 0.355949,
  DAY_OF_WEEK_MON: 0.355744,
  DAY_OF_WEEK_SAT: 0.326820,
  DAY_OF_WEEK_SUN: 0.347586,
  DAY_OF_WEEK_THU: 0.355821,
  DAY_OF_WEEK_TUE: 0.351869,
  DAY_OF_WEEK_WED: 0.353923,
  AIRLINE_9E: 0.129244,
  AIRLINE_AA: 0.311133,
  AIRLINE_AS: 0.163028,
  AIRLINE_B6: 0.196829,
  AIRLINE_CO: 0.109328,
  AIRLINE_DL: 0.334504,
  AIRLINE_EV: 0.264170,
  AIRLINE_F9: 0.120666,
  AIRLINE_FL: 0.139416,
  AIRLINE_G4: 0.036980,
  AIRLINE_HA: 0.110056,
  AIRLINE_MQ: 0.220812,
  AIRLINE_NK: 0.097287,
  AIRLINE_NW: 0.069071,
  AIRLINE_OH: 0.095118,
  AIRLINE_OO: 0.302141,
  AIRLINE_UA: 0.269591,
  AIRLINE_US: 0.203589,
  AIRLINE_VX: 0.079543,
  AIRLINE_WN: 0.398019,
  AIRLINE_XE: 0.132315,
  AIRLINE_YV: 0.129905,
  AIRLINE_YX: 0.070906
};

// Function to normalize value
function normalize(value, mean, stdDev) {
  return (value - mean) / stdDev;
}

// Normalize all values
function normalizeData(data, means, standardDeviations) {
  const normalizedData = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const normalizedValue = normalize(data[key], means[key], standardDeviations[key]);
      normalizedData.push(normalizedValue);
    }
  }

  return normalizedData;
}