import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  parser?: (rawValue: string) => T,
) => {
  const [value, setValue] = useState(initialValue);

  const updateValue = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    },
    [key],
  );

  useEffect(() => {
    try {
      const rawValue = localStorage.getItem(key);
      if (rawValue) {
        const parsedValue: T = parser
          ? parser(rawValue)
          : (JSON.parse(rawValue) as T);

        updateValue(parsedValue);
      }
    } catch (e) {
      console.error("useLocalStorage: ", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, updateValue] as const;
};
