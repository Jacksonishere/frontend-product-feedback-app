import React, { useState, useEffect, useMemo, createContext } from "react";
import { Link } from "react-router-dom";
// import { DndContext } from "@dnd-kit/core";
import { useGetFeedbacksByStatusesQuery } from "../api/feedbackApiSlice";

import NavigateBack from "../components/utils/NavigateBack";
import ArrowLeft from "../icons/ArrowLeft";

const RoadmapContext = createContext();

const RoadmapContextProvider = (props) => {
  const { data, isLoading } = useGetFeedbacksByStatusesQuery();

  const [planned, setPlanned] = useState([]);
  const [numPlanned, setNumPlanned] = useState();

  const [inProgress, setInProgress] = useState([]);
  const [numInProgress, setNumInProgress] = useState();

  const [live, setLive] = useState([]);
  const [numLive, setNumLive] = useState();

  useEffect(() => {
    if (data) {
      setPlanned(data.planned.feedbacks);
      setNumPlanned(data.planned.count);

      setInProgress(data.in_progress.feedbacks);
      setNumInProgress(data.in_progress.count);

      setLive(data.live.feedbacks);
      setNumLive(data.live.count);
    }
  }, [data]);

  return (
    <RoadmapContext.Provider
      value={{
        planned,
        numPlanned,
        inProgress,
        numInProgress,
        live,
        numLive,
        isLoading,
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
        {/* <RoadmapSection /> */}
      </RoadmapContextProvider>
    </div>
  );
};

export default RoadmapPage;
