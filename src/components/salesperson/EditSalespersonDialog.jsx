import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editSalesman, salesman } from '@/store/action/salesman.action';
import { fetchAddress } from '@/store/action/address.action';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .matches(/^[^\s@]+@[^\s@]+\.(com)$/, 'Email must end with .com')
    .required('Email is required'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits and only numeric')
    .test('is-numeric', 'Mobile number must contain only numbers', value => !isNaN(Number(value))),
  address: Yup.object({
    city: Yup.string().required('City is required'),
    areas: Yup.string().required('Area is required'),
  }).required('Address is required')

});

const EditSalespersonDialog = ({ open, onClose, salesmanData }) => {
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
      name: salesmanData ? salesmanData.name : '',
      email: salesmanData ? salesmanData.email : '',
      mobile: salesmanData ? salesmanData.mobile : '',
      address: {
        city: salesmanData ? salesmanData?.address?.city : '',
        areas: salesmanData ? salesmanData?.address?.areas : ''
      }
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await dispatch(editSalesman(salesmanData._id, {
        ...values,
        address: {
          ...values.address,
          city: values.address.city // Pass city name directly
        }
      }));
      onClose();
      dispatch(salesman());
    },
  });

  useEffect(() => {
    if (salesmanData) {
      setSelectedCity(salesmanData?.address?.city);
    }
  }, [salesmanData]);

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
      <DialogTitle>Edit Salesman</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-3">
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
            <InputLabel>Areas</InputLabel>
            <Select
              label="Areas"
              name="address.areas"
              value={formik.values.address.areas}
              onChange={handleAreaChange}
              error={formik.touched.address?.areas && Boolean(formik.errors.address?.areas)}
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
        <Button
          type="submit"
          onClick={formik.handleSubmit}
          color="primary"
          variant="contained"
          disabled={formik.isSubmitting}
          style={{
            backgroundColor: formik.isSubmitting ? '#1976d2' : '#1976d2', // Adjust as needed
          }}
        >     {formik.isSubmitting ? (
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

export default EditSalespersonDialog;


