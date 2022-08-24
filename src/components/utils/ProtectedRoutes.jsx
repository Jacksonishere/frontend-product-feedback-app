import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoutes = () => {
  const currLocation = useLocation();
  const currentUser = useAuth();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: currLocation }} />
  );
};

export default ProtectedRoutes;
