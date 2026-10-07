import test from 'node:test';
import assert from 'node:assert/strict';
import type { LayoutSummary } from './layoutSummaryUtils.ts';
import {
  DEFAULT_STAND_PRICES_2027,
  formatCurrency,
  formatSignedCurrency,
  STAND_PRICES_2026,
  parseStandPriceInput,
  parseStoredStandPrices,
  summarizeFinances
} from './layoutFinanceUtils.ts';

const createSummary = (counts: { premium: number; standard: number; c: number; mini: number }): LayoutSummary => ({
  byType: {
    premium: { count: counts.premium, areaM2: 0 },
    standard: { count: counts.standard, areaM2: 0 },
    c: { count: counts.c, areaM2: 0 },
    mini: { count: counts.mini, areaM2: 0 }
  },
  sellable: { count: 0, areaM2: 0 },
  hallAreaM2: 0,
  hallUsagePercent: 0
});

const layout2026 = createSummary({ premium: 5, standard: 36, c: 0, mini: 7 });

test('summarizeFinances reproduces the 2026 revenue from the 2026 prices', () => {
  const finances = summarizeFinances(layout2026, layout2026, STAND_PRICES_2026);

  assert.equal(finances.baselineRevenue, 5 * 1900 + 36 * 1200 + 7 * 650);
  assert.equal(finances.revenue, finances.baselineRevenue);
  assert.deepEqual(finances.typesWithoutPrice, []);
});

test('summarizeFinances counts revenue per type with the 2027 prices', () => {
  const layout2027 = createSummary({ premium: 5, standard: 35, c: 3, mini: 11 });
  const finances = summarizeFinances(layout2027, layout2026, { premium: 2000, standard: 1250, c: 1000, mini: 700 });

  assert.deepEqual(
    finances.rows.map(({ type, revenue }) => [type, revenue]),
    [
      ['premium', 10000],
      ['standard', 43750],
      ['c', 3000],
      ['mini', 7700]
    ]
  );
  assert.equal(finances.revenue, 64450);
});

test('summarizeFinances flags stand types that have stands but no price', () => {
  const layout2027 = createSummary({ premium: 5, standard: 35, c: 3, mini: 11 });
  const finances = summarizeFinances(layout2027, layout2026, DEFAULT_STAND_PRICES_2027);

  assert.equal(finances.rows.find(({ type }) => type === 'c')?.revenue, null);
  assert.deepEqual(finances.typesWithoutPrice, ['c']);
  assert.equal(finances.revenue, 5 * 1900 + 35 * 1200 + 11 * 650);
});

test('parseStandPriceInput accepts non-negative numbers and treats anything else as missing', () => {
  assert.equal(parseStandPriceInput('1250'), 1250);
  assert.equal(parseStandPriceInput(''), null);
  assert.equal(parseStandPriceInput('-5'), null);
  assert.equal(parseStandPriceInput('abc'), null);
});

test('parseStoredStandPrices restores saved prices and falls back on broken data', () => {
  assert.deepEqual(parseStoredStandPrices('{"premium":2000,"standard":1250,"c":null,"mini":700}'), {
    premium: 2000,
    standard: 1250,
    c: null,
    mini: 700
  });
  assert.deepEqual(parseStoredStandPrices('{"premium":"x"}').premium, null);
  assert.deepEqual(parseStoredStandPrices('not json'), DEFAULT_STAND_PRICES_2027);
});

const normalizeSpaces = (value: string) => value.replace(/\s/g, ' ');

test('formatCurrency and formatSignedCurrency show whole zloty amounts', () => {
  assert.equal(normalizeSpaces(formatCurrency(57250, 'pl')), '57 250 zł');
  assert.equal(normalizeSpaces(formatSignedCurrency(3000, 'pl')), '+3000 zł');
  assert.equal(normalizeSpaces(formatSignedCurrency(-650, 'pl')), '-650 zł');
  assert.equal(normalizeSpaces(formatSignedCurrency(0, 'pl')), '0 zł');
});
