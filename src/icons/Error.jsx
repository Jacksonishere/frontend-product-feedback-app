import React from "react";
import { motion } from "framer-motion";

const iconContainerVariant = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      duration: 0.2,
      delayChildren: 0.1,
    },
  },
};

const barVariant = {
  initial: {
    width: 0,
  },
  animate: {
    width: "10px",
    transition: {
      duration: 0.2,
      type: "spring",
    },
  },
};

const Error = () => {
  return (
    <motion.div
      variants={iconContainerVariant}
      className="relative grid place-items-center w-[19px] h-[19px] bg-red-700 rounded-full"
    >
      <motion.span
        className="absolute h-[2px] rounded-full bg-white rotate-45"
        variants={barVariant}
      ></motion.span>
      <motion.span
        className="absolute h-[2px] rounded-full bg-white -rotate-45"
        variants={barVariant}
      ></motion.span>
    </motion.div>
  );
};

export default Error;
