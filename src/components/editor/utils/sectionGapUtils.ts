import type { StandProps } from '../StandProps.ts';
import { GAP_PX, ROW_PITCH_PX, SQUARE_PX, SQUARE_SIZE_M } from './hallGeometry.ts';

export const MAX_SECTION_GAP_M = 8;

export type SectionGapAxis = 'horizontal' | 'vertical';

export interface SectionGap {
  key: string;
  axis: SectionGapAxis;
  fromIndex: string;
  toIndex: string;
  gapStart: number;
  gapEnd: number;
  crossStart: number;
  crossEnd: number;
  distanceM: number;
}

export interface SectionGapLineRect {
  left: number;
  top: number;
  width: number;
  height: number;
  labelLeft: number;
  labelTop: number;
}

interface PlacedStand {
  stand: StandProps;
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const toPlacedStand = (stand: StandProps): PlacedStand | null => {
  if (!stand.start || !stand.end) {
    return null;
  }

  return {
    stand,
    top: Math.min(stand.start.row, stand.end.row),
    bottom: Math.max(stand.start.row, stand.end.row),
    left: Math.min(stand.start.col, stand.end.col),
    right: Math.max(stand.start.col, stand.end.col)
  };
};

const rangesOverlap = (firstStart: number, firstEnd: number, secondStart: number, secondEnd: number) =>
  firstStart <= secondEnd && secondStart <= firstEnd;

const areTouching = (first: PlacedStand, second: PlacedStand) => {
  const rowsTouch = rangesOverlap(first.top - 1, first.bottom + 1, second.top, second.bottom);
  const colsTouch = rangesOverlap(first.left - 1, first.right + 1, second.left, second.right);
  const rowsOverlap = rangesOverlap(first.top, first.bottom, second.top, second.bottom);
  const colsOverlap = rangesOverlap(first.left, first.right, second.left, second.right);

  return (rowsOverlap && colsTouch) || (colsOverlap && rowsTouch);
};

const assignSections = (placedStands: PlacedStand[]): number[] => {
  const parents = placedStands.map((_, standIndex) => standIndex);
  const findRoot = (standIndex: number): number => {
    while (parents[standIndex] !== standIndex) {
      parents[standIndex] = parents[parents[standIndex]];
      standIndex = parents[standIndex];
    }

    return standIndex;
  };

  placedStands.forEach((first, firstIndex) => {
    placedStands.slice(firstIndex + 1).forEach((second, offset) => {
      if (areTouching(first, second)) {
        parents[findRoot(firstIndex + 1 + offset)] = findRoot(firstIndex);
      }
    });
  });

  return placedStands.map((_, standIndex) => findRoot(standIndex));
};

const isAreaEmpty = (placedStands: PlacedStand[], area: { top: number; bottom: number; left: number; right: number }) =>
  !placedStands.some(
    (placed) =>
      rangesOverlap(placed.top, placed.bottom, area.top, area.bottom) &&
      rangesOverlap(placed.left, placed.right, area.left, area.right)
  );

const comparePlacement = (first: PlacedStand, second: PlacedStand) =>
  first.top - second.top || first.left - second.left;

const findGap = (first: PlacedStand, second: PlacedStand, axis: SectionGapAxis, placedStands: PlacedStand[]) => {
  const [before, after] =
    axis === 'horizontal'
      ? first.right < second.left
        ? [first, second]
        : [second, first]
      : first.bottom < second.top
        ? [first, second]
        : [second, first];
  const gapStart = axis === 'horizontal' ? before.right + 1 : before.bottom + 1;
  const gapEnd = axis === 'horizontal' ? after.left - 1 : after.top - 1;
  const crossStart = axis === 'horizontal' ? Math.max(before.top, after.top) : Math.max(before.left, after.left);
  const crossEnd = axis === 'horizontal' ? Math.min(before.bottom, after.bottom) : Math.min(before.right, after.right);

  if (gapStart > gapEnd || crossStart > crossEnd) {
    return null;
  }

  const corridor =
    axis === 'horizontal'
      ? { top: crossStart, bottom: crossEnd, left: gapStart, right: gapEnd }
      : { top: gapStart, bottom: gapEnd, left: crossStart, right: crossEnd };

  if (!isAreaEmpty(placedStands, corridor)) {
    return null;
  }

  return { before, after, gapStart, gapEnd, crossStart, crossEnd };
};

export const findSectionGaps = (stands: readonly StandProps[]): SectionGap[] => {
  const placedStands = stands.flatMap((stand) => toPlacedStand(stand) ?? []).sort(comparePlacement);
  const sections = assignSections(placedStands);
  const closestGaps = new Map<string, SectionGap>();

  placedStands.forEach((first, firstIndex) => {
    placedStands.slice(firstIndex + 1).forEach((second, offset) => {
      const secondIndex = firstIndex + 1 + offset;

      if (sections[firstIndex] === sections[secondIndex]) {
        return;
      }

      const sectionPair = [sections[firstIndex], sections[secondIndex]].sort((left, right) => left - right).join('-');

      (['horizontal', 'vertical'] as const).forEach((axis) => {
        const gap = findGap(first, second, axis, placedStands);

        if (!gap) {
          return;
        }

        const key = `${sectionPair}-${axis}`;
        const distanceM = (gap.gapEnd - gap.gapStart + 1) * SQUARE_SIZE_M;
        const closestGap = closestGaps.get(key);

        if (!closestGap || distanceM < closestGap.distanceM) {
          closestGaps.set(key, {
            key,
            axis,
            fromIndex: gap.before.stand.index,
            toIndex: gap.after.stand.index,
            gapStart: gap.gapStart,
            gapEnd: gap.gapEnd,
            crossStart: gap.crossStart,
            crossEnd: gap.crossEnd,
            distanceM
          });
        }
      });
    });
  });

  return [...closestGaps.values()].filter(({ distanceM }) => distanceM <= MAX_SECTION_GAP_M);
};

export const getSectionGapLineRect = ({
  axis,
  gapStart,
  gapEnd,
  crossStart,
  crossEnd
}: SectionGap): SectionGapLineRect => {
  const lengthPx = (gapEnd - gapStart + 1) * ROW_PITCH_PX + GAP_PX;
  const startPx = gapStart * ROW_PITCH_PX - GAP_PX;
  const crossCenterPx = (crossStart * ROW_PITCH_PX + crossEnd * ROW_PITCH_PX + SQUARE_PX) / 2;

  return axis === 'horizontal'
    ? {
        left: startPx,
        top: crossCenterPx,
        width: lengthPx,
        height: 0,
        labelLeft: startPx + lengthPx / 2,
        labelTop: crossCenterPx
      }
    : {
        left: crossCenterPx,
        top: startPx,
        width: 0,
        height: lengthPx,
        labelLeft: crossCenterPx,
        labelTop: startPx + lengthPx / 2
      };
};
