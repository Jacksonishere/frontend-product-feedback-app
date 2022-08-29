import React from "react";

import Error from "../../icons/Error";
import Success from "../../icons/Success";

const flashIcons = {
  ERROR: Error,
  SUCCESS: Success,
};

const FlashContent = ({ type, msg }) => {
  const FlashIcon = flashIcons[type];

  return (
    <div className="flex items-center p-2 gap-2">
      <FlashIcon />
      <p className="text-blue-900">{msg}</p>
    </div>
  );
};

export default FlashContent;
