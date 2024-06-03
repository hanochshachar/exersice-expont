'use client'
import React, { useContext, useEffect, useState } from 'react';
import '../main-form.css'
import { Box, Button, Grid, Input, InputAdornment, OutlinedInput, Slider, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddQualityCom from './AddQualityCom';
import AddSubsection from './AddSubsection';
import { FormContext } from '../../components/FormContext';
import { useFormStore } from '@/app/store';

interface Subsection {
    id: number
    describe: string
    weight: number
}

export interface TableList {
    id: number
    describe: string
    weight: number
    subsection: Subsection[]
}

const ComplexTable = () => {

    const [value, setValue] = React.useState(0);
    const [tableList, setTableList] = useState<TableList[]>(
        [
            {
                id: 1, describe: 'vvvv', weight: 8,
                subsection: [{ id: 1, describe: 'kkk', weight: 4 },
                { id: 2, describe: 'ppp', weight: 2 },
                { id: 3, describe: 'ppp', weight: 2 }]
            },
            {
                id: 2, describe: 'ooo', weight: 6,
                subsection: [{ id: 1, describe: 'hhh', weight: 4 },
                { id: 2, describe: 'rrr', weight: 2 }]
            }
        ]
    )
    const [isAddComponent, setIsAddComponent] = useState(false)
    const [compToUpdate, setCompToUpdate] = useState<number | null>(null)

    // const formContext: any = useContext(FormContext)
    // const { formData, updateFormData }: any = formContext
    const setDividedQuality = useFormStore((state) => state.setDividedQuality)
    const store = useFormStore((state) => state)
 
    useEffect(() => {
        setDividedQuality(tableList.length)
        
        
    }, [tableList])

   

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    useEffect(() => {
        const reValue = tableList.reduce((acc, cur) => acc + cur.weight, 0);

        setValue(reValue)
    }, [tableList])

    useEffect(() => {
        console.log(tableList);

    }, [tableList])

    return (
        <div className='complex-table-container'>

            <Stack direction='row' mb={2} justifyContent='space-between'>
                <Typography variant='h5'>טבלה מורכבת</Typography>
                <Button onClick={() => setIsAddComponent(true)} variant='outlined' sx={{ padding: "3px" }} >
                    <AddIcon />  הוספת רכיב איכות
                </Button>
            </Stack>

            {isAddComponent && <AddQualityCom setTableList={setTableList} value={value} tableList={tableList} setIsAddComponent={setIsAddComponent}/>}

            <Box sx={{ width: 250 }}>

                <Stack direction='row' justifyContent='space-around' width='500px' alignItems='center'
                    gap={2}>

                    <Stack>
                        <Typography variant='caption' sx={{ marginRight: '50%' }}>
                            רכיבי איכות
                        </Typography>
                        <OutlinedInput
                            value={value}
                            size='small'
                            onChange={handleInputChange}
                            endAdornment={<InputAdornment sx={{ background: '#F9FAFB', color: '#0A2A5D' }} position="end">%</InputAdornment>}
                            inputProps={{
                                min: 0,
                                max: 100,
                            }}
                            disabled
                        />
                    </Stack>

                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"

                    />

                    <Stack>
                        <Typography variant='caption' sx={{ marginRight: '50%' }}>
                            רכיבי מחיר
                        </Typography>
                        <OutlinedInput
                            value={100 - value}
                            size='small'
                            onChange={handleInputChange}
                            endAdornment={<InputAdornment sx={{ background: '#F9FAFB', color: '#0A2A5D' }} position="end">%</InputAdornment>}
                            inputProps={{
                                min: 0,
                                max: 100,
                            }}
                            disabled
                        />
                    </Stack>
                </Stack>



            </Box>

            <Table sx={{
                borderCollapse: 'collapse',
                width: '100%',
                border: '1px solid #E8EAED',
                borderRadius: '16px',
                marginTop: '2rem'
            }} aria-label="table variants">
                <TableHead>

                    <TableRow sx={{ background: '#E8EAED' }}>
                        <TableCell sx={{ borderBottom: '1px solid #E8EAED', borderTop: '1px solid #E8EAED', width: "40%" }} align="right" >תיאור סעיף</TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #E8EAED', borderTop: '1px solid #E8EAED', width: '60%' }} align="right" >משקל</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableList.map((row, index) => (
                        

                        <React.Fragment key={row.id} >

                            <TableRow >
                                <TableCell sx={{ borderBottom: '1px solid #E8EAED', borderTop: '1px solid #E8EAED', width: '40%' }} align="right">
                                    <Button variant="outlined" color="inherit" sx={{ width: '90%' }}>
                                        {row.describe}
                                    </Button>
                                </TableCell>

                                <TableCell sx={{ borderBottom: '1px solid #E8EAED', borderTop: '1px solid #E8EAED', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Button variant="outlined" color="inherit" sx={{ width: '15%', display: 'flex', justifyContent: 'space-between' }}>

                                        {row.weight} <span>%</span>
                                    </Button>
                                    <div>
                                        <Button onClick={() => setCompToUpdate(row.id)} sx={{ padding: "3px", }}>
                                            <AddIcon />  תת רכיב
                                        </Button>
                                        <Button sx={{ padding: "3px" }}>
                                            <DeleteOutlineIcon />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ width: '100%' }}>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>


                                    <Table sx={{
                                        borderCollapse: 'collapse',
                                        width: '100%',

                                    }}>
                                        <TableBody>
                                            {row.subsection.map((subRow, subIndex) => (
                                                <TableRow key={subRow.id} >
                                                    <TableCell sx={{ borderBottom: '1px solid #E8EAED', borderTop: '1px solid #E8EAED', width: '40%', }} align="right">
                                                        <Button variant="outlined" color="inherit" sx={{ width: '80%', marginRight: '7%' }}>
                                                            {subRow.describe}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell sx={{ borderBottom: '1px solid #E8EAED', borderTop: '1px solid #E8EAED' }} align="right">
                                                        <Button variant="outlined" color="inherit" sx={{ width: '15%', display: 'flex', justifyContent: 'space-between' }} >
                                                            {subRow.weight} <span>%</span>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>


                                </TableCell>
                            </TableRow>
                            {compToUpdate === row.id && <AddSubsection setCompToUpdate={setCompToUpdate}
                             setTableList={setTableList}
                              compId={row.id} 
                              totalWeight={row.weight && row.weight }
                              subsectionsWeight={row.subsection.reduce((acc, curr) => acc + curr.weight, 0)}/>}
                        </React.Fragment>
                              
                        
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}

export default ComplexTable