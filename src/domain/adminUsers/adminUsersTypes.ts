export type AdminUserStatus = 'pending' | 'approved' | 'revoked';

export type AdminUserPermission = 'approve-admins' | 'manage-submissions' | 'view-submissions';

export interface AdminUser {
  id: string;
  googleId: string;
  email: string;
  permissions: string[];
  status: string;
  createdAt: string;
}

export type AdminUserAction = 'approve' | 'revoke';

export interface AdminUserPendingAction {
  userId: string;
  action: AdminUserAction;
}
