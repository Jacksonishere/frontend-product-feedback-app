import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Spinner from "../../utils/Spinner";

import { useCreateCommentMutation } from "../../../api/feedbackApiSlice";
import useAuth from "../../../hooks/useAuth";
import useFlash from "../../../hooks/useFlash";

const CommentForm = ({ commentType, closeForm, forFeedback }) => {
  const currentUser = useAuth();
  const { dispatchShowFlash } = useFlash();

  const [createComment, { isSuccess, isError, isLoading }] =
    useCreateCommentMutation();
  const [comment, setComment] = useState("");

  const isReply = commentType === "REPLY";

  const formHandler = () => {
    const commentBody = {
      feedback_id: forFeedback,
      content: comment,
    };
    createComment(commentBody);
  };

  useEffect(() => {
    if (isSuccess) {
      isReply && closeForm();
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
        msg: "Your comment has been successfully added!",
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
      <form onSubmit={formHandler}>
        <textarea
          onChange={(e) => {
            if (comment.length < 250) setComment(e.target.value);
          }}
          name="comment"
          className={`input-text form-input ${!isReply ? "mt-6" : "mt-2"}`}
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
                className="btn form-submit mt-1 md:mt-0"
                disabled={!currentUser}
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
                <button className="btn ml-4 bg-blue-900" onClick={closeForm}>
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
