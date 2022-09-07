import React, { useEffect } from "react";
import { useDispatch, batch } from "react-redux";

import { useIsLoggedInQuery } from "../api/userAuth";
import { setUser, setLoaded } from "../features/users/userSlice";

const useLoginCheck = () => {
  const dispatch = useDispatch();
  const { data: user, isSuccess, refetch } = useIsLoggedInQuery();

  useEffect(() => {
    if (isSuccess) {
      if (user) {
        batch(() => {
          dispatch(setUser(user.data.attributes));
          dispatch(setLoaded());
        });
      } else {
        dispatch(setLoaded());
      }
    }
  }, [isSuccess, user]);

  return isSuccess;
};

export default useLoginCheck;
