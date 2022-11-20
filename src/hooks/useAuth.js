import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../features/users/UserSlice";

const useAuth = () => {
  const currentUser = useSelector(currentUserSelector);
  return useMemo(() => currentUser, [currentUser]);
};

export default useAuth;
