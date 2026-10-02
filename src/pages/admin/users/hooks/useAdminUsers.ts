import { useEffect, useState } from 'react';
import { useAdminSession } from '../../useAdminSession';
import { hasAdminPermission } from '../../adminAuthUtils';
import { approveAdminUser, listAdminUsers, revokeAdminUser } from '../../../../domain/adminUsers/adminUsersApi.ts';
import { APPROVE_ADMINS_PERMISSION } from '../../../../domain/adminUsers/adminUsersConstants.ts';
import type {
  AdminUser,
  AdminUserAction,
  AdminUserPendingAction,
  AdminUserPermission
} from '../../../../domain/adminUsers/adminUsersTypes.ts';
import {
  buildPermissionSelections,
  togglePermissionSelection,
  type AdminUserPermissionSelections
} from '../utils/adminUserPermissionsUtils';

export const useAdminUsers = () => {
  const { token, permissions, handleAdminApiError } = useAdminSession();
  const canApproveAdmins = hasAdminPermission(permissions, APPROVE_ADMINS_PERMISSION);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState<boolean>(canApproveAdmins);
  const [permissionSelections, setPermissionSelections] = useState<AdminUserPermissionSelections>({});
  const [pendingAction, setPendingAction] = useState<AdminUserPendingAction | null>(null);

  useEffect(() => {
    if (!canApproveAdmins) {
      return;
    }

    let isActive = true;

    setLoading(true);

    listAdminUsers(token)
      .then((fetchedUsers) => {
        if (isActive) {
          setUsers(fetchedUsers);
          setPermissionSelections(buildPermissionSelections(fetchedUsers));
        }
      })
      .catch((error: unknown) => {
        console.error('Admin users could not be loaded', error);
        handleAdminApiError(error);
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [token, canApproveAdmins, handleAdminApiError]);

  const togglePermission = (userId: string, permission: AdminUserPermission) => {
    setPermissionSelections((currentSelections) => togglePermissionSelection(currentSelections, userId, permission));
  };

  const runUserAction = async (userId: string, action: AdminUserAction, request: () => Promise<void>) => {
    setPendingAction({ userId, action });

    try {
      await request();
      const fetchedUsers = await listAdminUsers(token);
      setUsers(fetchedUsers);
      setPermissionSelections(buildPermissionSelections(fetchedUsers));
    } catch (error) {
      console.error(`Admin user ${action} failed`, error);
      handleAdminApiError(error);
    } finally {
      setPendingAction(null);
    }
  };

  const approveUser = (userId: string) =>
    runUserAction(userId, 'approve', () => approveAdminUser(token, userId, permissionSelections[userId] ?? []));

  const revokeUser = (userId: string) => runUserAction(userId, 'revoke', () => revokeAdminUser(token, userId));

  return {
    canApproveAdmins,
    users,
    loading,
    permissionSelections,
    pendingAction,
    togglePermission,
    approveUser,
    revokeUser
  };
};
