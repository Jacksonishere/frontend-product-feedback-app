import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../features/Users/userSlice";

const useAuth = () => {
  const currentUser = useSelector(currentUserSelector);
  return useMemo(() => currentUser, [currentUser]);
};

export default useAuth;
