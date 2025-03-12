import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../firebase-config";
import { collection, getDocs, query, doc, deleteDoc, updateDoc } from "firebase/firestore";
import FlightCard from "../components/FlightCard";

const Flights = ({ lastUpdated }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's flights from Firestore
  useEffect(() => {
    const fetchUserFlights = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not authenticated");
          setLoading(false);
          return;
        }

        // Get notifications from localStorage
        const savedNotifications = localStorage.getItem('notifiedFlights') || '[]';
        const notifiedFlightNumbers = JSON.parse(savedNotifications);

        // Fetch flights from the nested collection within the user document
        const userDocRef = doc(firestore, 'users', user.uid);
        const flightsCollectionRef = collection(userDocRef, 'flights');
        const flightsSnapshot = await getDocs(query(flightsCollectionRef));
        
        if (flightsSnapshot.empty) {
          setFlights([]);
          setLoading(false);
          return;
        }

        // Convert Firestore documents to flight objects
        const userFlights = [];
        flightsSnapshot.forEach(doc => {
          const flightData = doc.data();
          
          // Map Firestore document fields to the expected FlightCard props format
          userFlights.push({
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
            notificationOn: notifiedFlightNumbers.includes(flightData.flightNumber),
          });
        });
        
        setFlights(userFlights);
      } catch (e) {
        console.error("Error loading flights:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFlights();
  }, [lastUpdated]); // Re-fetch when lastUpdated changes

  // Function to remove a flight
  const removeFlight = async (flightNumber) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      // Delete the flight document from the nested collection
      const userDocRef = doc(firestore, 'users', user.uid);
      const flightDocRef = doc(collection(userDocRef, 'flights'), flightNumber);
      await deleteDoc(flightDocRef);
      
      // Update local state
      const updatedFlights = flights.filter(
        (flight) => flight.flightNumber !== flightNumber
      );
      setFlights(updatedFlights);
      
      // Also remove from notifications if it was there
      const savedNotifications = localStorage.getItem('notifiedFlights');
      if (savedNotifications) {
        const notifiedFlightNumbers = JSON.parse(savedNotifications);
        if (notifiedFlightNumbers.includes(flightNumber)) {
          const updatedNotifications = notifiedFlightNumbers.filter(
            num => num !== flightNumber
          );
          localStorage.setItem('notifiedFlights', JSON.stringify(updatedNotifications));
        }
      }
    } catch (error) {
      console.error("Error removing flight:", error);
    }
  };

  // Function to toggle notification status
  const toggleNotification = async (flightNumber) => {
    try {
      // Find the current flight
      const currentFlight = flights.find(f => f.flightNumber === flightNumber);
      if (!currentFlight) return;
      
      // Determine the new notification state (opposite of current)
      const newNotificationState = !currentFlight.notificationOn;
      
      // Update the flight's notification state in Firestore
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }
      
      const userDocRef = doc(firestore, 'users', user.uid);
      const flightDocRef = doc(collection(userDocRef, 'flights'), flightNumber);
      await updateDoc(flightDocRef, {
        notification: newNotificationState
      });
      
      // Update the flight's notification state in the local state
      setFlights((prevFlights) =>
        prevFlights.map((flight) =>
          flight.flightNumber === flightNumber
            ? { ...flight, notificationOn: newNotificationState }
            : flight
        )
      );
      
      // Update localStorage for notifications
      const savedNotifications = localStorage.getItem('notifiedFlights') || '[]';
      let notifiedFlightNumbers = JSON.parse(savedNotifications);
      
      if (newNotificationState) {
        // Add to notifications if not already there
        if (!notifiedFlightNumbers.includes(flightNumber)) {
          notifiedFlightNumbers.push(flightNumber);
        }
      } else {
        // Remove from notifications
        notifiedFlightNumbers = notifiedFlightNumbers.filter(num => num !== flightNumber);
      }
      
      localStorage.setItem('notifiedFlights', JSON.stringify(notifiedFlightNumbers));
    } catch (error) {
      console.error("Error toggling notification:", error);
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
      {loading ? (
        <div className="text-center py-8">
          <p>Loading flights...</p>
        </div>
      ) : flights.length === 0 ? (
        <div className="text-center py-8">
          <p>No flights added yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Add a flight to get started
          </p>
        </div>
      ) : (
        flights.map((flight, index) => (
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
        ))
      )}
    </>
  );
};

export default Flights;