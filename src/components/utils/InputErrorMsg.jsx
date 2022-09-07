import React from "react";
import Alert from "../../icons/Alert";

const InputErrorMsg = ({ msg }) => {
  return msg ? (
    <p className="error-p">
      <Alert />
      <span className="ml-2">{msg}</span>
    </p>
  ) : (
    <></>
  );
};

export default InputErrorMsg;
