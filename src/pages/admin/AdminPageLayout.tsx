import React, { ReactNode } from 'react';
import { usePhone } from '../../hooks/usePhone';
import { BackgroundColors } from '../../styles/theme';
import { UtilityPageHeader } from '../../components/UtilityPageHeader';
import { AdminPageBody, AdminPagePanel } from './AdminPageLayout.styled';

interface AdminPageLayoutProps {
  children: ReactNode;
  kicker?: ReactNode;
  title: ReactNode;
}

export const AdminPageLayout = ({ children, kicker, title }: AdminPageLayoutProps) => {
  const isPhone = usePhone();

  return (
    <AdminPagePanel
      id="admin_page_content"
      gap="lg"
      size="xs"
      color={BackgroundColors.navigationBand}
      stretchOnMobile
      padding={isPhone ? 'sm' : 'xxl'}
    >
      <UtilityPageHeader kicker={kicker} title={title} />

      <AdminPageBody>{children}</AdminPageBody>
    </AdminPagePanel>
  );
};
