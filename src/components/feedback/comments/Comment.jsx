import React from "react";

const Comment = ({ comment }) => {
  const { username, avatar_url: pfp } = comment.user;

  return (
    // <div className="p-7">
    <section
      className={`bg-white rounded-[10px] my-6 ${
        comment.parent_id ? "pl-6" : ""
      }`}
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
          type="button"
          className="col-[3/4] row-[1/2] text-[13px] text-blue-500 font-bold"
        >
          Reply
        </button>
        <p className="body-text col-[1/3] row-[2/3]">{comment.content}</p>
      </div>

      {comment.comments.map((reply) => (
        <Comment key={reply.id} comment={reply} />
      ))}

      {!comment.parent_id && <hr className="mt-4" />}
    </section>
    // </div>
  );
};

export default Comment;
