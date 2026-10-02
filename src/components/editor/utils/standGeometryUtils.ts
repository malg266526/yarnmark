import type { StandProps } from '../StandProps.ts';
import { GAP_PX, ROW_PITCH_PX, clampStandOriginToHall, metersToSquares } from './hallGeometry.ts';
import { getStandBoxSize, getStandOrigin, type StandBox } from './moveStand.ts';

export interface StandOutlineRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const getResizedStandBox = (stand: StandProps, widthM: number, heightM: number): StandBox | null => {
  if (!stand.start || !stand.end) {
    return null;
  }

  const origin = clampStandOriginToHall(getStandOrigin(stand.start, stand.end), widthM, heightM);

  return {
    start: origin,
    end: {
      row: origin.row + metersToSquares(heightM) - 1,
      col: origin.col + metersToSquares(widthM) - 1
    }
  };
};

export const resizeStand = (stand: StandProps, widthM: number, heightM: number): StandProps => {
  const box = getResizedStandBox(stand, widthM, heightM);

  if (!box) {
    return { ...stand, width: widthM, height: heightM };
  }

  return { ...stand, width: widthM, height: heightM, start: box.start, end: box.end };
};

export const getStandOutlineRect = (stand: StandProps): StandOutlineRect | null => {
  if (!stand.start || !stand.end) {
    return null;
  }

  const origin = getStandOrigin(stand.start, stand.end);
  const size = getStandBoxSize(stand.start, stand.end);

  return {
    left: origin.col * ROW_PITCH_PX,
    top: origin.row * ROW_PITCH_PX,
    width: size.cols * ROW_PITCH_PX - GAP_PX,
    height: size.rows * ROW_PITCH_PX - GAP_PX
  };
};

export const resizeStandToDeclaredSize = (stand: StandProps): StandProps =>
  typeof stand.width === 'number' && typeof stand.height === 'number'
    ? resizeStand(stand, stand.width, stand.height)
    : stand;
