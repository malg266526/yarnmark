import type { StandProps, StandType } from '../StandProps.ts';
import { SQUARE_SIZE_M } from './hallGeometry.ts';
import { getStandBoxSize } from './moveStand.ts';

export const STAND_TYPE_ORDER: readonly StandType[] = ['premium', 'standard', 'c', 'mini', 'other'];

export interface StandTypeGroup {
  type: StandType;
  stands: StandProps[];
}

export const getStandAreaM2 = (stand: StandProps): number => {
  if (stand.start && stand.end) {
    const size = getStandBoxSize(stand.start, stand.end);

    return size.rows * SQUARE_SIZE_M * (size.cols * SQUARE_SIZE_M);
  }

  return (stand.width ?? 0) * (stand.height ?? 0);
};

export const matchesStandSearch = (stand: StandProps, searchQuery: string): boolean => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return (
    stand.index.toLowerCase().includes(normalizedQuery) || (stand.vendor ?? '').toLowerCase().includes(normalizedQuery)
  );
};

export const compareStandIndexes = (leftStand: StandProps, rightStand: StandProps): number =>
  leftStand.index.localeCompare(rightStand.index, undefined, { numeric: true, sensitivity: 'base' });

export const groupStandsByType = (stands: readonly StandProps[], searchQuery: string): StandTypeGroup[] =>
  STAND_TYPE_ORDER.map((type) => ({
    type,
    stands: stands
      .filter((stand) => stand.type === type && matchesStandSearch(stand, searchQuery))
      .sort(compareStandIndexes)
  })).filter((group) => group.stands.length > 0);
