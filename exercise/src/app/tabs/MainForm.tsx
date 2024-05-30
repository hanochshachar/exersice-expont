'use client'
import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, Typography, TextField, Switch, Tooltip, Checkbox, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { Email, Label } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddLineForm from './addLineForm';


const MySelect = styled(Select)({
  height: '35px',
  width: '320px'

});

const MyTextField = styled(TextField)({
  height: '35px',
  width: '320px'
})

export interface DataTableProps {
  name: String
  role: String
  email: String
}



const MainForm = () => {

  const [checked, setChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false)
  const [dataTable, setDataTable] = useState<DataTableProps[]>([])
  const [isAddData, setIsAddData] = useState(false)


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    console.log(checked);
    setIsDisabled(checked)
  }, [checked]);
  return (
    <div className='tab1_main_form'>
      {isAddData && <AddLineForm setDataTable={setDataTable} setIsAddData={setIsAddData}/>}
      <Stack spacing='24px'>
        <Typography variant='h5'>כותרת משנית</Typography>

        <Stack spacing={2}>

          <span>אינפוט סלקט</span>
          <MySelect>
            <MenuItem selected >אפשרות א</MenuItem>
            <MenuItem >אפשרות ב</MenuItem>
            <MenuItem >אפשרות ג</MenuItem>
          </MySelect>
        </Stack>
        <Stack spacing={2}>
          <span>אינפוט טקסט</span>
          <MyTextField variant="outlined" />
        </Stack>
        <Stack spacing={2}>
          <span>אינפוט מספר</span>
          <MyTextField variant="outlined" type="number" />
        </Stack>

        <Stack
          spacing={2}
          direction="row"
          textAlign='center'
          alignItems='center'>
          <Switch

            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <span>טוגל וכפתור מידע
            <Tooltip title="הפוך צ'ק בוקס לדיסאיבל" arrow>
              <InfoOutlinedIcon />
            </Tooltip> </span>
        </Stack>
        <Stack spacing={2}>
          <span>צקבוקסים</span>
          <Stack
            direction='row'>
            <Checkbox />
            <Checkbox />
            <Checkbox
              disabled={isDisabled}
            />
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <span>רדיו</span>
          <Stack
            direction='row'>
            <FormControlLabel control={<Radio />} label="רדיו 1" />
            <FormControlLabel control={<Radio />} label="רדיו 2" />

          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Stack
            alignItems='center'
            justifyContent='space-between'
            direction='row'>
            <span>טבלת נתונים</span>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setIsAddData(true)}
            >
              <AddIcon /> הוסף שורה
            </Button>
          </Stack>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{  backgroundColor: '#FFFFFF'}}>

                <TableRow>
                  <TableCell>שם</TableCell>
                  <TableCell>תפקיד</TableCell>
                  <TableCell>דואל</TableCell>
                  <TableCell>   </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTable && dataTable.map((person, index) =>( 

                <TableRow key={index}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.role}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell> <DeleteOutlineIcon/>  </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>

    </div>
  )
}

export default MainForm