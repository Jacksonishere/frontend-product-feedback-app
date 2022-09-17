import React from "react";
import { useGetFeedbackQuery } from "../api/feedbackApiSlice";
import { useParams } from "react-router-dom";

import Feedback from "../components/feedback/Feedback";
import Spinner from "../components/utils/Spinner";

const FeedbackPage = () => {
  const { id } = useParams();
  const { data: feedback, isLoading } = useGetFeedbackQuery(parseInt(id));

  return (
    <div>{isLoading ? <Spinner /> : <Feedback feedback={feedback} />}</div>
  );
};

export default FeedbackPage;
