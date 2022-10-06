import React from "react";
import { useNavigate } from "react-router-dom";

import ArrowLeft from "../../icons/ArrowLeft";

const NavigateBack = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center mt-[40px] mb-[30px] w-max`}
    >
      <ArrowLeft />
      <span className="ml-4 text-blue-400 text-[12px] font-semibold md:text-[13px]">
        Go Back
      </span>
    </button>
  );
};

export default NavigateBack;
