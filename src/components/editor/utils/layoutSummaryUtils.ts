import type { StandProps, StandType } from '../StandProps.ts';
import { HALL_HEIGHT_M, HALL_WIDTH_M } from './hallGeometry.ts';
import { getStandAreaM2 } from './standListUtils.ts';

export const SELLABLE_STAND_TYPES = ['premium', 'standard', 'mini'] as const satisfies readonly StandType[];

export type SellableStandType = (typeof SELLABLE_STAND_TYPES)[number];

export const HALL_AREA_M2 = HALL_WIDTH_M * HALL_HEIGHT_M;

export interface StandTypeTotals {
  count: number;
  areaM2: number;
}

export interface LayoutSummary {
  byType: Record<SellableStandType, StandTypeTotals>;
  sellable: StandTypeTotals;
  hallUsagePercent: number;
}

const EMPTY_TOTALS: StandTypeTotals = { count: 0, areaM2: 0 };

const isSellableStandType = (type: StandType): type is SellableStandType =>
  (SELLABLE_STAND_TYPES as readonly StandType[]).includes(type);

const sumTotals = (stands: readonly StandProps[]): StandTypeTotals =>
  stands.reduce<StandTypeTotals>(
    (totals, stand) => ({ count: totals.count + 1, areaM2: totals.areaM2 + getStandAreaM2(stand) }),
    EMPTY_TOTALS
  );

export const summarizeLayout = (stands: readonly StandProps[]): LayoutSummary => {
  const sellableStands = stands.filter((stand) => isSellableStandType(stand.type));
  const sellable = sumTotals(sellableStands);
  const byType = Object.fromEntries(
    SELLABLE_STAND_TYPES.map((type) => [type, sumTotals(sellableStands.filter((stand) => stand.type === type))])
  ) as Record<SellableStandType, StandTypeTotals>;

  return { byType, sellable, hallUsagePercent: (sellable.areaM2 / HALL_AREA_M2) * 100 };
};

export const formatSignedDifference = (value: number, locale: string, maximumFractionDigits = 1): string => {
  const roundedValue = Number(value.toFixed(maximumFractionDigits));

  if (roundedValue === 0) {
    return '0';
  }

  return new Intl.NumberFormat(locale, { maximumFractionDigits, signDisplay: 'always' }).format(roundedValue);
};

export const formatDecimal = (value: number, locale: string, maximumFractionDigits = 1): string =>
  new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value);
