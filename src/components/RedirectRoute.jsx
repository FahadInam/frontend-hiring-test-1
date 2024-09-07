import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RedirectRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? <Navigate to="/calls" /> : children;
};

export default RedirectRoute;
