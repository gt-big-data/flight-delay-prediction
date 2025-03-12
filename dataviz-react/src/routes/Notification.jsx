import React, { useState, useEffect } from "react";

import { auth, firestore } from "../../firebase-config";
import { 
  collection, 
  getDocs, 
  query, 
  doc, 
  updateDoc,
  getDoc 
} from "firebase/firestore";
import FlightCard from "../components/FlightCard";

const Notification = () => {
  // States for flight notifications
  const [notifiedFlights, setNotifiedFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for frequency settings
  const [frequency, setFrequency] = useState('daily');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Load flights with notifications enabled from Firestore
  useEffect(() => {
    const fetchNotifiedFlights = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not authenticated");
          setLoading(false);
          return;
        }

        // Fetch flights from the nested collection within the user document
        const userDocRef = doc(firestore, 'users', user.uid);
        const flightsCollectionRef = collection(userDocRef, 'flights');
        const flightsSnapshot = await getDocs(query(flightsCollectionRef));
        
        if (flightsSnapshot.empty) {
          setNotifiedFlights([]);
          setLoading(false);
          return;
        }

        // Filter for flights with notification=true and convert to FlightCard format
        const userNotifiedFlights = [];
        flightsSnapshot.forEach(doc => {
          const flightData = doc.data();
          
          // Only include flights with notification set to true
          if (flightData.notification === true) {
            userNotifiedFlights.push({
              airlineLogo: flightData.airline?.toLowerCase() || "delta", // Default to delta if missing
              airlineName: flightData.airline || "Dummy Airline",
              flightNumber: flightData.flightNumber,
              departure: {
                location: flightData.depAirport || "ATL",
                time: "MISSING", // Not in current schema
                date: flightData.date || "MISSING",
                weather: "sunny", // Default weather
              },
              arrival: {
                location: flightData.arrAirport || "LAX",
                time: "MISSING", // Not in current schema
                date: flightData.date || "MISSING", // Using same date as departure
                duration: "MISSING",
                stops: "Nonstop", // Default value
                weather: "partly_cloudy", // Default weather
              },
              delayStatus: {
                isDelayed: flightData.delay !== "No Delay",
                message: flightData.delay || "On Time",
              },
              layover: null,
              infoUrl: "#", // Default URL
              notificationOn: true, // These are all notification-enabled flights
            });
          }
        });
        
        setNotifiedFlights(userNotifiedFlights);
      } catch (e) {
        console.error("Error loading notified flights:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifiedFlights();
  }, []);

  // Method 1: Toggle notification for a specific flight
  const toggleNotificationOnFlight = async (flightNumber) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }
      
      // Update the flight's notification state in Firestore to false
      const userDocRef = doc(firestore, 'users', user.uid);
      const flightDocRef = doc(collection(userDocRef, 'flights'), flightNumber);
      await updateDoc(flightDocRef, {
        notification: false
      });
      
      // Remove the flight from the local state
      const updatedFlights = notifiedFlights.filter(
        flight => flight.flightNumber !== flightNumber
      );
      
      setNotifiedFlights(updatedFlights);
      
      // Also update localStorage to maintain compatibility with other components
      try {
        const savedNotifications = localStorage.getItem('notifiedFlights') || '[]';
        let notifiedFlightNumbers = JSON.parse(savedNotifications);
        notifiedFlightNumbers = notifiedFlightNumbers.filter(num => num !== flightNumber);
        localStorage.setItem('notifiedFlights', JSON.stringify(notifiedFlightNumbers));
      } catch (e) {
        console.error("Error updating localStorage:", e);
      }
    } catch (error) {
      console.error("Error toggling notification:", error);
    }
  };

  return (
    <div className="p-4">
      {/* Flight Notifications Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Notifications</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <p>Loading notifications...</p>
          </div>
        ) : notifiedFlights.length === 0 ? (
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
                onBellClick={() => toggleNotificationOnFlight(flight.flightNumber)}
                removeFlight={() => toggleNotificationOnFlight(flight.flightNumber)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Notification;
