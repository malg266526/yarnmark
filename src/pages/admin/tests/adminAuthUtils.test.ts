import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveAdminLoginResponse } from '../adminAuthUtils.ts';

test('resolveAdminLoginResponse returns the session for a successful login', () => {
  const user = { email: 'admin@example.com' };

  assert.deepEqual(resolveAdminLoginResponse(200, { token: 'abc', user }), {
    status: 'authenticated',
    session: { token: 'abc', user }
  });
});

test('resolveAdminLoginResponse reports accounts waiting for approval', () => {
  assert.deepEqual(resolveAdminLoginResponse(403, { error: 'Account is pending approval' }), {
    status: 'pendingApproval'
  });
});

test('resolveAdminLoginResponse treats other statuses as errors', () => {
  assert.deepEqual(resolveAdminLoginResponse(401, { error: 'Invalid token' }), { status: 'error' });
  assert.deepEqual(resolveAdminLoginResponse(500, null), { status: 'error' });
});

test('resolveAdminLoginResponse treats a success without a token as an error', () => {
  assert.deepEqual(resolveAdminLoginResponse(200, { user: {} }), { status: 'error' });
});
