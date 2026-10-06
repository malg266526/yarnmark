import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { buildVendorApplicationRows } from '../utils/vendorApplicationRowsUtils.ts';
import { getBaseApplication } from './vendorApplicationFixture.ts';

const buildApplication = (overrides: Partial<VendorApplication>): VendorApplication => ({
  ...getBaseApplication(),
  ...overrides
});

const wooly = buildApplication({ id: 'wooly', preferredStands: ['S1', 'S10'] });
const candleLab = buildApplication({ id: 'candle-lab', preferredStands: ['S1', 'P1'] });
const ceramics = buildApplication({ id: 'ceramics', preferredStands: ['S10'] });
const applications = [wooly, candleLab, ceramics];

test('buildVendorApplicationRows keeps preference order and counts the other applications wanting each stand', () => {
  const rows = buildVendorApplicationRows(applications, applications);

  assert.deepEqual(
    rows.map(({ application }) => application.id),
    ['wooly', 'candle-lab', 'ceramics']
  );
  assert.deepEqual(rows[0].preferences, [
    { competitorCount: 1, standId: 'S1' },
    { competitorCount: 1, standId: 'S10' }
  ]);
  assert.deepEqual(rows[1].preferences, [
    { competitorCount: 1, standId: 'S1' },
    { competitorCount: 0, standId: 'P1' }
  ]);
});

test('buildVendorApplicationRows counts competition over all applications, not only the visible ones', () => {
  const rows = buildVendorApplicationRows([ceramics], applications);

  assert.deepEqual(rows[0].preferences, [{ competitorCount: 1, standId: 'S10' }]);
});

test('buildVendorApplicationRows lists a stand once even when an application repeats it', () => {
  const duplicated = buildApplication({ id: 'duplicated', preferredStands: ['S1', 'S1'] });
  const rows = buildVendorApplicationRows([duplicated], [duplicated]);

  assert.deepEqual(rows[0].preferences, [{ competitorCount: 0, standId: 'S1' }]);
});

test('buildVendorApplicationRows returns no preferences for an application that selected none', () => {
  const withoutPreferences = buildApplication({ id: 'empty', preferredStands: [] });

  assert.deepEqual(buildVendorApplicationRows([withoutPreferences], applications)[0].preferences, []);
});
