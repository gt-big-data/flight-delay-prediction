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
        const delayMinutes = insertPredictedDelay(flightCardDiv);

        // Check if this flight has the least delay
        if (delayMinutes < leastDelay) {
          leastDelay = delayMinutes;
          leastDelayDivId = `flight-${flightInfoArray.length - 1}`;
          flightCardDiv.id = leastDelayDivId; // Assign a unique ID
        }

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

    if (leastDelayDivId) {
      addMostPunctualButton(leastDelayDivId);
    }

    console.log('Flight Info Array:', flightInfoArray);
    console.log('Full Flight Information:', fullFlightInformation);
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

function getRandomDelayMinutes() {
  // 50% chance of no delay, otherwise a random delay between 10 minutes and 2 hours
  return Math.random() < 0.8 ? 0 : Math.floor(Math.random() * (90 - 10 + 1)) + 10;
}

function insertPredictedDelay(div) {
  const delayMinutes = getRandomDelayMinutes();
  const delayText = document.createElement('div');

  // Convert minutes into hours and minutes format
  let delayDisplay;
  if (delayMinutes === 0) {
    delayDisplay = 'No Predicted Delay';
  } else {
    const hours = Math.floor(delayMinutes / 60);
    const minutes = delayMinutes % 60;
    delayDisplay = `${hours > 0 ? hours + 'hr ' : ''}${minutes}min Delay Predicted`;
  }

  delayText.textContent = delayDisplay;

  // Style adjustments
  delayText.style.color = delayMinutes === 0 ? '#497849' : '#e31d35';
  delayText.style.fontSize = '1.2em'; // Larger font size
  delayText.style.marginBottom = '10px'; // Bottom margin

  div.appendChild(delayText);
  return delayMinutes;
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