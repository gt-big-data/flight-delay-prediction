const flightData = [
  {
    airlineLogo: "delta",
    airlineName: "Delta",
    flightNumber: "DL 1298",
    departure: {
      location: "ATL",
      time: "09:33 AM",
      date: "Wed, 10/16/2024",
      weather: "sunny", // Corresponding weather condition
    },
    arrival: {
      location: "HND",
      time: "1:10 PM",
      date: "Thu, 10/17/2024",
      duration: "14h 37m",
      stops: "Nonstop",
      weather: "partly_cloudy", // Corresponding weather condition
    },
    delayStatus: {
      isDelayed: false,
      message: "On Time",
    },
    layover: null,
  },
  {
    airlineLogo: "ac",
    airlineName: "Air Canada",
    flightNumber: "AC 8956",
    departure: {
      location: "ATL",
      time: "06:00 AM",
      date: "Wed, 10/16/2024",
      weather: "fog", // Corresponding weather condition
    },
    arrival: {
      location: "HND",
      time: "3:40 PM",
      date: "Thu, 10/17/2024",
      duration: "20h 40m",
      stops: "*4hr 59min layover",
      weather: "cloudy_clear_at_times", // Corresponding weather condition
    },
    delayStatus: {
      isDelayed: true,
      message: "0-30 mins",
    },
    layover: "*4hr 59min layover",
  },
  {
    airlineLogo: "american",
    airlineName: "American Airlines",
    flightNumber: "AA 764",
    departure: {
      location: "ATL",
      time: "08:45 AM",
      date: "Wed, 10/16/2024",
      weather: "rain_and_sun", // Corresponding weather condition
    },
    arrival: {
      location: "NRT",
      time: "3:30 PM",
      date: "Thu, 10/17/2024",
      duration: "14h 45m",
      stops: "Nonstop",
      weather: "partly_cloudy_night", // Corresponding weather condition
    },
    delayStatus: {
      isDelayed: true,
      message: "30-60 mins",
    },
    layover: null,
  },
  {
    airlineLogo: "ua",
    airlineName: "United",
    flightNumber: "UA 1129",
    departure: {
      location: "ATL",
      time: "07:15 AM",
      date: "Wed, 10/16/2024",
      weather: "scattered_showers", // Corresponding weather condition
    },
    arrival: {
      location: "HND",
      time: "2:00 PM",
      date: "Thu, 10/17/2024",
      duration: "16h 06m",
      stops: "*1hr 16min layover",
      weather: "rain_and_thunderstorm", // Corresponding weather condition
    },
    delayStatus: {
      isDelayed: true,
      message: "60-90 mins",
    },
    layover: "*1hr 16min layover",
  },
  {
    airlineLogo: "frontier",
    airlineName: "Frontier",
    flightNumber: "FR 800",
    departure: {
      location: "ATL",
      time: "11:00 AM",
      date: "Wed, 10/16/2024",
      weather: "cloudy", // Corresponding weather condition
    },
    arrival: {
      location: "ORD",
      time: "12:45 PM",
      date: "Wed, 10/16/2024",
      duration: "2h 45m",
      stops: "Nonstop",
      weather: "wind", // Corresponding weather condition
    },
    delayStatus: {
      isDelayed: true,
      message: "90-120 mins",
    },
    layover: null,
  },
  {
    airlineLogo: "sw",
    airlineName: "Southwest",
    flightNumber: "SW 553",
    departure: {
      location: "ATL",
      time: "10:30 AM",
      date: "Wed, 10/16/2024",
      weather: "scattered_thunderstorm", // Corresponding weather condition
    },
    arrival: {
      location: "LAX",
      time: "1:15 PM",
      date: "Wed, 10/16/2024",
      duration: "5h 45m",
      stops: "Nonstop",
      weather: "heavy_rain", // Corresponding weather condition
    },
    delayStatus: {
      isDelayed: true,
      message: "120 mins+",
    },
    layover: null,
  },
];

export default flightData;
