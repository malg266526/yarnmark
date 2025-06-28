import React, { useCallback, useEffect, useMemo } from 'react';

export interface UseIntersectionObserverParams {
  containerRef: React.MutableRefObject<HTMLElement | null>;
  elementToObserveRef: React.MutableRefObject<HTMLElement | null>;
  callback: () => void;
}

export const useIntersectionObserver = ({
  containerRef,
  elementToObserveRef,
  callback,
}: UseIntersectionObserverParams) => {
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const observer = useMemo(
    () =>
      new IntersectionObserver(observerCallback, {
        root: containerRef.current,
        rootMargin: '0px',
        threshold: 1,
      }),
    [containerRef, observerCallback]
  );

  useEffect(() => {
    if (elementToObserveRef.current && containerRef.current) {
      observer.observe(elementToObserveRef.current);
    }
  }, [elementToObserveRef, observer, containerRef]);
};
