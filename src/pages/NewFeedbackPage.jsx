import React from "react";
import NavigateBack from "../components/utils/NavigateBack";

import FeedbackForm from "../components/feedback/FeedbackForm";
import ArrowLeft from "../icons/ArrowLeft";

const NewFeedbackPage = () => {
  return (
    <div className="sm-container">
      <NavigateBack>
        <ArrowLeft color="#4661E6" />
        <span className="ml-4 text-blue-400 text-[14px] font-bold md:text-[15px]">
          Go Back
        </span>
      </NavigateBack>
      <FeedbackForm />
    </div>
  );
};

export default NewFeedbackPage;
