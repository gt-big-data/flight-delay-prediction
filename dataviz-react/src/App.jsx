import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Flights from "./routes/Flights";
import Setting from "./routes/Setting";
import Notification from "./routes/Notification";
import Profile from "./routes/Profile";
import SignIn from "./auth/SignIn";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // TODO: change this and set it to the current logged in user (authentication)
  const [user, setUser] = useState({
    name: "George P. Burdell",
    email: "gburdell@gatech.edu",
  });
  const navigate = useNavigate();

  // Once log-in successful, redirect to the flight (main) page
  // ** TODO: change and set isAuthenticated to be true when log-in with google is successful
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/flights"); // Redirect to Flights after successful sign-in
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/"); // Redirect to SignIn page after logout
  };

  const handleRefresh = () => {
    setLastUpdated(new Date()); // Update the last updated timestamp
  };

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
