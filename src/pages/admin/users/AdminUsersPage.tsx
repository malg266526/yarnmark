import React from 'react';
import { AdminUsersView } from './components/AdminUsersView';
import { useAdminUsers } from './hooks/useAdminUsers';
import { AdminUsersPageStyled } from './AdminUsersPage.styled';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { AdminPageLayout } from '../AdminPageLayout';

export const AdminUsersPage = () => {
  const t = useTypedTranslation();
  const {
    canApproveAdmins,
    users,
    loading,
    permissionSelections,
    pendingAction,
    togglePermission,
    approveUser,
    revokeUser
  } = useAdminUsers();

  return (
    <AdminPageLayout kicker={t('adminUsersPage.kicker')} title={t('adminUsersPage.title')}>
      <AdminUsersPageStyled>
        <AdminUsersView
          canApproveAdmins={canApproveAdmins}
          users={users}
          loading={loading}
          permissionSelections={permissionSelections}
          pendingAction={pendingAction}
          togglePermission={togglePermission}
          approveUser={approveUser}
          revokeUser={revokeUser}
        />
      </AdminUsersPageStyled>
    </AdminPageLayout>
  );
};
