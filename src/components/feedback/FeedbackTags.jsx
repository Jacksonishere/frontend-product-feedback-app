import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setCategory,
  selectedCategorySelector,
} from "../../features/feedbacks/homeFeedConfigSlice";

import FeedbackContext from "../../context/FeedbacksContext";

const CATEGORIES = ["all", "UI", "UX", "enhancement", "bug", "feature"];

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
      <ul className="flex flex-wrap gap-x-2 gap-y-[10px] md:items-center md:h-max">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <button
              className={`feedback-tag ${
                currCategory === category ? "selected" : ""
              }`}
              onClick={handleCategoryChange.bind(null, category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackTags;
