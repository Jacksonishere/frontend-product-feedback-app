import React from "react";
import { useGetFeedbackQuery } from "../api/feedbackApiSlice";
import { useParams } from "react-router-dom";

import Feedback from "../components/feedback/Feedback";
import NavigateBack from "../components/utils/NavigateBack";
import Spinner from "../components/utils/Spinner";

const FeedbackPage = () => {
  const { id } = useParams();
  const { data: feedback, isLoading } = useGetFeedbackQuery(parseInt(id));

  return (
    <div className="container px-6 max-w-2xl md:mx-auto">
      <NavigateBack mb={7} />
      {isLoading ? (
        <Spinner mt={10} />
      ) : (
        <Feedback feedback={feedback} showPage={true} />
      )}
    </div>
  );
};

export default FeedbackPage;
