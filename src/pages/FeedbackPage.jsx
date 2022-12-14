import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import feedbackApi, { useGetFeedbackQuery } from "../api/feedbackApiSlice";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";

import Feedback from "../components/feedback/Feedback";
import NavigateBack from "../components/utils/NavigateBack";
import Spinner from "../components/utils/Spinner";
import FeedbackNotFound from "../components/utils/FeedbackNotFound";

import ArrowLeft from "../icons/ArrowLeft";

import useAuth from "../hooks/useAuth";
import CommentThread from "../components/feedback/comments/CommentThread";

const FeedbackPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  const {
    data: feedback,
    isLoading,
    isSuccess,
    isError,
  } = useGetFeedbackQuery(parseInt(id));

  const currentUser = useAuth();

  const [patchResult, setPatchResult] = useState();

  const likeOptimisticUpdate = (new_num_likes) => {
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
    <div className="relative container mb-[120px] px-6 max-w-2xl md:mx-auto lg:max-w-3xl">
      <nav className="flex justify-between items-center">
        <NavigateBack>
          <ArrowLeft color="#4661E6" />
          <span className="ml-4 text-blue-400 text-[14px] font-bold md:text-[15px]">
            Go Back
          </span>
        </NavigateBack>
        {isSuccess && feedback?.user.id === currentUser?.id && (
          <Link className="btn bg-blue-700" to={`/feedbacks/${id}/edit`}>
            Edit Feedback
          </Link>
        )}
      </nav>
      {isLoading ? (
        <Spinner mt={10} />
      ) : isError ? (
        <FeedbackNotFound />
      ) : (
        <>
          <div
            className={`space-y-8 ${
              location.pathname.includes("/edit") ? "hidden " : ""
            }`}
          >
            <Feedback
              feedback={feedback}
              showPage={true}
              patchResult={patchResult}
              likeOptimisticUpdate={likeOptimisticUpdate}
            />
            <CommentThread feedback={feedback} forFeedback={feedback.id} />
          </div>
          <Outlet context={[feedback, currentUser]} />
        </>
      )}
    </div>
  );
};

export default FeedbackPage;
