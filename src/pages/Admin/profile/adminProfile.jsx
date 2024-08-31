import {
    Card,
    CardBody,
    Typography,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPassword } from "@/store/action/auth.action";
import { editCustomer } from "@/store/action/customer.action";

export function AdminProfile() {
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [loader, setIsLoader] = useState(false);

    const emailData = useSelector((state) => state.authReducer?.user?.user?.email);
    const userData = useSelector((state) => state.authReducer?.user?.user);

    const dispatch = useDispatch();

    // Validation schema for Formik
    const validationSchema = Yup.object({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string().required('New password is required'),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const success = await dispatch(
                resetPassword({
                    email: emailData,
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword,
                })
            );
            if (success) {
                // Handle success (e.g., redirect, show success message)
                toast.success('Password successfully updated');
                resetForm()
            }
        },
    });


    const handleProfileChange = (e) => {
        setProfileInfo({
            ...profileInfo,
            [e.target.name]: e.target.value
        });
    };



    const handlePersonalInfoSubmit = (e) => {
        e.preventDefault();
        // Handle personal information update logic here
        toast.success('Personal information updated');
        setIsEditingPersonal(false);
    };

    const formikAdmin = useFormik({
        initialValues: {
            name: userData?.name,
            mobile: userData?.mobile,
            email: userData?.email,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("First Name is required"),
            mobile: Yup.string()
                .required('Mobile number is required')
                .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits and only numeric')
                .test('is-numeric', 'Mobile number must contain only numbers', value => !isNaN(Number(value))),
            email: Yup.string()
                .email('Invalid email format')
                .matches(/^[^\s@]+@[^\s@]+\.(com)$/, 'Email must end with .com')
                .required('Email is required')
        }),
        onSubmit: async (values) => {
            const user = {
                ...values,
                role: userData.role, // Directly set role to "admin"
            };
            setIsLoader(true)
            const success = await dispatch(editCustomer(userData._id, user));
            if (success) {
                // Handle success, e.g., show a success message or redirect
                setIsEditingPersonal(false);
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        user: {
                            _id: userData?._id,
                            ...user
                        }
                    },
                });

                // Update localStorage
                const updatedUserData = { ...userData, ...user };
                localStorage.setItem('userData', JSON.stringify({ user: updatedUserData }));
                toast.success('Personal information updated');
                setIsLoader(false)
            }
        },
    });

    const handlePersonalEditToggle = () => {
        setIsEditingPersonal(!isEditingPersonal);
    };

    const handlePasswordEditToggle = () => {
        setIsEditingPassword(!isEditingPassword);
    };

    return (
        <>
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
            </div>
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div>
                                <Typography variant="h5" color="blue-gray" className="mb-1">
                                    {userData.name}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-600"
                                >
                                    {userData.mobile}
                                </Typography>
                            </div>
                        </div>

                    </div>
                    <div className="mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">

                        <div>
                            <div className="flex items-center">
                                <Typography variant="h6" color="blue-gray" className="mr-4">
                                    Personal Information
                                </Typography>
                                <Tooltip content={isEditingPersonal ? "Save Profile" : "Edit Profile"}>
                                    <PencilIcon
                                        className="h-6 w-6 cursor-pointer text-blue-gray-500 mr-2"
                                        onClick={handlePersonalEditToggle} />
                                </Tooltip>
                            </div>


                            <form onSubmit={formikAdmin.handleSubmit} className="flex flex-col gap-6 mt-3">
                                {isEditingPersonal ? (
                                    <>
                                        <TextField
                                            label="First Name"
                                            name="name"
                                            value={formikAdmin.values.name}
                                            onChange={formikAdmin.handleChange}
                                            onBlur={formikAdmin.handleBlur}
                                            variant="outlined"
                                            fullWidth
                                            className="mb-2"
                                            error={formikAdmin.touched.name && Boolean(formikAdmin.errors.name)}
                                            helperText={formikAdmin.touched.name && formikAdmin.errors.name}
                                        />
                                        <TextField
                                            label="Mobile"
                                            name="mobile"
                                            value={formikAdmin.values.mobile}
                                            onChange={formikAdmin.handleChange}
                                            onBlur={formikAdmin.handleBlur}
                                            variant="outlined"
                                            fullWidth
                                            className="mb-2"
                                            error={formikAdmin.touched.mobile && Boolean(formikAdmin.errors.mobile)}
                                            helperText={formikAdmin.touched.mobile && formikAdmin.errors.mobile}
                                        />
                                        <TextField
                                            label="Email"
                                            name="email"
                                            value={formikAdmin.values.email}
                                            onChange={formikAdmin.handleChange}
                                            onBlur={formikAdmin.handleBlur}
                                            variant="outlined"
                                            fullWidth
                                            className="mb-2"
                                            error={formikAdmin.touched.email && Boolean(formikAdmin.errors.email)}
                                            helperText={formikAdmin.touched.email && formikAdmin.errors.email}
                                        />
                                        <Button type="submit" variant="contained" color="primary">
                                           {loader ? "Loading..." : "Save Changes"} 
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="body2" className="mb-2">
                                            <strong>First Name:</strong> {formikAdmin.values.name}
                                        </Typography>
                                        <Typography variant="body2" className="mb-2">
                                            <strong>Mobile:</strong> {formikAdmin.values.mobile}
                                        </Typography>
                                        <Typography variant="body2" className="mb-2">
                                            <strong>Email:</strong> {formikAdmin.values.email}
                                        </Typography>
                                    </>
                                )}
                            </form>
                        </div>

                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Reset Password Settings
                            </Typography>
                            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
                                <TextField
                                    name="currentPassword"
                                    type="password"
                                    label="Current Password"
                                    variant="outlined"
                                    fullWidth
                                    className="mb-2"
                                    value={formik.values.currentPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                                    helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                                />
                                <TextField
                                    name="newPassword"
                                    type="password"
                                    label="New Password"
                                    variant="outlined"
                                    fullWidth
                                    className="mb-2"
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                                />
                                <TextField
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    variant="outlined"
                                    fullWidth
                                    className="mb-2"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                                <Button
                                    type="submit"
                                    onClick={formik.handleSubmit} variant="contained" color="primary" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? 'Resetting...' : 'Reset Password'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default AdminProfile;
