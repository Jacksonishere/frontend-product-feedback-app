import React from "react";

const FeedbackTags = () => {
  return (
    <div className="p-6 bg-white rounded-lg md:h-full md:basis-1/2 lg:basis-full">
      <ul className="flex flex-wrap gap-x-2 gap-y-[10px] md:items-center md:h-max">
        {["All", "UI", "UX", "Enhancement", "Bug", "Feature"].map((type) => (
          <li className="feedback-tag" key={type}>
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackTags;
