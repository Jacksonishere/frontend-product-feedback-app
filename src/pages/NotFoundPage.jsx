import React from "react";
import { Link } from "react-router-dom";
import NotFoundGuy from "../icons/NotFoundGuy";

import NavigateBack from "../components/utils/NavigateBack";
import ArrowLeft from "../icons/ArrowLeft";

const NotFoundPage = () => {
  return (
    <div className="mx-auto w-[88%] max-w-[650px]">
      <NavigateBack>
        <ArrowLeft color="#4661E6" />
        <span className="ml-4 text-blue-400 text-[12px] font-bold md:text-[13px]">
          Go Back
        </span>
      </NavigateBack>
      <div className="grid place-items-center py-[50px] bg-white rounded-[10px]">
        <div className="flex flex-col justify-center items-center w-[90%] max-w-[410px] text-center">
          <NotFoundGuy />
          <h2 className="mt-[28px] text-[20px] text-blue-900">
            Page not found!
          </h2>
          <p className="mt-4 text-blue-400 text-[14px]">
            Oops! We couldn&apos;t find the Feedback you&apos;re looking for. It
            may have been removed by the author or just doesn&apos;t exist!
          </p>
          <Link
            to="/feedbacks/new"
            className="btn !text-[13px] mt-[24px] bg-purple-700"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
