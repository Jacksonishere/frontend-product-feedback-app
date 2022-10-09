import React from "react";
import NavigateBack from "../components/utils/NavigateBack";

import FeedbackForm from "../components/feedback/FeedbackForm";

const NewFeedbackPage = () => {
  return (
    <div className="sm-container">
      <NavigateBack />
      <FeedbackForm />
    </div>
  );
};

export default NewFeedbackPage;
