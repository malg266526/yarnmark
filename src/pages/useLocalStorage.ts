import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = <T>(initialValue: T, key: string, parser: (rawValue: string) => T) => {
  const [value, setValue] = useState(initialValue);

  const updateValue = useCallback((value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  }, []);

  useEffect(() => {
    try {
      const rawValue = localStorage.getItem(key);
      if (rawValue) {
        updateValue(parser(rawValue));
      }
    } catch (e) { }
  }, []);

  return [value, setValue];
};
