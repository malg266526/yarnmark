import { z } from 'zod';
import { SELLABLE_STAND_TYPES, type LayoutSummary, type SellableStandType } from './layoutSummaryUtils.ts';

export type StandPrices = Record<SellableStandType, number | null>;

export const STAND_PRICES_2026: StandPrices = { premium: 1900, standard: 1200, c: null, mini: 650 };

export const DEFAULT_STAND_PRICES_2027: StandPrices = { ...STAND_PRICES_2026 };

export const STAND_PRICES_2027_STORAGE_KEY = 'standPrices2027';

export interface FinanceRow {
  type: SellableStandType;
  price: number | null;
  count: number;
  revenue: number | null;
  baselineRevenue: number | null;
}

export interface FinanceSummary {
  rows: FinanceRow[];
  revenue: number;
  baselineRevenue: number;
  typesWithoutPrice: SellableStandType[];
}

const getRevenue = (count: number, price: number | null) => {
  if (count === 0) {
    return 0;
  }

  return price === null ? null : count * price;
};

export const summarizeFinances = (
  current: LayoutSummary,
  baseline: LayoutSummary,
  prices: StandPrices,
  baselinePrices: StandPrices = STAND_PRICES_2026
): FinanceSummary => {
  const rows = SELLABLE_STAND_TYPES.map((type) => ({
    type,
    price: prices[type],
    count: current.byType[type].count,
    revenue: getRevenue(current.byType[type].count, prices[type]),
    baselineRevenue: getRevenue(baseline.byType[type].count, baselinePrices[type])
  }));

  return {
    rows,
    revenue: rows.reduce((total, { revenue }) => total + (revenue ?? 0), 0),
    baselineRevenue: rows.reduce((total, { baselineRevenue }) => total + (baselineRevenue ?? 0), 0),
    typesWithoutPrice: rows.filter(({ revenue }) => revenue === null).map(({ type }) => type)
  };
};

export const parseStandPriceInput = (value: string): number | null => {
  const price = Number(value);

  return value.trim() === '' || !Number.isFinite(price) || price < 0 ? null : price;
};

const storedStandPricesSchema = z.object(
  Object.fromEntries(
    SELLABLE_STAND_TYPES.map((type) => [type, z.number().nonnegative().nullable().catch(null)])
  ) as Record<SellableStandType, z.ZodCatch<z.ZodNullable<z.ZodNumber>>>
);

export const parseStoredStandPrices = (rawValue: string): StandPrices => {
  try {
    const result = storedStandPricesSchema.safeParse(JSON.parse(rawValue));

    return result.success ? result.data : DEFAULT_STAND_PRICES_2027;
  } catch {
    return DEFAULT_STAND_PRICES_2027;
  }
};

export const formatCurrency = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(value);

export const formatSignedCurrency = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
    signDisplay: 'exceptZero'
  }).format(value);
