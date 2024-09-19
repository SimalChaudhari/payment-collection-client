import { useState, useEffect } from 'react';
import { Button, Typography, Tooltip } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateWhatsAppSettings, whatsappData } from '@/store/action/whatsapp.action';


const WhatsAppSettings = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loader, setIsLoader] = useState(false);

    const dispatch = useDispatch();
    const whatsappSettings = useSelector((state) => state.whatsappReducer?.setting);

    // Fetch WhatsApp settings on component mount
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                await dispatch(whatsappData());
            } catch (error) {
                toast.error('Failed to fetch WhatsApp settings');
            }
        };
        fetchSettings();
    }, [dispatch]);

    // Formik setup
    const validationSchema = Yup.object({
        instance_id: Yup.string().required('Instance ID is required'),
        access_token: Yup.string().required('Access Token is required'),
    });

    const formik = useFormik({
        initialValues: {
            instance_id: whatsappSettings?.instance_id || '',
            access_token: whatsappSettings?.access_token || '',
        },
        enableReinitialize: true, // Ensure formik initializes values when settings change
        validationSchema,
        onSubmit: async (values) => {
            console.log('Form Values:', values); // Add this line to check the form values
            setIsLoader(true);
            try {
                const success = await dispatch(updateWhatsAppSettings(values));
                if (success) {
                    toast.success('WhatsApp settings updated');
                    setIsEditing(false);
                } else {
                    toast.error('Failed to update WhatsApp settings');
                }
            } catch (error) {
                toast.error('An error occurred');
            } finally {
                setIsLoader(false);
            }
        },
    });

    // Handle form edit toggle
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="mb-12">
            <div className="flex items-center">
                <Typography variant="h6" color="blue-gray" className="mr-4">
                    WhatsApp Settings
                </Typography>
                <Tooltip content={isEditing ? "Save Settings" : "Edit Settings"}>
                    <PencilIcon
                        className="h-6 w-6 cursor-pointer text-blue-gray-500 mr-2"
                        onClick={handleEditToggle} />
                </Tooltip>
            </div>

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 mt-3">
                {isEditing ? (
                    <>
                        <TextField
                            label="Instance ID"
                            name="instance_id"
                            value={formik.values.instance_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            variant="outlined"
                            fullWidth
                            className="mb-2"
                            error={formik.touched.instance_id && Boolean(formik.errors.instance_id)}
                            helperText={formik.touched.instance_id && formik.errors.instance_id}
                        />
                        <TextField
                            label="Access Token"
                            name="access_token"
                            value={formik.values.access_token}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            variant="outlined"
                            fullWidth
                            className="mb-2"
                            error={formik.touched.access_token && Boolean(formik.errors.access_token)}
                            helperText={formik.touched.access_token && formik.errors.access_token}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            {loader ? "Loading..." : "Save Changes"}
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="body2" className="mb-2">
                            <strong>Instance ID:</strong> {formik.values.instance_id ? "***************" : formik.values.instance_id}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Access Token:</strong> {formik.values.access_token ? "***************" : formik.values.access_token}
                        </Typography>
                    </>
                )}
            </form>
        </div>
    );
}

export default WhatsAppSettings;
