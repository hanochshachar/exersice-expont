'use client'
import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import { Box, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import './summary.css'
import { useFormStore } from '@/app/store';
import PdfIcon from '../../../../public/pdfImage.png'

const SubmitTab = () => {

  const {bigText,
    DividedQuality,
    pdf,
    dateList} = useFormStore((state) => state)

    const formatFileSize = (size: any) => {
      if (size < 1024) return `${size} bytes`;
      if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
      return `${(size / 1048576).toFixed(2)} MB`;
  };

  return (
    <div className='summary-form'>
      <header >
        <Stack direction="row"
          justifyContent="flex-start"
          alignItems='center'
          spacing={4}
        >
          <ArrowForwardIcon />
          <Typography variant="h5" sx={{ paddingRight: '13px' }}>
            כותרת דף
          </Typography>
          <Chip label="מספר הליך: 1111" />

        </Stack>
      </header>

      <div className="location_indicator">
        <CheckCircleOutlineIcon color='primary' />
        <div className="line"></div>
        <AdjustRoundedIcon color='primary' />
      </div>
      <div className='paragraph'>
        <Typography>טאב 1</Typography>
        <Typography >סיכום ושליחה</Typography>
      </div>
      <div className='content' >
        <Typography variant='h5' align='right'mb={2}> Tab</Typography>
        <Typography variant='subtitle1' align='right'> Title</Typography>
        <Typography variant='body2' align='right' mb={2}> תבר, שוטף, 2023</Typography>
        <Typography variant='subtitle2' align='right'> פירוט בדבר מקורות התקציב</Typography>
        <Typography variant='body2' align='right' mb={2}> {bigText}</Typography>
        <Typography variant='subtitle2' align='right'> סוג החלוקה</Typography>
        <Typography variant='body2' align='right' mb={2}> {bigText}</Typography>
        <Typography variant='subtitle2' align='right'> סכום החלוקה</Typography>
        <Typography variant='body2' align='right' mb={2}> {DividedQuality}</Typography>
        <Typography variant='subtitle2' align='right'> הגבלת סכום ההתקשרות</Typography>
        {pdf && pdf.map((item, index) => (
          <Stack direction='row' alignItems='center' justifyContent='space-around' gap={2} key={index}>

          <Box >
              <Image
                  src={PdfIcon}
                  alt="PDF Preview"
                  width={15}
                  height={15}
              />
          </Box>
          <Typography variant="body2" >{item.name}</Typography>
          <Typography variant="body2">{formatFileSize(item?.size)}</Typography>
      </Stack>
        ))}
        <Typography variant='h6' align='right'mb={2}> מקור תקציבי לבקשה</Typography>
        <Typography variant='subtitle1' align='right'> תאריך פתיחת ההגשה</Typography>
        <Typography variant='body2' align='right' > {dateList.firstDate} תאריך פתיחה:</Typography>
        <Typography variant='body2' align='right'> תאריכים נוספים:</Typography>
        {dateList && dateList.datesArray.map((date, index) => (
          <Typography key={index} variant='body2' align='right' mb={2}> {date}</Typography>
        ))}
      </div>
    </div>
  )
}

export default SubmitTab