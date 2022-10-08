import React from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import FeedbackForm from "../components/feedback/FeedbackForm";

const EditFeedbackPage = () => {
  const [feedback, currentUser] = useOutletContext();

  return !feedback ? (
    <Navigate to="/" />
  ) : currentUser?.id === feedback.user.id ? (
    <div className="absolute z-1000 top-0 left-0 right-0 bg-blue-25">
      <div className="sm-container ">
        <FeedbackForm feedback={feedback} />
      </div>
    </div>
  ) : (
    <Navigate to={`/`} />
  );
};

export default EditFeedbackPage;
