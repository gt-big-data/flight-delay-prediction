import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
    // Find the current flight
    const currentFlight = flights.find(f => f.flightNumber === flightNumber);
    if (!currentFlight) return;
    
    // Determine the new notification state (opposite of current)
    const newNotificationState = !currentFlight.notificationOn;
    
    // Update the flight's notification state in the local state
    setFlights((prevFlights) =>
      prevFlights.map((flight) =>
        flight.flightNumber === flightNumber
          ? { ...flight, notificationOn: newNotificationState }
          : flight
      )
    );
    
    // Store notified flights in localStorage for persistence between pages
    try {
      // Get current notified flights
      const savedNotifications = localStorage.getItem('notifiedFlights');
      let notifiedFlightNumbers = savedNotifications ? JSON.parse(savedNotifications) : [];
      
      if (newNotificationState) {
        // Add to notifications if not already there
        if (!notifiedFlightNumbers.includes(flightNumber)) {
          notifiedFlightNumbers.push(flightNumber);
        }
      } else {
        // Remove from notifications
        notifiedFlightNumbers = notifiedFlightNumbers.filter(num => num !== flightNumber);
      }
      
      // Save back to localStorage
      localStorage.setItem('notifiedFlights', JSON.stringify(notifiedFlightNumbers));
    } catch (e) {
      console.error("Error updating localStorage:", e);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {/* Add Button */}
      <div className="flex justify-center flex-col">
        <button
          className="bg-[#0360F0] text-white text-sm font-semibold py-2 w-full rounded-md hover:bg-blue-500 transition-colors"
          onClick={() => navigate("/addflight")}
        >
          Add Flight
        </button>
      </div>
      {flights.map((flight, index) => (
        <FlightCard
          key={index}
          airlineLogo={flight.airlineLogo}
          airlineName={flight.airlineName}
          flightNumber={flight.flightNumber}
          departure={flight.departure}
          arrival={flight.arrival}
          delayStatus={flight.delayStatus}
          layover={flight.layover}
          lastUpdated={lastUpdated || new Date()} // Ensure lastUpdated is a valid date object
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