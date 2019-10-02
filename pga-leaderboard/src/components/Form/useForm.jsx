import React from 'react';
import { Form, Field } from 'formik';
import FormField from './FormField';
import { Button } from '@material-ui/core';

const formConfig = [
  {
    name: 'firstName',
    label: 'First Name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
  },
  {
    name: 'country',
    label: 'Country',
  },
  {
    name: 'position',
    label: 'Position',
  },
  {
    name: 'currentScore',
    label: 'Current Score',
  },
  {
    name: 'totalStrokes',
    label: 'Total Strokes',
  },
];

const renderForm = (values) => {
  return (
    <Form>
      {formConfig.map((formField, index) => {
        let { name, label } = formField;
        return (
          <div key={index}>
            <Field key={name} name={name} label={label} component={FormField} />
          </div>
        );
      })}

      <Button type='submit' id='submitButton'>
        Submit
      </Button>
    </Form>
  );
};

export default renderForm;
