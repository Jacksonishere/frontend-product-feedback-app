import React, { useState, useRef } from "react";
import DropdownSelect from "../utils/DropdownSelect";
import ArrowDown from "../../icons/ArrowDown";

const feedbackTypes = ["Feature", "Bug", "Enhancement", "UI", "UX"];

const FeedbackForm = () => {
  let post = undefined;
  const [selectedOption, setSelectedOption] = useState(post?.type ?? 0);
  const [showFeedbackTypes, setShowFeedbackTypes] = useState(false);
  const categoryBtnRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  const toggleOptions = (e) => {
    e.stopPropagation();
    setShowFeedbackTypes((shown) => !shown);
  };
  const optionSelected = (selected) => {
    setSelectedOption(selected);
    categoryBtnRef?.current?.focus();
  };

  return (
    <div className="relative mt-[56px] p-6 bg-white text-blue-900 text-[13px] rounded-lg space-y-6">
      <div
        className={`absolute top-0 w-10 h-10 -translate-y-[50%] rounded-full bg-cover ${
          post ? "bg-edit-icon" : "bg-new-icon"
        }`}
      ></div>

      <h2 className="my-6 font-bold text-[18px]">
        {post ? "Create New Feedback" : "Edit Feedback"}
      </h2>
      <form className="relative space-y-4" onSubmit={formSubmitHandler}>
        <div>
          <label className="form-label">
            <b>Feedback Title</b>
            <span className="text-blue-400">
              Add a short, descriptive headline
            </span>
          </label>
          <input className="form-input" type="text" />
        </div>

        <div className="form-label relative">
          <b>Category</b>
          <span className="text-blue-400">
            Choose a category for your feedback
          </span>
          <button
            ref={categoryBtnRef}
            className="form-input flex justify-between items-center text-left"
            onClick={toggleOptions}
          >
            {feedbackTypes[selectedOption]}
            <ArrowDown arrowStroke="#4661E6" />
          </button>

          {showFeedbackTypes && (
            <div className="block absolute top-full left-0 w-full">
              <DropdownSelect
                options={feedbackTypes}
                selected={selectedOption}
                selectedHandler={optionSelected}
                closeHandler={() => setShowFeedbackTypes(false)}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
