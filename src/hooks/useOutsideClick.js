import React, { useRef, useEffect, useCallback } from "react";

const useOutsideClick = (callback) => {
  const node = useRef();

  const outsideClickHandler = useCallback((e) => {
    if (!node.current?.contains(e.target)) {
      callback();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", outsideClickHandler);
    return () => document.removeEventListener("click", outsideClickHandler);
  });

  return node;
};

export default useOutsideClick;
