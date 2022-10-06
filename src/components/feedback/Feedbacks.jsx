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

import Feedback from "./Feedback";
import Spinner from "../utils/Spinner";

const Feedbacks = () => {
  const dispatch = useDispatch();
  const { isLoading, isFetching, allFeedbacks, canFetchMore } =
    useContext(FeedbackContext);

  const observerRef = useRef();
  const infiniteScroll = useCallback(
    (node) => {
      if (isFetching) return;
      else if (node) {
        observerRef.current?.disconnect();
        if (canFetchMore) {
          observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              dispatch(setNextPage());
            }
          });
          observerRef.current.observe(node);
        }
      }
    },
    [isFetching, canFetchMore]
  );

  return (
    <div className="px-6 py-8 md:px-0 md:pt-6 md:pb-[56px]">
      {isLoading && !allFeedbacks.length ? (
        <div className="grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <section className="space-y-5 h-100">
          {allFeedbacks.map((feedback, i) =>
            i === allFeedbacks.length - 1 ? (
              <Feedback
                key={feedback.id}
                feedback={feedback}
                infiniteScroll={infiniteScroll}
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
