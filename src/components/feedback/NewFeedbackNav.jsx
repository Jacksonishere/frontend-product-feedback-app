import React, { useState, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Suggestion from "../../icons/Suggestion";
import ArrowDown from "../../icons/ArrowDown";
import DropdownSelect from "../utils/DropdownSelect";
import { setSort } from "../../features/feedbacks/homeFeedConfigSlice";

// import useFetchFeedbacks from "./useFetchFeedbacks";
import FeedbackContext from "../../context/FeedbacksContext";

const dropDownVariant = {
  initial: {
    y: -20,
    opacity: 0,
    transition: { type: "tween", duration: 0.15 },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, type: "spring" },
  },
};

const sortOptions = [
  "Most Upvotes",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
];

const sortValues = [
  {
    likes: "desc",
  },
  {
    likes: "asc",
  },
  {
    comments: "desc",
  },
  {
    comments: "asc",
  },
];

const NewFeedbackNav = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(0);
  const [showSortOptions, setShowOptions] = useState(false);

  // const { allFeedbacks } = useFetchFeedbacks();
  const { allFeedbacks, setAllFeedbacks } = useContext(FeedbackContext);

  const sortSelected = (option) => {
    setAllFeedbacks([]);
    setSelectedOption(option);
    dispatch(setSort(sortValues[option]));
  };

  return (
    <div className="sticky top-0 z-[1] flex items-center pl-5 pr-3 py-[10px] bg-blue-800 md:static md:mt-10 md md:rounded-[10px] md:px-[24px] lg:mt-0">
      <p className="hidden text-[18px] text-blue-25 font-bold md:flex md:items-center md:py-[10px]">
        <Suggestion />
        <span className="ml-3 font-bold">
          {allFeedbacks?.length} Suggestions
        </span>
      </p>

      <div className="relative text-blue-25 text-[14px] md:ml-10">
        <button
          className="flex items-center opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions((shown) => !shown);
          }}
        >
          <span>Sort by:</span>
          <b className="ml-1">{sortOptions[selectedOption]}</b>
          <motion.span
            className="ml-2 mt-[1px]"
            animate={{ rotate: showSortOptions ? 180 : 0 }}
          >
            <ArrowDown arrowStroke="#F2F4FE" />
          </motion.span>
        </button>

        <AnimatePresence>
          {showSortOptions && (
            <motion.div
              variants={dropDownVariant}
              initial="initial"
              animate="animate"
              exit="initial"
              className="absolute z-50 top-[calc(100%_+_20px)] w-[255px]"
            >
              <DropdownSelect
                options={sortOptions}
                selected={selectedOption}
                selectedHandler={sortSelected}
                closeHandler={() => setShowOptions(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Link className="ml-auto btn bg-purple-700" to="/feedback/new">
        + Add Feedback
      </Link>
    </div>
  );
};

export default NewFeedbackNav;
