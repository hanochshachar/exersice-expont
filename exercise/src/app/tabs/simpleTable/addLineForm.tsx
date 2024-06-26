import React, {useState} from 'react';
import { DataTableProps } from './simpleTable/FirstForm';

import { Button, TextField, Box, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AddLineProps {
  setDataTable: Function;
  setIsAddData: Function
}

const AddLineForm = ({ setDataTable, setIsAddData }: AddLineProps) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDataTable((prevData: DataTableProps[]) => [...prevData, {id: prevData.length + 1 , ...formData}]);
    setFormData({
      name: '',
      role: '',
      email: '',
    });
  };

  return (
    <Box sx={{position: 'absolute',
     margin: 'auto',
      padding: '10px',
       background: '#EAF2FF',
        top: '30%',
      display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  marginRight: '60%',}}
     component="form" 
     onSubmit={handleSubmit}>
          <IconButton 
        onClick={() => setIsAddData(false)} 
        sx={{ margin: '10px',}}
      >
        <CloseIcon />
      </IconButton>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        sx={{ margin: '2px',}}
      />
      <TextField
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        sx={{ margin: '2px',}}
        margin="normal"
        
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        sx={{ margin: '2px',}}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ margin: '2px',}}>
        Add Line
      </Button>
    </Box>
  );
};

export default AddLineForm;