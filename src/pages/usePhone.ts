import { useCallback, useEffect, useState } from 'react';
import { ScreenSize } from '../styles/screeen-size';

const phoneScreenSize = Number(ScreenSize.phone.replace('px', ''));

window.onresize = () => {
  handlers.forEach((handler) => handler(window.innerWidth));
};

const handlers: ((newWidth: number) => void)[] = [];

export const usePhone = () => {
  const [isPhone, setIsPhone] = useState(false);
  const handler = useCallback((newWidth: number) => setIsPhone(newWidth <= phoneScreenSize), [setIsPhone]);

  useEffect(() => {
    handlers.push(handler);

    return () => {
      const handlerIndex = handlers.findIndex((listHandler) => listHandler === handler);
      if (handlerIndex > -1) {
        handlers.splice(handlerIndex, 1);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isPhone;
};
