// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, SalesmanDashboard, CustomerDashboard } from "@/layouts";
import AuthRoutes from "./routes/AuthRoutes";
import { SignIn } from "./pages/auth";
import PrivateRoute from "./routes/PrivateRoute";
import { useSelector } from "react-redux";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PageTitle from "./components/pageTitle/PageTitle";

function App() {
  const isLoggedIn = useSelector((state) => state.authReducer.isAuthenticated);
  const userRole = useSelector((state) => state.authReducer?.user?.user);

  let defaultRedirectPath = "/";
  if (isLoggedIn) {
    switch (userRole?.role) {
      case "customer":
        defaultRedirectPath = "/customer/dashboard";
        break;
      case "admin":
        defaultRedirectPath = "/admin/dashboard";
        break;
      case "salesman":
        defaultRedirectPath = "/salesman/dashboard";
        break;
      default:
        defaultRedirectPath = "/";
        break;
    }
  } else {
    defaultRedirectPath = "/sign-in";
  }

  return (
    <React.Fragment>
      <PageTitle /> {/* Include PageTitle component */}
      <Routes>
        {!isLoggedIn &&
          <React.Fragment>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ResetPassword />} />
          </React.Fragment>
        }
        <Route element={<AuthRoutes />}>
          <Route
            path="/admin/*"
            element={<PrivateRoute element={Dashboard} allowedRoles={['admin']} />}
          />
          <Route
            path="/salesman/*"
            element={<PrivateRoute element={SalesmanDashboard} allowedRoles={['salesman']} />}
          />
          <Route
            path="/customer/*"
            element={<PrivateRoute element={CustomerDashboard} allowedRoles={['customer']} />}
          />
          <Route path="*" element={<Navigate to={defaultRedirectPath} />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
