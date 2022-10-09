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

  const sortAllFeedbacks = useCallback((feedbacks) => {
    const [sortBy, order] = Object.entries(params.sort)[0];
    const sortedAll = feedbacks.sort((a, b) => {
      switch (order) {
        case "asc":
          return a[`num_${sortBy}`] - b[`num_${sortBy}`];
        default:
          return b[`num_${sortBy}`] - a[`num_${sortBy}`];
      }
    });
    setAllFeedbacks([...sortedAll]);
  }, []);

  const {
    data: feedbacks,
    isLoading,
    isFetching,
    error,
    // } = useGetFeedbacksQuery({ ...params, feedbackIDs });
  } = useGetFeedbacksQuery(params);

  const [canFetchMore, setCanFetchMore] = useState(true);

  useEffect(() => {
    if (feedbacks) {
      setCanFetchMore(feedbacks.length === 0 ? false : true);
      setAllFeedbacks((currFeedbacks) => [
        ...currFeedbacks,
        ...feedbacks.filter(({ id }) => !feedbackIDs.has(id)),
      ]);
    }
  }, [feedbacks]);

  // can potentially cause it to do one more fetch when updating feedbacks which triggers ^ useeffect even though the number of feedbacks is the same
  const updateOneFeedback = (feedback) => {
    let update = allFeedbacks.findIndex(({ id }) => feedback.id === id);
    if (update !== -1) {
      allFeedbacks[update] = feedback;
      setAllFeedbacks(allFeedbacks);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        isLoading,
        isFetching,
        allFeedbacks,
        canFetchMore,
        setAllFeedbacks,
        sortAllFeedbacks,
        updateOneFeedback,
      }}
    >
      {props.children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
