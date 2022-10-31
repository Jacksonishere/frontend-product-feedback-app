import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Spinner from "../../utils/Spinner";

import { useCreateCommentMutation } from "../../../api/feedbackApiSlice";
import useAuth from "../../../hooks/useAuth";
import useFlash from "../../../hooks/useFlash";

const CommentForm = ({
  commentType,
  appendNewComment,
  closeForm,
  parent_id,
  replied_to,
}) => {
  const currentUser = useAuth();
  const { dispatchShowFlash } = useFlash();
  const { id: feedback_id } = useParams();
  const [createComment, { isSuccess, isError, isLoading, data: newComment }] =
    useCreateCommentMutation();
  const [comment, setComment] = useState("");

  const isReply = commentType === "REPLY";

  const formHandler = (e) => {
    e.preventDefault();
    const commentBody = {
      feedback_id,
      content: comment,
      ...(isReply
        ? {
            parent_id,
            ...(replied_to !== currentUser.username ? { replied_to } : {}),
          }
        : {}),
    };
    createComment(commentBody);
  };

  useEffect(() => {
    if (isSuccess) {
      isReply && closeForm();
      setComment("");

      appendNewComment(newComment);
      dispatchShowFlash({
        type: "SUCCESS",
        msg: "Your comment has been successfully added!",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatchShowFlash({
        type: "ERROR",
        msg: "There was an error adding your comment!",
      });
    }
  }, [isError]);

  return (
    <section
      className={`bg-white rounded-lg text-blue-900 ${
        isReply ? "pt-4 pb-1" : "py-[26px] px-8 pb-5"
      }`}
    >
      {!isReply && <h3>Add Comment</h3>}
      <form onSubmit={formHandler} action="#">
        <textarea
          autoFocus={isReply}
          onChange={(e) => setComment(e.target.value)}
          name="comment"
          className={`input-text form-input ${!isReply ? "mt-6" : "mt-2"}`}
          value={comment}
          rows="3"
        ></textarea>
        <div className="flex flex-col justify-start mt-1 md:flex-row md:items-center md:mt-3">
          <p
            className={`${
              currentUser ? "text-[13px] text-blue-400 md:text-[15px]" : ""
            }`}
          >
            {currentUser
              ? `${250 - comment.length} characters left`
              : "You need to login to comment!"}
          </p>
          {!currentUser ? (
            <Link className="btn form-btn" to="/auth/signin">
              Log In
            </Link>
          ) : (
            <div className="flex justify-start items-center mt-1 md:ml-auto">
              <button
                type="submit"
                className="btn form-submit mt-1 md:mt-0"
                disabled={!currentUser || comment.length > 250 || isLoading}
              >
                {isLoading ? (
                  <Spinner />
                ) : isReply ? (
                  "Post Reply"
                ) : (
                  "Post Comment"
                )}
              </button>
              {isReply && (
                <button
                  type="button"
                  className="btn ml-4 bg-blue-900"
                  onClick={closeForm}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    </section>
  );
};

export default CommentForm;
