import React from "react";

import useFetchFeedbacks from "./useFetchFeedbacks";

import Feedback from "./Feedback";
import Spinner from "../utils/Spinner";

const Feedbacks = () => {
  const { data: feedbacks, isLoading, isFetching, error } = useFetchFeedbacks();

  return (
    <div className="px-6 py-8 md:px-0 md:py-6">
      {isFetching ? (
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
