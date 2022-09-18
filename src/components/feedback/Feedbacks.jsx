import React, { useEffect, useMemo } from "react";
import { useGetFeedbacksQuery } from "../../api/feedbackApiSlice";

import Feedback from "./Feedback";
import Spinner from "../utils/Spinner";

const Feedbacks = () => {
  const { data: feedbacks, isLoading, error } = useGetFeedbacksQuery();

  useEffect(() => {
    // if (feedbacks) console.log(feedbacks);
  }, [feedbacks]);

  return (
    <div className="px-6 my-8 md:px-0 md:my-6">
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
