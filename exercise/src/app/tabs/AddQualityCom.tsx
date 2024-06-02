'use client'
import React, { useState } from 'react'
import { TableList } from './ComplexTable'
import { Box, Button, OutlinedInput, TextField, Typography } from '@mui/material'

interface AddQualityComProp {
    setTableList: Function
    value: number
    tableList: TableList[]
}

const AddQualityCom = ({setTableList, value, tableList}: AddQualityComProp) => {
    const [describe, setDescribe] = useState('')
    const [weight, setWeight] = useState<number | null>()

    const handleSubmit = () => {
        const newItem: TableList = {
            id: tableList.length + 1,
            describe,
            weight: weight ? weight : 0,
            subsection: []  // Initialize with an empty array
        }
        setTableList((prev: TableList[]) => [...prev, newItem])
        setDescribe('')
        setWeight(null)
    }

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWeight = Number(event.target.value);
        if (newWeight <= 100 - value) {
            setWeight(newWeight);
        }
    };

  return (
    <Box mb={2}>
    <Typography variant="h6">הוסף רכיב איכות</Typography>
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
        value={weight} 
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