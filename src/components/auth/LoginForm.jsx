import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Spinner from "../utils/Spinner";

import useFlash from "../../hooks/useFlash";

import { setUser } from "../../features/users/userSlice";
import { useSignInUserMutation } from "../../api/userAuth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { dispatchHideFlash, dispatchShowFlash } = useFlash();

  const dummyId = useRef(0);
  const navigate = useNavigate();

  const [signIn, { data: user, isLoading, error, isSuccess }] =
    useSignInUserMutation();

  useEffect(() => {
    if (error)
      dispatchShowFlash({
        show: true,
        type: "ERROR",
        msg: "Invalid Credentials. Try again.",
        id: dummyId.current++,
      });
  }, [error]);

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser(user.data.attributes));
      dispatchHideFlash();
      navigate("/", {
        state: { redirect: "login success" },
      });
    }
  }, [isSuccess, user]);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formBody = Object.fromEntries(formData);

    signIn(formBody);
  };

  return (
    <form className="form" action="#" onSubmit={handleLogin}>
      <button
        onClick={() => {
          dispatchHideFlash();
          navigate("/", {
            state: { redirect: "login success" },
          });
        }}
      >
        click dur
      </button>
      <label className="label-wrapper">
        <span className="input-label">Email</span>
        <input
          // required
          // ref={(node) => node?.focus()}
          className="input-text"
          name="email"
          type="email"
          placeholder="johndoe@email.com"
        />
      </label>
      <label className="label-wrapper">
        <span className="input-label">Password</span>
        <input
          // required
          className="input-text"
          name="password"
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
