import React from "react";
import { Link } from "react-router-dom";
// import { DndContext } from "@dnd-kit/core";
import NavigateBack from "../components/utils/NavigateBack";

import ArrowLeft from "../icons/ArrowLeft";

const RoadmapNav = () => {
  return (
    <div className="flex justify-between items-center px-[32px] py-[26px] rounded-[10px] bg-blue-800 text-white">
      <div className="flex flex-col">
        <NavigateBack to="/" margin={false}>
          <ArrowLeft />
          <span className="ml-4 text-[13px] font-semibold md:text-[14px]">
            Go Back
          </span>
        </NavigateBack>
        <h3 className="mt-[9px] text-[18px]">Roadmap</h3>
      </div>
      <Link className="btn bg-purple-700" to="feedback/new">
        + Add Feedback
      </Link>
    </div>
  );
};

const RoadmapPage = () => {
  return (
    <div className="mx-auto py-[56px] max-w-[1000px]">
      <RoadmapNav />
    </div>
  );
};

export default RoadmapPage;
