import React from "react";
import { useNavigate } from "react-router-dom";

import ArrowLeft from "../../icons/ArrowLeft";

const NavigateBack = ({ mt = 50, mb = 8 }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center mt-[${mt}px] mb-${mb} w-max`}
    >
      <ArrowLeft />
      <span className="ml-2 text-blue-400 text-[13px] font-semibold md:text-[14px]">
        Go Back
      </span>
    </button>
  );
};

export default NavigateBack;
