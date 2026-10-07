import type { StandProps } from '../StandProps.ts';
import { isCustomStandIndex } from './standColorUtils.ts';

export const normalizeStandType = (stand: StandProps): StandProps =>
  isCustomStandIndex(stand.index) && stand.type !== 'c' ? { ...stand, type: 'c' } : stand;
