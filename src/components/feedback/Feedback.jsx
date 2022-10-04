import React, { useCallback, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { useUpdateLikeMutation } from "../../api/feedbackApiSlice";
import useAuth from "../../hooks/useAuth";
import useFlash from "../../hooks/useFlash";

import ArrowUp from "../../icons/ArrowUp";
import Comment from "../../icons/Comment";

import LikeBtn from "../utils/LikeBtn";
import FeedbackContext from "../../context/FeedbacksContext";

const Feedback = ({ feedback, infiniteScroll }) => {
  const user = useAuth();
  const likeBtnRef = useRef();
  const likeDone = useRef(false);
  const oldFeedbacks = useRef();

  const { dispatchShowFlash } = useFlash();
  const [updateLike, { isSuccess, isLoading, isError }] =
    useUpdateLikeMutation();
  const { allFeedbacks, setAllFeedbacks, sortAllFeedbacks } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (isLoading) {
      const { user_liked, num_likes } = feedback;
      let newLikeCount = num_likes + (user_liked ? -1 : 1);

      oldFeedbacks.current = allFeedbacks;
      const updatedFeedbacks = allFeedbacks.map((f) =>
        f.id === feedback.id
          ? {
              ...f,
              user_liked: !user_liked,
              num_likes: newLikeCount,
            }
          : f
      );

      setAllFeedbacks(updatedFeedbacks);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      dispatchShowFlash(
        {
          show: true,
          type: "ERROR",
          msg: "There was a problem liking this post",
        },
        true
      );
      setAllFeedbacks(oldFeedbacks.current);
      oldFeedbacks.current = null;
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      sortAllFeedbacks(allFeedbacks);
      likeDone.current = true;
      oldFeedbacks.current = null;
    }
  }, [isSuccess]);

  useEffect(() => {
    if (likeDone.current) {
      likeBtnRef.current.scrollIntoView();
      likeDone.current = false;
    }
  }, [allFeedbacks]);

  const feedbackLikeHandler = useCallback(() => {
    updateLike({
      likeable_type: "Feedback",
      likeable_id: feedback.id,
    });
  }, []);

  return (
    <div
      id={feedback.id}
      ref={infiniteScroll}
      className="grid grid-rows-[repeat(2,_auto)] grid-cols-[1fr_1fr] gap-y-4 p-7 bg-white text-blue-900 rounded-md text-[13px] hover:opacity-100 md:grid-rows-[auto] md:grid-cols-[repeat(3,_auto)] md:gap-[1.5rem]"
    >
      <Link
        ref={likeBtnRef}
        to={`/feedbacks/${feedback.id}`}
        className="col-span-full space-y-4 md:row-span-full md:col-[2_/_3]"
      >
        <div className="flex gap-1 items-center">
          <figure className="w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={feedback.user.avatar_url}
              alt=""
            />
          </figure>
          <p className="translate-y-[3px] grow">
            <b className="block font-bold">
              <span className="mr-[1.5px]">@</span>
              {feedback.user.username}
            </b>
            <span className="text-blue-400">{feedback.updated_at}</span>
          </p>
        </div>
        <p>
          <b className="block text-[15px] md:text-[17.5px]">{feedback.title}</b>
          <span className="inline-block mt-1 text-[13px] text-blue-400 md:text-[14px]">
            {feedback.detail}
          </span>
        </p>
        <div className="feedback-tag w-max col-span-full">
          {feedback.category}
        </div>
      </Link>

      <LikeBtn
        likeableHandler={feedbackLikeHandler}
        likeableThing={feedback}
        user={user}
      />

      <Link
        className="flex items-center justify-self-end md:row-span-full md:col-[3_/_-1] md:self-center"
        to={`/feedbacks/${feedback.id}`}
      >
        <Comment />
        <b className="ml-[4px] font-bold">29</b>
      </Link>
    </div>
  );
};

export default Feedback;
