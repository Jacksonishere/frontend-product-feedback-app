import React, { useEffect } from "react";

import Spinner from "../utils/Spinner";

import { useDispatch } from "react-redux";

import { setUser } from "../../features/users/userSlice";
import { useSignInUserMutation } from "../../api/userAuth";
import { showFlash } from "../../features/modals/flashSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [signIn, { data, isLoading, error }] = useSignInUserMutation();

  useEffect(() => {
    if (error)
      dispatch(
        showFlash({
          show: true,
          type: "ERROR",
          msg: "Invalid Credentials. Try again.",
        })
      );
  }, [error]);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formBody = Object.fromEntries(formData);

    signIn(formBody);
  };

  return (
    <form className="form" action="#" onSubmit={handleLogin}>
      <label className="label-wrapper">
        <span className="input-label">Email</span>
        <input
          // required
          ref={(node) => node?.focus()}
          className="input-text"
          name="user[email]"
          type="email"
          placeholder="johndoe@email.com"
        />
      </label>
      <label className="label-wrapper">
        <span className="input-label">Password</span>
        <input
          // required
          className="input-text"
          name="user[password]"
          type="password"
        />
      </label>
      <button
        className={`form-submit ${isLoading ? "opacity-80" : ""}`}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? <Spinner /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
