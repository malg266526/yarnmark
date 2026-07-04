import { useEffect, useRef, useState } from 'react';
import { Coordinate, StandProps } from '../StandProps';
import { useEditor } from '../EditorContext';
import { getMovedStandBox, getStandBoxSize, getStandOrigin, StandBox, StandBoxSize } from './moveStand';

interface DragState {
  stand: StandProps;
  grabOffset: Coordinate;
  size: StandBoxSize;
  box: StandBox;
  moved: boolean;
}

export interface StandDragPreview {
  standId: string;
  start: Coordinate;
  end: Coordinate;
}

export const useStandDrag = () => {
  const { updateStand } = useEditor();
  const updateStandRef = useRef(updateStand);
  updateStandRef.current = updateStand;

  const [preview, setPreview] = useState<StandDragPreview | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const movedRef = useRef(false);

  const beginDrag = (stand: StandProps, row: number, col: number) => {
    if (!stand.start || !stand.end) {
      return;
    }

    const origin = getStandOrigin(stand.start, stand.end);
    const size = getStandBoxSize(stand.start, stand.end);
    const box: StandBox = {
      start: origin,
      end: { row: origin.row + size.rows - 1, col: origin.col + size.cols - 1 }
    };

    dragRef.current = {
      stand,
      grabOffset: { row: row - origin.row, col: col - origin.col },
      size,
      box,
      moved: false
    };
    setPreview({ standId: stand.id, start: box.start, end: box.end });
  };

  const dragOver = (row: number, col: number) => {
    const drag = dragRef.current;
    if (!drag) {
      return;
    }

    const box = getMovedStandBox(drag.size, drag.grabOffset, { row, col });
    if (box.start.row !== drag.box.start.row || box.start.col !== drag.box.start.col) {
      drag.moved = true;
    }
    drag.box = box;

    setPreview({ standId: drag.stand.id, start: box.start, end: box.end });
  };

  const endDrag = () => {
    const drag = dragRef.current;
    if (!drag) {
      return;
    }

    if (drag.moved) {
      updateStandRef.current({ ...drag.stand, start: drag.box.start, end: drag.box.end });
    }

    movedRef.current = drag.moved;
    dragRef.current = null;
    setPreview(null);
  };

  const consumeClickAfterDrag = () => {
    const moved = movedRef.current;
    movedRef.current = false;
    return moved;
  };

  useEffect(() => {
    const handleWindowMouseUp = () => endDrag();
    window.addEventListener('mouseup', handleWindowMouseUp);
    return () => window.removeEventListener('mouseup', handleWindowMouseUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    preview,
    isDragging: preview !== null,
    beginDrag,
    dragOver,
    endDrag,
    consumeClickAfterDrag
  };
};
