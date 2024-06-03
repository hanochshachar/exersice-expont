'use client'
import React, { useContext, useEffect, useState } from 'react'
import { TableList } from './ComplexTable'
import { Box, Button, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormContext } from '../../components/FormContext';


interface AddQualityComProp {
    setTableList: Function
    value: number
    tableList: TableList[]
    setIsAddComponent: Function
}

const AddQualityCom = ({ setTableList, value, tableList, setIsAddComponent }: AddQualityComProp) => {
    const [describe, setDescribe] = useState('')
    const [weight, setWeight] = useState<number>(0)


    // const { formData, updateFormData }: any = useContext(FormContext)
 
    // useEffect(() => {
    //     console.log(formData);
        
    // }, [])
    const handleSubmit = () => {
        const newItem: TableList = {
            id: tableList.length + 1,
            describe,
            weight: weight ? weight : 0,
            subsection: []  // Initialize with an empty array
        }
        setTableList((prev: TableList[]) => [...prev, newItem])
        setDescribe('')
        setWeight(0)
    }

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWeight = Number(event.target.value);
        if (newWeight <= 100 - value) {
            setWeight(newWeight);
        }
    };

    return (
        <Box mb={2} sx={{ background: '#E8EAED', padding: '10px' }}>
            <Stack direction='row' justifyContent='space-between'>
                <Typography variant="h6">הוסף רכיב איכות</Typography>
                <Button onClick={() => setIsAddComponent(false)}>
                    <CloseIcon />
                </Button>
            </Stack>
            <TextField
                label="Describe"
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
                fullWidth
                margin="normal"
            />
            <OutlinedInput
                label="Weight"
                type="number"
                value={weight > 0 ? weight : ''}
                onChange={handleWeightChange}
                fullWidth
                inputProps={{
                    max: 100 - value,
                }}
            />
            <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
                Add Item
            </Button>
        </Box>
    )
}

export default AddQualityCom