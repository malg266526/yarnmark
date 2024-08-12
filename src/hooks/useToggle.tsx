import { useState } from 'react';

export const useToggle = (initialState?: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState || false);

  const toggle = () => setIsOpen((isOpen) => !isOpen);

  const close = () => setIsOpen(false);

  return [isOpen, toggle, close] as const;
};
