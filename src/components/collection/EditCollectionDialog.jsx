import React, { useEffect } from 'react';
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
  FormControl
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editCollection, collection } from '@/store/action/collection.action';
import { customer } from '@/store/action/customer.action';

const EditCollectionDialog = ({ open, onClose, collectionData }) => {
  const dispatch = useDispatch();
  const customersData = useSelector((state) => state.customerReducer.customer);

  const validationSchema = Yup.object({
    customerName: Yup.string().required('Customer is required'),
    amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be greater than zero')
    .min(0.01, 'Amount must be greater than zero')  // Ensures it's greater than zero
    .typeError('Amount must be a number'),

  date: Yup.date()
    .required('Date is required')
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
    onSubmit: async (values) => {
      await dispatch(editCollection(collectionData._id, values));
      onClose();
      await dispatch(collection()); // Fetch updated data
    },
  });

  useEffect(() => {
    if (collectionData) {
      formik.setValues({
        customerName: collectionData?.customerName?._id || '',
        amount: collectionData?.amount || '',
        date: collectionData?.date ? new Date(collectionData.date).toISOString().split('T')[0] : '',
      });
    }
  }, [collectionData]);

  const handleCustomerChange = (event) => {
    formik.setFieldValue('customerName', event.target.value);
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
        <Button onClick={formik.handleSubmit} color="primary" variant="contained">
          Save
        </Button>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCollectionDialog;
