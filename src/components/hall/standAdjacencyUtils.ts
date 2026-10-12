import type { HallStand } from './hallStands.ts';

interface StandBox {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const getStandBox = ({ start, end }: Pick<HallStand, 'start' | 'end'>): StandBox => ({
  top: Math.min(start.row, end.row),
  bottom: Math.max(start.row, end.row),
  left: Math.min(start.col, end.col),
  right: Math.max(start.col, end.col)
});

const rangesOverlap = (firstStart: number, firstEnd: number, secondStart: number, secondEnd: number) =>
  firstStart <= secondEnd && secondStart <= firstEnd;

export const areStandsAdjacent = (
  first: Pick<HallStand, 'start' | 'end'>,
  second: Pick<HallStand, 'start' | 'end'>
): boolean => {
  const firstBox = getStandBox(first);
  const secondBox = getStandBox(second);
  const rowsOverlap = rangesOverlap(firstBox.top, firstBox.bottom, secondBox.top, secondBox.bottom);
  const colsOverlap = rangesOverlap(firstBox.left, firstBox.right, secondBox.left, secondBox.right);
  const rowsTouch = rangesOverlap(firstBox.top - 1, firstBox.bottom + 1, secondBox.top, secondBox.bottom);
  const colsTouch = rangesOverlap(firstBox.left - 1, firstBox.right + 1, secondBox.left, secondBox.right);

  return (rowsOverlap && colsTouch) || (colsOverlap && rowsTouch);
};

export const getAdjacentStandIndexes = (standIndex: string, stands: readonly HallStand[]): string[] => {
  const anchorStand = stands.find((stand) => stand.index === standIndex);

  if (!anchorStand) {
    return [];
  }

  return stands
    .filter((stand) => stand.index !== standIndex && areStandsAdjacent(anchorStand, stand))
    .map((stand) => stand.index);
};

export const getPairableStandIndexes = (stands: readonly HallStand[], anchorStandIndex: string | null): string[] =>
  anchorStandIndex
    ? getAdjacentStandIndexes(anchorStandIndex, stands)
    : stands.filter((stand) => getAdjacentStandIndexes(stand.index, stands).length > 0).map((stand) => stand.index);
