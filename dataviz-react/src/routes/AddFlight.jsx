import React, { useState } from "react";

const AddFlight = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Flight Added:", {
      flightNumber,
      airlineName,
      departure,
      arrival,
    });
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
            Airline Name
          </label>
          <input
            type="text"
            value={airlineName}
            onChange={(e) => setAirlineName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., American Airlines"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Departure
          </label>
          <input
            type="text"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 10:00 AM"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Arrival
          </label>
          <input
            type="text"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 2:00 PM"
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
