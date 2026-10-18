import type { HallStand } from '../../../components/hall/hallStands.ts';
import { getAdjacentStandIndexes } from '../../../components/hall/standAdjacencyUtils.ts';
import { canStandBePaired } from '../../../domain/vendorApplications/vendorStandTypeUtils.ts';

export const getFreeNeighbourStandIds = (
  selectableStands: readonly HallStand[],
  standId: string,
  selectedStandIds: readonly string[]
): string[] =>
  getAdjacentStandIndexes(standId, selectableStands).filter(
    (neighbourId) => canStandBePaired(neighbourId) && !selectedStandIds.includes(neighbourId)
  );

export const getUnpairableStandIds = (
  selectableStands: readonly HallStand[],
  preferredStandGroups: string[][]
): string[] => {
  const selectedStandIds = preferredStandGroups.flat();

  return preferredStandGroups
    .filter((standGroup) => standGroup.length === 1)
    .map(([standId]) => standId)
    .filter((standId) => getFreeNeighbourStandIds(selectableStands, standId, selectedStandIds).length === 0);
};
