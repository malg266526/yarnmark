import assert from 'node:assert/strict';
import test from 'node:test';
import { INITIAL_WORKSHOP_FORM_STATE } from '../workshopFormTypes.ts';
import { WORKSHOP_FORM_API_URL } from '../workshopFormConstants.ts';
import { submitWorkshopApplicationToApi } from '../workshopFormApi.ts';

test('submitWorkshopApplicationToApi posts the form data as JSON to the workshops apply endpoint', async () => {
  const formData = { ...INITIAL_WORKSHOP_FORM_STATE, tutorName: 'Test tutor' };
  const calls: Array<[string, RequestInit | undefined]> = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    calls.push([url, init]);
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  try {
    await submitWorkshopApplicationToApi(formData);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], WORKSHOP_FORM_API_URL);
  assert.equal(calls[0][1]?.method, 'POST');
  assert.equal(
    calls[0][1]?.headers && (calls[0][1].headers as Record<string, string>)['Content-Type'],
    'application/json'
  );
  assert.deepEqual(JSON.parse(calls[0][1]?.body as string), formData);
});

test('submitWorkshopApplicationToApi does not throw when the request fails', async () => {
  const formData = { ...INITIAL_WORKSHOP_FORM_STATE, tutorName: 'Test tutor' };
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async () => {
    throw new Error('network error');
  }) as typeof fetch;

  try {
    await assert.doesNotReject(submitWorkshopApplicationToApi(formData));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
