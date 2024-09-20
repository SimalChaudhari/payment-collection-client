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
  mobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  password: Yup.string().required('Password Required'),
});

export function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)


  const handleLogin = async (values) => {
    const { mobile, password } = values;
    setLoader(true)
    const result = await dispatch(login(mobile, password));
    setLoader(false)

    if (result.success) {
      const { role } = result.user; // Ensure `role` is present
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'salesman') {
        navigate('/salesman/dashboard');
      } else if (role === 'customer') {
        navigate('/customer/dashboard');
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
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
        </div>
        <Formik
          initialValues={{ mobile: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ setFieldValue }) => (
            <Form className="mt-8">
              <div className="mb-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Typography variant="small" color="blue-gray" className="font-medium">Mobile</Typography>
                  <Field
                    name="mobile"
                    as={Input}
                    size="lg"
                    placeholder="Enter your mobile number"
                    type="mobile"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  <ErrorMessage name="mobile" component="div" className="text-red-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant="small" color="blue-gray" className="font-medium">Password</Typography>
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

                {loader ? "Loading..." : "Login"}
              </Button>


            </Form>
          )}
        </Formik>

        <div className="mt-4 text-end">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
