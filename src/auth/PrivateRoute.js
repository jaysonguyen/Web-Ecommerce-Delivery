import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

//private route, only show for authenticated users
const PrivateRoute = ({ role: roles, children }) => {
  let user = isAuthenticated();

  // if user not null and role of route does exists with array
  if (user && (Array.isArray(roles) || !roles || roles.includes(user.role))) {
    return <>{children}</>;
  }

  // not login => go back to login
  return <Navigate to="/main" />;
};

export default PrivateRoute;
