import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const API_URL = "https://flight-delay-api-xyz-uc.a.run.app/predict";

export async function getPrediction(features: number[]) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ instances: [features] }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch prediction");
  }

  const data = await response.json();
  return data.prediction;
}



// Keep the existing helloWorld function
export const helloWorld = functions.https.onCall((data, context) => {
  return { message: 'Hello from Firebase!' };
});
