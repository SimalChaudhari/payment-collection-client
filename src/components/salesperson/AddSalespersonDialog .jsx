// components/AddCustomerDialog.jsx
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addSalesman, salesman } from '@/store/action/salesman.action';
import { fetchAddress } from '@/store/action/address.action';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .matches(/^[^\s@]+@[^\s@]+\.(com)$/, 'Email must end with .com')
 ,
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits and only numeric')
    .test('is-numeric', 'Mobile number must contain only numbers', value => !isNaN(Number(value))),
  address: Yup.object({
    city: Yup.string().required('City is required'),
    areas: Yup.string().required('Area is required'),
  }).required('Address is required')
});

const AddSalespersonDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const [cities, setCities] = useState([]);
  const [isAreas, isSetAreas] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const addressData = useSelector((state) => state.addressReducer.address);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAddress());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (addressData.length > 0) {
      setCities(addressData.map((address) => ({ city: address.city, areas: address.areas })));
    }
  }, [addressData]);

  useEffect(() => {
    if (selectedCity) {
      const cityDetails = cities.find(city => city.city === selectedCity);
      if (cityDetails) {
        isSetAreas(cityDetails.areas);
      }
    } else {
      isSetAreas([]);
    }
  }, [selectedCity, cities]);


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      address: {
        city: '',
        areas: ''
      }
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const success = await dispatch(addSalesman({
        ...values,
        address: {
          ...values.address,
          city: values.address.city // Pass city name directly
        },
        role: 'salesman'
      }));
      if (success) {
        resetForm(); // Clear the form on success
        onClose(); // Close dialog if salesman was added successfully
        dispatch(salesman());
      }
    },
  });

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    formik.setFieldValue('address.city', city);
  };

  const handleAreaChange = (event) => {
    formik.setFieldValue('address.areas', event.target.value);
  };

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
          <FormControl fullWidth required>
            <InputLabel>City</InputLabel>
            <Select
              label="City"
              name="address.city"
              value={formik.values.address.city}
              onChange={handleCityChange}
              error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
            >
              {cities.map((city, index) => (
                <MenuItem key={index} value={city.city}>
                  {city.city}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.address?.city && formik.errors.address?.city && (
              <div style={{ color: 'red' }}>{formik.errors.address.city}</div>
            )}
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Area</InputLabel>
            <Select
              label="Area"
              name="address.area"
              value={formik.values.address.area}
              onChange={handleAreaChange}
              error={formik.touched.address?.area && Boolean(formik.errors.address?.area)}
              disabled={!selectedCity} // Disable if no city is selected
            >
              {isAreas.map((area, index) => (
                <MenuItem key={index} value={area}>
                  {area}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.address?.areas && formik.errors.address?.areas && (
              <div style={{ color: 'red' }}>{formik.errors.address.areas}</div>
            )}
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{
          backgroundColor: 'green', // Adjust as needed
          color: "#fff"
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

export default AddSalespersonDialog;
