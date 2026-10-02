import React from 'react';
import { Outlet } from 'react-router-dom';
import { Typography } from '../../components/Typography';
import { Kicker } from '../../components/Kicker';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { APPROVE_ADMINS_PERMISSION } from '../../domain/adminUsers/adminUsersConstants.ts';
import { useAdminAuth } from './useAdminAuth';
import { hasAdminPermission, resolveAdminPermissions } from './adminAuthUtils';
import type { AdminOutletContext } from './useAdminSession';
import { AdminLoginView } from './AdminLoginView';
import {
  AdminBrand,
  AdminLogoutButton,
  AdminMain,
  AdminNav,
  AdminNavLink,
  AdminRoot,
  AdminShell,
  AdminSidebar
} from './AdminLayout.styled';

type AdminLinkId = 'applications' | 'workshopsApplications' | 'users' | 'editor' | 'vendorForm' | 'workshopForm';

interface AdminLink {
  id: AdminLinkId;
  to: string;
  requiredPermission?: string;
}

const ADMIN_LINKS: AdminLink[] = [
  {
    id: 'applications',
    to: '/admin/vendors/applications'
  },
  {
    id: 'workshopsApplications',
    to: '/admin/workshops/applications'
  },
  {
    id: 'users',
    to: '/admin/users',
    requiredPermission: APPROVE_ADMINS_PERMISSION
  },
  {
    id: 'editor',
    to: '/admin/editor'
  },
  {
    id: 'vendorForm',
    to: '/vendor/apply'
  },
  {
    id: 'workshopForm',
    to: '/workshops/apply'
  }
];

export const AdminLayout = () => {
  const t = useTypedTranslation();
  const { authState, session, googleButtonRef, logout } = useAdminAuth(t.i18n.language);
  const permissions = resolveAdminPermissions(session);

  if (authState !== 'authenticated') {
    return <AdminLoginView authState={authState} googleButtonRef={googleButtonRef} />;
  }

  return (
    <AdminRoot>
      <AdminShell>
        <AdminSidebar>
          <AdminBrand>
            <Kicker>
              <Typography size="xs">{t('adminLayout.kicker')}</Typography>
            </Kicker>
            <Typography size="xl" weight="bold">
              Yarnmark
            </Typography>
          </AdminBrand>

          <AdminNav aria-label={t('adminLayout.navigationLabel')}>
            {ADMIN_LINKS.filter((link) => hasAdminPermission(permissions, link.requiredPermission)).map((link) => (
              <AdminNavLink key={link.to} to={link.to}>
                <Typography size="md">{t(`adminLayout.links.${link.id}` as const)}</Typography>
              </AdminNavLink>
            ))}
          </AdminNav>

          <AdminLogoutButton type="button" onClick={logout}>
            <Typography size="md">{t('adminLogin.logout')}</Typography>
          </AdminLogoutButton>
        </AdminSidebar>

        <AdminMain>
          <Outlet context={{ session, expireSession: logout } satisfies AdminOutletContext} />
        </AdminMain>
      </AdminShell>
    </AdminRoot>
  );
};
