console.log("SouthWest script started");

const observer = new MutationObserver(function () {
  processFlightInfo();
});

observer.observe(document.body, { childList: true, subtree: true });

function processFlightInfo() {
  // Initialize an array to store flight numbers
  let flightInfoArray = [];
  // Find all elements with the class 'flyout-trigger flight-numbers--trigger'
  const flightNumberDivs = document.querySelectorAll('.flyout-trigger.flight-numbers--trigger');

  flightNumberDivs.forEach((flightNumberDiv) => {
    // Within each flightNumberDiv, find the span with class 'actionable--text'
    const flightNumberSpan = flightNumberDiv.querySelector('.actionable--text');

    if (flightNumberSpan) {
      // Get the flight number and remove the '#' symbol
      const flightNumberText = flightNumberSpan.textContent.trim().replace('# ', '');

      // Split the text by '/' to separate flight numbers if present
      const flightNumbers = flightNumberText.split(' / ');

      // Create an array to hold the flight numbers
      const flightNumberArray = [];

      flightNumbers.forEach((flightNumber) => {
        // Push each flight number to the array
        flightNumberArray.push(flightNumber);
      });

      // Push the flightNumberArray to the main 2D array
      flightInfoArray.push(flightNumberArray);
    }

  });

  // Log the flight numbers for debugging
  console.log(flightInfoArray);
}

// Continue with any other actions you want to perform with the flight numbers

