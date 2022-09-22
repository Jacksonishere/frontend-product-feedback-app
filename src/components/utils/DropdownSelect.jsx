import React from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

import Check from "../../icons/Check";

const DropdownSelect = (props) => {
  const { options, selected, selectedHandler, closeHandler } = props;

  const nodeRef = useOutsideClick(closeHandler);

  const optionSelected = (option) => {
    selectedHandler(option);
    closeHandler();
  };

  return (
    <ul ref={nodeRef} className="flex flex-col bg-white rounded-lg shadow-xl ">
      {options.map((option, i) => (
        <li
          onClick={() => {
            optionSelected(i);
          }}
          className={`flex justify-between items-center px-5 py-3 ${
            i === selected ? "text-purple-700" : "text-blue-400"
          }   text-[14px] not-last:border-b border-opacity-75 cursor-pointer hover:text-purple-700 md:text-[15px]`}
          key={i}
        >
          <button className="w-full text-left">{option}</button>
          {i === selected && <Check />}
        </li>
      ))}
    </ul>
  );
};

export default DropdownSelect;
