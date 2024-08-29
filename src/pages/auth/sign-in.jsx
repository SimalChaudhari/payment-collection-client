import { login } from "@/store/action/auth.action";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";

// Validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email Required'),
  password: Yup.string().required('Password Required'),
});

export function SignIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(state => state.authReducer.user?.user); // Adjust path based on your store structure

  const handleLogin = async (values) => {
    const { email, password } = values;
    const result = await dispatch(login(email, password));
  
    // Check the result of the login action
    if (result.success) {
      const { role } = result.user; // Ensure the result has the role information
      if (role === 'admin') {
        navigate('/admin/home');
      } else if (role === 'salesman') {
        navigate("/salesman/home");
      } else if (role === 'customer') {
        navigate("/customer/home");
      } else {
        toast.error("No User Available");
      }
    } else {
      toast.error("Login Failed");
    }
  };
  

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        {/* Sign In form */}
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ setFieldValue }) => (
            <Form className="mt-8">
              <div className="mb-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    Email
                  </Typography>
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
                <div className="flex flex-col gap-2">
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    Password
                  </Typography>
                  <Field
                    name="password"
                    as={Input}
                    type="password"
                    size="lg"
                    placeholder="********"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>

              </div>
              <Button type="submit" className="mt-6" fullWidth>
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default SignIn;
