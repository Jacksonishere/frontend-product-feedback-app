import React, { useEffect, useCallback, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useSelector } from "react-redux";
import { hideFlash } from "../../features/modals/flashSlice";
import useFlash from "../../hooks/useFlash";

const flashContainerVariant = {
  initial: {
    top: -40,
    scale: 0,
    left: "50%",
    x: "-50%",
  },
  animate: {
    top: 40,
    scale: 1,
    transition: {
      duration: 0.2,
      delayChildren: 0.075,
    },
  },
  exit: {
    top: -40,
    scale: 0,
    left: "50%",
    x: "-50%",
  },
};

const iconVariant = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      duration: 0.4,
      type: "spring",
    },
  },
};

const xBarVariant = {
  initial: { origin: 0.5, scale: 0, rotate: 0 },
  animate: (top) => ({
    scale: 1,
    rotate: top ? 45 : -45,
    transition: { type: "tween" },
  }),
};

const ErrorFlash = ({ msg }) => {
  return (
    <>
      <motion.div
        variants={iconVariant}
        className="relative grid place-items-center w-[17px] h-[17px] bg-red-700 rounded-full"
      >
        <motion.span
          className="absolute w-[11px] h-[2px] rounded-full bg-white"
          variants={xBarVariant}
          custom={true}
        ></motion.span>
        <motion.span
          className="absolute w-[11px] h-[2px] rounded-full bg-white"
          variants={xBarVariant}
        ></motion.span>
      </motion.div>
      <p className="text-blue-900">{msg}</p>
    </>
  );
};

const Flash = () => {
  const { show, type, msg } = useSelector((state) => state.flash);
  const timeOutId = useRef();

  const { dispatchHideFlash } = useFlash();

  useEffect(() => {
    if (show) {
      timeOutId.current = setTimeout(() => {
        dispatchHideFlash();
      }, 1000);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute z-50 w-max bg-white rounded-lg drop-shadow-xl text-blue-900"
          variants={flashContainerVariant}
          initial="initial"
          animate="animate"
          exit={{
            opacity: 0,
            transition: {
              duration: 1,
            },
          }}
          key="modal"
        >
          <div className="flex items-center p-2 gap-2">
            <ErrorFlash msg={msg} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Flash;
