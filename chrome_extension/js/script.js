
console.log("script called, waiting on MESSAGE RECEIVED")
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "deltaScriptCompleted") {
        // Call the function to process the data from deltaScript.js
        console.log("Message Receive");

        function createFlightRow(imageSrc, flightTimes, airlineName, duration, fromTo, delayPercentage) {
            return `
                <div class="block">
                    <div class="image-container">
                        <img src="${imageSrc}" alt="${airlineName} Logo" />
                        <div class="text-container">
                            <p><b>${flightTimes}</b></p>
                            <p class="airline">${airlineName}</p>
                        </div>
                        <div class="text2">
                            <p><b>${duration}</b></p>
                            <p class="to-from">${fromTo}</p>
                        </div>
                        <div class="delay">
                            <p><b>Delay Percentage: ${delayPercentage}%</b></p>
                        </div>
                    </div>
                </div>
            `;
        }

        let noDelayFlightCount = 0;
        const MAX_FLIGHTS_WITH_NO_DELAY = 5;

        // function addFlightToPage(imageSrc, flightTimes, airlineName, duration, fromTo, delayPercentage) {
        //     // Only add the flight if the delay percentage is 0 and we haven't reached the maximum number of flights
        //     if (delayPercentage === '0' && noDelayFlightCount < MAX_FLIGHTS_WITH_NO_DELAY) {
        //         const flightsContainer = document.getElementById('flights-container');
        //         flightsContainer.innerHTML += createFlightRow(imageSrc, flightTimes, airlineName, duration, fromTo, delayPercentage);
        //         noDelayFlightCount++; // Increment the counter
        //     }
        // }


        function displayNoDelayFlights() {
            const flightsContainer = document.getElementById('flights-container');
            let count = 0;

            window.noDelayFlights.forEach(flight => {
                if (count < 5) { // Display only the first 5 flights with no delay
                    flightsContainer.innerHTML += createFlightRow(
                        // Use appropriate values for these parameters
                        flight.imageSrc, flight.flightTimes, flight.airlineName,
                        flight.duration, flight.fromTo, flight.delayMinutes
                    );
                    count++;
                }
            });
        }

        // Call this function when you want to display the flights
        displayNoDelayFlights();




        // // Example usage
        // addFlightToPage('https://example.com/image1.png', '7:32AM - 9:34AM', 'United Airlines', '5hr 2mins', 'LAX - ATL', '0');
        // addFlightToPage('https://example.com/image2.png', '8:20AM - 10:50AM', 'Spirit Airlines', '2hr 30 mins', 'ATL - JFK', '0');
        // // ... other flights


        // addFlightToPage('https://theoagroup.org/wp-content/uploads/2021/11/united-airlines-logo-emblem-png-5.png', '7:32AM - 9:34AM', 'United Airlines', '5hr 2mins', 'LAX - ATL', '6');
        // addFlightToPage('https://www.logo.wine/a/logo/Spirit_Airlines/Spirit_Airlines-Logo.wine.svg', '8:20AM - 10:50AM', 'Spirit Airlines', '2hr 30 mins', 'ATL - JFK', '10')
        // addFlightToPage('https://oconnorhardware.com/wp-content/uploads/2023/01/Delta-Logo.png', '2:55PM - 5:04PM', 'Delta Airlines', '2hr 09mins', 'ATL - YYZ', '2')
        // addFlightToPage('https://theoagroup.org/wp-content/uploads/2021/11/united-airlines-logo-emblem-png-5.png', '7:32AM - 9:34AM', 'United Airlines', '5hr 2mins', 'LAX - ATL', '6');
        // addFlightToPage('https://www.logo.wine/a/logo/Spirit_Airlines/Spirit_Airlines-Logo.wine.svg', '8:20AM - 10:50AM', 'Spirit Airlines', '2hr 30 mins', 'ATL - JFK', '10')
        // addFlightToPage('https://oconnorhardware.com/wp-content/uploads/2023/01/Delta-Logo.png', '2:55PM - 5:04PM', 'Delta Airlines', '2hr 09mins', 'ATL - YYZ', '2')
        // addFlightToPage('https://theoagroup.org/wp-content/uploads/2021/11/united-airlines-logo-emblem-png-5.png', '7:32AM - 9:34AM', 'United Airlines', '5hr 2mins', 'LAX - ATL', '6');
        // addFlightToPage('https://www.logo.wine/a/logo/Spirit_Airlines/Spirit_Airlines-Logo.wine.svg', '8:20AM - 10:50AM', 'Spirit Airlines', '2hr 30 mins', 'ATL - JFK', '10')
        // addFlightToPage('https://oconnorhardware.com/wp-content/uploads/2023/01/Delta-Logo.png', '2:55PM - 5:04PM', 'Delta Airlines', '2hr 09mins', 'ATL - YYZ', '2')
        // addFlightToPage('https://theoagroup.org/wp-content/uploads/2021/11/united-airlines-logo-emblem-png-5.png', '7:32AM - 9:34AM', 'United Airlines', '5hr 2mins', 'LAX - ATL', '6');
        // addFlightToPage('https://www.logo.wine/a/logo/Spirit_Airlines/Spirit_Airlines-Logo.wine.svg', '8:20AM - 10:50AM', 'Spirit Airlines', '2hr 30 mins', 'ATL - JFK', '10')
        // addFlightToPage('https://oconnorhardware.com/wp-content/uploads/2023/01/Delta-Logo.png', '2:55PM - 5:04PM', 'Delta Airlines', '2hr 09mins', 'ATL - YYZ', '2')


        displayNoDelayFlights();
    }
});

