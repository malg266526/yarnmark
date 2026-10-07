import type { StandProps } from '../StandProps.ts';
import { getStandOrigin, type StandBox } from './moveStand.ts';

export interface StandCollision {
  first: StandProps;
  second: StandProps;
  overlap: StandBox;
}

const getNormalizedBox = ({ start, end }: StandProps): StandBox | null => {
  if (!start || !end) {
    return null;
  }

  return {
    start: getStandOrigin(start, end),
    end: { row: Math.max(start.row, end.row), col: Math.max(start.col, end.col) }
  };
};

const getBoxOverlap = (first: StandBox, second: StandBox): StandBox | null => {
  const overlap = {
    start: { row: Math.max(first.start.row, second.start.row), col: Math.max(first.start.col, second.start.col) },
    end: { row: Math.min(first.end.row, second.end.row), col: Math.min(first.end.col, second.end.col) }
  };

  return overlap.start.row <= overlap.end.row && overlap.start.col <= overlap.end.col ? overlap : null;
};

export const findStandCollisions = (stands: readonly StandProps[]): StandCollision[] => {
  const placedStands = stands.flatMap((stand) => {
    const box = getNormalizedBox(stand);

    return box ? [{ stand, box }] : [];
  });

  return placedStands.flatMap((first, firstIndex) =>
    placedStands.slice(firstIndex + 1).flatMap((second) => {
      const overlap = getBoxOverlap(first.box, second.box);

      return overlap ? [{ first: first.stand, second: second.stand, overlap }] : [];
    })
  );
};
