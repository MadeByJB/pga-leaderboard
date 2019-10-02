import React from 'react';
import { Formik } from 'formik';
import './css/ManagePlayersForm.css';
import renderForm from './useForm';

const ManagePlayerForm = ({ onSubmit }) => {
  const formConfig = {
    firstName: '',
    lastName: '',
    country: '',
    position: '',
    currentScore: '',
    totalStrokes: '',
  };
  return (
    <Formik
      initialValues={formConfig}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ values, handleChange, handleBlur }) => {
        return renderForm(values, handleChange, handleBlur);
      }}
    </Formik>
  );
};

export default ManagePlayerForm;
