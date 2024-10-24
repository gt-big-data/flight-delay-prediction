import React, { useState } from "react";
import FlightCard from "../components/FlightCard";
import flightData from "../../constants/flightData";

const Flights = ({ lastUpdated }) => {
  const [flights, setFlights] = useState(flightData);

  // TODO: implement remove/add functions when backend is integrated.
  // Placeholder function to remove a flight
  const removeFlight = (flightNumber) => {
    const updatedFlights = flights.filter(
      (flight) => flight.flightNumber !== flightNumber
    );
    setFlights(updatedFlights);
  };

  // TODO: implement turn on/off notification functions when backend is integrated.
  // Function to toggle notification status (for now, toggling the dummy data value)
  const toggleNotification = (flightNumber) => {
    setFlights((prevFlights) =>
      prevFlights.map((flight) =>
        flight.flightNumber === flightNumber
          ? { ...flight, notificationOn: !flight.notificationOn }
          : flight
      )
    );
  };

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
          infoUrl={flight.infoUrl}
          notificationOn={flight.notificationOn}
          onBellClick={() => toggleNotification(flight.flightNumber)}
          removeFlight={() => removeFlight(flight.flightNumber)}
        />
      ))}
    </>
  );
};

export default Flights;
