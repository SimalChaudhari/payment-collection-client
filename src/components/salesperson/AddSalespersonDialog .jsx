// components/AddCustomerDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addSalesman, salesman } from '@/store/action/salesman.action';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  mobile: Yup.string().required('Mobile number is required'),
});

const AddSalespersonDialog  = ({ open, onClose }) => {
  const dispatch = useDispatch();

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
    onSubmit: async (values, { resetForm }) => {
      const success = await dispatch(addSalesman({ ...values, role: 'salesman' }));
      if (success) {
        resetForm(); // Clear the form on success
        onClose(); // Close dialog if customer was added successfully
        fetchData();
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Salesman</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-3">
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            required
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            required
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Mobile"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            required
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}  style={{
          backgroundColor: 'green', // Adjust as needed
          color:"#fff"
        }}
      >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={formik.handleSubmit}
          color="primary"
          variant="contained"
          disabled={formik.isSubmitting}
          style={{
            backgroundColor: formik.isSubmitting ? '#1976d2' : '#1976d2', // Adjust as needed
          }}
        >
          {formik.isSubmitting ? (
            <CircularProgress size={24} style={{ color: '#fff' }} />
          ) : (
            'Add'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSalespersonDialog ;
