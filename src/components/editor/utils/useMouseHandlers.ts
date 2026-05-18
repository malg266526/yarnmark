import { useState, useEffect } from 'react';
import { getEndFromStart } from './getEndFromStart';
import { clampStandOriginToHall } from './hallGeometry';

export const useMouseHandlers = () => {
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState<{ row: number; col: number } | undefined>(undefined);
  const [end, setEnd] = useState<{ row: number; col: number } | undefined>(undefined);

  const handleMouseDown = (row: number, col: number) => {
    setStart({ row, col });
    setEnd({ row, col });
    setDragging(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (dragging) {
      setEnd({ row, col });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleClick = (row: number, col: number, standWidth: number, standHeight: number) => {
    const start = clampStandOriginToHall({ row, col }, standWidth, standHeight);

    const end = getEndFromStart(start, standWidth, standHeight);

    console.info('[EditorGridClick]', {
      requestedRow: row,
      requestedCol: col,
      standWidth,
      standHeight,
      resolvedStart: start,
      resolvedEnd: end
    });

    setStart(start);
    setEnd(end);
    setDragging(false);
  };

  useEffect(() => {
    const handleWindowMouseUp = () => setDragging(false);
    window.addEventListener('mouseup', handleWindowMouseUp);
    return () => window.removeEventListener('mouseup', handleWindowMouseUp);
  }, []);

  return {
    dragging,
    start,
    end,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    setStart,
    setEnd,
    handleClick
  };
};
