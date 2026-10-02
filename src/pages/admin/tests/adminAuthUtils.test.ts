import test from 'node:test';
import assert from 'node:assert/strict';
import {
  hasAdminPermission,
  parseStoredAdminSession,
  resolveAdminLoginResponse,
  resolveAdminPermissions
} from '../adminAuthUtils.ts';

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

const NOW_MS = Date.parse('2026-10-01T12:00:00.000Z');

const createJwt = (payload: Record<string, unknown>) =>
  ['header', Buffer.from(JSON.stringify(payload)).toString('base64url'), 'signature'].join('.');

test('parseStoredAdminSession restores a session whose token has not expired', () => {
  const session = { token: createJwt({ exp: NOW_MS / 1000 + 60 }), user: { email: 'admin@example.com' } };

  assert.deepEqual(parseStoredAdminSession(JSON.stringify(session), NOW_MS), session);
});

test('parseStoredAdminSession drops a session whose token has expired', () => {
  const session = { token: createJwt({ exp: NOW_MS / 1000 - 60 }), user: {} };

  assert.equal(parseStoredAdminSession(JSON.stringify(session), NOW_MS), null);
});

test('parseStoredAdminSession keeps a session whose token carries no expiry', () => {
  const session = { token: 'opaque-token', user: {} };

  assert.deepEqual(parseStoredAdminSession(JSON.stringify(session), NOW_MS), session);
});

test('parseStoredAdminSession returns null for missing or malformed values', () => {
  assert.equal(parseStoredAdminSession(null, NOW_MS), null);
  assert.equal(parseStoredAdminSession('not-json', NOW_MS), null);
  assert.equal(parseStoredAdminSession(JSON.stringify({ user: {} }), NOW_MS), null);
});

test('resolveAdminPermissions reads the permissions of the signed-in user', () => {
  const session = { token: 'abc', user: { email: 'admin@example.com', permissions: ['approve-admins'] } };

  assert.deepEqual(resolveAdminPermissions(session), ['approve-admins']);
});

test('resolveAdminPermissions returns no permissions for a user without them', () => {
  assert.deepEqual(resolveAdminPermissions(null), []);
  assert.deepEqual(resolveAdminPermissions({ token: 'abc', user: {} }), []);
  assert.deepEqual(resolveAdminPermissions({ token: 'abc', user: { permissions: 'all' } }), []);
});

test('hasAdminPermission only grants access when the permission is present', () => {
  assert.equal(hasAdminPermission(['approve-admins'], 'approve-admins'), true);
  assert.equal(hasAdminPermission(['view-submissions'], 'approve-admins'), false);
  assert.equal(hasAdminPermission([], 'approve-admins'), false);
});

test('hasAdminPermission allows entries that require no permission', () => {
  assert.equal(hasAdminPermission([], undefined), true);
});
