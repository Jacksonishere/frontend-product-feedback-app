import React from "react";
import { motion } from "framer-motion";

const iconContainerVariant = {
  initial: {
    rotate: 45,
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      duration: 0.2,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const kickVariant = {
  initial: {
    width: 0,
  },
  animate: {
    width: "4px",
  },
};

const legVariant = {
  initial: {
    height: 0,
  },
  animate: {
    height: "9px",
  },
};

const Success = () => {
  return (
    <motion.div
      variants={iconContainerVariant}
      className="relative w-[19px] h-[19px] bg-success-green rounded-full"
    >
      <motion.div
        variants={kickVariant}
        className="absolute left-[6px] h-[3px] bottom-[5.5px] bg-white"
      ></motion.div>
      <motion.div
        variants={legVariant}
        className="absolute left-[9px] bottom-[5.5px] w-[2.5px] bg-white"
      ></motion.div>
    </motion.div>
  );
};

export default Success;
