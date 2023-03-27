import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { fontSize, fontStyle } from "@mui/system";

export default function predictor_tool() {
  return (
    <Box sx={{ justifyContent: "center", paddingY: 10 }}>
      <Box>
        <Stack
          sx={{
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            width: 800,
            height: 48,
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: 20,
            textAlign: "center",
            letterSpacing: 0.1,
          }}
        >
          <b>Predictor Tool</b> <br />
          Enter in the Flight Number and the Departure Destination of your
          upcoming flight. Then click predict to recieve a percentage of delay
        </Stack>
      </Box>
      <Stack direction="row" sx ={{
        display: "flex",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        gap: 2
      }}>
        <Stack sx={{
            display: "flex",
            gap:2,
            width: 493,
            paddingY: 8
        }}>
          <TextField
            id="Flight Number"
            label="Flight Number*"
            variant="outlined"
          />
          <TextField
            id="Departing"
            label="Departing From*"
            variant="outlined"
          />
        </Stack>
        <Stack sx={{
            display: "flex",
            gap:2,
            width: 493
        }}>
          <TextField
            id="Flight Number"
            label="Flight Number*"
            variant="outlined"
          />
          <TextField
            id="Departing"
            label="Departing From*"
            variant="outlined"
          />
        </Stack>
      </Stack>

      <Stack sx={{
        display: "flex",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        width: 484,
        color: '#229191'
      }}>
        <Button variant="contained">Predict</Button>
      </Stack>

    </Box>
    
  );
}
