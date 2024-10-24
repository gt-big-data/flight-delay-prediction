import React from "react";
import { icons, images } from "../../constants";

const SignIn = ({ onSignIn }) => {
  // TODO: hanlde sign in with authentication logic
  // For now, simulating successful signin.
  const handleSignIn = () => {
    onSignIn();
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
        Sign In to Continue
      </button>
    </div>
  );
};

export default SignIn;
