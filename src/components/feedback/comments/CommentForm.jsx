import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import FeedbackContext from "../../../context/FeedbacksContext";
import feedbackApi, {
  useCreateCommentMutation,
} from "../../../api/feedbackApiSlice";

import useAuth from "../../../hooks/useAuth";
import useFlash from "../../../hooks/useFlash";

import Spinner from "../../utils/Spinner";

const CommentForm = ({
  commentType,
  appendNewComment,
  closeForm,
  parent_id,
  replied_to,
}) => {
  const dispatch = useDispatch();
  const currentUser = useAuth();
  const { dispatchShowFlash } = useFlash();
  const { id } = useParams();
  const currLocation = useLocation();
  const feedback_id = parseInt(id);

  const { updateFeedbackCommentCount } = useContext(FeedbackContext);
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
    updateFeedbackCommentCount({ id: feedback_id });
    dispatch(
      feedbackApi.util.updateQueryData(
        "getFeedback",
        parseInt(feedback_id),
        (currFeedback) => {
          currFeedback.num_comments += 1;
        }
      )
    );
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
        isReply ? "pt-4 pb-1" : "py-[26px] px-8 pb-6"
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
        <div className="flex flex-row items-center mt-2 md:mt-5">
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
            <Link
              state={{ from: currLocation }}
              className="btn form-submit !mt-0 ml-auto"
              to="/auth/login"
            >
              Log In
            </Link>
          ) : (
            <div className="flex justify-start items-center ml-auto">
              <button
                type="submit"
                className="btn form-submit mt-0"
                disabled={
                  !currentUser ||
                  comment.length > 250 ||
                  comment.length === 0 ||
                  isLoading
                }
              >
                {isLoading ? (
                  <Spinner />
                ) : isReply ? (
                  "Post Reply"
                ) : (
                  "Post Comment"
                )}
              </button>
            </div>
          )}
          {isReply && (
            <button
              type="button"
              className="btn ml-2 bg-blue-900"
              onClick={closeForm}
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default CommentForm;
