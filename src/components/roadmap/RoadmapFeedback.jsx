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

const RoadmapFeedback = ({
  feedback,
  infiniteScroll,
  likeHandler,
  hover,
  COLOR,
}) => {
  const user = useAuth();
  const likeDone = useRef(false);

  const { dispatchShowFlash } = useFlash();
  const [updateLike, { isSuccess, isLoading, isError }] =
    useUpdateLikeMutation();
  const {
    allFeedbacks,
    setAllFeedbacks,
    sortAllFeedbacks,
    updateFeedbackLikes,
  } = useContext(FeedbackContext);

  const feedbackLikeHandler = async () => {
    const { user_liked, num_likes } = feedback;
    let newLikeCount = num_likes + (user_liked ? -1 : 1);

    // let oldFeedbacks = allFeedbacks;
    let oldFeedbacks = [...allFeedbacks];
    updateFeedbackLikes({
      id: feedback.id,
      userLiked: !user_liked,
      newLikeCount,
    });
    likeHandler(feedback.id, newLikeCount, !user_liked);

    const { error } = await updateLike({
      likeable_type: "Feedback",
      likeable_id: feedback.id,
    });

    if (error) {
      dispatchShowFlash(
        {
          type: "ERROR",
          msg: "There was a problem liking this post",
        },
        true
      );
      setAllFeedbacks(oldFeedbacks);
      likeHandler(feedback.id, num_likes, user_liked);
    } else {
      sortAllFeedbacks();
      likeDone.current = true;
    }
  };

  return (
    <section
      id={feedback.id}
      ref={infiniteScroll}
      className={`default-cont relative grid grid-rows-[repeat(2,_auto)] grid-cols-[1fr_1fr] gap-y-4 text-blue-900 text-[13px] !border-t-[6px] !p-6 rounded-[10px] ${COLOR}
      `}
    >
      <div className="absolute -top-6 h-1" aria-hidden></div>
      <Link
        to={`/feedbacks/${feedback.id}`}
        className={`col-span-full space-y-4 
        ${!hover ? "pointer-events-none" : ""}`}
      >
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
        ROADMAP={true}
      />

      <Link
        className={`flex items-center justify-self-end`}
        to={`/feedbacks/${feedback.id}`}
      >
        <Comment />
        <b className="ml-[6px] text-blue-900 font-bold">
          {feedback.num_comments}
        </b>
      </Link>
    </section>
  );
};

export default RoadmapFeedback;
