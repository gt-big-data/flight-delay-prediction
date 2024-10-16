import React, { useState } from "react";
import FlightCard from "../components/FlightCard";
import flightData from "../../constants/flightData";

const Flights = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  return (
    <>
      {flightData.map((flight, index) => (
        <FlightCard
          key={index}
          airlineLogo={flight.airlineLogo}
          airlineName={flight.airlineName}
          flightNumber={flight.flightNumber}
          departure={flight.departure}
          arrival={flight.arrival}
          delayStatus={flight.delayStatus}
          layover={flight.layover}
          lastUpdated={lastUpdated}
          onBellClick={() =>
            console.log(
              `Notification clicked for flight ${flight.flightNumber}`
            )
          }
        />
      ))}
    </>
  );
};

export default Flights;
