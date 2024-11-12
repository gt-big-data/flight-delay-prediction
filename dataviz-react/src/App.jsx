import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "./components/Header";
import Flights from "./routes/Flights";
import Setting from "./routes/Setting";
import Notification from "./routes/Notification";
import Profile from "./routes/Profile";
import SignIn from "./auth/SignIn";
import AddFlight from "./routes/AddFlight";

const App = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  const navigate = useNavigate();
  const auth = getAuth();

  // Check authentication status on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // If user is authenticated, retrieve stored user data
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          // Update user state with stored data
          setUser({
            name: userData.name,
            email: userData.email,
          });
          setIsAuthenticated(true);

          // If on sign-in page, redirect to flights
          if (window.location.pathname === "/") {
            navigate("/flights");
          }
        }
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [auth, navigate]);

  // Handles user login
  // Once log-in successful, redirect to the flight (main) page
  const handleLogin = (userData) => {
    setUser({
      name: userData.name, // Set the name from Google sign-in
      email: userData.email, // Set the email from Google sign-in
    });
    setIsAuthenticated(true);
    navigate("/flights"); // Redirect to Flights after successful sign-in
  };

  // Handles user logout
  // Clears authentication state and navigates to sign-in page
  const handleLogout = () => {
    auth.signOut();
    setUser({ name: "", email: "" });
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    navigate("/"); // Redirect to SignIn page after logout
  };

  // Handles data refresh
  // Updates the lastUpdated timestamp to trigger data refresh
  const handleRefresh = () => {
    setLastUpdated(new Date()); // Update the last updated timestamp
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="bg-[#DEE1E6] flex flex-row justify-center w-full rounded-xl">
        <div className="bg-white w-[380px] h-[403px] flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#DEE1E6] flex flex-row justify-center w-full rounded-xl">
      <div className="bg-white overflow-hidden w-[380px] h-[403px] relative rounded-xl flex flex-col">
        {/* Header Component */}
        <Header isAuthenticated={isAuthenticated} onRefresh={handleRefresh} />
        {/* Main Content */}
        <div className="p-4 space-y-4 overflow-y-auto h-full scrollbar-hidden">
          <Routes>
            {/* Default Route - Sign In Page */}
            <Route path="/" element={<SignIn onSignIn={handleLogin} />} />
            {/* Protected Routes */}
            {isAuthenticated ? (
              <>
                <Route
                  path="/flights"
                  element={<Flights lastUpdated={lastUpdated} />}
                />
                <Route path="/setting" element={<Setting />} />
                <Route path="/notification" element={<Notification />} />
                <Route
                  path="/profile"
                  element={
                    <Profile
                      userName={user.name}
                      userEmail={user.email}
                      onLogout={handleLogout}
                    />
                  }
                />
                <Route path="/addflight" element={<AddFlight />} />
              </>
            ) : (
              // Redirect any unauthorized access to the Sign In page
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
          {/* Footer Component */}
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default App;
