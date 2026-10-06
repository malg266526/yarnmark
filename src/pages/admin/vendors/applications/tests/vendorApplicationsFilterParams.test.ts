import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildVendorApplicationsSearchParams,
  parseVendorApplicationsCategoryFilter,
  parseVendorApplicationsFilters,
  parseVendorApplicationsSortOrder,
  parseVendorApplicationsViewMode
} from '../utils/vendorApplicationsFilterParams.ts';
import { DEFAULT_VENDOR_APPLICATIONS_FILTERS } from '../utils/vendorApplicationsFilterUtils.ts';

test('parseVendorApplicationsViewMode falls back to cards for a missing or unknown view', () => {
  assert.equal(parseVendorApplicationsViewMode(new URLSearchParams()), 'cards');
  assert.equal(parseVendorApplicationsViewMode(new URLSearchParams('view=nope')), 'cards');
  assert.equal(parseVendorApplicationsViewMode(new URLSearchParams('view=stands')), 'stands');
});

test('single-value parsers narrow untrusted input from selects', () => {
  assert.equal(parseVendorApplicationsCategoryFilter('ceramics'), 'ceramics');
  assert.equal(parseVendorApplicationsCategoryFilter('wool'), 'all');
  assert.equal(parseVendorApplicationsSortOrder('demand'), 'demand');
  assert.equal(parseVendorApplicationsSortOrder('alphabetical'), 'oldest');
});

test('parseVendorApplicationsFilters returns defaults for an empty query', () => {
  assert.deepEqual(parseVendorApplicationsFilters(new URLSearchParams()), DEFAULT_VENDOR_APPLICATIONS_FILTERS);
});

test('parseVendorApplicationsFilters reads every supported filter', () => {
  assert.deepEqual(
    parseVendorApplicationsFilters(new URLSearchParams('q=wooly&status=accepted&category=yarns&stand=S12&sort=demand')),
    {
      category: 'yarns',
      search: 'wooly',
      sortOrder: 'demand',
      standId: 'S12',
      status: 'accepted'
    }
  );
});

test('parseVendorApplicationsFilters ignores unknown values', () => {
  assert.deepEqual(
    parseVendorApplicationsFilters(new URLSearchParams('status=klepniete&category=wool&sort=random')),
    DEFAULT_VENDOR_APPLICATIONS_FILTERS
  );
});

test('buildVendorApplicationsSearchParams keeps default state out of the url', () => {
  assert.equal(buildVendorApplicationsSearchParams(DEFAULT_VENDOR_APPLICATIONS_FILTERS, 'cards').toString(), '');
  assert.equal(
    buildVendorApplicationsSearchParams({ ...DEFAULT_VENDOR_APPLICATIONS_FILTERS, search: '  ' }, 'cards').toString(),
    ''
  );
});

test('buildVendorApplicationsSearchParams serializes the active state', () => {
  assert.equal(
    buildVendorApplicationsSearchParams(
      { category: 'candles', search: 'lab', sortOrder: 'name', standId: 'P1', status: 'pending' },
      'stands'
    ).toString(),
    'view=stands&q=lab&status=pending&category=candles&stand=P1&sort=name'
  );
});

test('parsing a built query restores the same filters', () => {
  const filters = {
    category: 'ceramics',
    search: 'alpaka',
    sortOrder: 'newest',
    standId: 'S10',
    status: 'reserve-list'
  } as const;

  assert.deepEqual(parseVendorApplicationsFilters(buildVendorApplicationsSearchParams(filters, 'cards')), filters);
});
