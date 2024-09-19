import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl, CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editCollection, collection } from '@/store/action/collection.action';
import { customer } from '@/store/action/customer.action';

const EditCollectionDialog = ({ open, onClose, collectionData }) => {
  const dispatch = useDispatch();
  const customersData = useSelector((state) => state.customerReducer.customer);

  // States to store the city and area from the selected customer's address
  const [selectedCustomerCity, setSelectedCustomerCity] = useState('');
  const [selectedCustomerArea, setSelectedCustomerArea] = useState('');

  const validationSchema = Yup.object({
    customerName: Yup.string().required('Customer is required'),
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be greater than zero')
      .min(0.01, 'Amount must be greater than zero')  // Ensures it's greater than zero
      .typeError('Amount must be a number'),
    date: Yup.date()
      .required('Date is required')
      .max(new Date(), 'Date cannot be in the future')  // Restricts date to today or earlier
      .typeError('Invalid date format')
  });

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(collection());
    };
    fetchData();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      customerName: collectionData?.customerName?._id || '',
      amount: collectionData?.amount || '',
      date: collectionData?.date ? new Date(collectionData.date).toISOString().split('T')[0] : '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(editCollection(collectionData._id, values));
      onClose();
      resetForm()
      await dispatch(collection()); // Fetch updated data
    },
  });

  useEffect(() => {
    if (collectionData) {
      formik.setValues({
        customerName: collectionData?.customerName?._id || '',
        amount: collectionData?.amount || '',
        date: collectionData?.date
          ? new Date(collectionData.date).toISOString().split('T')[0]
          : '',
      });

      // Set initial customer city and area based on collectionData
      if (collectionData?.customerName) {
        const selectedCustomer = customersData.find(
          (customer) => customer._id === collectionData.customerName._id
        );
        setSelectedCustomerCity(selectedCustomer?.address?.city || '');
        setSelectedCustomerArea(selectedCustomer?.address?.areas || '');
      }
    }
  }, [collectionData, customersData]);

  const handleCustomerChange = (event) => {
    const customerId = event.target.value;
    formik.setFieldValue('customerName', customerId);

    // Find the selected customer and update city and area
    const selectedCustomer = customersData.find(
      (customer) => customer._id === customerId
    );
    setSelectedCustomerCity(selectedCustomer?.address?.city || '');
    setSelectedCustomerArea(selectedCustomer?.address?.areas || '');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Collection</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Customer</InputLabel>
          <Select
            label="Customer"
            name="customerName"
            value={formik.values.customerName}
            onChange={handleCustomerChange}
            error={formik.touched.customerName && Boolean(formik.errors.customerName)}
          >
            <MenuItem value="" disabled>Select Customer</MenuItem>
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

        {/* Display city and area (read-only) */}
        <TextField
          label="City"
          name="city"
          value={selectedCustomerCity}
          fullWidth
          InputProps={{
            readOnly: true,  // City field is read-only
          }}
          margin="normal"
        />
        <TextField
          label="Area"
          name="areas"
          value={selectedCustomerArea}
          fullWidth
          InputProps={{
            readOnly: true,  // Area field is read-only
          }}
          margin="normal"
        />

        <TextField
          label="Amount"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>

        <Button onClick={formik.handleSubmit} color="primary" variant="contained">
          {formik.isSubmitting ? (
            <CircularProgress size={24} style={{ color: '#fff' }} />
          ) : (
            'Update'
          )}
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default EditCollectionDialog;
