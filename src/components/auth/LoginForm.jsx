import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uniqueId } from "lodash";

import Spinner from "../utils/Spinner";

import useFlash from "../../hooks/useFlash";

import { setUser } from "../../features/users/userSlice";
import { useSignInUserMutation } from "../../api/userAuth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { dispatchHideFlash, dispatchShowFlash } = useFlash();

  const navigate = useNavigate();
  const location = useLocation();

  const [signIn, { data: user, isLoading, error, isSuccess }] =
    useSignInUserMutation();

  // useEffect(() => {
  //   if (error)
  //     dispatchShowFlash({
  //       show: true,
  //       type: "ERROR",
  //       msg: "Invalid Credentials. Try again.",
  //       id: uniqueId(),
  //     });
  // }, [error]);

  // useEffect(() => {
  //   if (isSuccess && user) {
  //     dispatch(setUser(user.data.attributes));
  //     dispatchHideFlash();
  //     // Temporary workaround. During rerender, navigate from AuthPanel is
  //     setTimeout(() => {
  //       navigate("/", {
  //         state: { redirect: "login success" },
  //       });
  //     }, 50);
  //   }
  // }, [isSuccess, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formBody = Object.fromEntries(formData);

    const { data: user, error } = await signIn(formBody);
    if (user) {
      dispatch(setUser(user.data.attributes));
      dispatchHideFlash();
      if (location.state?.from?.pathname) {
        navigate(location.state.from.pathname);
      } else {
        navigate("/", { state: { redirect: "login success" } });
      }
      // setTimeout(() => {

      // }, 50)
    } else if (error) {
      dispatchShowFlash({
        show: true,
        type: "ERROR",
        msg: "Invalid Credentials. Try again.",
        id: uniqueId(),
      });
    }
  };

  return (
    <form className="form" action="#" onSubmit={handleLogin}>
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
