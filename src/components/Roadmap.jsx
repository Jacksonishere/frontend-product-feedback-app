import React from "react";
import { Link } from "react-router-dom";

const Roadmap = () => {
  const roadmap = [
    {
      name: "Planned",
      count: 2,
      color: "bg-peach-orange",
    },
    {
      name: "In-Progress",
      count: 3,
      color: "bg-purple-700",
    },
    {
      name: "Live",
      count: 1,
      color: "bg-sky-blue",
    },
  ];

  return (
    <div className="p-6 rounded-lg bg-white md:basis-1/2">
      <div className="flex items-center">
        <h3 className="font-bold text-[18px] text-blue-800">Roadmap</h3>
        <Link
          to="/roadmap"
          className="ml-auto text-blue-500 text-[13px] font-semibold underline"
        >
          View
        </Link>
      </div>

      <ul className="space-y-1 mt-6 text-[1rem]">
        {roadmap.map((card, index) => (
          <li key={index} className="flex text-blue-400 items-center">
            <span
              aria-hidden
              className={`inline-block w-2 h-2 rounded-full ${card.color}`}
            ></span>
            <span className="ml-4 font-regular">{card.name}</span>
            <span className="ml-auto font-semibold">{card.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roadmap;
