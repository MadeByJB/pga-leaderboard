import React from 'react';

import { TextField } from '@material-ui/core';

const FormField = ({ placeholder, label, field }) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      className='text-field'
      {...field}
    />
  );
};

export default FormField;
