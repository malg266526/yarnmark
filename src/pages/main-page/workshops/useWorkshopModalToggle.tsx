import { useToggle } from '../../../hooks/useToggle';
import { useCallback, useState } from 'react';
import { WorkshopsEntry } from './workshopsConfig';

export const useWorkshopModalToggle = () => {
  const [isModalOpen, toggle, close] = useToggle();
  const [currentWorkshop, setCurrentWorkshop] = useState<WorkshopsEntry | undefined>();

  const toggleModal = useCallback(
    (workshop: WorkshopsEntry) => {
      if (isModalOpen) {
        setCurrentWorkshop(undefined);
      } else {
        setCurrentWorkshop(workshop);
      }
      toggle();
    },
    [isModalOpen, toggle]
  );

  const closeModal = () => {
    setCurrentWorkshop(undefined);
    close();
  };

  return {
    isModalOpen,
    currentWorkshop,
    toggleModal,
    close: closeModal,
  };
};
