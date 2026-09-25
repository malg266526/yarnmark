import assert from 'node:assert/strict';
import test from 'node:test';
import { INITIAL_VENDOR_FORM_STATE } from '../vendorFormTypes.ts';
import { VENDOR_FORM_API_URL } from '../vendorFormConstants.ts';
import { submitVendorApplicationToApi } from '../vendorFormApi.ts';

test('submitVendorApplicationToApi posts the form data as JSON to the vendor apply endpoint', async () => {
  const formData = { ...INITIAL_VENDOR_FORM_STATE, storeName: 'Test shop' };
  const calls: Array<[string, RequestInit | undefined]> = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    calls.push([url, init]);
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  try {
    await submitVendorApplicationToApi(formData);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], VENDOR_FORM_API_URL);
  assert.equal(calls[0][1]?.method, 'POST');
  assert.equal(
    calls[0][1]?.headers && (calls[0][1].headers as Record<string, string>)['Content-Type'],
    'application/json'
  );
  assert.deepEqual(JSON.parse(calls[0][1]?.body as string), formData);
});

test('submitVendorApplicationToApi does not throw when the request fails', async () => {
  const formData = { ...INITIAL_VENDOR_FORM_STATE, storeName: 'Test shop' };
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async () => {
    throw new Error('network error');
  }) as typeof fetch;

  try {
    await assert.doesNotReject(submitVendorApplicationToApi(formData));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
