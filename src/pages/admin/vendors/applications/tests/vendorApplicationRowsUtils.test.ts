import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import {
  buildStandPairHighlights,
  buildStandPriorityHighlights,
  buildVendorApplicationRows
} from '../utils/vendorApplicationRowsUtils.ts';
import { getBaseApplication, withPreferredStands } from './vendorApplicationFixture.ts';

const buildApplication = (overrides: Partial<VendorApplication>): VendorApplication => ({
  ...getBaseApplication(),
  ...overrides
});

const wooly = buildApplication({ id: 'wooly', ...withPreferredStands(['S1', 'S10']) });
const candleLab = buildApplication({ id: 'candle-lab', ...withPreferredStands(['S1', 'P1']) });
const ceramics = buildApplication({ id: 'ceramics', ...withPreferredStands(['S10']) });
const applications = [wooly, candleLab, ceramics];

test('buildVendorApplicationRows keeps preference order and counts the other applications wanting each stand', () => {
  const rows = buildVendorApplicationRows(applications, applications);

  assert.deepEqual(
    rows.map(({ application }) => application.id),
    ['wooly', 'candle-lab', 'ceramics']
  );
  assert.deepEqual(rows[0].preferences, [
    { choicePosition: 1, stands: [{ competitorCount: 1, standId: 'S1' }] },
    { choicePosition: 2, stands: [{ competitorCount: 1, standId: 'S10' }] }
  ]);
  assert.deepEqual(rows[1].preferences, [
    { choicePosition: 1, stands: [{ competitorCount: 1, standId: 'S1' }] },
    { choicePosition: 2, stands: [{ competitorCount: 0, standId: 'P1' }] }
  ]);
});

test('buildVendorApplicationRows numbers rows and gives a repeated store name the number of its first occurrence', () => {
  const first = buildApplication({ id: 'first', storeName: 'Wełniana Chata' });
  const second = buildApplication({ id: 'second', storeName: 'Kłębek' });
  const repeated = buildApplication({ id: 'repeated', storeName: '  wełniana chata ' });
  const third = buildApplication({ id: 'third', storeName: 'Glina' });
  const visibleApplications = [first, second, repeated, third];

  assert.deepEqual(
    buildVendorApplicationRows(visibleApplications, visibleApplications).map(({ ordinal }) => ordinal),
    [1, 2, 1, 3]
  );
});

test('buildVendorApplicationRows counts competition over all applications, not only the visible ones', () => {
  const rows = buildVendorApplicationRows([ceramics], applications);

  assert.deepEqual(rows[0].preferences, [{ choicePosition: 1, stands: [{ competitorCount: 1, standId: 'S10' }] }]);
});

test('buildVendorApplicationRows lists a stand once even when an application repeats it', () => {
  const duplicated = buildApplication({ id: 'duplicated', ...withPreferredStands(['S1', 'S1']) });
  const rows = buildVendorApplicationRows([duplicated], [duplicated]);

  assert.deepEqual(rows[0].preferences, [{ choicePosition: 1, stands: [{ competitorCount: 0, standId: 'S1' }] }]);
});

test('buildVendorApplicationRows keeps both stands of a pair in one option next to single stands', () => {
  const mixed = buildApplication({
    id: 'mixed',
    preferredStandGroups: [['S1', 'S2'], ['P1']],
    preferredStands: ['S1', 'S2', 'P1']
  });
  const rows = buildVendorApplicationRows([mixed], [mixed, wooly]);

  assert.deepEqual(rows[0].preferences, [
    {
      choicePosition: 1,
      stands: [
        { competitorCount: 1, standId: 'S1' },
        { competitorCount: 0, standId: 'S2' }
      ]
    },
    { choicePosition: 2, stands: [{ competitorCount: 0, standId: 'P1' }] }
  ]);
});

test('buildVendorApplicationRows returns no preferences for an application that selected none', () => {
  const withoutPreferences = buildApplication({ id: 'empty', ...withPreferredStands([]) });

  assert.deepEqual(buildVendorApplicationRows([withoutPreferences], applications)[0].preferences, []);
});

test('buildStandPriorityHighlights numbers the picked stands from the highest priority', () => {
  const highlights = buildStandPriorityHighlights(
    buildApplication({ id: 'highlighted', ...withPreferredStands(['S1', 'S10', 'P1']) })
  );

  assert.deepEqual(
    [...highlights],
    [
      ['S1', 1],
      ['S10', 2],
      ['P1', 3]
    ]
  );
});

test('buildStandPriorityHighlights skips repeated stands and handles no highlighted application', () => {
  const highlights = buildStandPriorityHighlights(
    buildApplication({ id: 'duplicated', ...withPreferredStands(['S1', 'S1', 'P1']) })
  );

  assert.deepEqual(
    [...highlights],
    [
      ['S1', 1],
      ['P1', 2]
    ]
  );
  assert.equal(buildStandPriorityHighlights(null).size, 0);
});

test('buildStandPairHighlights returns only the pairs with their choice position', () => {
  const highlights = buildStandPairHighlights(
    buildApplication({ id: 'mixed', preferredStandGroups: [['P1'], ['S1', 'S2'], ['S6']] })
  );

  assert.deepEqual(highlights, [{ choicePosition: 2, standIds: ['S1', 'S2'] }]);
  assert.deepEqual(buildStandPairHighlights(null), []);
});
