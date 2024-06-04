import { Button } from '@mui/material';
import React from 'react';
import { Data } from './page';

interface SubmitButtonProps {
  data?: Data;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ data }) => {
  const submitForm = async () => {
    if (!data) {
      console.error('No data to submit');
      return;
    }

    const response = await fetch('http://localhost:3000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    const resData = await response.json();
    console.log(resData);
  };

  return (
    <Button variant='contained' onClick={submitForm}>
      שלח
    </Button>
  );
};

export default SubmitButton;
