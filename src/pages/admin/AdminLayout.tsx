import React from 'react';
import { Outlet } from 'react-router-dom';
import { Typography } from '../../components/Typography';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { useAdminAuth } from './useAdminAuth';
import { AdminLoginView } from './AdminLoginView';
import {
  AdminBrand,
  AdminKicker,
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
    label: 'Applications',
    to: '/admin/vendors/applications'
  },
  {
    label: 'Editor',
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
            <AdminKicker>
              <Typography size="xs">Admin</Typography>
            </AdminKicker>
            <Typography size="xl" weight="bold">
              Yarnmark
            </Typography>
          </AdminBrand>

          <AdminNav aria-label="Admin navigation">
            {ADMIN_LINKS.map((link) => (
              <AdminNavLink key={link.to} to={link.to}>
                <Typography size="md">{link.label}</Typography>
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
