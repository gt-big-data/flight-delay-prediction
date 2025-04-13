// Mock flight data service for testing without API calls

export const getFlightDetails = async (flightNumber, date) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock flight data
  return {
    airline: {
      iataCode: flightNumber.substring(0, 2),
      name: getAirlineName(flightNumber.substring(0, 2))
    },
    flight: {
      number: flightNumber.substring(2).trim()
    },
    departure: {
      iataCode: "ATL",
      scheduledTime: "08:30",
      latitude: 33.6407,
      longitude: -84.4277
    },
    arrival: {
      iataCode: "LAX",
      scheduledTime: "10:45",
      latitude: 33.9416,
      longitude: -118.4085
    }
  };
};

export const getWeatherData = async (lat, lon, date) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock weather data
  return {
    main: {
      temp: 22.5,
      humidity: 65
    },
    weather: [
      {
        description: "partly cloudy",
        icon: "02d"
      }
    ],
    clouds: {
      all: 40
    },
    wind: {
      speed: 5.2,
      deg: 180
    }
  };
};

export const getPrediction = async (modelInput) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Return mock prediction
  return {
    prediction: [Math.random() * 60] // Random delay between 0-60 minutes
  };
};

export const getFlightDelayPrediction = async (flightNumber, date) => {
  try {
    // Get mock data
    const flightData = await getFlightDetails(flightNumber, date);
    const originWeather = await getWeatherData(
      flightData.departure.latitude, 
      flightData.departure.longitude,
      date
    );
    const destWeather = await getWeatherData(
      flightData.arrival.latitude,
      flightData.arrival.longitude,
      date
    );
    
    // Get mock prediction
    const predictionResult = await getPrediction([]);
    
    return {
      flightData,
      originWeather,
      destWeather,
      prediction: predictionResult.prediction[0]
    };
  } catch (error) {
    console.error('Error in mock flight delay prediction:', error);
    throw error;
  }
};

// Helper function to get airline name from code
function getAirlineName(code) {
  const airlines = {
    'AA': 'American Airlines',
    'DL': 'Delta Air Lines',
    'UA': 'United Airlines',
    'WN': 'Southwest Airlines',
    'B6': 'JetBlue Airways',
    'AS': 'Alaska Airlines',
    'NK': 'Spirit Airlines',
    'F9': 'Frontier Airlines'
  };
  
  return airlines[code] || 'Unknown Airline';
} 