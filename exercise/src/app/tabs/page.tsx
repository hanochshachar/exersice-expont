import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import { Typography } from '@mui/material';
import Tab1Form from './Tab1Form';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import './main-form.css'
import { WidthFull } from '@mui/icons-material';


const MainForm = () => {
  return (
    <main className='main-form'>
      <header >
        <Stack direction="row"
          justifyContent="flex-start"
          alignItems='center'
          spacing={4}
          >
          <ArrowForwardIcon/>
          <Typography variant="h5" sx={{paddingRight: '13px'}}>
            כותרת דף
          </Typography>
          <Chip label="מספר הליך: 1111" />

        </Stack>
      </header>

      <div className="location_indicator">
        <AdjustRoundedIcon color='primary' />
        <div className="line"></div>
        <AdjustRoundedIcon />
      </div>
      <div className='paragraph'>
        <Typography>טאב 1</Typography>
        <Typography >סיכום ושליחה</Typography>
      </div>
      <Tab1Form />
    </main>
  )
}

export default MainForm