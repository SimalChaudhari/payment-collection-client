import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField ,CircularProgress} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { editCustomer, customer } from '@/store/action/customer.action';

const EditCustomerDialog = ({ open, onClose, customerData }) => {
  const dispatch = useDispatch();

  console.log(customerData)
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
    await dispatch(customer());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',

    },
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(editCustomer(customerData._id, values));
      onClose();
      fetchData()
    },
  });

  useEffect(() => {
    if (customerData) {
      formik.setValues({ ...customerData });
    }
  }, [customerData]);


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Customer</DialogTitle>
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
        <Button onClick={formik.handleSubmit} color="primary" variant="contained">
        {formik.isSubmitting ? (
            <CircularProgress size={24} style={{ color: '#fff' }} />
          ) : (
            'Update'
          )}
        </Button>
        <Button onClick={onClose} color="secondary" variant="outlined">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomerDialog;
