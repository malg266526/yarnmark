import React, { useCallback, useEffect, useMemo } from 'react';

export interface UseRootIntersectionObserverParams {
  rootRef: React.MutableRefObject<HTMLElement | null>;
  elementToObserveRef: React.MutableRefObject<HTMLElement | null>;
  callback: () => void;
}

export const useRootIntersectionObserver = ({
  rootRef,
  elementToObserveRef,
  callback
}: UseRootIntersectionObserverParams) => {
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      callback();
    }
  }, []);

  const observer = useMemo(
    () =>
      new IntersectionObserver(observerCallback, {
        root: rootRef.current,
        rootMargin: '0px',
        threshold: 1
      }),
    [rootRef.current]
  );

  useEffect(() => {
    if (elementToObserveRef.current && rootRef.current) {
      observer.observe(elementToObserveRef.current);
    }
  }, [elementToObserveRef.current]);
};
