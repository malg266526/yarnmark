import React from 'react';
import { Outlet } from 'react-router-dom';
import { Typography } from '../../components/Typography';
import {
  AdminBrand,
  AdminKicker,
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
    to: '/admin/applications'
  },
  {
    label: 'Vendor form',
    to: '/admin/vendor-form'
  },
  {
    label: 'Editor',
    to: '/admin/editor'
  }
] as const;

export const AdminLayout = () => {
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
        </AdminSidebar>

        <AdminMain>
          <Outlet />
        </AdminMain>
      </AdminShell>
    </AdminRoot>
  );
};
