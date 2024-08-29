import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addCollection, collection } from '@/store/action/collection.action';
import { customer } from '@/store/action/customer.action';

// Validation schema using Yup
const validationSchema = Yup.object({
  customerName: Yup.string().required('Customer is required'),
  amount: Yup.string().required('Amount is required'),
  date: Yup.string().required('Date is required'),
});

const AddCollectionDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const customersData = useSelector((state) => state.customerReducer.customer);
  const [selectedCustomerName, setSelectedCustomerName] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      await dispatch(customer());
    };

    fetchCustomer();
  }, [dispatch]);

  const fetchData = async () => {
    await dispatch(collection());
  };

  const formik = useFormik({
    initialValues: {
      customerName: selectedCustomerName,
      amount: '',
      date: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("🚀 ~ onSubmit: ~ values:", values)
      const success = await dispatch(addCollection({ ...values }));
      if (success) {
        resetForm(); // Clear the form on success
        onClose(); // Close dialog if collection was added successfully
        fetchData();
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue('customerName', selectedCustomerName);
  }, [selectedCustomerName]);

  const handleCustomerChange = (event) => {
    const customerName = event.target.value;
    setSelectedCustomerName(customerName);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Collection</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-3">
          <FormControl fullWidth required>
            <InputLabel>Customer</InputLabel>
            <Select
              label="Customer"
              name="customerName"
              value={formik.values.customerName}
              onChange={handleCustomerChange}
              error={formik.touched.customerName && Boolean(formik.errors.customerName)}
            >
              {customersData.map((customer) => (
                <MenuItem key={customer._id} value={customer._id}>
                  {customer.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.customerName && formik.errors.customerName && (
              <div style={{ color: 'red' }}>{formik.errors.customerName}</div>
            )}
          </FormControl>
          <TextField
            label="Amount"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            required
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ backgroundColor: 'green', color: '#fff' }}>
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={formik.handleSubmit}
          color="primary"
          variant="contained"
          disabled={formik.isSubmitting}
          style={{ backgroundColor: formik.isSubmitting ? '#1976d2' : '#1976d2' }}
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

export default AddCollectionDialog;
