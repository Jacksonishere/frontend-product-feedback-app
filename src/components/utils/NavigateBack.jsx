import React from "react";
import { Link } from "react-router-dom";

import ArrowLeft from "../../icons/ArrowLeft";

const NavigateBack = () => {
  return (
    <Link to="/" className="flex items-center mt-8 w-max">
      <ArrowLeft />
      <span className="ml-[6px] text-blue-400 text-[14px] font-semibold ">
        Go Back
      </span>
    </Link>
  );
};

export default NavigateBack;
