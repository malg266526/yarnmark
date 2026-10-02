import assert from 'node:assert/strict';
import test from 'node:test';
import { approveAdminUser, listAdminUsers, parseAdminUsers, revokeAdminUser } from '../adminUsersApi.ts';
import { ADMIN_USERS_API_URL } from '../adminUsersConstants.ts';
import { ApiRequestError } from '../../apiClient.ts';
import type { AdminUser } from '../adminUsersTypes.ts';

interface RecordedRequest {
  url: string;
  init: RequestInit | undefined;
}

const ADMIN_TOKEN = 'admin-token';
const originalFetch = globalThis.fetch;

const createAdminUser = (overrides: Partial<AdminUser> = {}): AdminUser => ({
  id: 'user-1',
  googleId: '1234567890',
  email: 'admin@example.com',
  permissions: ['view-submissions'],
  status: 'approved',
  createdAt: '2026-09-30T10:30:00.000Z',
  ...overrides
});

const stubFetch = (status: number, responseBody: unknown) => {
  const requests: RecordedRequest[] = [];

  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    requests.push({ url, init });

    return new Response(JSON.stringify(responseBody), { status });
  }) as typeof fetch;

  return requests;
};

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('listAdminUsers fetches users from the backend with the admin token', async () => {
  const adminUser = createAdminUser();
  const requests = stubFetch(200, { users: [adminUser] });

  const adminUsers = await listAdminUsers(ADMIN_TOKEN);

  assert.deepEqual(adminUsers, [adminUser]);
  assert.equal(requests[0].url, ADMIN_USERS_API_URL);
  assert.equal(requests[0].init?.method, 'GET');
  assert.equal(requests[0].init?.credentials, 'include');
  assert.deepEqual(requests[0].init?.headers, { Authorization: `Bearer ${ADMIN_TOKEN}` });
});

test('listAdminUsers throws when the backend rejects the request', async () => {
  stubFetch(401, { error: 'Not authenticated' });

  await assert.rejects(listAdminUsers(ADMIN_TOKEN), ApiRequestError);
});

test('approveAdminUser sends the granted permissions to the approve endpoint', async () => {
  const requests = stubFetch(200, {});

  await approveAdminUser(ADMIN_TOKEN, 'user-1', ['approve-admins', 'view-submissions']);

  assert.equal(requests[0].url, `${ADMIN_USERS_API_URL}/user-1/approve`);
  assert.equal(requests[0].init?.method, 'POST');
  assert.equal(requests[0].init?.body, JSON.stringify({ permissions: ['approve-admins', 'view-submissions'] }));
  assert.deepEqual(requests[0].init?.headers, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ADMIN_TOKEN}`
  });
});

test('revokeAdminUser posts to the revoke endpoint without a body', async () => {
  const requests = stubFetch(200, {});

  await revokeAdminUser(ADMIN_TOKEN, 'user-1');

  assert.equal(requests[0].url, `${ADMIN_USERS_API_URL}/user-1/revoke`);
  assert.equal(requests[0].init?.method, 'POST');
  assert.equal(requests[0].init?.body, undefined);
});

test('approveAdminUser throws when the backend rejects the update', async () => {
  stubFetch(403, { error: 'Forbidden' });

  await assert.rejects(approveAdminUser(ADMIN_TOKEN, 'user-1', []), ApiRequestError);
});

test('parseAdminUsers reads both a bare list and a wrapped payload', () => {
  const adminUser = createAdminUser();

  assert.deepEqual(parseAdminUsers([adminUser]), [adminUser]);
  assert.deepEqual(parseAdminUsers({ users: [adminUser] }), [adminUser]);
});

test('parseAdminUsers drops malformed records but keeps valid ones', () => {
  const adminUser = createAdminUser();

  assert.deepEqual(parseAdminUsers([adminUser, { id: 'broken-user' }]), [adminUser]);
});

test('parseAdminUsers keeps a status the frontend does not know yet', () => {
  const adminUser = createAdminUser({ status: 'suspended' });

  assert.deepEqual(parseAdminUsers([adminUser]), [adminUser]);
});

test('parseAdminUsers returns an empty list for a payload that is not a list', () => {
  assert.deepEqual(parseAdminUsers(null), []);
  assert.deepEqual(parseAdminUsers({ foo: 'bar' }), []);
});
