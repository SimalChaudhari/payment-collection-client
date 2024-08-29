import { useState } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '@/store/action/auth.action';

export function SignUp() {
  const [isEmployee, setIsEmployee] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = isEmployee ? 'salesman' : 'customer';

  const handleRoleChange = () => {
    setIsEmployee(!isEmployee);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      mobile: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number').required('Mobile number is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      const { confirmPassword, ...userData } = values; // Exclude confirmPassword
      const success = await dispatch(register({ ...userData, role }));
      if (success === true) {
        navigate("/sign-in");
      }
    },
  });

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <div className="text-center mb-6">
          <Typography variant="h2" className="font-bold mb-2">
            {isEmployee ? 'Employee Registration' : 'Join Us Today'}
          </Typography>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Typography variant="small" color="blue-gray" className="font-medium">
                Name
              </Typography>
              <Input
                size="lg"
                placeholder="John Doe"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Typography variant="small" color="blue-gray" className="font-medium">
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Typography variant="small" color="blue-gray" className="font-medium">
                Mobile Number
              </Typography>
              <Input
                size="lg"
                placeholder="+1 234 567 890"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Typography variant="small" color="blue-gray" className="font-medium">
                Password
              </Typography>
              <Input
                size="lg"
                type="password"
                placeholder="••••••••"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Typography variant="small" color="blue-gray" className="font-medium">
                Confirm Password
              </Typography>
              <Input
                size="lg"
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="employee-checkbox"
                checked={isEmployee}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <label htmlFor="employee-checkbox" className="text-blue-gray-500">
                Register as an employee
              </label>
            </div>
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Register Now
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
