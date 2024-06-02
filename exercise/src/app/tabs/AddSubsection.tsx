'use client'
import { Box, Button, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TableList } from './ComplexTable';

interface AddSubsectionProps {
    setCompToUpdate: Function
    setTableList: Function
    compId: number
    totalWeight: number
}

const AddSubsection = ({setCompToUpdate, setTableList, compId, totalWeight}: AddSubsectionProps) => {

    const [describe, setDescribe] = useState('');
    const [weight, setWeight] = useState<Number | null>(null);

    const handleAddSubsection = () => {
        setTableList((prevTableList: TableList[]) => {
            return prevTableList.map((item) => {
                if (item.id === compId) {
                    const newSubsection = {
                        id: item.subsection.length + 1,
                        describe,
                        weight,
                    };
                    return {
                        ...item,
                        subsection: [...item.subsection, newSubsection],
                    };
                }
                return item;
            });
        });
        setDescribe('');
        setWeight(null);
        setCompToUpdate(null);
    };

    return (
        <Box sx={{width: '100%'}} mb={2} mt={2} margin='auto'>
            <Typography variant="h6">הוסף תת רכיב</Typography>
            <TextField
            sx={{}}
            size='small'
                label="Describe"
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
            />
            <OutlinedInput
                label="Weight"
                type="number"
                size='small'
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                
                inputProps={{
                    max: totalWeight,
                }}
            />
            <Button size='small' onClick={handleAddSubsection} variant="outlined" color="primary" >
                Add Subsection
            </Button>
        </Box>
    )
}

export default AddSubsection