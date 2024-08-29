// AuthRoutes.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = ({ element, ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;

};

export default AuthRoutes;
