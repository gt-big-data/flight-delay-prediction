import React from "react";
import { icons, images } from "../../constants";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, firestore } from '../../firebase-config';
import { collection, doc, setDoc } from 'firebase/firestore';

const SignIn = ({ onSignIn }) => {
  
  const auth = getAuth();
  
  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();

      
      // Configure to always show account selection dialog
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        const token = await result.user.getIdToken();
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          token: token,
        };

        try {
          // Create user document in Firestore
          const userDoc = {
            email: result.user.email,
            fullName: result.user.displayName,
            uid: result.user.uid,
            updateFrequency: 'daily',
            dateCreated: new Date(),
            profilePhotoUrl: result.user.photoURL,
            lastSignIn: new Date() // Add last sign in time
          };

          // Save user document to Firestore with merge option
          await setDoc(doc(firestore, 'users', result.user.uid), userDoc, { merge: true });

          // Store authentication data in localStorage
          localStorage.setItem('authToken', token);
          localStorage.setItem('userData', JSON.stringify(userData));

          onSignIn(userData);
        } catch (firestoreError) {
          console.error("Error saving user data to Firestore:", firestoreError);
          // Show a more user-friendly error message
          alert("Successfully signed in, but there was an error saving your profile. Some features may be limited.");
          // Still allow sign in even if Firestore fails
          onSignIn(userData);
        }
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Failed to sign in. Please try again.");
    }
  };

  const addFlight = async (flightData) => {
    const flightDoc = {
      flightNumber: flightData.flightNumber,
      date: flightData.date,
    };

    await setDoc(doc(collection(firestore, 'users', result.user.uid, 'flights'), flightData.flightNumber), flightDoc);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      {/* Logo */}
      <div className="flex flex-row">
        <img
          src={images.gt}
          alt="gt Logo"
          className="object-contain w-20 h-20 mx-auto"
        />
        <img
          src={images.bdbi}
          alt="bdbi Logo"
          className="object-contain w-20 h-20 mx-auto"
        />
      </div>

      {/* Application Overview */}
      <div className="space-y-4 mb-6">
        <h1 className="text-lg font-bold text-gray-800">
          Flight Delay Prediction
        </h1>
        <p className="text-gray-600 text-sm">
          Stay informed and take control of your travel with our advanced flight
          delay prediction technology powered by machine learning model.
        </p>
      </div>

      {/* Sign-In Button */}
      <button
        onClick={handleSignIn}
        className="bg-[#0360F0] text-white text-sm font-semibold py-2 px-6 rounded-md hover:bg-blue-500 transition-colors"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;