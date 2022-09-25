import React from "react";

import ArrowUp from "../../icons/ArrowUp";
import useFlash from "../../hooks/useFlash";

import { abbreviateNumber } from "../../utils/Utils";

const LikeBtn = ({ likeableHandler, likeableThing, user }) => {
  const { dispatchShowFlash } = useFlash();

  const likeBtnHandler = () => {
    if (!user) {
      dispatchShowFlash(
        {
          show: true,
          type: "ERROR",
          msg: "You must be signed in to do that!",
        },
        true
      );
    } else {
      likeableHandler();
    }
  };

  const userLiked = user && likeableThing.user_liked;

  return (
    <button
      onClick={likeBtnHandler}
      className={`feedback-tag flex justify-center items-center min-w-[46px] px-0 py-[9px] md:pb-[6px] text-black ${
        userLiked ? "bg-blue-500" : ""
      }  md:row-span-full md:col-[1_/_2] md:flex-col md:justify-between md:self-start`}
    >
      <ArrowUp color={userLiked ? "white" : "#4661E6"} />
      <b
        className={`ml-2 md:mt-[3px] md:ml-0 ${
          userLiked ? "text-blue-25" : ""
        }`}
      >
        {abbreviateNumber(likeableThing.num_likes) ?? 0}
      </b>
    </button>
  );
};

export default LikeBtn;
