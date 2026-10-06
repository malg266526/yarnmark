import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import { buildVendorApplicationFlags } from '../utils/vendorApplicationFlagsUtils.ts';
import { getBaseApplication } from './vendorApplicationFixture.ts';

const buildApplication = (overrides: Partial<VendorApplication>): VendorApplication => ({
  ...getBaseApplication(),
  preferredStands: ['S1', 'P1', 'M3'],
  ...overrides
});

const flagsOf = (applications: VendorApplication[], applicationId: string) =>
  buildVendorApplicationFlags(applications).get(applicationId);

test('a complete application raises no flags', () => {
  const application = buildApplication({ id: 'complete' });

  assert.deepEqual(flagsOf([application], 'complete'), []);
});

test('duplicated e-mail and store name flag every application sharing them', () => {
  const applications = [
    buildApplication({ id: 'first', email: 'Shop@Example.com', storeName: 'Wooly Shop' }),
    buildApplication({ id: 'second', email: ' shop@example.com ', storeName: 'wooly shop ' }),
    buildApplication({ id: 'third', email: 'other@example.com', storeName: 'Candle Lab' })
  ];
  const flags = buildVendorApplicationFlags(applications);

  assert.deepEqual(flags.get('first'), ['duplicateEmail', 'duplicateStoreName']);
  assert.deepEqual(flags.get('second'), ['duplicateEmail', 'duplicateStoreName']);
  assert.deepEqual(flags.get('third'), []);
});

test('blank contact details are not treated as duplicates of each other', () => {
  const applications = [
    buildApplication({ id: 'first', email: '', storeName: '' }),
    buildApplication({ id: 'second', email: '  ', storeName: '  ' })
  ];

  assert.deepEqual(flagsOf(applications, 'first'), []);
});

test('fields the submission form already requires do not produce flags', () => {
  const application = buildApplication({
    id: 'incomplete',
    acceptedStatute: false,
    businessDescription: '   ',
    logoDataUrl: null,
    logoFileName: null,
    logoUrl: null
  });

  assert.deepEqual(flagsOf([application], 'incomplete'), []);
});

test('fewer than three distinct stands is flagged, duplicates do not count as separate picks', () => {
  const application = buildApplication({ id: 'few', preferredStands: ['S1', 'S1', 'P1'] });

  assert.deepEqual(flagsOf([application], 'few'), ['incompletePreferences']);
});

test('picking only one stand type is flagged', () => {
  const premiumOnly = buildApplication({ id: 'premium-only', preferredStands: ['P1', 'P2', 'P3'] });

  assert.deepEqual(flagsOf([premiumOnly], 'premium-only'), ['singleStandType']);
});

test('a single pick is not reported as one stand type, only as incomplete preferences', () => {
  const application = buildApplication({ id: 'single', preferredStands: ['P1'] });

  assert.deepEqual(flagsOf([application], 'single'), ['incompletePreferences']);
});

test('stands with an unknown prefix never produce a one-type flag', () => {
  const application = buildApplication({ id: 'unknown', preferredStands: ['X1', 'X2', 'X3'] });

  assert.deepEqual(flagsOf([application], 'unknown'), []);
});
