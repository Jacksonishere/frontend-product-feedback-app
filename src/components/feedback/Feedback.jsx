import React, { useCallback, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  likeOptimisticUpdate,
  hover,
}) => {
  const user = useAuth();
  const feedbackAnchor = useRef();
  const likeDone = useRef(false);
  const oldFeedbacks = useRef();
  const params = useParams();

  const { dispatchShowFlash } = useFlash();
  const [updateLike, { isSuccess, isLoading, isError }] =
    useUpdateLikeMutation();
  const {
    allFeedbacks,
    setAllFeedbacks,
    sortAllFeedbacks,
    updateFeedbackLikes,
  } = useContext(FeedbackContext);

  useEffect(() => {
    if (isLoading) {
      const { user_liked, num_likes } = feedback;
      let newLikeCount = num_likes + (user_liked ? -1 : 1);

      likeOptimisticUpdate?.(newLikeCount);

      oldFeedbacks.current = allFeedbacks;
      updateFeedbackLikes({
        id: feedback.id,
        userLiked: !user_liked,
        newLikeCount,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      dispatchShowFlash(
        {
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
      className={`default-cont relative grid grid-rows-[repeat(2,_auto)] grid-cols-[1fr_1fr] gap-y-4 text-blue-900 rounded-md text-[13px] md:grid-rows-[auto] md:grid-cols-[max-content_auto_max-content] md:gap-[2rem]
      `}
    >
      <div
        className="absolute -top-6 h-1"
        ref={feedbackAnchor}
        aria-hidden
      ></div>
      <Link
        to={`/feedbacks/${feedback.id}`}
        className={`col-span-full space-y-4 md:row-span-full md:col-[2_/_3] ${
          !hover ? "pointer-events-none" : ""
        }`}
      >
        <div className="flex gap-2 items-center">
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
          <b className="block text-[15px] md:text-[16px]">{feedback.title}</b>
          <span className="body-text inline-block mt-1 text-blue-400">
            {feedback.detail}
          </span>
        </p>
        <div className="feedback-tag w-max h-[30px] py-0 col-span-full md:h-[33px]">
          {feedback.category.length === 2
            ? feedback.category.toUpperCase()
            : feedback.category}
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
        <b className="ml-[6px] font-bold">{feedback.num_comments}</b>
      </Link>
    </section>
  );
};

export default Feedback;
