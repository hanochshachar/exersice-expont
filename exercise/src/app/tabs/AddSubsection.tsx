'use client'
import { Box, Button, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { TableList } from './ComplexTable';

interface AddSubsectionProps {
    setCompToUpdate: Function
    setTableList: Function
    compId: number
    totalWeight: number
    subsectionsWeight: number
}

const AddSubsection = ({ setCompToUpdate, setTableList, compId, totalWeight, subsectionsWeight }: AddSubsectionProps) => {

    const [describe, setDescribe] = useState('');
    const [weight, setWeight] = useState<number>(0);

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
        setWeight(0);
        setCompToUpdate(0);
    };

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWeight = Number(event.target.value);
        const space = totalWeight - subsectionsWeight
        if (newWeight <= space) {
            setWeight(newWeight);
        } else {
            setWeight(0);
        }
    };

    console.log(totalWeight - subsectionsWeight);


    return (
        <Box sx={{ width: '100%', background: '#E8EAED', padding: '10px' }}  mb={2} mt={2} >

            <Stack direction='row' justifyContent='space-between'>
                <Typography variant="h6">הוסף תת רכיב</Typography>
                <Button onClick={() =>  setCompToUpdate(null)}>
                    <CloseIcon />
                </Button>
            </Stack>
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
                value={weight > 0 ? weight : ''}
                onChange={handleWeightChange}

                inputProps={{
                    max: totalWeight - subsectionsWeight,
                }}
            />
            <Button sx={{margin:2}} size='small' onClick={handleAddSubsection} variant="outlined" color="primary" >
                Add Subsection
            </Button>
        </Box>
    )
}

export default AddSubsection