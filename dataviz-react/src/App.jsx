import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Flights from "./routes/Flights";
import Setting from "./routes/Setting";
import Notification from "./routes/Notification";
import Profile from "./routes/Profile";

const App = () => {
  return (
    <div className="bg-[#DEE1E6] flex flex-row justify-center w-full rounded-xl">
      <div className="bg-white overflow-hidden w-[380px] h-[503px] relative rounded-xl flex flex-col">
        {/* Header Component */}
        <Header />
        {/* Main Content */}
        <div className="p-4 space-y-4 overflow-y-auto h-full scrollbar-hidden">
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<Flights />} />
            {/* Other Routes */}
            <Route path="/setting" element={<Setting />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/profile" element={<Profile />} />
            {/* Redirect unknown routes to the home page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
