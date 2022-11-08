import React from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import FeedbackForm from "../components/feedback/FeedbackForm";
import NavigateBack from "../components/utils/NavigateBack";
import ArrowLeft from "../icons/ArrowLeft";

const EditFeedbackPage = () => {
  const [feedback, currentUser] = useOutletContext();

  return !feedback ? (
    <></>
  ) : currentUser?.id === feedback.user.id ? (
    <div className="absolute z-1000 top-0 left-0 right-0 !mt-0 bg-blue-25">
      <div className="sm-container ">
        <NavigateBack>
          <ArrowLeft color="#4661E6" />
          <span className="ml-4 text-blue-400 text-[13px] font-semibold md:text-[14px]">
            Go Back
          </span>
        </NavigateBack>
        <FeedbackForm feedback={feedback} />
      </div>
    </div>
  ) : (
    <Navigate to={`/`} />
  );
};

export default EditFeedbackPage;
