import React, { useCallback, useContext, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { useUpdateLikeMutation } from "../../api/feedbackApiSlice";
import useAuth from "../../hooks/useAuth";
import useFlash from "../../hooks/useFlash";

import ArrowUp from "../../icons/ArrowUp";
import Comment from "../../icons/Comment";

import LikeBtn from "../utils/LikeBtn";
import FeedbackContext from "../../context/FeedbacksContext";

const Feedback = ({
  feedback,
  infiniteScroll,
  patchResult,
  optimisticUpdate,
}) => {
  const user = useAuth();
  const feedbackAnchor = useRef();
  const likeDone = useRef(false);
  const oldFeedbacks = useRef();

  const location = useLocation();

  const { dispatchShowFlash } = useFlash();
  const [updateLike, { isSuccess, isLoading, isError }] =
    useUpdateLikeMutation();
  const { allFeedbacks, setAllFeedbacks, sortAllFeedbacks } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (isLoading) {
      const { user_liked, num_likes } = feedback;
      let newLikeCount = num_likes + (user_liked ? -1 : 1);

      optimisticUpdate?.(newLikeCount);

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

      patchResult?.undo?.();
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
      feedbackAnchor.current.scrollIntoView();
      likeDone.current = false;
    }
  }, [allFeedbacks]);

  const feedbackLikeHandler = () => {
    updateLike({
      likeable_type: "Feedback",
      likeable_id: feedback.id,
    });
  };

  return (
    <section
      id={feedback.id}
      ref={infiniteScroll}
      className="relative grid grid-rows-[repeat(2,_auto)] grid-cols-[1fr_1fr] gap-y-4 p-7 bg-white text-blue-900 rounded-md text-[13px] hover:opacity-100 md:grid-rows-[auto] md:grid-cols-[max-content_auto_max-content] md:gap-[2rem]"
    >
      <div
        className="absolute -top-6 h-1"
        ref={feedbackAnchor}
        aria-hidden
      ></div>
      <Link
        to={`/feedbacks/${feedback.id}`}
        className="col-span-full space-y-4 md:row-span-full md:col-[2_/_3]"
      >
        <div className="flex gap-1.5 items-center">
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
          <b className="block text-[14px] md:text-[15px]">{feedback.title}</b>
          <span className="inline-block mt-1 text-[12px] text-blue-400 md:text-[13px]">
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
        <b className="ml-[6px] font-bold">29</b>
      </Link>
    </section>
  );
};

export default Feedback;
