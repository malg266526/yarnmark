import { useState } from 'react';

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen((isOpen) => !isOpen);

  const close = () => setIsOpen(false);

  return [isOpen, toggle, close] as const;
};
