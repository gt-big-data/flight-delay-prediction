import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch, { RequestInit, Response } from 'node-fetch';

const fetchWrapper = (url: string, init?: RequestInit): Promise<Response> => fetch(url, init);

admin.initializeApp();

export const helloWorld = functions.https.onCall((data, context) => {
  return { message: 'Hello from Firebase!' };
});

export const addUserFlight = functions.https.onCall(async (data, context) => {
    const { userID, flightNumber, date } = data.data;

    // Validate input
    if (!userID || !flightNumber || !date) {
        return { success: false, message: 'Missing required fields' };
    }

    // Validate flight number format (e.g., AA1234)
    const flightNumberRegex = /^[A-Z]{2}\d{3,4}$/;
    if (!flightNumberRegex.test(flightNumber)) {
        return { success: false, message: 'Invalid flight number format' };
    }

    try {
        // Fetch flight details from airline API
        const flightDetails = await fetchFlightDetails(flightNumber);
        if (!flightDetails) {
            return { success: false, message: 'Flight not found' };
        }

        // Get delay prediction from Vertex AI
        const delayPrediction = await getDelayPrediction(flightDetails);

        // Create flight document in Firestore
        const flightRef = await admin.firestore().collection('flights').add({
            userID,
            flightNumber,
            date,
            details: flightDetails,
            delayPrediction,
        });

        // Link flight to user document
        await admin.firestore().collection('users').doc(userID).update({
            flights: admin.firestore.FieldValue.arrayUnion(flightRef.id),
        });

        return { success: true, flightID: flightRef.id };
    } catch (error) {
        console.error('Error adding flight:', error);
        return { success: false, message: 'Error adding flight' };
    }
});

// Function to fetch flight details from airline API
async function fetchFlightDetails(flightNumber: string): Promise<any> {
    const response = await fetchWrapper(`https://api.airline.com/flights/${flightNumber}`);
    if (!response.ok) {
        throw new Error('Failed to fetch flight details');
    }
    return await response.json();
}

// Function to get delay prediction from Vertex AI
async function getDelayPrediction(flightDetails: any): Promise<any> {
    const response = await fetch('https://vertex-ai-endpoint-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ flightDetails }),
    });
    if (!response.ok) {
        throw new Error('Failed to get delay prediction');
    }
    return await response.json();
}

