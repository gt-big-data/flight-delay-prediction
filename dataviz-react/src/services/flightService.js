import axios from 'axios';

// API endpoints
const FLIGHT_API_ENDPOINT = 'https://aviation-edge.com/v2/public/flights';
const FLIGHT_API_KEY = 'f05907-bfe7ed';

const WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = '67b79d39c566c9c970e97f1902772237';

const PREDICTION_API_ENDPOINT = 'https://flight-delay-api-20335630077.us-central1.run.app';

// Get flight details by flight number and date
export const getFlightDetails = async (flightNumber, date) => {
  try {
    // Parse airline code and flight number
    const airlineCode = flightNumber.substring(0, 2);
    const flightNum = flightNumber.substring(2).trim();
    
    const response = await axios.get(FLIGHT_API_ENDPOINT, {
      params: {
        key: FLIGHT_API_KEY,
        flightIata: flightNumber,
        date: date
      }
    });
    
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    throw new Error('Flight not found');
  } catch (error) {
    console.error('Error fetching flight details:', error);
    throw error;
  }
};

// Get weather data for a location
export const getWeatherData = async (lat, lon, date) => {
  try {
    // For historical data, you might need a different API
    // This example uses current weather
    const response = await axios.get(WEATHER_API_ENDPOINT, {
      params: {
        lat: lat,
        lon: lon,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Get day of week (1-7)
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  return date.getDay() === 0 ? 7 : date.getDay();
};

// Prepare model input array
export const prepareModelInput = (flightData, originWeather, destWeather) => {
  const flightDate = new Date(flightData.departure.scheduledTime);
  const year = flightDate.getFullYear();
  const month = flightDate.getMonth() + 1;
  const dayOfMonth = flightDate.getDate();
  const dayOfWeek = getDayOfWeek(flightData.departure.scheduledTime);
  const hour = flightDate.getHours();
  
  // Create airline one-hot encoding (simplified)
  const airlineCode = flightData.airline.iataCode;
  
  // Calculate distance using Haversine formula
  const distance = calculateDistance(
    flightData.departure.latitude,
    flightData.departure.longitude,
    flightData.arrival.latitude,
    flightData.arrival.longitude
  );
  
  // Create the base feature array with known values
  const features = [
    year,
    month,
    dayOfMonth,
    dayOfWeek,
    parseInt(flightData.flight.number),
    parseInt(flightData.departure.scheduledTime.replace(':', '')),
    parseInt(flightData.arrival.scheduledTime.replace(':', '')),
    1, // FLIGHTS is always 1
    distance,
    flightData.departure.latitude,
    flightData.departure.longitude,
    flightData.arrival.latitude,
    flightData.arrival.longitude,
    originWeather.main.temp,
    originWeather.main.humidity,
    originWeather.rain ? originWeather.rain['1h'] || 0 : 0,
    originWeather.rain ? originWeather.rain['1h'] || 0 : 0,
    originWeather.snow ? originWeather.snow['1h'] || 0 : 0,
    0, // snow_depth - not available in OpenWeatherMap
    originWeather.clouds.all,
    0, // cloud_cover_low - not directly available
    0, // cloud_cover_mid - not directly available
    0, // cloud_cover_high - not directly available
    originWeather.wind.speed,
    0, // wind_speed_100m - not available in basic OpenWeatherMap
    originWeather.wind.deg,
    0, // wind_direction_100m - not available in basic OpenWeatherMap
    0, // wind_gusts_10m - not consistently available
    hour
  ];
  
  // Create one-hot encoding for day of week (7 positions)
  const dayOfWeekEncoding = Array(7).fill(0);
  dayOfWeekEncoding[dayOfWeek - 1] = 1;
  
  // Create one-hot encoding for airline (simplified - actual implementation would need a mapping of all airlines)
  // This is a placeholder - you'll need to expand based on your model's requirements
  const airlineEncoding = Array(30).fill(0);
  // Set the position for this airline to 1 (you'll need a mapping function)
  // For example: airlineEncoding[getAirlineIndex(airlineCode)] = 1;
  
  // Combine all features
  const allFeatures = [
    ...features,
    ...dayOfWeekEncoding,
    ...airlineEncoding
  ];
  
  // Fill remaining positions with zeros to match expected input size
  while (allFeatures.length < 723) {
    allFeatures.push(0);
  }
  
  return allFeatures;
};

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance * 0.621371; // Convert to miles
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

// Get prediction from API
export const getPrediction = async (modelInput) => {
  try {
    const response = await axios.post(`${PREDICTION_API_ENDPOINT}/predict`, {
      instances: [modelInput]
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting prediction:', error);
    throw error;
  }
};

// Complete process to get flight delay prediction
export const getFlightDelayPrediction = async (flightNumber, date) => {
  try {
    // 1. Get flight details
    const flightData = await getFlightDetails(flightNumber, date);
    
    // 2. Get weather data for origin and destination
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
    
    // 3. Prepare model input
    const modelInput = prepareModelInput(
      flightData, 
      originWeather, 
      destWeather
    );
    
    // 4. Get prediction
    const predictionResult = await getPrediction(modelInput);
    
    // 5. Return all data
    return {
      flightData,
      originWeather,
      destWeather,
      prediction: predictionResult.prediction[0],
      modelInput
    };
  } catch (error) {
    console.error('Error in flight delay prediction process:', error);
    throw error;
  }
}; 