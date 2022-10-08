import React from "react";
import { Link } from "react-router-dom";
import NotFoundGuy from "../../icons/NotFoundGuy";

const FeedbackNotFound = () => {
  return (
    <div className="mt-3 py-8 rounded-lg bg-white">
      <div className="flex flex-col justify-center items-center mx-auto max-w-[350px]">
        <NotFoundGuy />
        <h3 className="mt-6 text-[18px] text-blue-900">Feedback Not Found</h3>
        <p className="mt-3 text-[13px] text-center text-blue-900">
          Oops! We couldn&#39;t find the Feedback you&#39;re looking for. It may
          have been removed by the Author
        </p>
        <Link className="mt-6 btn bg-purple-700" to="/">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default FeedbackNotFound;
