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
      location: "LAX",
      time: "11:30 AM",
      date: "Wed, 10/16/2024",
      duration: "5h 57m",
      stops: "Nonstop",
      weather: "partly_cloudy", // Corresponding weather condition
    },
    delayStatus: {
      isDelayed: false,
      message: "On Time",
    },
    layover: null,
    infoUrl: "https://www.delta.com/us/en/baggage/overview",
    notificationOn: false, // Notification status
  },
  {
    airlineLogo: "american",
    airlineName: "American",
    flightNumber: "AA 764",
    departure: {
      location: "ATL",
      time: "08:45 AM",
      date: "Wed, 10/16/2024",
      weather: "rain_and_sun", // Corresponding weather condition
    },
    arrival: {
      location: "ORD",
      time: "10:30 AM",
      date: "Wed, 10/16/2024",
      duration: "1h 45m",
      stops: "Nonstop",
      weather: "partly_cloudy_night", // Corresponding weather condition
    },
    delayStatus: {
      isDelayed: true,
      message: "0-30 mins",
    },
    layover: null,
    infoUrl: "https://www.aa.com/i18n/travel-info/baggage/baggage.jsp",
    notificationOn: true, // Notification status
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
      location: "DEN",
      time: "09:30 AM",
      date: "Wed, 10/16/2024",
      duration: "3h 15m",
      stops: "*1hr 16min layover",
      weather: "rain_and_thunderstorm", // Corresponding weather condition
    },
    delayStatus: {
      isDelayed: true,
      message: "30-60 mins",
    },
    layover: "*1hr 16min layover",
    infoUrl: "https://www.united.com/ual/en/us/fly/travel/baggage.html",
    notificationOn: false, // Notification status
  },
  {
    airlineLogo: "spirit",
    airlineName: "Spirit",
    flightNumber: "NK 8956",
    departure: {
      location: "ATL",
      time: "06:00 AM",
      date: "Wed, 10/16/2024",
      weather: "fog", // Corresponding weather condition
    },
    arrival: {
      location: "DFW",
      time: "07:50 AM",
      date: "Wed, 10/16/2024",
      duration: "2h 50m",
      stops: "*4hr 59min layover",
      weather: "cloudy_clear_at_times", // Corresponding weather condition
    },
    delayStatus: {
      isDelayed: true,
      message: "60-90 mins",
    },
    layover: "*4hr 59min layover",
    infoUrl:
      "https://customersupport.spirit.com/en-us/category/article/KA-01535",
    notificationOn: false, // Notification status
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
    infoUrl: "https://www.flyfrontier.com/travel/travel-info/bag-options/",
    notificationOn: true, // Notification status
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
    infoUrl: "https://www.southwest.com/html/customer-service/baggage/",
    notificationOn: false, // Notification status
  },
];

export default flightData;
