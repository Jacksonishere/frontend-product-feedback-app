import React, { useContext, useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import cloneDeep from "lodash.clonedeep";
import { useMediaQuery } from "react-responsive";

import { RoadmapContext } from "../../pages/RoadmapPage";
import FeedbackContext from "../../context/FeedbacksContext";
import RoadmapFeedback from "./RoadmapFeedback";

import { useUpdateFeedbackMutation } from "../../api/feedbackApiSlice";

import useFlash from "../../hooks/useFlash";
import useAuth from "../../hooks/useAuth";

import {
  DndContext,
  closestCorners,
  useDroppable,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import isEqual from "lodash.isequal";

import {
  arrayMove,
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import Spinner from "../utils/Spinner";

const statusKeyValue = {
  planned: "planned",
  inProgress: "in_progress",
  live: "live",
};

const RoadmapSection = () => {
  const [updateFeedbackStatus, { isLoading: updatePending, isError }] =
    useUpdateFeedbackMutation();
  const { dispatchShowFlash } = useFlash();

  const tabletAndAbove = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [beforeDropped, setBeforeDropped] = useState();
  const isActive = useRef(false);
  const prev = useRef();

  const { isLoading, items, setItems, counts, setCounts } =
    useContext(RoadmapContext);
  const { updateOneFeedback } = useContext(FeedbackContext);

  const updatePlanned = (id, newLikeCount, userLiked) => {
    let planned = items["planned"];
    let index = planned.findIndex((feedback) => feedback.id === id);
    let modify = { ...planned[index] };
    modify.num_likes = newLikeCount;
    modify.user_liked = userLiked;
    const newPlanned = [...planned];
    newPlanned[index] = modify;
    setItems({ ...items, planned: newPlanned });
  };
  const updateInProgress = (id, newLikeCount, userLiked) => {
    let inProgress = items["inProgress"];
    let index = inProgress.findIndex((feedback) => feedback.id === id);
    let modify = { ...inProgress[index] };
    modify.num_likes = newLikeCount;
    modify.user_liked = userLiked;
    const newInProgress = [...inProgress];
    newInProgress[index] = modify;
    setItems({ ...items, inProgress: newInProgress });
  };
  const updateLive = (id, newLikeCount, userLiked) => {
    let live = items["live"];
    let index = live.findIndex((feedback) => feedback.id === id);
    let modify = { ...live[index] };
    modify.num_likes = newLikeCount;
    modify.user_liked = userLiked;
    const newLive = [...live];
    newLive[index] = modify;
    setItems({ ...items, live: newLive });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find(
      (key) => items[key].findIndex((feedback) => id === feedback.id) !== -1
    );
  };

  const findFeedback = (feedbacks, id) =>
    feedbacks.findIndex((feedback) => feedback.id === id);

  const updateStatusCount = (minus, plus) => {
    const updateCount = (type, amnt) => {
      switch (type) {
        case "planned":
          setCounts((curr) => ({ ...curr, planned: curr?.planned + amnt }));
          break;
        case "inProgress":
          setCounts((curr) => ({
            ...curr,
            inProgress: curr?.inProgress + amnt,
          }));
          break;
        case "live":
          setCounts((curr) => ({ ...curr, live: curr?.live + amnt }));
          break;
        default:
          return;
      }
    };

    updateCount(minus, -1);
    updateCount(plus, 1);
  };

  const handleDragOver = (event) => {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // Container IDs
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    // Moved item to a new container
    if (!isActive.current) {
      isActive.current = true;
      prev.current = activeContainer;
      setBeforeDropped({ items: cloneDeep(items), counts: cloneDeep(counts) });
    }

    setItems((prev) => {
      // items of container the active item is in
      const activeItems = prev[activeContainer];
      // items of container the active item was dragged into
      const overItems = prev[overContainer];

      // Find the indices for the items
      const activeIndex = findFeedback(activeItems, id);
      const overIndex = findFeedback(overItems, overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
    updateStatusCount(activeContainer, overContainer);
  };
  // Up, you drag the thing you swapped and everything else down
  // Down, you drag the thing you swapped and everything else down
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = findFeedback(items[activeContainer], id);
    const overIndex = findFeedback(items[overContainer], overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    // Handle when item is dropped to a new container
    const activeFeedback = items[activeContainer][activeIndex];
    if (isActive.current && prev.current !== overContainer) {
      const { data: updatedFeedback, error } = await updateFeedbackStatus({
        id: activeFeedback.id,
        feedback: { status: statusKeyValue[overContainer] },
      });

      let flashContent;
      if (error) {
        setItems(beforeDropped.items);
        setCounts(beforeDropped.counts);
        flashContent = {
          type: "ERROR",
          msg: `Failed to update status from ${prev.current} to ${overContainer}`,
        };
      } else {
        updateOneFeedback(updatedFeedback);
        flashContent = {
          type: "SUCCESS",
          msg: `Successfully updated status to ${overContainer}`,
        };
      }
      dispatchShowFlash(flashContent, true);
    }
    setBeforeDropped(null);
    isActive.current = false;
  };

  return (
    <div>
      {isLoading ? (
        <div className="mt-5">
          <Spinner />
        </div>
      ) : tabletAndAbove ? (
        items && (
          <div className="flex flex-col">
            <div className="grid grid-flow-col grid-cols-[1fr_1fr_1fr] gap-x-4 mt-6 lg:gap-x-8">
              <div>
                <h3 className="text-blue-900 text-[18px]">{`Planned (${counts?.planned})`}</h3>
                <p className="text-blue-400 text-[14px]">
                  Ideas prioritized for research
                </p>
              </div>
              <div>
                <h3 className="text-blue-900 text-[18px]">{`In-Progress (${counts?.inProgress})`}</h3>
                <p className="text-blue-400 text-[14px]">
                  Currently being developed
                </p>
              </div>
              <div>
                <h3 className="text-blue-900 text-[18px]">{`Live (${counts?.live})`}</h3>
                <p className="text-blue-400 text-[14px]">
                  Currently being developed
                </p>
              </div>
            </div>
            <div className="grid grid-flow-col grid-cols-[repeat(3,1fr)] gap-x-4 mt-6 lg:gap-x-8">
              <DndContext
                collisionDetection={closestCorners}
                sensors={sensors}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                <SortableContainer
                  id="planned"
                  items={items.planned}
                  COLOR="border-t-peach-orange"
                  likeHandler={updatePlanned}
                />
                <SortableContainer
                  id="inProgress"
                  items={items.inProgress}
                  COLOR="border-t-purple-700"
                  likeHandler={updateInProgress}
                />
                <SortableContainer
                  id="live"
                  items={items.live}
                  COLOR="border-t-sky-blue"
                  likeHandler={updateLive}
                />
              </DndContext>
            </div>
          </div>
        )
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
                  {`Planned (${counts?.planned})`}
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
                  {`In-Progress (${counts?.inProgress})`}
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
                  {`Live (${counts?.live})`}
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="p-6">
            <Tab.Panel>
              <h3 className="text-blue-900 text-[18px]">{`Planned (${counts?.planned})`}</h3>
              <p className="text-blue-400 text-[14px]">
                Ideas prioritized for research
              </p>
              <ul className="mt-6 space-y-5">
                {items?.["planned"].map((feedback) => (
                  <li key={feedback.id}>
                    <RoadmapFeedback
                      TYPE="ROADMAP"
                      COLOR="border-t-peach-orange"
                      feedback={feedback}
                      likeHandler={updatePlanned}
                      linkActive
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel>
              <h3 className="text-blue-900 text-[18px]">{`In-Progress (${counts?.inProgress})`}</h3>
              <p className="text-blue-400 text-[14px]">
                Currently being developed
              </p>
              <ul className="mt-6 space-y-5">
                {items?.["inProgress"].map((feedback) => (
                  <li key={feedback.id}>
                    <RoadmapFeedback
                      TYPE="ROADMAP"
                      COLOR="border-t-purple-700"
                      feedback={feedback}
                      likeHandler={updateInProgress}
                      linkActive
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel>
              <h3 className="text-blue-900 text-[18px]">
                {`Live (${counts?.live})`}
              </h3>
              <p className="text-blue-400 text-[14px]">Released features</p>
              <ul className="mt-6 space-y-5">
                {items?.["live"].map((feedback) => (
                  <li key={feedback.id}>
                    <RoadmapFeedback
                      TYPE="ROADMAP"
                      COLOR="border-t-sky-blue"
                      feedback={feedback}
                      likeHandler={updateLive}
                      linkActive
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

const SortableContainer = (props) => {
  const { id, items, COLOR, likeHandler } = props;

  const { setNodeRef } = useDroppable({
    id,
  });
  // const user = useAuth();

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div className="relative space-y-4 w-full" ref={setNodeRef}>
        {items.map((feedback) => (
          <SortableItem
            key={feedback.id}
            COLOR={COLOR}
            likeHandler={likeHandler}
            feedback={feedback}
          />
        ))}
      </div>
    </SortableContext>
  );
};

const SortableItem = ({ COLOR, likeHandler, feedback }) => {
  const user = useAuth();
  const { id: feedback_id } = feedback;

  const sortableProps = useSortable({
    id: feedback_id,
    disabled: user?.id === feedback_id,
  });
  const { active, attributes, listeners, setNodeRef, transform, transition } =
    sortableProps;

  const isActive = active?.id === feedback_id;

  const style = {
    position: "relative",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "",
    transition,
    cursor: isActive ? "grabbing" : "grab",
    zIndex: isActive ? 10000 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <RoadmapFeedback
        TYPE="ROADMAP"
        COLOR={COLOR}
        feedback={feedback}
        likeHandler={likeHandler}
        linkActive={!isActive}
      />
    </div>
  );
};

export default RoadmapSection;
