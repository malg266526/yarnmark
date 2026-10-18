import type { HallStand } from './hallStands.ts';

// FIXME: this should be removed once the editor saves stand sizes in a normalized way
const SIZE_MULTIPLIER_FOR_NORMALIZATION = 2;

export interface HallStandBox {
  height: number;
  left: number;
  top: number;
  width: number;
}

export const getHallStandBox = (stand: HallStand, multiplier: number): HallStandBox => ({
  height: stand.height * multiplier * SIZE_MULTIPLIER_FOR_NORMALIZATION,
  left: stand.start.col * multiplier,
  top: stand.start.row * multiplier,
  width: stand.width * multiplier * SIZE_MULTIPLIER_FOR_NORMALIZATION
});

export const getEnclosingHallStandBox = (boxes: readonly HallStandBox[]): HallStandBox => {
  const left = Math.min(...boxes.map((box) => box.left));
  const top = Math.min(...boxes.map((box) => box.top));
  const right = Math.max(...boxes.map((box) => box.left + box.width));
  const bottom = Math.max(...boxes.map((box) => box.top + box.height));

  return { height: bottom - top, left, top, width: right - left };
};
