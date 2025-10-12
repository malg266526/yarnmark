import { RefObject, useEffect } from "react";

export const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  onClickOutside: () => void,
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside, ref]);
};
