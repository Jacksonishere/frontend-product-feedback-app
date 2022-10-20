import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useSelector } from "react-redux";
import useFlash from "../../hooks/useFlash";

import FlashContent from "./FlashContent";

const flashContainerVariant = {
  initial: {
    opacity: 0,
    top: -20,
    scale: 0,
    transition: {
      duration: 0.15,
    },
  },
  animate: {
    opacity: 1,
    top: 20,
    scale: 1,
    transition: {
      duration: 0.2,
      delayChildren: 0.15,
      type: "tween",
    },
  },
};

const Flash = () => {
  const { show, type, msg, id } = useSelector((state) => state.flash);
  const location = useLocation();

  const timeOutId = useRef();

  const { dispatchHideFlash, dispatchTimedHideFlash, dispatchShowFlash } =
    useFlash();

  useEffect(() => {
    if (show) {
      if (timeOutId.current) {
        //reset timer
        clearTimeout(timeOutId.current);
      }
      timeOutId.current = dispatchTimedHideFlash(2500);
    } else {
      clearTimeout(timeOutId.current);
    }
  }, [show, id]);

  useEffect(() => {
    // if it is current shown, then we want to dispatch. this means that after the user has navigated and this has rendered as a result of that, then we want to hide it.
    if (show) dispatchHideFlash();
    // clearTimeout(timeOutId.current);
  }, [location.pathname]);

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
        case "FEEDBACK-CREATED":
          msg = "Your feedback has been created!";
          break;
        case "FEEDBACK-UPDATED":
          msg = "Your feedback has been updated!";
          break;
        default:
          break;
      }

      dispatchShowFlash({
        type: "SUCCESS",
        msg,
      });
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  return (
    <div className="flex justify-center">
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key={location.pathname + msg}
            className="fixed mx-auto z-50 w-max bg-white rounded-lg drop-shadow-xl text-[14px] text-blue-900"
            variants={flashContainerVariant}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            <FlashContent type={type} msg={msg} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Flash;
