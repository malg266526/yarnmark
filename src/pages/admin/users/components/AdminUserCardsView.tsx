import React from 'react';
import {
  UserActionButton,
  UserActionRow,
  UserActionSpinner,
  UserCard,
  UserField,
  UserFieldLabel,
  UserFieldValue,
  UserHeader,
  UserPermissionOption,
  UserTitle,
  UsersGrid,
  UsersMeta
} from '../AdminUsersPage.styled';
import { ADMIN_USER_PERMISSIONS } from '../../../../domain/adminUsers/adminUsersConstants.ts';
import { formatDateTime, resolveAdminUserStatusLabel } from '../utils/adminUsersFormatters';
import { AdminUserCardsViewProps } from './adminUsersViewContracts';

export const AdminUserCardsView = ({
  users,
  locale,
  permissionSelections,
  pendingAction,
  togglePermission,
  approveUser,
  revokeUser,
  translate
}: AdminUserCardsViewProps) => (
  <UsersGrid>
    {users.map((user) => {
      const selectedPermissions = permissionSelections[user.id] ?? [];
      const userPendingAction = pendingAction?.userId === user.id ? pendingAction.action : null;
      const isUpdating = userPendingAction !== null;

      return (
        <UserCard key={user.id}>
          <UserHeader>
            <UserTitle>{user.email}</UserTitle>
            <UsersMeta>{formatDateTime(user.createdAt, locale)}</UsersMeta>
          </UserHeader>

          <UserField>
            <UserFieldLabel>{translate('adminUsersPage.fields.status')}</UserFieldLabel>
            <UserFieldValue>{resolveAdminUserStatusLabel(user.status, translate)}</UserFieldValue>
          </UserField>

          <UserField>
            <UserFieldLabel>{translate('adminUsersPage.fields.googleId')}</UserFieldLabel>
            <UserFieldValue>{user.googleId}</UserFieldValue>
          </UserField>

          <UserField>
            <UserFieldLabel>{translate('adminUsersPage.fields.currentPermissions')}</UserFieldLabel>
            <UserFieldValue>
              {user.permissions.length === 0
                ? translate('adminUsersPage.values.noPermissions')
                : user.permissions.join(', ')}
            </UserFieldValue>
          </UserField>

          <UserField>
            <UserFieldLabel>{translate('adminUsersPage.fields.grantedPermissions')}</UserFieldLabel>
            {ADMIN_USER_PERMISSIONS.map((permission) => (
              <UserPermissionOption key={permission}>
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission)}
                  disabled={isUpdating}
                  onChange={() => togglePermission(user.id, permission)}
                />
                {translate(`adminUsersPage.permissions.${permission}`)}
              </UserPermissionOption>
            ))}
          </UserField>

          <UserActionRow>
            <UserActionButton
              type="button"
              disabled={isUpdating}
              aria-busy={userPendingAction === 'approve'}
              onClick={() => {
                void approveUser(user.id);
              }}
            >
              {userPendingAction === 'approve' && <UserActionSpinner aria-hidden="true" />}
              {translate('adminUsersPage.actions.approve')}
            </UserActionButton>
            <UserActionButton
              type="button"
              disabled={isUpdating}
              aria-busy={userPendingAction === 'revoke'}
              onClick={() => {
                void revokeUser(user.id);
              }}
            >
              {userPendingAction === 'revoke' && <UserActionSpinner aria-hidden="true" />}
              {translate('adminUsersPage.actions.revoke')}
            </UserActionButton>
          </UserActionRow>
        </UserCard>
      );
    })}
  </UsersGrid>
);
