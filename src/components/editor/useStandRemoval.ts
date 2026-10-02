import { useEffect, useState } from 'react';
import type { StandProps } from './StandProps';
import { DefaultStand, useEditor } from './EditorContext';
import { isEditableElement, isRemoveStandKey } from './utils/editorKeyboardUtils';

export const useStandRemoval = () => {
  const { stands, currentStand, removeStand, setCurrentStand } = useEditor();
  const [pendingStand, setPendingStand] = useState<StandProps | null>(null);

  const requestRemove = (stand: StandProps) => setPendingStand(stand);

  const cancelRemove = () => setPendingStand(null);

  const confirmRemove = () => {
    if (pendingStand) {
      removeStand(pendingStand);

      if (currentStand.id === pendingStand.id) {
        setCurrentStand(DefaultStand);
      }
    }

    setPendingStand(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isRemoveStandKey(event.key)) {
        return;
      }

      const eventTarget = event.target as HTMLElement | null;

      if (isEditableElement(eventTarget?.tagName, eventTarget?.isContentEditable)) {
        return;
      }

      const selectedStand = stands.find((stand) => stand.id === currentStand.id);

      if (!selectedStand) {
        return;
      }

      event.preventDefault();
      setPendingStand(selectedStand);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stands, currentStand]);

  return { pendingStand, requestRemove, confirmRemove, cancelRemove };
};
