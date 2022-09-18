import React, { useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";
import useFlash from "../../hooks/useFlash";

import FlashContent from "./FlashContent";

const flashContainerVariant = {
  initial: {
    top: -20,
    scale: 0,
    left: "50%",
    x: "-50%",
  },
  animate: {
    top: 20,
    scale: 1,
    transition: {
      duration: 0.2,
      delayChildren: 0.1,
      type: "tween",
    },
  },
  exit: {
    top: -20,
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Flash = () => {
  const { show, type, msg, id } = useSelector((state) => state.flash);
  const location = useLocation();

  const timeOutId = useRef();

  const { dispatchHideFlash, dispatchTimedHideFlash, dispatchShowFlash } =
    useFlash();

  /**
   * For the case where flash is showing, but we do something to trigger it to reset the time to hide.
   * Like retrying to login with invalid credentials before the flash msg disappeared the first time.
   * Using dummy id to trigger effect but also works out because initial id is 0.
   */
  useEffect(() => {
    if (id) {
      clearTimeout(timeOutId.current);
      timeOutId.current = dispatchTimedHideFlash(2500);
    }
  }, [id]);

  /**
   * Set timeout to hide flash
   */
  useEffect(() => {
    if (show) timeOutId.current = dispatchTimedHideFlash(2500);
  }, [show]);

  /**
   * When rerouting - detected by location path, hide the flash and clear the timeout if it exists.
   */
  useEffect(() => {
    dispatchHideFlash();
    clearTimeout(timeOutId.current);
  }, [location.pathname]);

  /**
   * Listen for nav state changes
   */
  useEffect(() => {
    let msg,
      redirected = location.state?.redirect;

    if (redirected) {
      switch (redirected) {
        case "LOGIN":
          msg = `Welcome back ${location.state.username}!`;
          break;
        case "SIGNUP":
          msg = `Welcome ${location.state.username}!`;
          break;
        default:
          break;
      }
      dispatchShowFlash({
        show: true,
        type: "SUCCESS",
        msg,
      });
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={location.pathname}
          className="absolute z-50 w-max bg-white rounded-lg drop-shadow-xl text-[14px] text-blue-900"
          variants={flashContainerVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <FlashContent type={type} msg={msg} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Flash;
