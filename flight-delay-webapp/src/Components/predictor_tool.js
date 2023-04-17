import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "../App.css";
import InputLabel from '@mui/material/InputLabel';
import { Box, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Papa from "papaparse";
import AirlineData from "./data/airlines.csv";
import DestinationData from "./data/destination.csv";
import OriginData from "./data/origin.csv";


const theme = createTheme({
  palette: {
    primary: {
      main: "#578590",
    },
    secondary: {
      main: "#2C3444",
    },
    contrastThreshold: 3,
  },
});


export default function Predictor_Tool() {
  const [airline, setAirline] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [showError, setShowError] = useState(false);
  const [weekDay, setWeekDay] = useState("");
  const [departureDelay, setDepartureDelay] = useState("");
  const [prediction, setPrediction] = useState("");


  const [airlineOptions, setAirlineOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [originOptions, setOriginOptions] = useState([]);

  useEffect(() => {
    const fetchAirlineData = async () => {
      const response = await fetch(AirlineData);
      const text = await response.text();
      const parsed = Papa.parse(text, { header: false });
      const airlineCodes = parsed.data.flat();
      setAirlineOptions(airlineCodes);
    };
    fetchAirlineData();
    const fetchDestinationData = async () => {
      const response = await fetch(DestinationData);
      const text = await response.text();
      const parsed = Papa.parse(text, { header: false });
      const destinations = parsed.data.flat();
      setDestinationOptions(destinations);
    };
    fetchDestinationData();
    const fetchOriginData = async () => {
      const response = await fetch(OriginData);
      const text = await response.text();
      const parsed = Papa.parse(text, { header: false });
      const origins = parsed.data.flat();
      setOriginOptions(origins);
    };
    fetchOriginData();
  }, []);

  const handleAirlineChange = (event) => {
    setAirline(event.target.value);
  };
  const handleDepartureChange = (event) => {
    setDepartureAirport(event.target.value);
  };
  const handleDepartureDelayChange = (event) => {
    setDepartureDelay(event.target.value);
  };
  const handleArrivalChange = (event) => {
    setArrivalAirport(event.target.value);
  };
  const handleWeekDayChange = (event) => {
    setWeekDay(event.target.value);
  };

  const onSubmit = (e) => {
    setShowError(true);
    createJSONFile();
  };
  const createJSONFile = () => {
    const data = { 
      ORIGIN: departureAirport, 
      DEST: arrivalAirport, 
      AIRLINE: airline,
      DEP_DELAY: departureDelay,
      DAY_OF_WEEK: weekDay
    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      switch(data.prediction) {
        case "DEL_0_30":
          setPrediction("Delayed 0-30 Minutes");
          break;
        case "DEL_30_60":
          setPrediction("Delayed 30-60 Minutes");
          break;
        case "DEL_60":
          setPrediction("Delayed 60+ Minutes");
          break;
        default:
          setPrediction(data.prediction);
      }
    })
   
  };

  return (
    <FormControl
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        margin: "auto",
        justifyContent: "center",
        paddingY: 10,
      }}
    >
      <Box>
        <Box>
          <Stack className="toolTitleBox">
            <b id="predictorTool">Predictor Tool</b> <br />
            Enter in the Flight Number and the Departure Destination of your
            upcoming flight. Then click predict to recieve a percentage of delay
          </Stack>
        </Box>
        <Stack
          direction="row"
          className=""
          sx={{
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
            marginBottom: 4,
            gap: 2,
          }}
        >
          <Stack
            sx={{
              display: "flex",
              gap: 2,
              width: 493,
            }}
          >
            <FormControl sx={{gap: 2}}>
              <InputLabel id="airline-label">Airline</InputLabel>
              <Select
                labelId="airline-select-label"
                id="airline-select"
                value={airline}
                label="Airline"
                onChange={handleAirlineChange}
              >
                {airlineOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{gap: 2}}>
              <InputLabel id="departure-label">Departing From</InputLabel>
              <Select
                labelId="departing-select-label"
                id="departing-select"
                value={departureAirport}
                label="Departing from"
                onChange={handleDepartureChange}
              >
                {originOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{gap: 2}}>
              <InputLabel id="arriving-label">Arriving At*</InputLabel>
              <Select
                labelId="arriving-select-label"
                id="arriving-select"
                value={arrivalAirport}
                label="Arriving At*"
                onChange={handleArrivalChange}
              >
                {destinationOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{gap: 2}}>
              <InputLabel id="day-label">Day of the Week</InputLabel>
              <Select
                labelId="day-select-label"
                id="day-select"
                value={weekDay}
                label="Day of the Week"
                onChange={handleWeekDayChange}
              >
                  <MenuItem value={"MON"}>Monday</MenuItem>
                  <MenuItem value={"TUE"}>Tuesday</MenuItem>
                  <MenuItem value={"WED"}>Wednesday</MenuItem>
                  <MenuItem value={"THU"}>Thursday</MenuItem>
                  <MenuItem value={"FRI"}>Friday</MenuItem>
                  <MenuItem value={"SAT"}>Saturday</MenuItem>
                  <MenuItem value={"SUN"}>Sunday</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{gap: 2, height: 50}}>
              <TextField
                type="number"
                value={departureDelay}
                padding="50 50"
                line-height="500"
                label="Departure Delay"
                onChange={handleDepartureDelayChange}
              >
              </TextField>
            </FormControl>
          </Stack>
        </Stack>

        <Stack
          sx={{
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
            width: 484,
            color: "#229191",
          }}
        >
          <ThemeProvider theme={theme}>
            <Button
              type="submit"
              onClick={(e) => {
                setPrediction("Running the Model...");
                onSubmit(e);
              }}
              variant="contained"
              color="primary"
              className="predictButton"
              sx={{
                width: 430,
                height: 60,
                background: "#229191",
                borderRadius: 12,
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: 22,
                letterSpacing: " 0.06em",
                color: "#FFFFFF",
              }}
            >
              Predict
            </Button>
            {showError && (
              <Alert severity="info" sx={{ mt: 2 }}>
                {" "}
                {prediction}{" "}
              </Alert>
            )}
          </ThemeProvider>
        </Stack>
      </Box>
    </FormControl>
  );
}