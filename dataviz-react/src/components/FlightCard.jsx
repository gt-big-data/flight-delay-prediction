import Button from "./Button";
import Arrow from "./Arrow";
import logos from "../../constants/logos";
import icons from "../../constants/icons";
import weather from "../../constants/weather";

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

  // Calculate time difference
  // Get the currentTime and lastUpdated time
  // currentTime - lastUpdated time = differentMinute -> what we want to show on the screen.
  const getTimeDifference = (lastUpdated) => {
    const currentTime = new Date();
    const diffInMs = currentTime - lastUpdated;
    const diffInMinutes = Math.floor(diffInMs / 60000);

    // Conditions for different stages
    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`; // minutes
    } else if (diffInMinutes < 24 * 60) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} hours ago`; // hours
    } else {
      const diffInDays = Math.floor(diffInMinutes / (60 * 24)); // days
      return `${diffInDays} days ago`;
    }
  };

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
            onClick={onBellClick}
            size={14}
            alt="Info Icon"
          />
          <Button
            src={icons.notification}
            onClick={onBellClick}
            size={14}
            alt="Notification Icon"
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
              onClick={onBellClick}
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
          <p className="text-xs text-blue-500 underline">{arrival.stops}</p>
        </div>

        {/* Arrival Details */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold">{arrival.location}</h4>
            <Button
              src={weather[arrival.weather]}
              onClick={onBellClick}
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
        <h3 className="w-fit self-center text-xs underline cursor-pointer font-normal">
          Search for Alternative Ticket
        </h3>
      </div>

      {/* Update Status */}
      <div className="pt-2 text-center text-[10px] text-[#808089]">
        Last Updated: {getTimeDifference(lastUpdated)}
      </div>
    </div>
  );
};

export default FlightCard;
