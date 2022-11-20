import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Spinner from "../utils/Spinner";
import InputErrorMsg from "../utils/InputErrorMsg";
import { ValidateEmail } from "../../utils/Utils";

import useFlash from "../../hooks/useFlash";

import { setUser } from "../../features/users/UserSlice";
import { useSignInUserMutation } from "../../api/userApiSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { dispatchShowFlash } = useFlash();

  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [passwordErrorMsg, setPasswordErrorMsg] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const [signIn, { isLoading }] = useSignInUserMutation();

  const isInvalidForm = useMemo(
    () => emailErrorMsg !== null || passwordErrorMsg !== null,
    [emailErrorMsg, passwordErrorMsg]
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formBody = Object.fromEntries(formData);

    if (isInvalidForm) return;

    const { data: user, error } = await signIn(formBody);
    if (user) {
      dispatch(setUser(user));
      if (location.state?.from?.pathname) {
        navigate(location.state.from.pathname, { replace: true });
      } else {
        navigate("/", {
          state: { redirect: "LOGIN", username: user.username },
          replace: true,
        });
      }
    } else if (error) {
      dispatchShowFlash(
        {
          type: "ERROR",
          msg: "Invalid Credentials. Try again.",
        },
        true
      );
    }
  };

  const handleEmail = (e) => {
    if (!ValidateEmail(e.target.value)) {
      setEmailErrorMsg("Invalid email address.");
    } else {
      setEmailErrorMsg(null);
    }
  };

  return (
    <form className="form" action="#" onSubmit={handleLogin}>
      <div className="form-group">
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          className={`input-text ${emailErrorMsg ? "error-input" : ""}`}
          name="email"
          type="email"
          onChange={handleEmail}
          placeholder="johndoe@email.com"
        />
        <InputErrorMsg msg={emailErrorMsg} />
      </div>

      <div className="form-group">
        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          className={`input-text ${passwordErrorMsg ? "error-input" : ""}`}
          name="password"
          type="password"
          onChange={(e) =>
            e.target.value === ""
              ? setPasswordErrorMsg("Password cannot be blank")
              : setPasswordErrorMsg(null)
          }
        />
        <InputErrorMsg msg={passwordErrorMsg} />
      </div>
      <button
        className={`form-submit w-full ${isLoading ? "opacity-80" : ""}`}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? <Spinner /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
