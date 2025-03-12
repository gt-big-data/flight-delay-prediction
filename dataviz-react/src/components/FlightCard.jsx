import Button from "./Button";
import Arrow from "./Arrow";
import logos from "../../constants/logos";
import icons from "../../constants/icons";
import weather from "../../constants/weather";
import { useEffect, useState } from "react";

const FlightCard = ({
  airlineName,
  airlineLogo,
  flightNumber,
  departure,
  arrival,
  delayStatus,
  layover,
  onBellClick,
  lastUpdated,
  infoUrl,
  removeFlight,
  notificationOn,
}) => {
  // Color variation handler
  const getDelayStatusColor = (message) => {
    switch (message) {
      case "On Time":
        return "bg-[#3EDC6B]"; // Green
      case "0-30 mins":
        return "bg-[#34A853]"; // Darker Green
      case "30-60 mins":
        return "bg-[#FBBC05]"; // Yellow
      case "60-90 mins":
        return "bg-[#FF7B00]"; // Orange
      case "90-120 mins":
        return "bg-[#EA4335]"; // Red
      case "120 mins+":
        return "bg-[#DE221E]"; // Darker Red
      default:
        return "bg-gray-400"; // For Delay Time Unknown, or in case of data == null
    }
  };

  const [elapsedTime, setElapsedTime] = useState("Just now");

  // Function to calculate the elapsed time since last update - with safety checks
  const calculateElapsedTime = (lastUpdatedValue) => {
    try {
      // Make sure lastUpdatedValue is a valid Date object
      let updateTime;
      if (!lastUpdatedValue) {
        return "Just now";
      }
      
      if (lastUpdatedValue instanceof Date) {
        updateTime = lastUpdatedValue;
      } else {
        updateTime = new Date(lastUpdatedValue);
      }
      
      if (isNaN(updateTime.getTime())) {
        return "Just now";
      }
      
      const now = new Date();
      const diffInMinutes = Math.floor((now - updateTime) / (1000 * 60));

      if (diffInMinutes === 0) {
        return "Just now";
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
      } else {
        const diffInHours = Math.floor(diffInMinutes / 60);
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
      }
    } catch (error) {
      console.error("Error calculating time:", error);
      return "Just now";
    }
  };

  // Update the elapsed time every minute
  useEffect(() => {
    // Set initial value
    setElapsedTime(calculateElapsedTime(lastUpdated));
    
    const interval = setInterval(() => {
      setElapsedTime(calculateElapsedTime(lastUpdated));
    }, 60000); // Update every 60 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <div className="border border-gray-200 rounded-lg p-4 pb-2 mb-4 shadow-sm">
      {/* Top Section: Airline Info */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <img
            src={logos[airlineLogo]}
            alt={`${airlineName} logo`}
            className="w-10 h-10 object-contain"
          />
          <div>
            <h3 className="text-base font-semibold underline">{airlineName}</h3>
            <p className="text-sm text-[#808089]">{flightNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            src={icons.info}
            handler={() => {
              if (infoUrl) {
                window.open(infoUrl, "_blank");
              }
            }}
            size={14}
            alt="Info Icon"
          />
          <div className={notificationOn ? "bg-blue-200 rounded-full" : ""}>
            <Button
              src={
                notificationOn ? icons.notification_on : icons.notification_off
              }
              handler={onBellClick}
              size={14}
              alt="Notification Icon"
              customStyle={notificationOn ? "text-blue-600" : ""}
            />
          </div>
          <Button
            src={icons.remove}
            handler={removeFlight}
            size={14}
            alt="Remove Icon"
          />
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-300 mb-4"></div>

      {/* Bottom Section: Flight Route Details */}
      <div className="flex justify-between items-center mb-2">
        {/* Departure Details */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold">{departure.location}</h4>
            <Button
              src={weather[departure.weather]}
              size={12}
              alt={`${departure.weather} Icon`}
              customStyle={``}
            />
          </div>
          <p className="text-sm font-medium">{departure.time}</p>
          <p className="text-xs text-[#808089]">{departure.date}</p>
        </div>

        {/* Flight Duration and Arrow */}
        <div className="flex flex-col items-center">
          <p className="text-[#808089] text-xs">{arrival.duration}</p>
          <Arrow />
          {/* Stops Information (contains layover info) */}
          <p className="text-xs text-blue-500">{arrival.stops}</p>
        </div>

        {/* Arrival Details */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold">{arrival.location}</h4>
            <Button
              src={weather[arrival.weather]}
              size={12}
              alt={`${arrival.weather} Icon`}
              customStyle={``}
            />
          </div>
          <p className="text-sm font-medium">{arrival.time}</p>
          <p className="text-xs text-[#808089]">{arrival.date}</p>
        </div>
      </div>

      {/* Delay Status */}
      <div
        className={`flex flex-col text-center px-4 py-2 rounded-md text-black font-[500] text-sm ${getDelayStatusColor(delayStatus.message)}`}
      >
        {`Expected delay : ${delayStatus.message}`}
        {/* Update Status */}
        <h3 className="w-fit self-center text-xs underline font-normal">
          Last Updated: {elapsedTime}
        </h3>
      </div>

      <div className="flex justify-center items-center pt-2 w-full">
        <h3 className="text-[10px] cursor-pointer underline text-[#808089]">
          Search for Alternative Ticket
        </h3>
      </div>
    </div>
  );
};

export default FlightCard;