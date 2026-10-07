import assert from 'node:assert/strict';
import test from 'node:test';
import type { VendorApplication } from '../../../../../domain/vendorApplications/vendorFormSubmission.ts';
import {
  collectPreferredStandIds,
  countApplicationsByStatus,
  countFirstChoiceCompetitors,
  DEFAULT_VENDOR_APPLICATIONS_FILTERS,
  filterVendorApplications,
  hasActiveVendorApplicationsFilters,
  matchesVendorApplicationSearch,
  resolveStandFilterOptions,
  selectVendorApplications,
  sortVendorApplications
} from '../utils/vendorApplicationsFilterUtils.ts';
import type { VendorApplicationsSortOrder } from '../vendorsApplicationsConstants.ts';
import { getBaseApplication } from './vendorApplicationFixture.ts';

const buildApplication = (overrides: Partial<VendorApplication>): VendorApplication => ({
  ...getBaseApplication(),
  ...overrides
});

const wooly = buildApplication({
  id: 'wooly',
  storeName: 'Wooly Shop',
  email: 'wooly@example.com',
  phoneNumber: '+48 111 222 333',
  mainCategory: 'yarns',
  preferredStands: ['S1', 'S10'],
  status: 'accepted',
  submittedAt: '2026-05-01T08:00:00.000Z'
});

const candleLab = buildApplication({
  id: 'candle-lab',
  storeName: 'Candle Lab',
  email: 'hello@candlelab.pl',
  phoneNumber: '+48 999 888 777',
  mainCategory: 'candles',
  preferredStands: ['S1', 'P1'],
  status: 'pending',
  submittedAt: '2026-05-02T08:00:00.000Z'
});

const ceramics = buildApplication({
  id: 'ceramics',
  storeName: 'Alpaka Ceramics',
  email: 'shop@alpaka.pl',
  phoneNumber: '+48 500 600 700',
  mainCategory: 'ceramics',
  preferredStands: ['S10'],
  status: 'pending',
  submittedAt: '2026-05-03T08:00:00.000Z'
});

const applications = [wooly, candleLab, ceramics];

const sortIds = (sortedApplications: VendorApplication[], sortOrder: VendorApplicationsSortOrder) =>
  sortVendorApplications(sortedApplications, sortOrder, {
    firstChoiceCompetitors: countFirstChoiceCompetitors(sortedApplications),
    locale: 'pl'
  }).map(({ id }) => id);

test('countApplicationsByStatus reports every known status, including empty ones', () => {
  assert.deepEqual(countApplicationsByStatus(applications), {
    pending: 2,
    rejected: 0,
    'reserve-list': 0,
    accepted: 1,
    'stand-assigned': 0
  });
});

test('countFirstChoiceCompetitors counts other applications requesting the same first choice', () => {
  const competitors = countFirstChoiceCompetitors(applications);

  assert.equal(competitors.get('wooly'), 1);
  assert.equal(competitors.get('candle-lab'), 1);
  assert.equal(competitors.get('ceramics'), 1);
});

test('countFirstChoiceCompetitors reports no competitors for an application without preferences', () => {
  const competitors = countFirstChoiceCompetitors([buildApplication({ id: 'empty', preferredStands: [] })]);

  assert.equal(competitors.get('empty'), 0);
});

test('countFirstChoiceCompetitors counts one request per application even when a stand is listed twice', () => {
  const competitors = countFirstChoiceCompetitors([
    buildApplication({ id: 'duplicated', preferredStands: ['S1', 'S1'] }),
    buildApplication({ id: 'rival', preferredStands: ['S1'] })
  ]);

  assert.equal(competitors.get('duplicated'), 1);
  assert.equal(competitors.get('rival'), 1);
});

test('collectPreferredStandIds returns unique stand ids in numeric order', () => {
  assert.deepEqual(collectPreferredStandIds(applications), ['P1', 'S1', 'S10']);
});

test('resolveStandFilterOptions keeps a filtered stand nobody requested on the list', () => {
  assert.deepEqual(resolveStandFilterOptions(applications, 'all'), ['P1', 'S1', 'S10']);
  assert.deepEqual(resolveStandFilterOptions(applications, 'S1'), ['P1', 'S1', 'S10']);
  assert.deepEqual(resolveStandFilterOptions(applications, 'M3'), ['M3', 'P1', 'S1', 'S10']);
});

