import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { icons } from "../../constants";
import Button from "./Button";

const Header = ({ onRefresh, isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic title based on the current route
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Sign In";
      case "/flights":
        return "Saved Flights";
      case "/setting":
        return "Settings";
      case "/notification":
        return "Notifications";
      case "/profile":
        return "Profile";
      default:
        return "App";
    }
  };

  return (
    <>
      <div className="flex w-full h-[38px] text-base justify-between items-center border-b border-gray-300">
        {/* Left */}
        <div className="flex items-center justify-start h-full gap-1 p-2">
          <img src={icons.favicon} className="w-[22px] h-[22px]" />
          <h2 className="text-sm font-medium">{getTitle()}</h2>
          {/* Divider */}
          <div className="h-full border-l border-gray-300 mx-2"></div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end h-full gap-2 p-2">
          {/* Only allowing navigation between menu's when authenticated */}
          {isAuthenticated && (
            <>
              <Button
                src={icons.refresh}
                handler={onRefresh}
                size={16}
                customStyle={``}
              />
              <Button
                src={icons.ticket}
                handler={() => navigate("/flights")}
                size={16}
                customStyle={``}
              />
              <Button
                src={icons.notification_on}
                handler={() => navigate("/notification")}
                size={16}
                customStyle={``}
              />
              <Button
                src={icons.setting}
                handler={() => navigate("/setting")}
                size={16}
                customStyle={``}
              />
              <Button
                src={icons.user}
                handler={() => navigate("/profile")}
                size={16}
                customStyle={``}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
