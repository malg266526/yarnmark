import type {
  AdminUser,
  AdminUserPendingAction,
  AdminUserPermission
} from '../../../../domain/adminUsers/adminUsersTypes.ts';
import type { AdminUserPermissionSelections } from '../utils/adminUserPermissionsUtils';

export interface AdminUserCardsViewProps {
  users: AdminUser[];
  locale: string;
  permissionSelections: AdminUserPermissionSelections;
  pendingAction: AdminUserPendingAction | null;
  togglePermission: (userId: string, permission: AdminUserPermission) => void;
  approveUser: (userId: string) => Promise<void>;
  revokeUser: (userId: string) => Promise<void>;
  translate: (translationKey: string) => string;
}
