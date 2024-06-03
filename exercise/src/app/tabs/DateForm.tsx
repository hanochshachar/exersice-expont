'use client'
import React, { useEffect, useState } from 'react'
import { Button, styled, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './main-form.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import { Dates, useFormStore } from '../store';

const MyStack = styled(Stack)({
    border: '1px solid #E8EAED',
    borderRadius: '16px',
    width: '100%',
    padding: '1.5rem',
    marginBottom: '1.5rem'
});

const MyTextField = styled(TextField)({
    height: '35px',
    width: '320px'
});

interface DateForArray {
    id: number;
    date: string | null;
}

const DateForm = () => {
    const [dateListAdd, setDateListAdd] = useState<number[]>([]);
    const [datesArray, setDatesArray] = useState<DateForArray[]>([]);
    const [firstDate, setFirstDate] = useState<string | null>(null)

    const setDateList = useFormStore((state) => state.setDateList)
    const dateList = useFormStore((state) => state.dateList)

    const handleAddDate = () => {
        const newId = dateListAdd.length > 0 ? Math.max(...dateListAdd) + 1 : 1;
        setDateListAdd((prev) => [...prev, newId]);
        setDatesArray((prev) => [...prev, { id: newId, date: null }]);
    };

    const handleDateChange = (id: number, newDate: string | null) => {
        setDatesArray((prev) =>
            prev.map((item) => (item.id === id ? { ...item, date: newDate } : item))
        );
    };

    useEffect(() => {
       firstDate && setDateList({...dateList, firstDate})
    }, [firstDate])

    useEffect(() => {
       const restDates =  datesArray.map((date) => date.date)
        setDateList({...dateList, datesArray: restDates as string[]})

    }, [datesArray])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='date-form-container'>
                <MyStack>
                    <Typography variant='h5' sx={{ marginBottom: '10px' }}>תאריך מתנפח (ניתן להוסיף עוד תאריך למטה)</Typography>
                    <Stack direction='row' justifyContent='space-between' spacing={1} alignItems='center' sx={{ marginBottom: '10px' }}>
                        <Stack spacing={1}>
                            <Typography variant='body2'>תאריך פתיחה</Typography>
                            <DatePicker 
                            onChange={(newDate) => {
                                if (newDate) {
                                    setFirstDate(newDate.toISOString());
                                } else {
                                    setFirstDate(null);
                                }
                            }}
                            sx={{ width: '500px', height: '35px' }} />
                        </Stack>
                        <Stack spacing={1}>
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
                            onClick={handleAddDate}
                        >
                            <AddIcon /> הוסף תאריך
                        </Button>
                    </Stack>
                    {dateListAdd.map((id) => (
                        <Stack direction='row' spacing={2} justifyContent='space-between' sx={{ padding: '10px', marginBottom: '10px' }} key={id}>
                            <Stack spacing={1}>
                                <Typography variant='body2'>כותרת</Typography>
                                <MyTextField variant="outlined" placeholder='הקלד כותרת' sx={{ width: '500px', height: '35px' }} />
                            </Stack>
                            <Stack spacing={1}>
                                <Typography variant='body2'>תאריך</Typography>
                                <DatePicker
                                    sx={{ width: '500px', height: '35px' }}
                                    // value={datesArray.find((item) => item.id === id)?.date || null}
                                    onChange={(newDate) => handleDateChange(id, newDate?.toISOString() || null)}
                                />
                            </Stack>
                        </Stack>
                    ))}
                </MyStack>
            </div>
        </LocalizationProvider>
    );
};

export default DateForm;
