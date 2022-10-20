import React, { useState, useMemo, useCallback } from "react";
import CommentForm from "./CommentForm";

const Comment = ({ comment, lastComment }) => {
  const { comments: replies, parent_id } = comment;
  const { username, avatar_url: pfp } = comment.user;
  const [showReplyForm, setShowReplyForm] = useState(false);

  const parent = useMemo(() => parent_id === null, [parent_id]);
  const hideReplyForm = useCallback(() => {
    setShowReplyForm(false);
  }, []);

  const displayReplyForm = useCallback(() => {
    setShowReplyForm(true);
  }, []);

  return (
    <section
      className={`relative bg-white rounded-[10px] my-6
        ${!parent ? "thread-line pl-6" : ""}
        ${
          !lastComment
            ? "before:bottom-[-24px]"
            : "before:bottom-[17px] md:before:bottom-[32px]"
          // : "before:bottom-[calc(100%-46px)]"
        }
      `}
    >
      <div
        className={`default-cont p-0 grid grid-cols-[max-content_1fr_max-content] grid-rows-[repeat(2,auto)] gap-x-2 gap-y-[1.375rem] items-center`}
      >
        <img
          className="w-[40px] h-[40px] rounded-full col-[1/2] row-[1/2]"
          src={pfp}
          alt={username + "_profile_img"}
        />
        <p className="col-[2/3] row-[1/2] text-[13px] translate-y-[3px] md:text[14px]">
          <b className="block text-blue-900">FULL NAME</b>
          <span className="text-blue-400">@{username}</span>
        </p>
        <button
          onClick={displayReplyForm}
          type="button"
          className="col-[3/4] row-[1/2] text-[13px] self-top text-blue-500 font-bold"
        >
          Reply
        </button>
        <p className="body-text col-[1/3] row-[2/3]">{comment.content}</p>
      </div>

      {/* <div className="relative">
        <div className="separator absolute top-0 left-0 bottom-0 w-[1px]"></div>
      {replies.map((reply) => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </div> */}

      {showReplyForm && (
        <CommentForm
          commentType="REPLY"
          closeForm={hideReplyForm}
          forFeedback={comment.feedback_id}
        />
      )}
      {replies.map((reply, i) => (
        <Comment
          key={reply.id}
          comment={reply}
          lastComment={i === replies.length - 1}
        />
      ))}

      {!parent_id && <hr className="separator mt-4" />}
    </section>
    // </div>
  );
};

export default Comment;
