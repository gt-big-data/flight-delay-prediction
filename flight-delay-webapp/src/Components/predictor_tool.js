import React, { useEffect, useState } from 'react';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "../App.css";
import { Box, TextField } from "@mui/material";
import { fontSize, fontStyle } from "@mui/system";
import Input from "@mui/material/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
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
  const [flightNumber, setFlightNumber] = useState("UA123");
  const [departureAirport, setDepartureAirport] = useState("SFO");
  const [arrivalAirport, setArrivalAirport] = useState("LAX");
  const [showError, setShowError] = useState(false);
  const [getMessage, setGetMessage] = useState({})

  const onSubmit = (e) => {
    setShowError(true);
    
    console.log(flightNumber);
    console.log("Submitted");
  };
  // const connectToBackend = () => {
  //   fetch("http://localhost:5000/predict", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       flightNumber: flightNumber,
  //       departureAirport: departureAirport,
  //       arrivalAirport: arrivalAirport,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }
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
          sx={{
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Stack
            id="leftDelayedSection"
            sx={{
              display: "flex",
              gap: 2,
              width: 550, // 493
              paddingY: 8,
            }}
          >
            <Stack
              direction="row"
              id="rowsOfDelay"
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 1,
                  background: "#F7FB39",
                  border: 1,
                  borderRadius: 45,
                  width: 30,
                  height: 30,
                }}
              ></Box>
              <Box
                sx={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                0 - 30 Minutes Delayed
              </Box>
              <Box sx={{ border: 1, width: 129 }}></Box>
            </Stack>

            <Stack
              direction="row"
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 1,
                  background: "#F7CF43",
                  border: 1,
                  borderRadius: 45,
                  width: 30,
                  height: 30,
                }}
              ></Box>
              <Box
                sx={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                30 - 60 Minutes Delayed
              </Box>
              <Box sx={{ border: 1, width: 129 }}></Box>
            </Stack>

            <Stack
              direction="row"
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 1,
                  background: "#F77943",
                  border: 1,
                  borderRadius: 45,
                  width: 30,
                  height: 30,
                }}
              ></Box>
              <Box
                sx={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                60+ Minutes Delayed
              </Box>
              <Box sx={{ border: 1, width: 129 }}></Box>
            </Stack>
          </Stack>

          <Stack
            sx={{
              display: "flex",
              gap: 2,
              width: 493,
            }}
          >
            <TextField
              name="flightNumber"
              id="Flight Number"
              label="Flight Number*"
              variant="outlined"
              onChange={(e) => {setFlightNumber(e.target.value)}}
            />
            <TextField
              name="departing"
              id="Departing"
              label="Departing From*"
              onChange={(e) => {setDepartureAirport(e.target.value)}}
            />
            <TextField
              name="arrival"
              id="Arrival"
              label="Arriving At*"
              variant="outlined"
              onChange={(e) => {setArrivalAirport(e.target.value)}}
            />
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
            {showError && (<Alert severity="info" sx={{mt: 2}}> Running the Model... </Alert>)}
          </ThemeProvider>
        </Stack>
      </Box>
    </FormControl>
  );
}
