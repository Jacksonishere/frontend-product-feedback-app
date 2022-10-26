import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from "react";
import { useDispatch } from "react-redux";

import { setNextPage } from "../../features/feedbacks/homeFeedConfigSlice";

import FeedbackContext from "../../context/FeedbacksContext";
import useInfiniteScroll from "../..//hooks/useInfiniteScroll.js";

import Feedback from "./Feedback";
import Spinner from "../utils/Spinner";
import NotFoundGuy from "../../icons/NotFoundGuy";
import { Link } from "react-router-dom";

const Feedbacks = () => {
  const dispatch = useDispatch();
  const { isLoading, isFetching, allFeedbacks, canFetchMore } =
    useContext(FeedbackContext);

  const infiniteScrollHandler = useCallback(() => {
    dispatch(setNextPage());
  }, []);

  const infiniteScrollTrigger = useInfiniteScroll({
    isFetching,
    canFetchMore,
    infiniteScrollHandler,
  });

  return (
    <div className="px-6 py-8 md:px-0 md:pt-6 md:pb-[56px]">
      {isFetching && !allFeedbacks.length ? (
        <div className="grid place-items-center">
          <Spinner />
        </div>
      ) : !allFeedbacks.length ? (
        <div className="grid place-items-center min-h-[600px] bg-white rounded-[10px]">
          <div className="flex flex-col justify-center items-center w-[90%] max-w-[410px] text-center">
            <NotFoundGuy />
            <h2 className="mt-[52px] text-blue-900">
              There is no feedback yet.
            </h2>
            <p className="mt-2 text-blue-400 text-[15px]">
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </p>
            <Link to="/feedbacks/new" className="btn mt-[46px] bg-purple-700">
              + Add Feedback
            </Link>
          </div>
        </div>
      ) : (
        <section className="space-y-5 h-100">
          {allFeedbacks.map((feedback, i) =>
            i === allFeedbacks.length - 1 ? (
              <Feedback
                key={feedback.id}
                feedback={feedback}
                infiniteScroll={infiniteScrollTrigger}
              />
            ) : (
              <Feedback key={feedback.id} feedback={feedback} />
            )
          )}
          {isFetching && (
            <div className="mt-6">
              <Spinner />
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Feedbacks;
