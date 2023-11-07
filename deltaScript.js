console.log("Script started");

const observer = new MutationObserver(function () {
  processFlightInfo();
});

observer.observe(document.body, { childList: true, subtree: true });

function processFlightInfo() {
  let flightInfoArray = [];

  const flightCardDivs = document.querySelectorAll('.flight-card__body');

  flightCardDivs.forEach((flightCardDiv) => {
    const flightNumberSpan = flightCardDiv.querySelector('span[_ngcontent-shopping-slice-c286]');

    if (flightNumberSpan) {
      const flightNumber = flightNumberSpan.textContent.trim().split(' ')[0];
      flightInfoArray.push(flightNumber);
    }
  });

  console.log(flightInfoArray);
}
