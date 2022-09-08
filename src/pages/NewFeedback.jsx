import React from "react";
import NavigateBack from "../components/utils/NavigateBack";

import FeedbackForm from "../components/feedback/FeedbackForm";

const NewFeedback = () => {
  return (
    <div className="mx-auto px-6 max-w-[592px]">
      <NavigateBack />
      <FeedbackForm
      // post={{
      //   title: "bawb",
      //   detail: "gay",
      //   category: "Enhancement",
      //   status: "Planned",
      // }}
      />
    </div>
  );
};

export default NewFeedback;
