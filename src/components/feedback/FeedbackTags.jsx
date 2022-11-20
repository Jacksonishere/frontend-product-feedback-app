import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setCategory,
  selectedCategorySelector,
} from "../../features/feedbacks/HomeFeedConfigSlice";

import FeedbackContext from "../../context/FeedbacksContext";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "UI", value: "ui" },
  { label: "UX", value: "ux" },
  { label: "Enhancement", value: "enhancement" },
  { label: "Bug", value: "bug" },
  { label: "Feature", value: "feature" },
];

const FeedbackTags = ({ onClose }) => {
  const dispatch = useDispatch();
  const { setAllFeedbacks } = useContext(FeedbackContext);
  const currCategory = useSelector(selectedCategorySelector);

  const handleCategoryChange = (category) => {
    setAllFeedbacks([]);
    dispatch(setCategory(category));
    onClose();
  };

  return (
    <div className="p-6 bg-white rounded-lg md:h-full md:basis-1/2 lg:basis-full">
      <ul className="flex flex-wrap gap-x-3 gap-y-[10px] md:items-center md:h-max">
        {CATEGORIES.map(({ value, label }) => (
          <li key={value}>
            <button
              className={`feedback-tag ${
                currCategory === value ? "selected" : ""
              }`}
              onClick={handleCategoryChange.bind(null, value)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackTags;
