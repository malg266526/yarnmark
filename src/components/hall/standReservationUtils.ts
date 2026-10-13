import type { HallStand } from './hallStands.ts';

export const RESERVED_STAND_COLORS: HallStand['color'][] = ['taken', 'taken2'];

/** A stand already handed to a vendor: greyed out on the maps and no longer up for grabs. */
export const isReservedStand = (stand: Pick<HallStand, 'color' | 'vendor'>) =>
  Boolean(stand.vendor) || RESERVED_STAND_COLORS.includes(stand.color);

export const resolveStandColorKey = (stand: Pick<HallStand, 'color' | 'vendor'>): HallStand['color'] => {
  if (!isReservedStand(stand)) {
    return stand.color;
  }

  return RESERVED_STAND_COLORS.includes(stand.color) ? stand.color : 'taken';
};
