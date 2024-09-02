// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, SalesmanDashboard, CustomerDashboard } from "@/layouts";
import AuthRoutes from "./routes/AuthRoutes";
import { SignIn } from "./pages/auth";
import PrivateRoute from "./routes/PrivateRoute";
import { useSelector } from "react-redux";

function App() {

  const isLoggedIn = useSelector((state) => state.authReducer.isAuthenticated);
  const userRole = useSelector((state) => state.authReducer?.user?.user);

  let defaultRedirectPath = "/";
  if (isLoggedIn) {
    switch (userRole?.role) {
      case "customer":
        defaultRedirectPath = "/customer/home";
        break;
      case "admin":
        defaultRedirectPath = "/admin/home";
        break;
      case "salesman":
        defaultRedirectPath = "/salesman/home";
        break;
      default:
        defaultRedirectPath = "/";
        break;
    }
  } else {
    defaultRedirectPath = "/sign-in";
  }

  return (
    <Routes>
      {!isLoggedIn &&
        <Route path="/sign-in" element={<SignIn />} />
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
  );
}

export default App;
