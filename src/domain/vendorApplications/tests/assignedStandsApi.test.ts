import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchAssignedStandVendorsFromApi, parseAssignedStandVendors } from '../assignedStandsApi.ts';
import { VENDOR_ASSIGNED_STANDS_API_URL } from '../vendorFormConstants.ts';

test('parseAssignedStandVendors maps stand indexes to vendors with absolute logo urls', () => {
  const vendors = parseAssignedStandVendors({
    entries: [
      ['P4', { storeName: 'Włóczykijki s.c.', logoUrl: '/uploads/vendors/logo.webp' }],
      ['S1', { storeName: 'Bez logo', logoUrl: null }]
    ]
  });

  assert.deepEqual(vendors.get('P4'), {
    storeName: 'Włóczykijki s.c.',
    logoUrl: 'https://yarnmark-api.com/uploads/vendors/logo.webp'
  });
  assert.deepEqual(vendors.get('S1'), { storeName: 'Bez logo', logoUrl: null });
  assert.equal(vendors.size, 2);
});

test('parseAssignedStandVendors rejects a malformed response', () => {
  assert.throws(() => parseAssignedStandVendors({ entries: [['P4']] }));
  assert.throws(() => parseAssignedStandVendors(null));
});

test('fetchAssignedStandVendorsFromApi requests the assigned stands endpoint', async () => {
  const calls: string[] = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (url: string) => {
    calls.push(url);
    return new Response(JSON.stringify({ entries: [['M2', { storeName: 'Shop', logoUrl: null }]] }), { status: 200 });
  }) as typeof fetch;

  try {
    const vendors = await fetchAssignedStandVendorsFromApi();

    assert.deepEqual(vendors.get('M2'), { storeName: 'Shop', logoUrl: null });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.deepEqual(calls, [VENDOR_ASSIGNED_STANDS_API_URL]);
});
