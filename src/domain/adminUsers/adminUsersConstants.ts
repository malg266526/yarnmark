import type { AdminUserPermission, AdminUserStatus } from './adminUsersTypes.ts';

export const ADMIN_USERS_API_URL = 'https://yarnmark-api.com/api/admin-users';

export const APPROVE_ADMINS_PERMISSION: AdminUserPermission = 'approve-admins';

export const ADMIN_USER_PERMISSIONS: AdminUserPermission[] = [
  'approve-admins',
  'manage-submissions',
  'view-submissions'
];

export const ADMIN_USER_STATUSES: AdminUserStatus[] = ['pending', 'approved', 'revoked'];
