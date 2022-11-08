import React from "react";

const ArrowLeft = ({ color = "inherit" }) => {
  return (
    <svg
      color={color}
      width="1em"
      height="1em"
      viewBox="0 0 5 10"
      fill="none"
      className="text-alternate"
    >
      <path d="M4 9L0 5l4-4" stroke="currentColor" strokeWidth="2"></path>
    </svg>
  );
};

export default ArrowLeft;
