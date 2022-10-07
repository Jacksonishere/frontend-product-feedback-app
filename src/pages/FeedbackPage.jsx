import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import feedbackApi, { useGetFeedbackQuery } from "../api/feedbackApiSlice";
import { Link, useParams } from "react-router-dom";

import Feedback from "../components/feedback/Feedback";
import NavigateBack from "../components/utils/NavigateBack";
import Spinner from "../components/utils/Spinner";
import FeedbackNotFound from "../components/utils/FeedbackNotFound";

import useAuth from "../hooks/useAuth";

const FeedbackPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: feedback,
    isLoading,
    isSuccess,
    isError,
  } = useGetFeedbackQuery(parseInt(id));

  const currentUser = useAuth();

  const [patchResult, setPatchResult] = useState();

  const optimisticUpdate = (new_num_likes) => {
    setPatchResult(
      dispatch(
        feedbackApi.util.updateQueryData(
          "getFeedback",
          parseInt(id),
          (currFeedback) => {
            currFeedback.num_likes = new_num_likes;
            currFeedback.user_liked = !currFeedback.user_liked;
          }
        )
      )
    );
  };

  return (
    <div className="container px-6 max-w-2xl md:mx-auto">
      <nav className="flex justify-between items-center">
        <NavigateBack mb={7} />
        {isSuccess && feedback?.user.id === currentUser?.id && (
          <Link className="btn bg-blue-700" to={`/feedbacks/edit/${id}`}>
            Edit Feedback
          </Link>
        )}
      </nav>
      {isLoading ? (
        <Spinner mt={10} />
      ) : isError ? (
        <FeedbackNotFound />
      ) : (
        <Feedback
          feedback={feedback}
          showPage={true}
          patchResult={patchResult}
          optimisticUpdate={optimisticUpdate}
        />
      )}
    </div>
  );
};

export default FeedbackPage;
