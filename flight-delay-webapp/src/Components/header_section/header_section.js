import React from "react";
import Box from "@mui/material/Box";
import background from "./flightdelaybackground.png";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#578590'
        },
        secondary: {
            main: '#2C3444'
        },
        contrastThreshold: 3,
    },
});

export default function header_section() {
    return (
        <div>
            <Box
                sx={{
                    backgroundColor: '#1F5D6A',
                    backgroundSize: 'cover',
                    position: 'absolute',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                    height: 700,
                    opacity: 0.65,
                    borderBottomLeftRadius: '10%',
                    borderBottomRightRadius: '10%',
                }}
            >
            </Box>

            <Box
                component="text"
                className="font-link-bold"
                sx={{
                    display: 'flex',
                    left: '50%',
                    right: '50%',
                    width: 600,
                    marginLeft: -35,
                    paddingTop: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 52,
                    fontWeight: 700,
                }}
            >Flight Delay Predictor</Box>

            <Box
                component="text"
                className="font-link-reg"
                sx={{
                    display: 'flex',
                    left: '50%',
                    right: '50%',
                    justifyContent: 'center',
                    width: 600,
                    position: 'absolute',
                    marginTop: 40,
                    marginLeft: -35,
                    color: 'white',
                    fontSize: 18,
                    textAlign: 'center',
                }}
            >Planning a flight in the next few weeks? Check if your flight is going to be delayed using our tool, which utilizes machine learning models to predict the chances of delay.</Box>

            <ThemeProvider theme={theme}>
                <Button
                    //onclick= "scroll()"
                    variant="contained"
                    color='primary'
                    disableElevation
                    className="font-link-reg"
                    sx={{
                        left: '50%',
                        right: '50%',
                        width: 150,
                        marginLeft: -20,
                        height: 45,
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        textTransform: 'none',
                        position: 'absolute',
                        //marginLeft: 59,
                        marginTop: 55,
                        color: 'white',
                    }}
                >Prediction Tool</Button>

                <Button
                    variant="contained"
                    color='secondary'
                    disableElevation
                    className="font-link-reg"
                    sx={{
                        left: '50%',
                        right: '50%',
                        width: 150,
                        marginLeft: 1,
                        height: 45,
                        position: 'absolute',
                        //marginLeft: 80,
                        marginTop: 55,
                        color: 'white',
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        textTransform: 'none',
                    }}
                >Data Visual Tool</Button>
            </ThemeProvider>
            <Box
                sx={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    //position: 'absolute',
                    width: '100vw',
                    height: 700,
                    borderBottomLeftRadius: '10%',
                    borderBottomRightRadius: '10%',
                }}
            />
        </div>

    );
}

