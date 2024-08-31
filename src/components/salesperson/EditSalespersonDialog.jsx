import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { editSalesman, salesman } from '@/store/action/salesman.action';

const EditSalespersonDialog = ({ open, onClose, salesmanData }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
    .email('Invalid email format')
    .matches(/^[^\s@]+@[^\s@]+\.(com)$/, 'Email must end with .com')
    .required('Email is required'),
    mobile: Yup.string()
      .required('Mobile number is required')
      .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits and only numeric')
      .test('is-numeric', 'Mobile number must contain only numbers', value => !isNaN(Number(value)))
  });


  const fetchData = async () => {
    await dispatch(salesman());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',

    },
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(editSalesman(salesmanData._id, values));
      onClose();
      fetchData()
    },
  });

  useEffect(() => {
    if (salesmanData) {
      formik.setValues({ ...salesmanData });
    }
  }, [salesmanData]);


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Salesman</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mobile"
          name="mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
          fullWidth
          margin="normal"
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={formik.handleSubmit} color="primary" variant="contained">Save</Button>
        <Button onClick={onClose} color="secondary" variant="outlined">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSalespersonDialog;


