import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

import { useGetFeedbacksQuery } from "../../api/feedbackApiSlice";
import {
  selectedCategorySelector,
  selectedSortSelector,
} from "../../features/feedbacks/homeFeedConfigSlice";

import Feedback from "./Feedback";
import Spinner from "../utils/Spinner";

const Feedbacks = () => {
  const category = useSelector(selectedCategorySelector);
  const sort = useSelector(selectedSortSelector);

  const [offset, setOffset] = useState(1);
  const params = useMemo(
    () => ({ category, sort, offset }),
    [category, sort, offset]
  );

  // const { data: feedbacks, isFetching, error } = useGetFeedbacksQuery(params);
  const { data: feedbacks, isLoading, error } = useGetFeedbacksQuery(params);

  return (
    <div className="px-6 py-8 md:px-0 md:py-6">
      {isLoading ? (
        <div className="grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <section className="space-y-5">
          {feedbacks.map((feedback, i) => (
            <Feedback key={i} feedback={feedback} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Feedbacks;
