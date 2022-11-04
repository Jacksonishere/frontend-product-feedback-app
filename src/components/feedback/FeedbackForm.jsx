import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import feedbackApi, {
  useDeleteFeedbackMutation,
} from "../../api/feedbackApiSlice";

import {
  useCreateFeedackMutation,
  useUpdateFeedbackMutation,
} from "../../api/feedbackApiSlice";

import FeedbackContext from "../../context/FeedbacksContext";

import useFlash from "../../hooks/useFlash";

import DropdownSelect from "../utils/DropdownSelect";
import InputErrorMsg from "../utils/InputErrorMsg";

import ArrowDown from "../../icons/ArrowDown";
import Spinner from "../utils/Spinner";

const CATEGORIES = [
  { label: "Feature", value: "feature" },
  { label: "Bug", value: "bug" },
  { label: "Enhancement", value: "enhancement" },
  { label: "UI", value: "ui" },
  { label: "UX", value: "ux" },
];
const STATUSES = [
  { label: "Suggestion", value: "suggestion" },
  { label: "Planned", value: "planned" },
  { label: "In-Progess", value: "in_progress" },
  { label: "Live", value: "live" },
];

const FeedbackForm = ({ feedback }) => {
  const { updateOneFeedback, updateFeedbackCount, eraseFeedback } =
    useContext(FeedbackContext);

  const { dispatchShowFlash } = useFlash();

  const [
    createFeedback,
    {
      isLoading: createPending,
      isSuccess: createSuccess,
      data: newFeedback,
      isError: createError,
    },
  ] = useCreateFeedackMutation();

  const [
    deleteFeedback,
    {
      isLoading: deletePending,
      isSuccess: deleteSuccess,
      isError: deleteError,
    },
  ] = useDeleteFeedbackMutation();

  const [
    updateFeedback,
    {
      isLoading: updatePending,
      isSuccess: updateSuccess,
      data: updatedFeedback,
      isError: updateError,
    },
  ] = useUpdateFeedbackMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * MANAGING @CATEGORY DROPDOWN SELECT RELATED STATE
   * - toggling dropdown
   * - handling select
   */
  const categoryBtnRef = useRef();

  const [showCategories, setShowCategories] = useState(false);
  const [category, setCategory] = useState(
    feedback
      ? CATEGORIES.find((category) => category.value === feedback.category)
      : CATEGORIES[0]
  );

  const toggleFeedbackOptions = (e) => {
    e.stopPropagation();
    setshowStatus(false);
    setShowCategories((shown) => !shown);
  };

  const categorySelected = (selected) => {
    setCategory(selected);
    categoryBtnRef?.current?.focus();
  };

  /**
   * MANAGING @STATUS DROPDOWN SELECT RELATED STATE ~ IF @feedback EXIST
   * - toggling dropdown
   * - handling select
   */
  const showStatusBtnRef = useRef();

  const [showStatus, setshowStatus] = useState(false);
  const [status, setStatus] = useState(
    feedback
      ? STATUSES.find((status) => status.value === feedback?.status)
      : STATUSES[0]
  );

  const toggleEditStatus = (e) => {
    e.stopPropagation();
    setShowCategories(false);
    setshowStatus((shown) => !shown);
  };

  const statusSelected = (selected) => {
    setStatus(selected);
    showStatusBtnRef?.current?.focus();
  };

  /**
   * MANAGING @TITLE FOR STATE
   * @HANDLERS FOR INPUT
   */
  const [title, setTitle] = useState(feedback?.title);
  const [titleErrorMsg, setTitleErrorMsg] = useState();
  const titleHandler = (e) => setTitle(e.target.value);

  useEffect(() => {
    title === ""
      ? setTitleErrorMsg("Title cannot be blank")
      : setTitleErrorMsg(null);
  }, [title]);

  /**
   * MANAGING @DETAIL FOR STATE
   * @HANDLERS FOR INPUT
   */
  const [detail, setDetail] = useState(feedback?.detail);
  const [detailErrorMsg, setDetailErrorMsg] = useState();
  const detailHandler = (e) => setDetail(e.target.value);

  useEffect(() => {
    detail === ""
      ? setDetailErrorMsg("Detail cannot be blank")
      : setDetailErrorMsg(null);
  }, [detail]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title) setTitle("");
    if (!detail) setDetail("");

    if (title && detail) {
      const body = {
        feedback: {
          title: title,
          category: category.value,
          status: status.value,
          detail: detail,
        },
      };

      feedback
        ? updateFeedback({ id: feedback.id, ...body })
        : createFeedback(body);
    }
  };

  useEffect(() => {
    if (createSuccess) {
      navigate(`/feedbacks/${newFeedback.id}`, {
        state: {
          redirect: "FEEDBACK-CREATED",
        },
      });
      updateFeedbackCount("inc");
    }
  }, [createSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      navigate(`/feedbacks/${updatedFeedback.id}`, {
        replace: true,
        state: {
          redirect: "FEEDBACK-UPDATED",
        },
      });

      dispatch(
        feedbackApi.util.updateQueryData(
          "getFeedback",
          updatedFeedback.id,
          () => updatedFeedback
        )
      );

      updateOneFeedback(updatedFeedback);
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      navigate(`/`, {
        state: {
          redirect: "FEEDBACK-DELETED",
        },
      });
      eraseFeedback(feedback.id);
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (createError || deleteError || updateError) {
      dispatchShowFlash(
        {
          type: "ERROR",
          msg: "There was an error proccessing your request",
        },
        true
      );
    }
  }, [createError, deleteError, updateError]);

  return (
    <div className="default-cont relative mb-[56px] p-7 text-blue-900 text-[14px] md:p-9 md:text-[15px] md:mt-[56px]">
      <div
        className={`absolute top-0 w-10 h-10 -translate-y-[50%] rounded-full bg-cover ${
          feedback ? "bg-edit-icon" : "bg-new-icon"
        } md:w-[56px] md:h-[56px]`}
      ></div>

      <h2 className="mt-3 mb-5 md:mt-5 md:mb-7 font-bold">
        {feedback ? `Edit '${feedback.title}'` : "Create New Feedback"}
      </h2>

      <form
        className="relative space-y-7 md:space-y-9"
        onSubmit={submitHandler}
      >
        <div>
          <label className="form-label">
            <b>Feedback Title</b>
            <span className="text-blue-400">
              Add a short, descriptive headline
            </span>
          </label>
          <input
            className={`input-text form-input ${
              titleErrorMsg ? "error-input" : ""
            } md:px-6 md:text-[14px]`}
            type="text"
            name="title"
            value={title}
            onChange={titleHandler}
          />
          <InputErrorMsg msg={titleErrorMsg} />
        </div>

        <div className="form-label relative z-[5]">
          <b>Category</b>
          <span className="text-blue-400">
            Choose a category for your feedback
          </span>

          <button
            type="button"
            ref={categoryBtnRef}
            className="dropdown-select-focus dropdown-toggle"
            onClick={toggleFeedbackOptions}
          >
            <span>{category.label}</span>
            <ArrowDown arrowStroke="#4661E6" />
          </button>

          <div className="dropdown-select-focus block absolute top-[calc(100%_+_6px)] left-0 w-full">
            <DropdownSelect
              showOptions={showCategories}
              options={CATEGORIES}
              selected={category.value}
              selectedHandler={categorySelected}
              closeHandler={() => setShowCategories(false)}
            />
          </div>
        </div>

        {feedback && (
          <div className="form-label relative z-[4]">
            <b>Update Status</b>
            <span className="text-blue-400">Change Feedback State</span>

            <button
              type="button"
              ref={showStatusBtnRef}
              className="dropdown-select-focus dropdown-toggle"
              onClick={toggleEditStatus}
            >
              <span>{status.label}</span>
              <ArrowDown arrowStroke="#4661E6" />
            </button>

            <div className="dropdown-select-focus block absolute top-[calc(100%_+_6px)] left-0 w-full">
              <DropdownSelect
                showOptions={showStatus}
                options={STATUSES}
                selected={status.value}
                selectedHandler={statusSelected}
                closeHandler={() => setshowStatus(false)}
              />
            </div>
          </div>
        )}

        <div>
          <label className="form-label">
            <b>Feedback Detail</b>
            <span className="text-blue-400">
              Include any specific comments on what should be improved, added,
              etc.
            </span>
          </label>
          <textarea
            className={`input-text form-input ${
              detailErrorMsg ? "error-input" : ""
            } md:px-6`}
            value={detail}
            name="detail"
            rows={4}
            onChange={detailHandler}
          />
          <InputErrorMsg msg={detailErrorMsg} />
        </div>

        <div className="flex justify-end">
          {feedback && (
            <button
              type="button"
              onClick={() => deleteFeedback(feedback.id)}
              disabled={updatePending || createPending}
              className="btn bg-red-700"
            >
              {deletePending ? <Spinner /> : <span>Delete</span>}
            </button>
          )}
          <Link
            to={feedback ? `/feedbacks/${feedback.id}` : "/"}
            disabled={updatePending || createPending}
            className={`btn bg-blue-900 ${feedback ? "ml-auto" : ""}`}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={updatePending || createPending}
            className="btn ml-2 bg-purple-700 md:ml-3"
          >
            {updatePending || createPending ? (
              <Spinner />
            ) : feedback ? (
              "Save Changes"
            ) : (
              "Add Feedback"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
