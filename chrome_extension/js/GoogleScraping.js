console.log("Google Flights script started");

let originAirport = '';
let destinationAirport = '';
let day = '';
let fullFlightInformation = [];

function processFlightInfo() {
    console.log("Processing flight information...");
    let flightInfoArray = [];

    try {
        // Extract origin and destination airports
        const airportCodesElements = document.querySelectorAll('.G2WY5c div, .c8rWCd');
        console.log("Airport code elements found:", airportCodesElements.length);
        if (airportCodesElements.length >= 2) {
            originAirport = airportCodesElements[0]?.textContent.trim() || 'Unknown';
            destinationAirport = airportCodesElements[1]?.textContent.trim() || 'Unknown';
            console.log(`Origin: ${originAirport}, Destination: ${destinationAirport}`);
        } else {
            console.log("Could not find airport codes");
        }

        // Extract date of departure
        const dayElement = document.querySelector('.S90skc span:last-of-type');
        if (dayElement) {
            const fullDateText = dayElement.closest('.S90skc').textContent.trim();
            
            // Attempt to parse the full date
            const dateMatch = fullDateText.match(/([A-Za-z]{3}),?\s([A-Za-z]{3})\s(\d{1,2})(?:,?\s(\d{4}))?/);
            if (dateMatch) {
                const [, dayOfWeek, month, dayOfMonth, year] = dateMatch;
                const currentYear = new Date().getFullYear();
                const extractedYear = year || currentYear;
                
                day = `${dayOfWeek}, ${month} ${dayOfMonth}, ${extractedYear}`;
                console.log(`Day of Departure: ${day}`);
            } else {
                day = dayElement.textContent.trim();
            }
        } else {
            console.log("Could not find day element");
        }

        // Select all flight cards
        const flightCards = document.querySelectorAll('.mxvQLc');
        console.log("Flight cards found:", flightCards.length);

        if (flightCards.length > 0) {
            flightCards.forEach((flightCard, index) => {
                try {
                    const airline = flightCard.querySelector('.sSHqwe')?.textContent.trim() || 'Unknown';
                    const departureTime = flightCard.querySelector('[aria-label^="Departure time"]')?.textContent.trim() || 'Unknown';
                    const arrivalTime = flightCard.querySelector('[aria-label^="Arrival time"]')?.textContent.trim() || 'Unknown';
                    const duration = flightCard.querySelector('.gvkrdb')?.textContent.trim() || 'Unknown';
                    const price = flightCard.querySelector('.YMlIz.FpEdX span')?.textContent.trim() || 'Unknown';

                    const flightData = {
                        Airline: airline,
                        DepartureOrigin: originAirport,
                        Destination: destinationAirport,
                        DepartureTime: departureTime,
                        ArrivalTime: arrivalTime,
                        DayOfDeparture: day,
                        Duration: duration,
                        Price: price
                    };

                    flightInfoArray.push(flightData);
                    console.log(`Flight ${index + 1}: \nAirline: ${airline}  \nDeparture Origin: ${originAirport} \nDestination: ${destinationAirport} \nDay Of Departure: ${day} \nDeparture Time: ${departureTime} \nArrival Time: ${arrivalTime} \nDuration: ${duration} \nPrice: ${price}`);
                } catch (error) {
                    console.error(`Error processing flight card ${index + 1}:`, error);
                }
            });

            fullFlightInformation = flightInfoArray;
            console.log(`Total Flights Extracted: ${fullFlightInformation.length}`);
        } else {
            console.log("No flights found on this page.");
        }
    } catch (error) {
        console.error("Error in processFlightInfo:", error);
    }
}

function checkForFlightInfo() {
    const flightCards = document.querySelectorAll('.mxvQLc');
    if (flightCards.length > 0) {
        console.log("Flight cards found. Processing...");
        processFlightInfo();
    } else {
        console.log("No flight cards found yet. Retrying in 1 second...");
        setTimeout(checkForFlightInfo, 1000);
    }
}

// Wait for the page to load and then start processing
window.addEventListener('load', () => {
    console.log("Page loaded. Waiting for flight information...");
    setTimeout(checkForFlightInfo, 3000);
});