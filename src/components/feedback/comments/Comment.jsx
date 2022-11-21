import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useGetRepliesQuery } from "../../../api/feedbackApiSlice";
import Spinner from "../../utils/Spinner";
import CommentForm from "./CommentForm";
import YTReplyIcon from "../../../icons/YTReplyIcon";

const Comment = ({
  infiniteScroll,
  comment,
  lastComment,
  top_comment_id,
  childReplyHandler,
}) => {
  const {
    replies: firstReplies,
    replies_count,
    parent_id,
    id: comment_id,
  } = comment;
  const { username, avatar_url: pfp, full_name } = comment.user;

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState(firstReplies);

  const parent = useMemo(() => parent_id === null, [parent_id]);

  // Should only be applicable for parent comments
  const [canFetchMore, setCanFetchMore] = useState(
    replies_count > 0 && replies_count >= 5
  );
  const [offset, setOffset] = useState(1);

  const [skip, setSkip] = useState(true);
  const { data, isFetching, isError } = useGetRepliesQuery(
    { parent_id: comment_id, offset },
    { skip }
  );

  const loadMore = () => {
    setSkip(false);
    setOffset((currOffset) => currOffset + 1);
  };

  const replyIDs = useMemo(() => {
    const IDs = new Set();
    if (replies) {
      replies.forEach((reply) => {
        IDs.add(reply.id);
      });
    }
    return IDs;
  }, [replies]);

  useEffect(() => {
    if (data) {
      setCanFetchMore(data.length === 0 || data.length < 5 ? false : true);
      setReplies((currReplies) => [
        ...currReplies,
        ...data.filter(({ id }) => !replyIDs.has(id)),
      ]);
    }
  }, [data]);

  const hideReplyForm = useCallback(() => {
    setShowReplyForm(false);
  }, []);

  const displayReplyForm = useCallback(() => {
    setShowReplyForm(true);
  }, []);

  const appendNewComment = useCallback(
    (newComment) => {
      setReplies([...replies, newComment]);
    },
    [replies]
  );

  return (
    <section
      ref={infiniteScroll}
      id={`comment-id-${comment.id}`}
      className={`relative bg-white rounded-[10px] my-[28px]
        ${!parent ? "thread-line pl-6" : ""}
        ${
          !lastComment
            ? "before:bottom-[-28px]"
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
          <b className="block text-blue-900">{full_name ?? "No Name :)"}</b>
          <span className="text-blue-400">@{username}</span>
        </p>
        <button
          onClick={displayReplyForm}
          type="button"
          className="col-[3/4] row-[1/2] text-[13px] self-top text-blue-500 font-bold self-start"
        >
          Reply
        </button>
        <p className="body-text col-[1/3] row-[2/3]">
          {comment.replied_to && (
            <span className="inline-block mr-2 text-[13.5px] text-purple-700 font-bold">{`@${comment.replied_to}`}</span>
          )}
          <span>{comment.content}</span>
        </p>
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
          appendNewComment={childReplyHandler ?? appendNewComment}
          closeForm={hideReplyForm}
          parent_id={top_comment_id ?? comment_id}
          replied_to={comment.user.username}
        />
      )}
      {replies.map((reply, i) => (
        <Comment
          childReplyHandler={appendNewComment}
          key={reply.id}
          comment={reply}
          top_comment_id={top_comment_id ?? comment_id}
          lastComment={i === replies.length - 1}
        />
      ))}
      {isFetching && <Spinner />}
      {canFetchMore && !isFetching && (
        <div>
          <button
            type="button"
            className="flex items-center mt-[-2px] ml-6 px-[13px] py-[4px] text-blue-900 bg-[#e8f1f9] rounded-[22px]"
            onClick={loadMore}
          >
            <YTReplyIcon />
            <span className="ml-1 text-[14.5px]">Load More Replies</span>
          </button>
        </div>
      )}

      {!parent_id && <hr className="separator mt-6" />}
    </section>
    // </div>
  );
};

export default Comment;
