import { useCallback, useLayoutEffect, useState } from 'react';
import { ScreenSize } from '../styles/screeen-size';

const phoneScreenSize = Number(ScreenSize.phone.replace('px', ''));
const getWindowWidth = () => (window.innerWidth < window.outerWidth ? window.innerWidth : window.outerWidth);
let lastWindowInnerWidth = getWindowWidth();

window.onresize = () => {
  lastWindowInnerWidth = getWindowWidth();
  handlers.forEach((handler) => handler(lastWindowInnerWidth));
};

const handlers: ((newWidth: number) => void)[] = [];

export const usePhone = () => {
  const [isPhone, setIsPhone] = useState(false);
  const handler = useCallback((newWidth: number) => setIsPhone(newWidth <= phoneScreenSize), [setIsPhone]);

  useLayoutEffect(() => {
    handler(lastWindowInnerWidth);
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

const tabletScreenSize = Number(ScreenSize.tablet.replace('px', ''));

export const useTablet = () => {
  const [isTablet, setIsTablet] = useState(false);
  const handler = useCallback((newWidth: number) => setIsTablet(newWidth <= tabletScreenSize), [setIsTablet]);

  useLayoutEffect(() => {
    handler(lastWindowInnerWidth);
    handlers.push(handler);

    return () => {
      const handlerIndex = handlers.findIndex((listHandler) => listHandler === handler);
      if (handlerIndex > -1) {
        handlers.splice(handlerIndex, 1);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isTablet;
};
