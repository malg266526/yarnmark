import test from 'node:test';
import assert from 'node:assert/strict';
import { updateNewsletterStatus } from '../newsletterApi.ts';
import { NEWSLETTER_API_URL } from '../newsletterConstants.ts';
import { ApiRequestError } from '../../apiClient.ts';

for (const status of ['pending', 'subscribed'] as const) {
  test(`updateNewsletterStatus sends an authenticated PATCH for ${status}`, async (context) => {
    const fetchMock = context.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 204 }));

    await updateNewsletterStatus('test-token', 'subscriber/id', status);

    assert.deepEqual(fetchMock.mock.calls[0].arguments, [
      `${NEWSLETTER_API_URL}/subscriber%2Fid`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer test-token' },
        credentials: 'include',
        body: JSON.stringify({ status })
      }
    ]);
  });
}

test('updateNewsletterStatus propagates API errors', async (context) => {
  context.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 401 }));

  await assert.rejects(updateNewsletterStatus('expired-token', 'subscriber-id', 'subscribed'), (error: unknown) => {
    assert.ok(error instanceof ApiRequestError);
    assert.equal(error.status, 401);
    return true;
  });
});
