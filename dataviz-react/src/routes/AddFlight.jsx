import React, { useState } from "react";
import { auth, firestore } from '../../firebase-config'; // Import Firestore
import { collection, doc, setDoc } from 'firebase/firestore';

const AddFlight = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState(""); // Only keeping flightNumber and date
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    // Get the current user's ID
    const user = auth.currentUser; // Get the authenticated user
    if (!user) {
      setError("User not authenticated");
      setIsSubmitting(false);
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
    try {
      await addFlight(user.uid, flightData);
      setSuccess(true);
      // Reset form
      setFlightNumber("");
      setDate("");
    } catch (err) {
      setError(`Error adding flight: ${err.message}`);
      console.error("Error adding flight:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFlight = async (userId, flightData) => {
    // Store in the nested flights collection within the user document
    const userDocRef = doc(firestore, 'users', userId);
    const flightsCollectionRef = collection(userDocRef, 'flights');
    await setDoc(doc(flightsCollectionRef, flightData.flightNumber), flightData);
    console.log("Flight Added:", flightData);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add a Flight</h2>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Flight added successfully!
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Flight Number
          </label>
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g. DL1234"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-2 rounded-md ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Flight"}
        </button>
      </form>
    </div>
  );
};

export default AddFlight;
