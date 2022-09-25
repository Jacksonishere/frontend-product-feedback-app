import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { loaded, user } = useSelector((state) => state.user);
  const currLocation = useLocation();

  return !loaded ? (
    <></>
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: currLocation }} replace />
  );
};

export default ProtectedRoutes;
