import React, { useCallback, useRef } from "react";

const useInfiniteScroll = ({
  isFetching,
  canFetchMore,
  infiniteScrollHandler,
}) => {
  const observerRef = useRef();
  const infiniteScrollTrigger = useCallback(
    (node) => {
      if (isFetching) return;
      else if (node) {
        observerRef.current?.disconnect();
        if (canFetchMore) {
          observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              infiniteScrollHandler();
            }
          });
          observerRef.current.observe(node);
        }
      }
    },
    [isFetching, canFetchMore]
  );

  return infiniteScrollTrigger;
};

export default useInfiniteScroll;
