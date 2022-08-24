import React from "react";

const FeedbackTags = () => {
  return (
    <div className="p-6 bg-white rounded-lg md:h-full md:basis-1/2">
      <ul className="flex flex-wrap gap-x-2 gap-y-[10px] md:items-center md:h-max">
        {["All", "UI", "UX", "Enhancement", "Bug", "Feature"].map((type) => (
          <li
            className="px-4 py-[5.5px] bg-blue-100 text-blue-600 text-[13px] font-semibold rounded-lg"
            key={type}
          >
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackTags;
