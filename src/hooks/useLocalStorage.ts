import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = <T>(initialValue: T, key: string, parser: (rawValue: string) => T) => {
  const [value, setValue] = useState(initialValue);

  const updateValue = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    },
    [key]
  );

  useEffect(() => {
    try {
      const rawValue = localStorage.getItem(key);
      if (rawValue) {
        updateValue(parser(rawValue));
      }
    } catch (e) {
      console.error('useLocalStorage: ', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, updateValue] as const;
};
