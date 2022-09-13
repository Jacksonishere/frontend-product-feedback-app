import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import {
  useCreateLikeMutation,
  useDestroyLikeMutation,
} from "../../api/feedbackApiSlice";
import useAuth from "../../hooks/useAuth";

import ArrowUp from "../../icons/ArrowUp";
import Comment from "../../icons/Comment";

const Feedback = ({ feedback }) => {
  const user = useAuth();
  const [likeFeedback, { isLoading: likeProcessing, isSuccess: likeSuccess }] =
    useCreateLikeMutation();
  const [
    unlikeFeedback,
    { isLoading: unlikeProcessing, isSuccess: unlikeSuccess },
  ] = useDestroyLikeMutation();

  const likeBtnHandler = async () => {
    console.log(feedback);
    if (feedback.user_liked) {
      const { data, error } = await unlikeFeedback(feedback.id);
    } else {
      const { data, error } = await likeFeedback(feedback.id);
    }
  };
  // const likeBtnHandler = useCallback(async () => {
  //   if (feedback.user_liked) {
  //     const { data, error } = await likeFeedback("Feedback", feedback.id);
  //     console.log(data);
  //   } else {
  //     const { data, error } = await unlikeFeedback("Feedback", feedback.id);
  //     console.log(data);
  //   }
  // }, [feedback]);

  return (
    <div className="grid auto-col grid-rows-[repeat(4,_auto)] grid-cols-[1fr_1fr] gap-y-4 p-6 bg-white text-blue-900 rounded-md text-[13px] hover:opacity-100">
      <div className=" flex gap-1 col-span-full items-center">
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

      <Link to={`feedbacks/${feedback.id}`} className="col-span-full">
        <p>
          <b className="block text-[16px]">{feedback.title}</b>
          <span className="inline-block mt-1 text-[14px] text-blue-400">
            {feedback.detail}
          </span>
        </p>
      </Link>

      <div className="feedback-tag w-max col-span-full">
        {feedback.category}
      </div>

      <button
        onClick={likeBtnHandler}
        className={`feedback-tag flex justify-center items-center md:flex-col text-black ${
          feedback.user_liked ? "bg-blue-500 text-white" : ""
        }`}
      >
        <ArrowUp color={feedback.user_liked ? "white" : "#4661E6"} />
        <b className="ml-2 md:mt-[2px]">{feedback.num_likes ?? 0}</b>
      </button>

      <Link
        className="flex items-center justify-self-end"
        to={`feedbacks/${feedback.id}`}
      >
        <Comment />
        <b className="ml-[4px] font-bold">29</b>
      </Link>
    </div>
  );
};

export default Feedback;
