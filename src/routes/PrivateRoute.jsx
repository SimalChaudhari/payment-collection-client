import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, allowedRoles, ...rest }) => {
  const auth = useSelector((state) => state.authReducer.user);
  const role = auth?.user?.role; // Ensure the role is being accessed correctly

  // Define role-based routes
  const roleBasedRedirects = {
    admin: '/admin/home',
    salesman: '/salesman/home',
    customer: '/customer/home'
  };

  // Check if user is logged in and has the required role
  const hasAccess = auth && allowedRoles.includes(role);

  if (auth) {
    if (hasAccess) {
      return <Element {...rest} />;
    } else {
      // Redirect to the appropriate dashboard based on the user's role
      const redirectPath = roleBasedRedirects[role] ;
      return <Navigate to={redirectPath} replace />;
    }
  } else {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/sign-in" replace />;
  }
};

export default PrivateRoute;
