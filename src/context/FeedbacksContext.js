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
  const [feedbackCount, setFeedbackCount] = useState();

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

  const sortAllFeedbacks = useCallback(
    (feedbacks) => {
      const [sortBy, order] = Object.entries(params.sort)[0];
      const sortedAll = feedbacks.sort((a, b) => {
        switch (order) {
          case "asc":
            return a[`num_${sortBy}`] - b[`num_${sortBy}`];
          case "desc":
            return b[`num_${sortBy}`] - a[`num_${sortBy}`];
          default:
            return 0;
        }
      });
      setAllFeedbacks([...sortedAll]);
    },
    [params.sort]
  );

  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    error,
    // } = useGetFeedbacksQuery({ ...params, feedbackIDs });
  } = useGetFeedbacksQuery(params);

  const [canFetchMore, setCanFetchMore] = useState(true);
  const feedbacks = useMemo(() => data?.feedbacks, [data]);

  useEffect(() => {
    if (feedbacks) {
      setCanFetchMore(feedbacks.length === 0 ? false : true);
      setFeedbackCount(data?.feedback_count);
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

  const updateFeedbackLikes = ({ id, userLiked, newLikeCount }) => {
    let update = allFeedbacks.findIndex((feedback) => feedback.id === id);
    if (update !== -1) {
      allFeedbacks[update] = {
        ...allFeedbacks[update],
        user_liked: userLiked,
        num_likes: newLikeCount,
      };
      setAllFeedbacks(allFeedbacks);
    }
  };

  const updateFeedbackCommentCount = ({ id, action }) => {
    let update = allFeedbacks.findIndex((feedback) => feedback.id === id);
    if (update !== -1) {
      const curr_num_comments = allFeedbacks[update].num_comments;
      allFeedbacks[update] = {
        ...allFeedbacks[update],
        num_comments: curr_num_comments + (action === "desc" ? -1 : 1),
      };
      setAllFeedbacks(allFeedbacks);
    }
  };

  const updateFeedbackCount = (action) => {
    setFeedbackCount((curr) => curr + (action === "desc" ? -1 : 1));
  };

  return (
    <FeedbackContext.Provider
      value={{
        isLoading,
        isFetching,
        isSuccess,
        allFeedbacks,
        feedbackCount,
        canFetchMore,
        setAllFeedbacks,
        sortAllFeedbacks,
        updateOneFeedback,
        updateFeedbackLikes,
        updateFeedbackCount,
        updateFeedbackCommentCount,
      }}
    >
      {props.children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
