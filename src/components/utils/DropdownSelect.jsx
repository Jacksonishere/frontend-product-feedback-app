import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import useOutsideClick from "../../hooks/useOutsideClick";

import Check from "../../icons/Check";

const dropDownVariant = {
  initial: {
    y: -20,
    opacity: 0,
    transition: { type: "tween", duration: 0.15 },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, type: "spring" },
  },
};

const DropdownSelect = (props) => {
  const { showOptions, options, selected, selectedHandler, closeHandler } =
    props;

  const nodeRef = useOutsideClick(closeHandler);

  const optionSelected = (option) => {
    selectedHandler(option);
    closeHandler();
  };

  return (
    <AnimatePresence>
      {showOptions && (
        <motion.div
          variants={dropDownVariant}
          initial="initial"
          animate="animate"
          exit="initial"
          style={{ width: props.width ?? "100%", top: props.top ?? 0 }}
          className="absolute z-50"
        >
          <ul
            ref={nodeRef}
            className="flex flex-col bg-white rounded-lg shadow-xl "
          >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownSelect;
