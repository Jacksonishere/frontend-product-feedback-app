import React from "react";
import { useNavigate } from "react-router-dom";

const NavigateBack = ({ children, to, margin = true }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to ?? -1, { state: null })}
      className={`flex items-center w-max ${
        margin ? "mt-[38px] mb-[28px] md:mt-[44px] md:mb-[34px]" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default NavigateBack;
