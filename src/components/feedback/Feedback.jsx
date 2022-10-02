import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import { useUpdateLikeMutation } from "../../api/feedbackApiSlice";
import useAuth from "../../hooks/useAuth";

import ArrowUp from "../../icons/ArrowUp";
import Comment from "../../icons/Comment";

import LikeBtn from "../utils/LikeBtn";

const Feedback = ({ feedback, infiniteScroll }) => {
  const user = useAuth();
  const [updateLike] = useUpdateLikeMutation();

  const feedbackLikeHandler = () => {
    const data = updateLike({
      likeable_type: "Feedback",
      likeable_id: feedback.id,
    });
    console.log(data);
  };

  return (
    <div
      id={feedback.id}
      ref={infiniteScroll}
      className="grid grid-rows-[repeat(2,_auto)] grid-cols-[1fr_1fr] gap-y-4 p-7 bg-white text-blue-900 rounded-md text-[13px] hover:opacity-100 md:grid-rows-[auto] md:grid-cols-[repeat(3,_auto)] md:gap-[1.5rem]"
    >
      <Link
        to={`/feedbacks/${feedback.id}`}
        className="col-span-full space-y-4 md:row-span-full md:col-[2_/_3]"
      >
        <div className="flex gap-[2px] items-center">
          <figure className="w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={feedback.user.avatar_url}
              alt=""
            />
          </figure>
          <p className="translate-y-[3px]">
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
