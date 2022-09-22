import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import { useUpdateLikeMutation } from "../../api/feedbackApiSlice";
import useAuth from "../../hooks/useAuth";

import ArrowUp from "../../icons/ArrowUp";
import Comment from "../../icons/Comment";

const Feedback = ({ feedback }) => {
  const user = useAuth();
  const [updateLike] = useUpdateLikeMutation();

  const likeBtnHandler = () => {
    updateLike({ likeable_type: "Feedback", likeable_id: feedback.id });
  };

  return (
    <div className="grid grid-rows-[repeat(2,_auto)] grid-cols-[1fr_1fr] gap-y-4 p-7 bg-white text-blue-900 rounded-md text-[13px] hover:opacity-100 md:grid-rows-[auto] md:grid-cols-[repeat(3,_auto)] md:gap-[1.5rem]">
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
            <b className="block font-bold">@{feedback.user.username}</b>
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

      <button
        onClick={likeBtnHandler}
        className={`feedback-tag flex justify-center items-center px-[14px] py-[9px] md:pb-[6px] text-black ${
          user && feedback.user_liked ? "bg-blue-500 text-white" : ""
        }  md:row-span-full md:col-[1_/_2] md:flex-col md:justify-between md:self-start`}
      >
        <ArrowUp color={user && feedback.user_liked ? "white" : "#4661E6"} />
        <b className="ml-2 md:mt-[3px] md:ml-0">{feedback.num_likes ?? 0}</b>
      </button>

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
