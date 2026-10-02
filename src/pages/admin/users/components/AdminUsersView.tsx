import React from 'react';
import { UsersEmpty, UsersMeta, UsersSection } from '../AdminUsersPage.styled';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { AdminUserCardsView } from './AdminUserCardsView';
import type { AdminUserCardsViewProps } from './adminUsersViewContracts';

type AdminUsersViewProps = Omit<AdminUserCardsViewProps, 'locale' | 'translate'> & {
  canApproveAdmins: boolean;
  loading: boolean;
};

export const AdminUsersView = ({
  canApproveAdmins,
  loading,
  users,
  permissionSelections,
  pendingAction,
  togglePermission,
  approveUser,
  revokeUser
}: AdminUsersViewProps) => {
  const t = useTypedTranslation();
  const translate = (translationKey: string) => t(translationKey as never);

  if (!canApproveAdmins) {
    return <UsersEmpty>{t('adminUsersPage.noAccess')}</UsersEmpty>;
  }

  return (
    <UsersSection>
      {loading ? (
        <UsersEmpty>{t('adminUsersPage.loading')}</UsersEmpty>
      ) : users.length === 0 ? (
        <UsersEmpty>{t('adminUsersPage.empty')}</UsersEmpty>
      ) : (
        <>
          <UsersMeta>{t('adminUsersPage.usersCount', { count: users.length })}</UsersMeta>
          <AdminUserCardsView
            users={users}
            locale={t.i18n.language}
            permissionSelections={permissionSelections}
            pendingAction={pendingAction}
            togglePermission={togglePermission}
            approveUser={approveUser}
            revokeUser={revokeUser}
            translate={translate}
          />
        </>
      )}
    </UsersSection>
  );
};
