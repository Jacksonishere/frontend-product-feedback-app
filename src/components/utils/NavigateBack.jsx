import React from "react";
import { useNavigate } from "react-router-dom";

import ArrowLeft from "../../icons/ArrowLeft";

const NavigateBack = ({ children, to, margin = true }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to ?? -1)}
      className={`flex items-center w-max ${margin ? "my-[40px]" : ""}`}
    >
      {children}
    </button>
  );
};

export default NavigateBack;
