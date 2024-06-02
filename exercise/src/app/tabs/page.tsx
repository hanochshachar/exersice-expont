import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import { Typography } from '@mui/material';
import FirstForm from './FirstForm';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import './main-form.css'
import { WidthFull } from '@mui/icons-material';
import DateForm from './DateForm';
import UploadDocuments from './UploadDocuments';
import ComplexTable from './ComplexTable';


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
      <FirstForm />
      <DateForm/>
      <UploadDocuments/>
      <ComplexTable/>
    </main>
  )
}

export default MainForm