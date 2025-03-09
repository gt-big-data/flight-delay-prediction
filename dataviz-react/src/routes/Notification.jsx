import React, { useState, useEffect } from "react";
import FlightCard from "../components/FlightCard";
import flightData from "../../constants/flightData";

const Notification = () => {
  const [notifiedFlights, setNotifiedFlights] = useState([]);

  // Load flights with notifications enabled
  useEffect(() => {
    // Get notifications from localStorage
    try {
      const savedNotifications = localStorage.getItem('notifiedFlights');
      if (savedNotifications) {
        const notifiedFlightNumbers = JSON.parse(savedNotifications);
        
        // Filter flightData to only include flights with notifications enabled
        const flights = flightData.filter(flight => 
          notifiedFlightNumbers.includes(flight.flightNumber)
        );
        
        // Set these as the notified flights with notificationOn=true
        setNotifiedFlights(flights.map(flight => ({
          ...flight,
          notificationOn: true
        })));
      }
    } catch (e) {
      console.error("Error loading notified flights:", e);
    }
  }, []);

  // Toggle notification off
  const toggleNotification = (flightNumber) => {
    // Remove the flight from notified flights
    const updatedFlights = notifiedFlights.filter(
      flight => flight.flightNumber !== flightNumber
    );
    
    setNotifiedFlights(updatedFlights);
    
    // Update localStorage
    try {
      localStorage.setItem('notifiedFlights', JSON.stringify(
        updatedFlights.map(flight => flight.flightNumber)
      ));
    } catch (e) {
      console.error("Error updating localStorage:", e);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Notifications</h2>
      
      {notifiedFlights.length === 0 ? (
        <div className="text-center py-8">
          <p>No flight notifications enabled</p>
          <p className="text-sm text-gray-500 mt-2">
            Toggle the bell icon on a flight to receive notifications
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            You will receive notifications for these flights
          </p>
          
          {notifiedFlights.map((flight, index) => (
            <FlightCard
              key={index}
              airlineLogo={flight.airlineLogo}
              airlineName={flight.airlineName}
              flightNumber={flight.flightNumber}
              departure={flight.departure}
              arrival={flight.arrival}
              delayStatus={flight.delayStatus}
              layover={flight.layover}
              lastUpdated={new Date()} // Always use current date for simplicity
              infoUrl={flight.infoUrl}
              notificationOn={true}
              onBellClick={() => toggleNotification(flight.flightNumber)}
              removeFlight={() => toggleNotification(flight.flightNumber)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;