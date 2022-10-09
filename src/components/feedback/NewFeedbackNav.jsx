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

const SORT = [
  {
    label: "Most Upvotes",
    value: {
      likes: "desc",
    },
  },
  {
    label: "Least Upvotes",
    value: {
      likes: "asc",
    },
  },
  {
    label: "Most Comments",
    value: {
      comments: "desc",
    },
  },
  {
    label: "Most Comments",
    value: {
      comments: "asc",
    },
  },
];

const NewFeedbackNav = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(SORT[0]);
  const [showSortOptions, setShowOptions] = useState(false);

  // const { allFeedbacks } = useFetchFeedbacks();
  const { allFeedbacks, setAllFeedbacks } = useContext(FeedbackContext);

  const sortSelected = (option) => {
    setAllFeedbacks([]);
    setSortBy(option);
    dispatch(setSort(option.value));
  };

  return (
    <div className="sticky top-0 z-[1] flex items-center pl-5 pr-3 py-[10px] bg-blue-800 md:static md:mt-10 md md:rounded-[10px] md:px-[24px] lg:mt-0">
      <div className="hidden text-[18px] text-blue-25 font-bold md:flex md:items-center md:py-[10px]">
        <Suggestion />
        <p className="ml-3 font-bold">
          <span className="inline-block min-w-[12px]">
            {allFeedbacks?.length}
          </span>
          <span className="ml-2">Suggestions</span>
        </p>
      </div>

      <div className="relative text-blue-25 text-[14px] md:ml-10">
        <button
          className="flex items-center opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions((shown) => !shown);
          }}
        >
          <span>Sort by:</span>
          <b className="ml-1">{sortBy.label}</b>
          <motion.span
            className="ml-2 mt-[1px]"
            animate={{ rotate: showSortOptions ? 180 : 0 }}
          >
            <ArrowDown arrowStroke="#F2F4FE" />
          </motion.span>
        </button>

        <DropdownSelect
          showOptions={showSortOptions}
          options={SORT}
          selected={sortBy.value}
          selectedHandler={sortSelected}
          width={250}
          top={40}
          closeHandler={() => setShowOptions(false)}
        />
      </div>
      <Link className="ml-auto btn bg-purple-700" to="/feedbacks/new">
        + Add Feedback
      </Link>
    </div>
  );
};

export default NewFeedbackNav;
