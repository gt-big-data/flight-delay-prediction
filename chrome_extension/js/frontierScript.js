console.log("Script started");

const observer = new MutationObserver(function () {
    processFlightInfo();
});

observer.observe(document.body, { childList: true, subtree: true });

function processFlightInfo() {
    // Initialize an empty 2D array to store [divID, flightNumber] pairs
    let flightInfoArray = [];
    // Find all divs with the class 'ibe-flight-info-box ibe-flight-info-box-connection'
    const infoBoxDivs = document.querySelectorAll('.ibe-flight-info-box.ibe-flight-info-box-connection');
    // Loop through each infoBoxDiv to find nested divs with the class 'ibe-link flight-number cd-btn'
    infoBoxDivs.forEach((infoBoxDiv) => {
        const flightNumberDiv = infoBoxDiv.querySelector('.ibe-link.flight-number.cd-btn'); // Find the nested div
        if (flightNumberDiv) {
            const flightNumber = flightNumberDiv.textContent.trim(); // Get the flight number
            flightInfoArray.push(flightNumber); // Store the divID and flightNumber in the array
        }
    });
    // Log the 2D array for debugging
    console.log(flightInfoArray)
}
