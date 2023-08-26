import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = (props) => {
  return (
    <TextField
      {...props}
      sx={{ width: '90%', marginBottom: '20px', }}
    />
  );
}

export default CustomTextField;
