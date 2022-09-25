import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { uniqueId } from "lodash";

import { showFlash, hideFlash } from "../features/modals/flashSlice";

const useFlash = () => {
  const dispatch = useDispatch();

  const dispatchShowFlash = useCallback((flashContent, changeId = false) => {
    dispatch(
      showFlash({
        ...flashContent,
        ...(changeId ? { id: uniqueId() } : {}),
      })
    );
  }, []);

  const dispatchHideFlash = useCallback(() => dispatch(hideFlash()), []);

  const dispatchTimedHideFlash = useCallback(
    (delay) => setTimeout(() => dispatch(hideFlash()), delay),
    []
  );

  return { dispatchHideFlash, dispatchTimedHideFlash, dispatchShowFlash };
};

export default useFlash;
