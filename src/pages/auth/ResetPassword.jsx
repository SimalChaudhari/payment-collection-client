import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, Button, Typography } from '@material-tailwind/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { changePasswordAPI } from '@/store/action/auth.action';
import { useDispatch, useSelector } from 'react-redux';

// Validation schema with Yup
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const otpVerify = useSelector((state) => state.authReducer.otp);

  const handleSubmit = async (values, { resetForm }) => {
    const { newPassword } = values;
    setLoading(true);
    const success = await dispatch(changePasswordAPI({ otp: otpVerify, newPassword: newPassword }));
    if (success) {
      toast.success('Password reset Successfully!');
      resetForm(); // Reset form fields after successful submission
      navigate('/sign-in'); // Redirect to sign-in page
    }
    setLoading(false);

  }


  return (
    <section className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Reset Password</Typography>
        </div>
        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="mt-8">
            <div className="mb-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Typography variant="small" color="blue-gray" className="font-medium">New Password</Typography>
                <Field
                  name="newPassword"
                  as={Input}
                  type="password"
                  size="lg"
                  placeholder="New Password"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <ErrorMessage name="newPassword" component="div" className="text-red-500" />
              </div>
              <div className="flex flex-col gap-2">
                <Typography variant="small" color="blue-gray" className="font-medium">Confirm Password</Typography>
                <Field
                  name="confirmPassword"
                  as={Input}
                  type="password"
                  size="lg"
                  placeholder="Confirm Password"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
              </div>
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default ResetPassword;
