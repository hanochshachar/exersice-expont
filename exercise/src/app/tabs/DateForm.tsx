'use client'
import React, { useState } from 'react'
import { Button, styled, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './main-form.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';

const MyStack = styled(Stack)({
    border: '1px solid #E8EAED',
    borderRadius: '16px',
    width: '100%',
    padding: '1.5rem',
    marginBottom: '1.5rem'

})
const MyTextField = styled(TextField)({
    height: '35px',
    width: '320px'
})

interface DateForArray {
    firstDate: Date | undefined
    secondDate: Date | undefined
}

const DateForm = () => {
    const [dateListAdd, setDateListAdd] = useState([1])


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <div className='date-form-container'>
                <MyStack  >
                    <Typography variant='h5' sx={{ marginBottom: '10px' }}>תאריך מתנפח (ניתן להוסיף עוד תאריך למטה)</Typography>
                    <Stack direction='row' justifyContent='space-between' spacing={1} alignItems='center' sx={{ marginBottom: '10px' }}>
                        <Stack spacing={1} >
                            <Typography variant='body2'>תאריך פתיחה</Typography>
                            <DatePicker sx={{ width: '500px', height: '35px' }} />
                        </Stack>
                        <Stack spacing={1} >
                            <Typography variant='body2'>תאריך סגירה</Typography>
                            <DatePicker sx={{ width: '500px', height: '35px' }} />
                        </Stack>
                    </Stack>
                </MyStack>
                <MyStack>
                    <Stack direction='row' justifyContent='space-between' sx={{ marginBottom: '10px' }}>
                        <Typography variant='h5'>הוספת תאריכים</Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setDateListAdd((prev) => [...prev, 1])}
                        >
                            <AddIcon /> הוסף תאריך
                        </Button>
                    </Stack>
                    {dateListAdd && dateListAdd.map((item, index) =>(
                    <Stack direction='row' spacing={2} justifyContent='space-between' sx={{ padding: '10px', marginBottom: '10px' }} key={index}>
                    <Stack spacing={1}>
                        <Typography variant='body2'>כותרת</Typography>
                        <MyTextField variant="outlined" placeholder='הקלד כותרת' sx={{ width: '500px', height: '35px' }} />
                    </Stack>
                    <Stack spacing={1} >
                        <Typography variant='body2'>תאריך</Typography>
                        <DatePicker sx={{ width: '500px', height: '35px' }} />
                    </Stack>

                </Stack>)
                    ) }
                </MyStack>
            </div>

        </LocalizationProvider>
    )
}

export default DateForm