import React from 'react';
import { Formik } from 'formik';
import './css/ManagePlayersForm.css';
import renderForm from './useForm';

const ManagePlayerForm = ({ onSubmit }) => {
  const formConfig = {
    firstName: '',
    lastName: '',
    country: '',
    currentScore: 0,
    totalStrokes: 0,
  };
  return (
    <Formik
      initialValues={formConfig}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ values, handleChange, handleBlur }) => {
        return renderForm(values, handleChange, handleBlur);
      }}
    </Formik>
  );
};

export default ManagePlayerForm;
