import React, { useState, useEffect, useMemo, createContext } from "react";
import { Link } from "react-router-dom";
// import { DndContext } from "@dnd-kit/core";
import { useGetFeedbacksByStatusesQuery } from "../api/feedbackApiSlice";
import RoadmapSection from "../components/roadmap/RoadmapSection";

import NavigateBack from "../components/utils/NavigateBack";
import ArrowLeft from "../icons/ArrowLeft";

export const RoadmapContext = createContext();

const RoadmapContextProvider = (props) => {
  const { data, isLoading } = useGetFeedbacksByStatusesQuery();

  const [items, setItems] = useState();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    if (data) {
      const roadmapItems = {
        planned: data.planned.feedbacks,
        inProgress: data.in_progress.feedbacks,
        live: data.live.feedbacks,
      };
      const roadmapCounts = {
        planned: data.planned.count,
        inProgress: data.in_progress.count,
        live: data.live.count,
      };

      setItems({ ...roadmapItems });
      setCounts({ ...roadmapCounts });
    }
  }, [data]);

  return (
    <RoadmapContext.Provider
      value={{
        isLoading,
        items,
        setItems,
        counts,
        setCounts,
      }}
    >
      {props.children}
    </RoadmapContext.Provider>
  );
};

const RoadmapNav = () => {
  return (
    <div className="flex justify-between items-center py-5 px-6 bg-blue-800 text-white md:px-[32px] md:py-[26px] md:rounded-[10px] ">
      <div className="flex flex-col">
        <NavigateBack to="/" margin={false}>
          <ArrowLeft />
          <span className="ml-4 text-[14px] font-bold md:text-[14px]">
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
    <div className="md:mx-auto md:py-[56px] md:max-w-[1000px]">
      <RoadmapNav />
      <RoadmapContextProvider>
        <RoadmapSection />
      </RoadmapContextProvider>
    </div>
  );
};

export default RoadmapPage;
