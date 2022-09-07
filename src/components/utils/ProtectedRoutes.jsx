import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { loaded, user } = useSelector((state) => state.userSlice);
  const currLocation = useLocation();

  if (!loaded) return <></>;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace state={{ from: currLocation }} />
  );
};

export default ProtectedRoutes;
