import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography } from '@material-tailwind/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { forgotPasswordAPI } from '@/store/action/auth.action';
import { useDispatch } from 'react-redux';

// Validation schema with Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .matches(/^[^\s@]+@[^\s@]+\.(com)$/, 'Email must end with .com')
        .required('Email is required'),
});

export function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values, { resetForm }) => {
        const { email } = values;
        setLoading(true);
        const success = await dispatch(forgotPasswordAPI({ email: email }));
        if (success) {
            toast.success('Password reset link sent!');
            resetForm(); // Reset form fields after successful submission
            navigate('/sign-in'); // Redirect to sign-in page
        }
        setLoading(false);
    }



    return (
        <section className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">Forgot Password</Typography>
                </div>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="mt-8">
                        <div className="mb-4 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Typography variant="small" color="blue-gray" className="font-medium">Email</Typography>
                                <Field
                                    name="email"
                                    as={Input}
                                    size="lg"
                                    placeholder="name@mail.com"
                                    type="email"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                        </div>
                        <Button type="submit" className="mt-6" fullWidth disabled={loading}>
                            {loading ? "Sending..." : "Send For New Password"}
                        </Button>
                    </Form>
                </Formik>
            </div>
        </section>
    );
}

export default ForgotPassword;
