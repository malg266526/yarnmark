import { useState } from 'react';

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen((isOpen) => !isOpen);

  return [isOpen, toggle] as const;
};
