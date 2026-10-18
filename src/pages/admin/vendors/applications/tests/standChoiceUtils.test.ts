import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { formatStandGroup, getApplicationStandGroups, getStandChoicePositions } from '../utils/standChoiceUtils.ts';
import { getBaseApplication, withPreferredStands } from './vendorApplicationFixture.ts';

const buildApplication = (overrides: Partial<VendorApplication>): VendorApplication => ({
  ...getBaseApplication(),
  ...overrides
});

test('single stands each form their own choice', () => {
  const application = buildApplication({ ...withPreferredStands(['P4', 'S1', 'M2']) });

  assert.deepEqual(getApplicationStandGroups(application), [['P4'], ['S1'], ['M2']]);
  assert.deepEqual(
    [...getStandChoicePositions(application)],
    [
      ['P4', 1],
      ['S1', 2],
      ['M2', 3]
    ]
  );
});

test('both stands of a pair share the choice position of that pair', () => {
  const application = buildApplication({ ...withPreferredStands(['S1', 'S2', 'M4', 'M5'], true) });

  assert.deepEqual(getApplicationStandGroups(application), [
    ['S1', 'S2'],
    ['M4', 'M5']
  ]);
  assert.deepEqual(
    [...getStandChoicePositions(application)],
    [
      ['S1', 1],
      ['S2', 1],
      ['M4', 2],
      ['M5', 2]
    ]
  );
});

test('a repeated stand counts as one choice', () => {
  const application = buildApplication({ ...withPreferredStands(['S1', 'S1', 'P1']) });

  assert.deepEqual(getApplicationStandGroups(application), [['S1'], ['P1']]);
});

test('a stand group is formatted with its stands joined', () => {
  assert.equal(formatStandGroup(['S1', 'S2']), 'S1 + S2');
  assert.equal(formatStandGroup(['P4']), 'P4');
});

test('a mix of a pair and single stands keeps one choice position per option', () => {
  const application = buildApplication({ preferredStandGroups: [['S1', 'S2'], ['P1'], ['S6']] });

  assert.deepEqual(
    [...getStandChoicePositions(application)],
    [
      ['S1', 1],
      ['S2', 1],
      ['P1', 2],
      ['S6', 3]
    ]
  );
});
