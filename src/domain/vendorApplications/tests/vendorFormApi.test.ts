import assert from 'node:assert/strict';
import test from 'node:test';
import { ApiRequestError } from '../../apiClient.ts';
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

test('submitVendorApplicationToApi rejects when the request fails', async () => {
  const formData = { ...INITIAL_VENDOR_FORM_STATE, storeName: 'Test shop' };
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async () => {
    throw new Error('network error');
  }) as typeof fetch;

  try {
    await assert.rejects(submitVendorApplicationToApi(formData));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('submitVendorApplicationToApi rejects when the backend responds with an error status', async () => {
  const formData = { ...INITIAL_VENDOR_FORM_STATE, storeName: 'Test shop' };
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async () => new Response(JSON.stringify({ errors: {} }), { status: 400 })) as typeof fetch;

  try {
    await assert.rejects(submitVendorApplicationToApi(formData), ApiRequestError);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('submitVendorApplicationToApi does not send credentials with the public submission', async () => {
  const formData = { ...INITIAL_VENDOR_FORM_STATE, storeName: 'Test shop' };
  const calls: Array<RequestInit | undefined> = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    calls.push(init);
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  try {
    await submitVendorApplicationToApi(formData);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(calls[0]?.credentials, 'same-origin');
});
