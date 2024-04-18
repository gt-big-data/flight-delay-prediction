console.log("Delta script started mk3");

let leastDelay = 121; // Start with a delay higher than the maximum possible (2 hours in minutes)
let leastDelayDivId = null;
let originAirport = '';
let destinationAirport = '';

const observer = new MutationObserver(function () {
  processFlightInfo();
});

observer.observe(document.body, { childList: true, subtree: true });

function processFlightInfo() {
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




  const flightCardDivs = document.querySelectorAll('.flight-card__body');

  if (flightCardDivs.length > 0) {
    observer.disconnect(); // Stop observing changes to prevent infinite loop

    flightCardDivs.forEach((flightCardDiv, index) => {

      const flightNumberSpan = flightCardDiv.querySelector('span[_ngcontent-shopping-slice-c246]');
      if (flightNumberSpan) {
        const flightNumber = flightNumberSpan.textContent.trim().split(' ')[0];
        flightInfoArray.push(flightNumber);
        const delayMinutes = insertPredictedDelay(flightCardDiv);

        // Check if this flight has the least delay
        if (delayMinutes < leastDelay) {
          leastDelay = delayMinutes;
          leastDelayDivId = `flight-${index}`;
          flightCardDiv.id = leastDelayDivId; // Assign a unique ID
        }
        if (delayMinutes === 0) {
          window.noDelayFlights.push({
            flightNumber: flightNumber,
            delayMinutes: delayMinutes,
            imageSrc: 'https://oconnorhardware.com/wp-content/uploads/2023/01/Delta-Logo.png',
            flightTimes: '11:11PM - 11:11AM',
            airlineName: 'Delta',
            duration: '11min',
            fromTo: 'ATL-BOS'
            // Add other relevant flight details here
          });
        }
      }
    });

    if (leastDelayDivId) {
      addMostPunctualButton(leastDelayDivId);
    }

    console.log(flightInfoArray);
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

  // At the end of deltaScript.js
  // console.log("Sending message");

  // chrome.runtime.sendMessage({ action: "deltaScriptCompleted" });
}



