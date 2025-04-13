import React, { useState } from "react";
import { auth, firestore } from '../../firebase-config'; // Adjust path if needed
import { collection, doc, setDoc } from 'firebase/firestore';
import { getFlightDelayPrediction } from '../services/flightService';

const AddFlight = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState(""); // Only keeping flightNumber and date
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [predictionStatus, setPredictionStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);
    setPredictionStatus("Fetching flight information...");

    // Get the current user's ID
    const user = auth.currentUser; // Get the authenticated user
    if (!user) {
      setError("User not authenticated");
      setIsSubmitting(false);
      setPredictionStatus("");
      return;
    }

    try {
      // Get flight prediction data
      setPredictionStatus("Analyzing flight and weather data...");
      const predictionData = await getFlightDelayPrediction(flightNumber, date);
      setPredictionStatus("Generating delay prediction...");
      
      // Extract relevant flight information
      const flightData = {
        flightNumber,
        date,
        predictedDelay: predictionData.prediction,
        depAirport: predictionData.flightData.departure.iataCode,
        arrAirport: predictionData.flightData.arrival.iataCode,
        airline: predictionData.flightData.airline.name,
        notification: false,
        
        // Additional details for display
        departureTime: predictionData.flightData.departure.scheduledTime,
        arrivalTime: predictionData.flightData.arrival.scheduledTime,
        
        // Weather information
        originWeather: {
          temp: predictionData.originWeather.main.temp,
          description: predictionData.originWeather.weather[0].description,
          icon: predictionData.originWeather.weather[0].icon
        },
        destWeather: {
          temp: predictionData.destWeather.main.temp,
          description: predictionData.destWeather.weather[0].description,
          icon: predictionData.destWeather.weather[0].icon
        },
        
        // Delay category based on prediction
        delay: categorizeDelay(predictionData.prediction),
        
        // Timestamp for sorting
        createdAt: new Date().toISOString()
      };

      // Store in Firestore
      await addFlight(user.uid, flightData);
      setPredictionStatus("");
      setSuccess(true);
      
      // Reset form
      setFlightNumber("");
      setDate("");
    } catch (err) {
      setError(`Error: ${err.message}`);
      setPredictionStatus("");
      console.error("Error processing flight:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Categorize delay into display message
  const categorizeDelay = (delay) => {
    if (delay <= 0) return "No Delay";
    if (delay < 30) return "0-30 mins";
    if (delay < 60) return "30-60 mins";
    if (delay < 90) return "60-90 mins";
    if (delay < 120) return "90-120 mins";
    return "120 mins+";
  };

  const addFlight = async (userId, flightData) => {
    // Store in the nested flights collection within the user document
    const userDocRef = doc(firestore, 'users', userId);
    const flightsCollectionRef = collection(userDocRef, 'flights');
    
    // Use a unique ID that combines flight number and date
    const flightId = `${flightData.flightNumber}_${flightData.date.replace(/[^0-9]/g, '')}`;
    
    await setDoc(doc(flightsCollectionRef, flightId), flightData);
    console.log("Flight Added with prediction:", flightData);
  };

  return (
    <div className="add-flight-container">
      <h2>Add a Flight</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Flight added successfully with delay prediction!</div>}
      {predictionStatus && <div className="status-message">{predictionStatus}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="flightNumber">Flight Number (e.g., AA123):</label>
          <input
            type="text"
            id="flightNumber"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
            placeholder="AA123"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Flight Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting || !flightNumber || !date}
          className="submit-button"
        >
          {isSubmitting ? 'Processing...' : 'Add Flight & Get Prediction'}
        </button>
      </form>
    </div>
  );
};

export default AddFlight;
