import React from "react";
import { useSelector } from "react-redux";

import { useGetFeedbacksQuery } from "../../api/feedbackApiSlice";

const useFetchFeedbacks = () => {
  const params = useSelector((state) => state.homeFeed);

  return useGetFeedbacksQuery(params);
};

export default useFetchFeedbacks;
