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

function addFlightToPage(imageSrc, flightTimes, airlineName, duration, fromTo, delayPercentage) {
    const flightsContainer = document.getElementById('flights-container');
    flightsContainer.innerHTML += createFlightRow(imageSrc, flightTimes, airlineName, duration, fromTo, delayPercentage);
}

addFlightToPage('https://theoagroup.org/wp-content/uploads/2021/11/united-airlines-logo-emblem-png-5.png', '7:32AM - 9:34AM', 'United Airlines', '5hr 2mins', 'LAX - ATL', '6');
addFlightToPage('https://www.logo.wine/a/logo/Spirit_Airlines/Spirit_Airlines-Logo.wine.svg', '8:20AM - 10:50AM', 'Spirit Airlines', '2hr 30 mins', 'ATL - JFK', '10')
addFlightToPage('https://oconnorhardware.com/wp-content/uploads/2023/01/Delta-Logo.png', '2:55PM - 5:04PM', 'Delta Airlines', '2hr 09mins', 'ATL - YYZ', '2')
addFlightToPage('https://theoagroup.org/wp-content/uploads/2021/11/united-airlines-logo-emblem-png-5.png', '7:32AM - 9:34AM', 'United Airlines', '5hr 2mins', 'LAX - ATL', '6');
addFlightToPage('https://www.logo.wine/a/logo/Spirit_Airlines/Spirit_Airlines-Logo.wine.svg', '8:20AM - 10:50AM', 'Spirit Airlines', '2hr 30 mins', 'ATL - JFK', '10')
addFlightToPage('https://oconnorhardware.com/wp-content/uploads/2023/01/Delta-Logo.png', '2:55PM - 5:04PM', 'Delta Airlines', '2hr 09mins', 'ATL - YYZ', '2')
addFlightToPage('https://theoagroup.org/wp-content/uploads/2021/11/united-airlines-logo-emblem-png-5.png', '7:32AM - 9:34AM', 'United Airlines', '5hr 2mins', 'LAX - ATL', '6');
addFlightToPage('https://www.logo.wine/a/logo/Spirit_Airlines/Spirit_Airlines-Logo.wine.svg', '8:20AM - 10:50AM', 'Spirit Airlines', '2hr 30 mins', 'ATL - JFK', '10')
addFlightToPage('https://oconnorhardware.com/wp-content/uploads/2023/01/Delta-Logo.png', '2:55PM - 5:04PM', 'Delta Airlines', '2hr 09mins', 'ATL - YYZ', '2')
addFlightToPage('https://theoagroup.org/wp-content/uploads/2021/11/united-airlines-logo-emblem-png-5.png', '7:32AM - 9:34AM', 'United Airlines', '5hr 2mins', 'LAX - ATL', '6');
addFlightToPage('https://www.logo.wine/a/logo/Spirit_Airlines/Spirit_Airlines-Logo.wine.svg', '8:20AM - 10:50AM', 'Spirit Airlines', '2hr 30 mins', 'ATL - JFK', '10')
addFlightToPage('https://oconnorhardware.com/wp-content/uploads/2023/01/Delta-Logo.png', '2:55PM - 5:04PM', 'Delta Airlines', '2hr 09mins', 'ATL - YYZ', '2')