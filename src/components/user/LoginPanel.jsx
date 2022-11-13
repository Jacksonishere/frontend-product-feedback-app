import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { loadedSelector, resetUser } from "../../features/users/userSlice";
import { useSignOutUserMutation } from "../../api/userApiSlice";
import { showFlash } from "../../features/modals/flashSlice";

import useAuth from "../../hooks/useAuth";
import useFlash from "../../hooks/useFlash";
import useOutsideClick from "../../hooks/useOutsideClick";

import LoginIcon from "../../icons/Login";
import Logout from "../../icons/Logout";

const signoutBtnVariant = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
};
const LoginPanel = ({ hamOpen, setHamOpen }) => {
  const dispatch = useDispatch();

  const user = useAuth();
  const { dispatchHideFlash, dispatchShowFlash } = useFlash();

  const loaded = useSelector(loadedSelector);
  const [signOutUser, { isSuccess, isLoading }] = useSignOutUserMutation();

  const toggleHam = useCallback(() => setHamOpen((curr) => !curr), []);

  const [showSignout, setShowSignout] = useState(false);
  const outsideLoginBtnDetector = useOutsideClick(() => setShowSignout(false));

  const signOutUserHandler = useCallback(() => {
    dispatchHideFlash();
    signOutUser();
  }, []);

  useEffect(() => {
    if (isLoading) {
    }
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess) {
      setShowSignout(false);
      dispatch(resetUser());
      dispatchShowFlash({
        type: "SUCCESS",
        msg: "You have successfully logged out.",
      });
    }
  }, [isSuccess]);

  return (
    <div className="inset-x-0 top-0 z-10 flex items-center px-6 h-[72px] bg-gradient text-white md:static md:flex-col md:h-auto md:w-1/3 md:rounded-lg md:items-start md:p-6 lg:w-full lg:h-[170px]">
      <div className="flex flex-col capitalize md:order-2 md:mt-auto">
        <h2 className="font-bold text-[15px] md:text-[20px]">
          Frontend Mentor
        </h2>
        <p className="text-[13px] opacity-75 md:text-[15px]">Feedback Board</p>
      </div>

      <div
        onClick={() => setShowSignout((curr) => !curr)}
        className="text-[16px] ml-auto md:order-1 md:ml-0 cursor-pointer"
      >
        {loaded && (
          <>
            {user ? (
              <div
                ref={outsideLoginBtnDetector}
                className="relative flex justify-start items-center"
              >
                <figure>
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.avatar_url}
                    alt=""
                  />
                </figure>
                <p className="hidden md:block md:ml-2">
                  <b>{user.username}</b>
                </p>

                <AnimatePresence>
                  {showSignout && (
                    <motion.button
                      className="absolute top-[calc(100%_+_10px)] right-[20px] z-[100] flex items-center justify-start px-[16px] py-[10px] w-max text-red-700 text-[14px] bg-white rounded-lg shadow-md origin-top-right md:left-0 md:origin-top-left"
                      onClick={signOutUserHandler}
                      variants={signoutBtnVariant}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Logout />
                      <p className="ml-2">Sign Out</p>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link className="flex" to="/auth/login">
                <LoginIcon />
                <span className="ml-[3px]">Login</span>
              </Link>
            )}
          </>
        )}
      </div>

      <div
        onClick={toggleHam}
        className="flex flex-col space-y-1 ml-5 cursor-pointer md:hidden"
      >
        <span
          className={`origin-left ham-bar ${hamOpen ? "rotate-45" : ""} `}
        ></span>
        <span className={`${hamOpen ? "opacity-0" : ""} ham-bar`}></span>
        <span
          className={`origin-left ham-bar ${hamOpen ? "-rotate-45" : ""} `}
        ></span>
      </div>
    </div>
  );
};

export default LoginPanel;
