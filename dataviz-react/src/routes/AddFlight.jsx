import React, { useState } from "react";
import { auth, firestore } from '../../firebase-config'; // Import Firestore
import { collection, doc, setDoc } from 'firebase/firestore';

const AddFlight = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState(""); // Only keeping flightNumber and date

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current user's ID
    const user = auth.currentUser; // Get the authenticated user
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    // Prepare flight data with dummy values
    const flightData = {
      flightNumber,
      date,
      delay: "No Delay", // Dummy value
      notification: false, // Dummy value
      depAirport: "ATL", // Dummy value
      arrAirport: "LAX", // Dummy value
      airline: "Dummy Airline", // Dummy value
    };

    // Call the addFlight function
    await addFlight(user.uid, flightData);
  };

  const addFlight = async (userId, flightData) => {
    const flightDoc = {
      flightNumber: flightData.flightNumber,
      date: flightData.date,
      delay: flightData.delay,
      notification: flightData.notification,
      depAirport: flightData.depAirport,
      arrAirport: flightData.arrAirport,
      airline: flightData.airline,
    };

    await setDoc(doc(collection(firestore, 'users', userId, 'flights'), flightData.flightNumber), flightDoc);
    console.log("Flight Added:", flightDoc);
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Add Flight</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Flight Number
          </label>
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., AA123"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-[#0360F0] text-white text-sm font-semibold py-2 w-full rounded-md hover:bg-blue-500 transition-colors"
        >
          Add Flight
        </button>
      </form>
    </div>
  );
};

export default AddFlight;
