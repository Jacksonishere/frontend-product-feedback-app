import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  createContext,
} from "react";
import { useSelector } from "react-redux";

import { useGetFeedbacksQuery } from "../api/feedbackApiSlice";

const FeedbackContext = createContext();

export const FeedbackContextProvider = (props) => {
  const params = useSelector((state) => state.homeFeed);

  // Workaround for stitching infinite scroll query data
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  // Store the IDs to filter out potential duplicate feedbacks during the fetch for more data
  const feedbackIDs = useMemo(() => {
    const IDs = new Set();
    if (allFeedbacks) {
      allFeedbacks.forEach((feedback) => {
        IDs.add(feedback.id);
      });
    }
    return IDs;
  }, [allFeedbacks]);

  const {
    data: feedbacks,
    isLoading,
    isFetching,
    error,
  } = useGetFeedbacksQuery({ ...params, feedbackIDs });

  useEffect(() => {
    if (feedbacks) {
      setCanFetchMore(feedbacks.length === 0 ? false : true);
      setAllFeedbacks((currFeedbacks) => [...currFeedbacks, ...feedbacks]);
    }
  }, [feedbacks]);

  const [canFetchMore, setCanFetchMore] = useState(true);

  return (
    <FeedbackContext.Provider
      value={{
        isLoading,
        isFetching,
        allFeedbacks,
        canFetchMore,
        setAllFeedbacks,
      }}
    >
      {props.children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
