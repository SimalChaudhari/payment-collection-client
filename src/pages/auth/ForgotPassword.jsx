import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography } from '@material-tailwind/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { forgotPasswordAPI, VerifyOtp } from '@/store/action/auth.action';
import { useDispatch } from 'react-redux';
import { MuiOtpInput } from 'mui-one-time-password-input';

// Validation schema with Yup
const validationSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  otp: Yup.string().when('step', {
    is: 'verify',
    then: Yup.string()
      .matches(/^\d{6}$/, 'OTP must be 6 digits')
      .required('OTP is required'),
  }),
});

export function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('request'); // Manage steps: 'request' or 'verify'
  const [otp, setOtp] = useState('');
  const [mobile, setMobile] = useState(''); // Store mobile number for OTP verification

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    if (step === 'request') {
      const success = await dispatch(forgotPasswordAPI({ mobile: values.mobile }));
      if (success) {
        toast.success('OTP has been sent to your mobile number!');
        setMobile(values.mobile); // Store mobile number for OTP verification
        setStep('verify'); // Move to OTP verification step
        resetForm({ values: { mobile: values.mobile, otp: '' } });
      }
    } else if (step === 'verify') {
      const success = await dispatch(VerifyOtp({ otp: otp }));
      if (success) {
        toast.success('OTP verified successfully!');
        navigate('/change-password')
      }
    }
    setLoading(false);
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <div className="text-center mb-4">
          <Typography variant="h4" className="font-bold">
            {step === 'request' ? 'Forgot Password' : 'Enter OTP'}
          </Typography>
        </div>

        <Formik
          initialValues={{ mobile: '', otp: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="mt-8">
              {step === 'request' ? (
                <div className="mb-4">
                  <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                    Mobile
                  </Typography>
                  <Field
                    name="mobile"
                    as={Input}
                    size="lg"
                    placeholder="Enter your mobile number"
                    type="text"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  <ErrorMessage name="mobile" component="div" className="text-red-500 mt-1" />
                </div>
              ) : (
                <div className="mb-4">
                  <MuiOtpInput
                    value={otp}
                    onChange={(newValue) => setOtp(newValue)}
                    className="w-full mb-4"
                    length={6}
                    inputProps={{ className: 'text-center' }}
                  />
                  <ErrorMessage name="otp" component="div" className="text-red-500 mt-1" />
                </div>
              )}

              <Button type="submit" className="mt-6" fullWidth disabled={loading}>
                {loading ? (step === 'request' ? 'Sending...' : 'Verifying...') : step === 'request' ? 'Send For New Password' : 'Verify OTP'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default ForgotPassword;
