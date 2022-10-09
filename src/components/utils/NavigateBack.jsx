import React from "react";
import { useNavigate } from "react-router-dom";

import ArrowLeft from "../../icons/ArrowLeft";

const NavigateBack = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to ?? -1)}
      className={`flex items-center my-[40px] w-max`}
    >
      <ArrowLeft />
      <span className="ml-4 text-blue-400 text-[13px] font-semibold md:text-[14px]">
        Go Back
      </span>
    </button>
  );
};

export default NavigateBack;
