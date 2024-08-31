// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, SalesmanDashboard, CustomerDashboard } from "@/layouts";
import AuthRoutes from "./routes/AuthRoutes";
import { SignIn, SignUp } from "./pages/auth";
import PrivateRoute from "./routes/PrivateRoute";
import { adminRoutes, salesmanRoutes, customerRoutes } from "@/routes";

function App() {
  return (
    <Routes>
    
      <Route path="/sign-in" element={<SignIn />} />
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
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
