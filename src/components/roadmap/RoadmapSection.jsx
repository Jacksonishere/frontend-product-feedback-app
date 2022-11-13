import React, { useContext, useState } from "react";

import { RoadmapContext } from "../../pages/RoadmapPage";
import RoadmapFeedback from "./RoadmapFeedback";
import { Tab } from "@headlessui/react";
import Spinner from "../utils/Spinner";

const RoadmapSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    isLoading,
    planned,
    numPlanned,
    inProgress,
    numInProgress,
    live,
    numLive,
    setPlanned,
    setInProgress,
    setLive,
  } = useContext(RoadmapContext);

  const updatePlanned = (id, newLikeCount, userLiked) => {
    let index = planned.findIndex((feedback) => feedback.id === id);
    let modify = { ...planned[index] };
    modify.num_likes = newLikeCount;
    modify.user_liked = userLiked;
    const newPlanned = [...planned];
    newPlanned[index] = modify;
    setPlanned(newPlanned);
  };
  const updateInProgress = (id, newLikeCount, userLiked) => {
    let index = inProgress.findIndex((feedback) => feedback.id === id);
    let modify = { ...inProgress[index] };
    modify.num_likes = newLikeCount;
    modify.user_liked = userLiked;
    setInProgress([...inProgress]);
  };
  const updateLive = (id, newLikeCount, userLiked) => {
    let index = live.findIndex((feedback) => feedback.id === id);
    let modify = { ...live[index] };
    modify.num_likes = newLikeCount;
    modify.user_liked = userLiked;
    setLive([...live]);
  };

  return (
    <div>
      {isLoading ? (
        <div className="mt-5">
          <Spinner />
        </div>
      ) : (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List
            className={`relative flex border-b-[rgba(140,146,179)] border-b-[1px] text-blue-800 text-[13px] font-bold text-center before:content-[""] before:absolute before:bottom-[-1px] before:left-0 before:right-0 before:h-1 before:w-1/3
          ${
            selectedIndex === 0
              ? "before:translate-x-0"
              : selectedIndex === 1
              ? "before:translate-x-full"
              : "before:translate-x-[200%]"
          }
          before:bg-purple-700 before:transition-transform before:ease-in-out`}
          >
            <Tab as={React.Fragment}>
              {({ selected }) => (
                <button
                  className={`relative flex-1 py-5 ${
                    selected ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {`Planned (${numPlanned})`}
                </button>
              )}
            </Tab>
            <Tab as={React.Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-1 py-5 ${
                    selected ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {`In-Progress (${numInProgress})`}
                </button>
              )}
            </Tab>
            <Tab as={React.Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-1 py-5 ${
                    selected ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {`Live (${numLive})`}
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="p-6">
            <Tab.Panel>
              <h3 className="text-blue-900 text-[18px]">{`Planned (${numPlanned})`}</h3>
              <p className="text-blue-400 text-[14px]">
                Ideas prioritized for research
              </p>
              <ul className="mt-6 space-y-5">
                {planned.map((feedback) => (
                  <li key={feedback.id}>
                    <RoadmapFeedback
                      TYPE="ROADMAP"
                      COLOR="border-t-peach-orange"
                      feedback={feedback}
                      likeHandler={updatePlanned}
                      hover
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel>
              <h3 className="text-blue-900 text-[18px]">{`In-Progress (${numInProgress})`}</h3>
              <p className="text-blue-400 text-[14px]">
                Currently being developed
              </p>
              <ul className="mt-6 space-y-5">
                {inProgress.map((feedback) => (
                  <li key={feedback.id}>
                    <RoadmapFeedback
                      TYPE="ROADMAP"
                      COLOR="border-t-purple-700"
                      feedback={feedback}
                      likeHandler={updateInProgress}
                      hover
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel>
              <h3 className="text-blue-900 text-[18px]">
                {`Live (${numLive})`}
              </h3>
              <p className="text-blue-400 text-[14px]">Released features</p>
              <ul className="mt-6 space-y-5">
                {live.map((feedback) => (
                  <li key={feedback.id}>
                    <RoadmapFeedback
                      TYPE="ROADMAP"
                      COLOR="border-t-sky-blue"
                      feedback={feedback}
                      likeHandler={updateLive}
                      hover
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  );
};

export default RoadmapSection;
