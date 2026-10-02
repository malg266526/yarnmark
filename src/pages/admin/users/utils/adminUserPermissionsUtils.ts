import { ADMIN_USER_PERMISSIONS } from '../../../../domain/adminUsers/adminUsersConstants.ts';
import type { AdminUser, AdminUserPermission } from '../../../../domain/adminUsers/adminUsersTypes.ts';

export type AdminUserPermissionSelections = Record<string, AdminUserPermission[]>;

const toKnownPermissions = (permissions: string[]): AdminUserPermission[] =>
  ADMIN_USER_PERMISSIONS.filter((knownPermission) => permissions.includes(knownPermission));

export const buildPermissionSelections = (users: AdminUser[]): AdminUserPermissionSelections =>
  users.reduce<AdminUserPermissionSelections>(
    (selections, user) => ({ ...selections, [user.id]: toKnownPermissions(user.permissions) }),
    {}
  );

export const togglePermissionSelection = (
  selections: AdminUserPermissionSelections,
  userId: string,
  permission: AdminUserPermission
): AdminUserPermissionSelections => {
  const selectedPermissions = selections[userId] ?? [];
  const nextPermissions = selectedPermissions.includes(permission)
    ? selectedPermissions.filter((selectedPermission) => selectedPermission !== permission)
    : ADMIN_USER_PERMISSIONS.filter(
        (knownPermission) => knownPermission === permission || selectedPermissions.includes(knownPermission)
      );

  return { ...selections, [userId]: nextPermissions };
};
