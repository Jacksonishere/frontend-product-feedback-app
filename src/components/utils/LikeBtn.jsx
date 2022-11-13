import React from "react";

import ArrowUp from "../../icons/ArrowUp";
import useFlash from "../../hooks/useFlash";

import { abbreviateNumber } from "../../utils/Utils";

const LikeBtn = ({ likeableHandler, likeableThing, user, ROADMAP }) => {
  const { dispatchShowFlash } = useFlash();

  const likeBtnHandler = () => {
    if (!user) {
      dispatchShowFlash(
        {
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
      className={`feedback-tag flex justify-center items-center h-[32px] min-w-[46px] px-3 text-blue-900 ${
        userLiked ? "bg-blue-500" : ""
      }  ${
        ROADMAP
          ? ""
          : "md:row-span-full md:col-[1_/_2] md:flex-col md:center md:self-start md:pb-1 md:h-[48px]"
      }`}
    >
      <ArrowUp color={userLiked ? "white" : "#4661E6"} />
      <b
        className={`ml-2  ${ROADMAP ? "" : "md:mt-[6px] md:ml-0"} ${
          userLiked ? "text-blue-25" : ""
        }`}
      >
        {abbreviateNumber(likeableThing.num_likes) ?? 0}
      </b>
    </button>
  );
};

export default LikeBtn;
