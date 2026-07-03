import React, { ReactNode } from 'react';
import { usePhone } from '../../hooks/usePhone';
import { BackgroundColors } from '../../styles/theme';
import { UtilityPageHeader } from '../../components/UtilityPageHeader';
import { AdminPageBody, AdminPagePanel } from './AdminPageLayout.styled';
import { RedesignSpacings } from '../../styles/spacings';

interface AdminPageLayoutProps {
  children: ReactNode;
  kicker?: ReactNode;
  title: ReactNode;
  desktopPadding?: keyof typeof RedesignSpacings;
  maxWidth?: `${number}%` | `${number}px`;
}

export const AdminPageLayout = ({ children, kicker, title, desktopPadding, maxWidth }: AdminPageLayoutProps) => {
  const isPhone = usePhone();

  return (
    <AdminPagePanel
      id="admin_page_content"
      gap="lg"
      size="xs"
      color={BackgroundColors.navigationBand}
      stretchOnMobile
      padding={isPhone ? 'sm' : desktopPadding || 'xxl'}
      maxWidth={maxWidth}
    >
      <UtilityPageHeader kicker={kicker} title={title} />

      <AdminPageBody>{children}</AdminPageBody>
    </AdminPagePanel>
  );
};
