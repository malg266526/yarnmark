import React from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { AdminPageLayout } from '../AdminPageLayout';
import { AdminNewsletterPageStyled } from './AdminNewsletterPage.styled';
import { AdminNewsletterView } from './components/AdminNewsletterView';
import { useAdminNewsletter } from './hooks/useAdminNewsletter';

export const AdminNewsletterPage = () => {
  const t = useTypedTranslation();
  const { subscribers, loading, hasFailed, updatingEmail, hasUpdateFailed, markAsAdded } = useAdminNewsletter();

  return (
    <AdminPageLayout kicker={t('adminNewsletterPage.kicker')} title={t('adminNewsletterPage.title')}>
      <AdminNewsletterPageStyled>
        <AdminNewsletterView
          subscribers={subscribers}
          loading={loading}
          hasFailed={hasFailed}
          updatingEmail={updatingEmail}
          hasUpdateFailed={hasUpdateFailed}
          onMarkAsAdded={markAsAdded}
        />
      </AdminNewsletterPageStyled>
    </AdminPageLayout>
  );
};
