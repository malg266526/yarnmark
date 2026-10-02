import assert from 'node:assert/strict';
import test from 'node:test';
import { buildPermissionSelections, togglePermissionSelection } from '../utils/adminUserPermissionsUtils.ts';
import type { AdminUser } from '../../../../domain/adminUsers/adminUsersTypes.ts';

const createAdminUser = (id: string, permissions: string[]): AdminUser => ({
  id,
  googleId: `google-${id}`,
  email: `${id}@example.com`,
  permissions,
  status: 'approved',
  createdAt: '2026-09-30T10:30:00.000Z'
});

test('buildPermissionSelections preselects the permissions each user already has', () => {
  const users = [createAdminUser('user-1', ['view-submissions']), createAdminUser('user-2', [])];

  assert.deepEqual(buildPermissionSelections(users), {
    'user-1': ['view-submissions'],
    'user-2': []
  });
});

test('buildPermissionSelections drops permissions the frontend does not know', () => {
  const users = [createAdminUser('user-1', ['view-submissions', 'manage-hall'])];

  assert.deepEqual(buildPermissionSelections(users), { 'user-1': ['view-submissions'] });
});

test('togglePermissionSelection adds a permission in the order of the permission list', () => {
  const selections = { 'user-1': ['view-submissions' as const] };

  assert.deepEqual(togglePermissionSelection(selections, 'user-1', 'approve-admins'), {
    'user-1': ['approve-admins', 'view-submissions']
  });
});

test('togglePermissionSelection removes a permission that is already selected', () => {
  const selections = { 'user-1': ['approve-admins' as const, 'view-submissions' as const] };

  assert.deepEqual(togglePermissionSelection(selections, 'user-1', 'approve-admins'), {
    'user-1': ['view-submissions']
  });
});

test('togglePermissionSelection keeps the other users untouched', () => {
  const selections = { 'user-1': [], 'user-2': ['view-submissions' as const] };

  assert.deepEqual(togglePermissionSelection(selections, 'user-1', 'manage-submissions'), {
    'user-1': ['manage-submissions'],
    'user-2': ['view-submissions']
  });
});
