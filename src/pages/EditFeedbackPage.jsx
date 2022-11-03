import React from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import FeedbackForm from "../components/feedback/FeedbackForm";
import NavigateBack from "../components/utils/NavigateBack";

const EditFeedbackPage = () => {
  const [feedback, currentUser] = useOutletContext();

  return !feedback ? (
    <></>
  ) : currentUser?.id === feedback.user.id ? (
    <div className="absolute z-1000 top-0 left-0 right-0 !mt-0 bg-blue-25">
      <div className="sm-container ">
        <NavigateBack />
        <FeedbackForm feedback={feedback} />
      </div>
    </div>
  ) : (
    <Navigate to={`/`} />
  );
};

export default EditFeedbackPage;
