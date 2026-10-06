import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildVendorApplicationsSearchParams,
  parseVendorApplicationsCategoryFilter,
  parseVendorApplicationsFilters,
  parseVendorApplicationsOpenId,
  parseVendorApplicationsSortOrder,
  parseVendorApplicationsViewMode
} from '../utils/vendorApplicationsFilterParams.ts';
import { DEFAULT_VENDOR_APPLICATIONS_FILTERS } from '../utils/vendorApplicationsFilterUtils.ts';

test('parseVendorApplicationsViewMode falls back to the dense list for a missing or unknown view', () => {
  assert.equal(parseVendorApplicationsViewMode(new URLSearchParams()), 'rows');
  assert.equal(parseVendorApplicationsViewMode(new URLSearchParams('view=nope')), 'rows');
  assert.equal(parseVendorApplicationsViewMode(new URLSearchParams('view=stands')), 'stands');
  assert.equal(parseVendorApplicationsViewMode(new URLSearchParams('view=cards')), 'cards');
});

test('parseVendorApplicationsOpenId reads the application opened in the drawer', () => {
  assert.equal(parseVendorApplicationsOpenId(new URLSearchParams()), null);
  assert.equal(parseVendorApplicationsOpenId(new URLSearchParams('application=%20')), null);
  assert.equal(parseVendorApplicationsOpenId(new URLSearchParams('application=abc-1')), 'abc-1');
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
  assert.equal(buildVendorApplicationsSearchParams(DEFAULT_VENDOR_APPLICATIONS_FILTERS, 'rows', null).toString(), '');
  assert.equal(
    buildVendorApplicationsSearchParams(
      { ...DEFAULT_VENDOR_APPLICATIONS_FILTERS, search: '  ' },
      'rows',
      null
    ).toString(),
    ''
  );
});

test('buildVendorApplicationsSearchParams serializes the active state', () => {
  assert.equal(
    buildVendorApplicationsSearchParams(
      { category: 'candles', search: 'lab', sortOrder: 'name', standId: 'P1', status: 'pending' },
      'stands',
      'abc-1'
    ).toString(),
    'view=stands&q=lab&status=pending&category=candles&stand=P1&sort=name&application=abc-1'
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

  assert.deepEqual(parseVendorApplicationsFilters(buildVendorApplicationsSearchParams(filters, 'rows', null)), filters);
});
