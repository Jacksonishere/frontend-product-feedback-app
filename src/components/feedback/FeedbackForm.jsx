import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import DropdownSelect from "../utils/DropdownSelect";
import InputErrorMsg from "../utils/InputErrorMsg";

import ArrowDown from "../../icons/ArrowDown";

const CATEGORIES = ["Feature", "Bug", "Enhancement", "UI", "UX"];
const STATUSES = ["Planned", "In-Progress", "Live"];

const FeedbackForm = ({ feedback }) => {
  /**
   * MANAGING @CATEGORY DROPDOWN SELECT RELATED STATE
   * - toggling dropdown
   * - handling select
   */
  const categoryBtnRef = useRef();

  const [showCategories, setShowCategories] = useState(false);
  const [category, setCategory] = useState(
    feedback
      ? CATEGORIES.findIndex((category) => category === feedback.category)
      : 0
  );

  const toggleFeedbackOptions = (e) => {
    e.stopPropagation();
    setShowEditStatus(false);
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
  const showEditStatusBtnRef = useRef();

  const [showEditStatus, setShowEditStatus] = useState(false);
  const [status, setStatus] = useState(
    feedback ? STATUSES.findIndex((status) => status === feedback?.status) : 0
  );

  const toggleEditStatus = (e) => {
    e.stopPropagation();
    setShowCategories(false);
    setShowEditStatus((shown) => !shown);
  };

  const statusSelected = (selected) => {
    setStatus(selected);
    showEditStatusBtnRef?.current?.focus();
  };

  /**
   * MANAGING @TITLE FOR STATE
   * @HANDLERS FOR INPUT
   */
  const [title, setTitle] = useState(feedback?.title);
  const [titleErrorMsg, setTitleErrorMsg] = useState();
  const titleHandler = (e) => {
    const content = e.target.value;
    content === ""
      ? setTitleErrorMsg("Title cannot be blank")
      : setTitleErrorMsg(null);

    setTitle(content);
  };

  /**
   * MANAGING @DETAIL FOR STATE
   * @HANDLERS FOR INPUT
   */
  const [detail, setDetail] = useState(feedback?.detail);
  const [detailErrorMsg, setDetailErrorMsg] = useState();
  const detailHandler = (e) => {
    const content = e.target.value;
    content === ""
      ? setDetailErrorMsg("Detail cannot be blank")
      : setDetailErrorMsg(null);

    setDetail(content);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative mb-[56px] p-7 bg-white text-blue-900 text-[14px] rounded-lg md:p-10 md:text-[15px] md:mt-[56px]">
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
        onSubmit={formSubmitHandler}
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
            }`}
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
            ref={categoryBtnRef}
            className="dropdown-select-focus dropdown-toggle"
            onClick={toggleFeedbackOptions}
          >
            <span>{CATEGORIES[category]}</span>
            <ArrowDown arrowStroke="#4661E6" />
          </button>

          <div className="dropdown-select-focus block absolute top-[calc(100%_+_6px)] left-0 w-full">
            <DropdownSelect
              showOptions={showCategories}
              options={CATEGORIES}
              selected={category}
              selectedHandler={categorySelected}
              closeHandler={() => setShowCategories(false)}
            />
          </div>
        </div>

        {feedback && (
          <div className="form-label relative">
            <b>Update Status</b>
            <span className="text-blue-400">Change Feedback State</span>

            <button
              ref={showEditStatusBtnRef}
              className="dropdown-select-focus dropdown-toggle"
              onClick={toggleEditStatus}
            >
              <span>{STATUSES[status]}</span>
              <ArrowDown arrowStroke="#4661E6" />
            </button>

            {showEditStatus && (
              <div className="dropdown-select-focus block absolute top-[calc(100%_+_6px)] left-0 w-full">
                <DropdownSelect
                  options={STATUSES}
                  selected={status}
                  selectedHandler={statusSelected}
                  closeHandler={() => setShowEditStatus(false)}
                />
              </div>
            )}
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
            }`}
            value={detail}
            name="detail"
            rows={4}
            onChange={detailHandler}
          />
          <InputErrorMsg msg={detailErrorMsg} />
        </div>

        <div className="flex justify-end">
          {feedback && <button className="btn bg-red-700">Delete</button>}
          <Link
            to="/"
            className={`btn bg-blue-900 ${feedback ? "ml-auto" : ""}`}
          >
            Cancel
          </Link>
          <button className="ml-2 btn bg-purple-700">Add Feedback</button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
