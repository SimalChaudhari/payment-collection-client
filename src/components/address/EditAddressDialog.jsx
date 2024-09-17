import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Box,
  FormControl
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchAddress, updateAddress } from '@/store/action/address.action';

// Validation schema using Yup
const validationSchema = Yup.object({
  city: Yup.string().required('City is required'),
  areas: Yup.array().of(Yup.string().required('Area is required')).min(1, 'At least one area is required'),
});



const EditAddressDialog = ({ open, onClose, addressId }) => {

  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    city: '',
    areas: [''],
  });




  useEffect(() => {
    if (addressId) {
      setInitialValues({ city: addressId.city, areas: addressId.areas });
    }
  }, [addressId]);

  const fetchData = async () => {
    await dispatch(fetchAddress());
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true, // Enable reinitialization when addressId changes
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(updateAddress(addressId._id, values));
        resetForm(); // Clear the form on success
        fetchData()
        onClose(); // Close dialog if Address was updated successfully

      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  const handleAddArea = () => {
    formik.setFieldValue('areas', [...formik.values.areas, '']);
  };

  const handleRemoveArea = (index) => {
    const newAreas = formik.values.areas.filter((_, i) => i !== index);
    formik.setFieldValue('areas', newAreas);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Address</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-3">
          <TextField
            label="City"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            required
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />

          {formik.values.areas.map((area, index) => (
            <FormControl fullWidth key={index}>
              <Box display="flex" alignItems="center">
                <TextField
                  label={`Area ${index + 1}`}
                  name={`areas.${index}`}
                  value={area}
                  onChange={e => formik.setFieldValue(`areas.${index}`, e.target.value)}
                  onBlur={formik.handleBlur}
                  required
                  error={formik.touched.areas && Boolean(formik.errors.areas?.[index])}
                  helperText={formik.touched.areas && formik.errors.areas?.[index]}
                  style={{ flexGrow: 1 }}
                />
                {formik.values.areas.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveArea(index)}
                    color="error"
                    style={{ marginLeft: '16px' }}
                  >
                    X
                  </Button>
                )}
              </Box>
            </FormControl>
          ))}

          <Button
            type="button"
            onClick={handleAddArea}
            color="primary"
            variant="outlined"
            style={{ display: 'block', marginTop: '16px' }}
          >
            Add More Areas
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
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
            'Update'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddressDialog;
