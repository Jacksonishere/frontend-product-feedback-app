import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useDispatch } from "react-redux";

import useFetchFeedbacks from "./useFetchFeedbacks";
import { setNextPage } from "../../features/feedbacks/homeFeedConfigSlice";

import Feedback from "./Feedback";
import Spinner from "../utils/Spinner";

const Feedbacks = () => {
  const dispatch = useDispatch();
  const { isLoading, isFetching, allFeedbacks, canFetchMore } =
    useFetchFeedbacks();

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
    <div className="px-6 py-8 md:px-0 md:py-6">
      {isLoading && !allFeedbacks.length ? (
        <div className="grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <section className="space-y-5 h-100">
          {allFeedbacks.map((feedback, i) =>
            i === allFeedbacks.length - 1 ? (
              <Feedback
                key={i}
                feedback={feedback}
                infiniteScroll={infiniteScroll}
              />
            ) : (
              <Feedback key={i} feedback={feedback} />
            )
          )}
          {isFetching && <Spinner />}
        </section>
      )}
    </div>
  );
};

export default Feedbacks;