test('matchesVendorApplicationSearch matches store name, e-mail and digits of the phone number', () => {
  assert.equal(matchesVendorApplicationSearch(wooly, ''), true);
  assert.equal(matchesVendorApplicationSearch(wooly, 'wool'), true);
  assert.equal(matchesVendorApplicationSearch(wooly, 'WOOLY@EXAMPLE.COM'), true);
  assert.equal(matchesVendorApplicationSearch(wooly, '111222'), true);
  assert.equal(matchesVendorApplicationSearch(wooly, 'candle'), false);
});

test('filterVendorApplications combines status, category and stand filters', () => {
  assert.deepEqual(
    filterVendorApplications(applications, { ...DEFAULT_VENDOR_APPLICATIONS_FILTERS, status: 'pending' }).map(
      ({ id }) => id
    ),
    ['candle-lab', 'ceramics']
  );

  assert.deepEqual(
    filterVendorApplications(applications, { ...DEFAULT_VENDOR_APPLICATIONS_FILTERS, category: 'candles' }).map(
      ({ id }) => id
    ),
    ['candle-lab']
  );

  assert.deepEqual(
    filterVendorApplications(applications, { ...DEFAULT_VENDOR_APPLICATIONS_FILTERS, standId: 'S10' }).map(
      ({ id }) => id
    ),
    ['wooly', 'ceramics']
  );

  assert.deepEqual(
    filterVendorApplications(applications, {
      ...DEFAULT_VENDOR_APPLICATIONS_FILTERS,
      standId: 'S1',
      status: 'pending'
    }).map(({ id }) => id),
    ['candle-lab']
  );
});

test('sortVendorApplications orders by submission time and by store name', () => {
  assert.deepEqual(sortIds(applications, 'oldest'), ['wooly', 'candle-lab', 'ceramics']);
  assert.deepEqual(sortIds(applications, 'newest'), ['ceramics', 'candle-lab', 'wooly']);
  assert.deepEqual(sortIds(applications, 'name'), ['ceramics', 'candle-lab', 'wooly']);
});

test('sortVendorApplications leaves the input array untouched', () => {
  const applicationsToSort = [...applications];

  sortIds(applicationsToSort, 'newest');

  assert.deepEqual(
    applicationsToSort.map(({ id }) => id),
    ['wooly', 'candle-lab', 'ceramics']
  );
});

test('sortVendorApplications puts the most contested first choice on top and keeps submission time as tie-break', () => {
  const contested = buildApplication({
    id: 'contested',
    storeName: 'Contested',
    preferredStands: ['S10'],
    submittedAt: '2026-05-04T08:00:00.000Z'
  });

  assert.deepEqual(sortIds([...applications, contested], 'demand'), ['ceramics', 'contested', 'wooly', 'candle-lab']);
});

test('selectVendorApplications filters first and counts competition over the full set', () => {
  assert.deepEqual(
    selectVendorApplications(
      applications,
      { ...DEFAULT_VENDOR_APPLICATIONS_FILTERS, sortOrder: 'demand', status: 'pending' },
      'pl'
    ).map(({ id }) => id),
    ['candle-lab', 'ceramics']
  );
});

test('hasActiveVendorApplicationsFilters ignores defaults and a blank search', () => {
  assert.equal(hasActiveVendorApplicationsFilters(DEFAULT_VENDOR_APPLICATIONS_FILTERS), false);
  assert.equal(hasActiveVendorApplicationsFilters({ ...DEFAULT_VENDOR_APPLICATIONS_FILTERS, search: '   ' }), false);
  assert.equal(hasActiveVendorApplicationsFilters({ ...DEFAULT_VENDOR_APPLICATIONS_FILTERS, search: 'wooly' }), true);
  assert.equal(
    hasActiveVendorApplicationsFilters({ ...DEFAULT_VENDOR_APPLICATIONS_FILTERS, status: 'accepted' }),
    true
  );
  assert.equal(
    hasActiveVendorApplicationsFilters({ ...DEFAULT_VENDOR_APPLICATIONS_FILTERS, sortOrder: 'demand' }),
    true
  );
});
