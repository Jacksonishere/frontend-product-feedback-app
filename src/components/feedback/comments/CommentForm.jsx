import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useCreateCommentMutation } from "../../../api/feedbackApiSlice";
import useAuth from "../../../hooks/useAuth";

const CommentForm = ({ commentType, closeForm }) => {
  const [createComment, { isSuccess, isError }] = useCreateCommentMutation();
  const [comment, setComment] = useState("");

  const currentUser = useAuth();

  const formHandler = () => {};

  return (
    <section className="default-cont py-[26px] px-8 pb-5 text-blue-900">
      <h3>Add Comment</h3>
      <form onSubmit={formHandler}>
        <textarea
          onChange={(e) => {
            if (comment.length < 250) setComment(e.target.value);
          }}
          name="comment"
          className="input-text form-input mt-6"
          rows="3"
        ></textarea>
        <div className="flex items-center mt-4 ">
          <p className={`${currentUser ? "text-blue-400" : ""}`}>
            {currentUser
              ? `${250 - comment.length} words left`
              : "You need to login to comment!"}
          </p>
          {!currentUser ? (
            <Link className="btn form-btn" to="/auth/signin">
              Log In
            </Link>
          ) : (
            <div className="flex items-center ml-auto ">
              <button className="btn form-submit mt-0" disabled={!currentUser}>
                Post Comment
              </button>
              {commentType === "reply" && (
                <button className="btn ml-4" onClick={closeForm}>
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
