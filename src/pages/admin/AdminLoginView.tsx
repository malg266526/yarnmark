import React, { type MutableRefObject } from 'react';
import { Typography } from '../../components/Typography';
import { UtilityPageHeader } from '../../components/UtilityPageHeader';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import { AdminLoginCard, AdminLoginError, AdminLoginRoot } from './AdminLogin.styled';
import type { AdminAuthState } from './adminAuthUtils';

interface AdminLoginViewProps {
  authState: Exclude<AdminAuthState, 'authenticated'>;
  googleButtonRef: MutableRefObject<HTMLDivElement | null>;
}

export const AdminLoginView = ({ authState, googleButtonRef }: AdminLoginViewProps) => {
  const t = useTypedTranslation();
  const isWaiting = authState === 'initializing' || authState === 'verifying';

  return (
    <AdminLoginRoot>
      <AdminLoginCard>
        <UtilityPageHeader kicker={t('adminLogin.kicker')} title={t('adminLogin.title')} titleSize="xl" />

        {authState === 'pendingApproval' || authState === 'error' ? (
          <AdminLoginError>{t(`adminLogin.states.${authState}` as const)}</AdminLoginError>
        ) : (
          <Typography size="sm">{t(`adminLogin.states.${authState}` as const)}</Typography>
        )}

        {isWaiting ? null : <div ref={googleButtonRef} />}
      </AdminLoginCard>
    </AdminLoginRoot>
  );
};
