import React from 'react';
import Box from '@mui/material/Box';
import background from "./flightdelaybackground.png";
//import { blue } from '@mui/material/colors';

export default function header_section() {
    return(
        <Box
        sx={{
            width: 1920,
            height: 1500,
            //backgroundColor: blue,
            backgroundImage: `url(${background})`,
            //opacity: [0.9, 0.8, 0.7],
        }}
        />
    );
}