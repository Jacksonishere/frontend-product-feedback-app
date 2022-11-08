import React, { useMemo } from "react";
import { Outlet, useLocation, Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigateBack from "../components/utils/NavigateBack";

import useAvatar from "../hooks/useAvatar";

import ArrowLeft from "../icons/ArrowLeft";

const Auth = () => {
  const { pathname } = useLocation();
  // const user = useAuth();
  const { user, loaded } = useSelector((state) => state.user);

  const loginPath = useMemo(
    () => pathname === "/auth" || pathname === "/auth/login",
    [pathname]
  );

  const avatarUrl = useAvatar({
    loaded: loaded,
    seed: pathname + new Date().valueOf(),
  });

  return (
    <div className="mx-auto px-6 pb-8 max-w-[550px]">
      <NavigateBack>
        <ArrowLeft color="#4661E6" />
        <span className="ml-4 text-[13px] font-semibold md:text-[14px]">
          Go Back
        </span>
      </NavigateBack>
      <div className="px-6 pt-6 pb-8 bg-white rounded-xl md:px-9 md:p">
        <figure className="mx-auto my-6 h-[80px] max-w-[80px] rounded-full overflow-hidden">
          <img key={loginPath} src={avatarUrl} alt="avatar" />
        </figure>
        <div
          className={`relative flex before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-1/2 before:h-1 before:bg-purple-700 before:transition-transform ${
            !loginPath ? "before:translate-x-[100%]" : ""
          }`}
        >
          <Link
            replace
            className={`auth-link ${loginPath ? "active-auth-link" : ""}`}
            to="/auth/login"
          >
            Login
          </Link>
          <Link
            replace
            className={`auth-link ${loginPath ? "" : "active-auth-link"}`}
            to="/auth/signup"
          >
            Sign Up
          </Link>
          <div
            aria-hidden
            className="absolute bottom-0 left-0 w-full h-[.5px] bg-blue-300 opacity-50"
          ></div>
        </div>
        <Outlet context={[avatarUrl]} />
      </div>
    </div>
  );
};

export default Auth;
