import React, { useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import ArrowLeft from "../icons/ArrowLeft";
import useAvatar from "../hooks/useAvatar";

const transition = { duration: 0.15, ease: [0.6, 0.01, -0.05, 0.9] };

const imgFadeOutIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const Auth = () => {
  const { pathname } = useLocation();

  const loginPath = useMemo(
    () => pathname === "/auth" || pathname === "/auth/login",
    [pathname]
  );
  const avatarUrl = useAvatar({ seed: pathname });

  return (
    <div className="mx-auto px-6 py-8 max-w-[480px]">
      <Link to="/" className="flex items-center mb-8 w-max">
        <ArrowLeft />
        <span className="ml-[6px] text-blue-400 text-[14px] font-semibold ">
          Go Back
        </span>
      </Link>
      <div className="px-6 pt-6 pb-8 bg-white rounded-xl">
        <figure className="mx-auto my-6 h-[80px] max-w-[80px] rounded-full overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={loginPath}
              variants={imgFadeOutIn}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              src={avatarUrl}
              alt="avatar"
            />
          </AnimatePresence>
        </figure>
        <div
          className={`relative flex before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-1/2 before:h-1 before:bg-purple-700 before:transition-transform ${
            !loginPath ? "before:translate-x-[100%]" : ""
          }`}
        >
          <Link
            className={`auth-link ${loginPath ? "active-auth-link" : ""}`}
            to="/auth/login"
          >
            Login
          </Link>
          <Link
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
