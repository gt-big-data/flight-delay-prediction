import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp();

interface FlightInput {
  flightNumber: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  date: string;
}

interface WeatherData {
  temperature_2m: number;
  relative_humidity_2m: number;
  precipitation: number;
  rain: number;
  snowfall: number;
  snow_depth: number;
  cloud_cover: number;
  cloud_cover_low: number;
  cloud_cover_mid: number;
  cloud_cover_high: number;
  wind_speed_10m: number;
  wind_speed_100m: number;
  wind_direction_10m: number;
  wind_direction_100m: number;
  wind_gusts_10m: number;
}

interface RequestData {
  userID: string;
  flights: FlightInput[];
}

export const predictFlightDelays = functions.https.onCall(async (data: any) => {
  const requestData = data as RequestData;
  try {
    // Validate input data
    if (!requestData.flights || !Array.isArray(requestData.flights)) {
      throw new Error('Invalid input - flights must be an array');
    }

    // Get airport coordinates from Firestore
    const airportsRef = admin.firestore().collection('airports');
    
    // Process each flight and get weather data
    const processedFlights = await Promise.all(requestData.flights.map(async (flight) => {
      // Get departure airport coordinates
      const depAirportDoc = await airportsRef.doc(flight.departureAirport).get();
      if (!depAirportDoc.exists) {
        throw new Error(`Airport ${flight.departureAirport} not found`);
      }
      const depAirport = depAirportDoc.data()!;

      // Get weather forecast
      const weatherResponse = await axios.get(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${depAirport.latitude}&longitude=${depAirport.longitude}&start_date=${flight.date}&end_date=${flight.date}&hourly=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,snow_depth,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_10m,wind_speed_100m,wind_direction_10m,wind_direction_100m,wind_gusts_10m`
      );

      // Extract weather data for the flight time
      const weather: WeatherData = {
        temperature_2m: weatherResponse.data.hourly.temperature_2m[0],
        relative_humidity_2m: weatherResponse.data.hourly.relative_humidity_2m[0],
        precipitation: weatherResponse.data.hourly.precipitation[0],
        rain: weatherResponse.data.hourly.rain[0],
        snowfall: weatherResponse.data.hourly.snowfall[0],
        snow_depth: weatherResponse.data.hourly.snow_depth[0],
        cloud_cover: weatherResponse.data.hourly.cloud_cover[0],
        cloud_cover_low: weatherResponse.data.hourly.cloud_cover_low[0],
        cloud_cover_mid: weatherResponse.data.hourly.cloud_cover_mid[0],
        cloud_cover_high: weatherResponse.data.hourly.cloud_cover_high[0],
        wind_speed_10m: weatherResponse.data.hourly.wind_speed_10m[0],
        wind_speed_100m: weatherResponse.data.hourly.wind_speed_100m[0],
        wind_direction_10m: weatherResponse.data.hourly.wind_direction_10m[0],
        wind_direction_100m: weatherResponse.data.hourly.wind_direction_100m[0],
        wind_gusts_10m: weatherResponse.data.hourly.wind_gusts_10m[0]
      };

      // Format data for Vertex AI
      const dayOfWeek = new Date(flight.date).getDay();
      const dayMapping = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

      return {
        ORIGIN: flight.departureAirport,
        DEST: flight.arrivalAirport,
        AIRLINE: flight.airline,
        DAY_OF_WEEK: dayMapping[dayOfWeek],
        DEP_DELAY: 0, // Initial departure delay
        temperature_2m: weather.temperature_2m,
        relative_humidity_2m: weather.relative_humidity_2m,
        precipitation: weather.precipitation,
        rain: weather.rain,
        snowfall: weather.snowfall,
        snow_depth: weather.snow_depth,
        cloud_cover: weather.cloud_cover,
        cloud_cover_low: weather.cloud_cover_low,
        cloud_cover_mid: weather.cloud_cover_mid,
        cloud_cover_high: weather.cloud_cover_high,
        wind_speed_10m: weather.wind_speed_10m,
        wind_speed_100m: weather.wind_speed_100m,
        wind_direction_10m: weather.wind_direction_10m,
        wind_direction_100m: weather.wind_direction_100m,
        wind_gusts_10m: weather.wind_gusts_10m
      };
    }));

    // Call Vertex AI endpoint
    const vertexAIEndpoint = ""; //add endpoint link
    const accessToken = await getAccessToken();

    const vertexResponse = await axios.post(
      vertexAIEndpoint,
      {
        instances: processedFlights
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Format and return predictions
    return requestData.flights.map((flight, index) => ({
      flightNumber: flight.flightNumber,
      predictedDelay: vertexResponse.data.predictions[index]
    }));

  } catch (error) {
    console.error('Error in predictFlightDelays:', error);
    throw new functions.https.HttpsError('internal', 'Error processing flight predictions');
  }
});

async function getAccessToken(): Promise<string> {
  try {
    const token = await admin.app().appCheck().createToken('vertex-ai-client');
    return token.token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Keep the existing helloWorld function
export const helloWorld = functions.https.onCall((data, context) => {
  return { message: 'Hello from Firebase!' };
});
