import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    CircularProgress,
    FormControl,
    Box
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addAddress, fetchAddress } from '@/store/action/address.action';

// Validation schema using Yup
const validationSchema = Yup.object({
    city: Yup.string().required('City is required'),
    areas: Yup.array().of(Yup.string().required('Area is required')).min(1, 'At least one area is required'),
});

const AddAddressDialog = ({ open, onClose }) => {
    const dispatch = useDispatch();

    const fetchData = async () => {
        await dispatch(fetchAddress());
      };
    

    const formik = useFormik({
        initialValues: {
            city: '',
            areas: [''], // Initialize with one area field
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const success = await dispatch(addAddress(values));
                if (success) {
                    resetForm(); // Clear the form on success
                    onClose(); // Close dialog if Address was added successfully
                    fetchData();
                }
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
            <DialogTitle>Add New Address</DialogTitle>
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
                        style={{ display: 'block' }}
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
                        'Add'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAddressDialog;
