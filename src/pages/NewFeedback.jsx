import React from "react";
import NavigateBack from "../components/utils/NavigateBack";

import FeedbackForm from "../components/feedback/FeedbackForm";

const NewFeedback = () => {
  return (
    <div className="px-6">
      <NavigateBack />
      <FeedbackForm />
    </div>
  );
};

export default NewFeedback;
