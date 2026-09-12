import React from 'react';
import { Outlet } from 'react-router-dom';
import { Typography } from '../../components/Typography';
import { Kicker } from '../../components/Kicker';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { useAdminAuth } from './useAdminAuth';
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

const ADMIN_LINKS = [
  {
    id: 'applications',
    to: '/admin/vendors/applications'
  },
  {
    id: 'workshopsApplications',
    to: '/admin/workshops/applications'
  },
  {
    id: 'editor',
    to: '/admin/editor'
  }
] as const;

export const AdminLayout = () => {
  const t = useTypedTranslation();
  const { isAuthenticated, login, logout } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLoginView onSubmit={login} />;
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
            {ADMIN_LINKS.map((link) => (
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
          <Outlet />
        </AdminMain>
      </AdminShell>
    </AdminRoot>
  );
};
