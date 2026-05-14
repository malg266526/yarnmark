import React from 'react';
import { VendorsApplicationsView } from './vendors-applications/VendorsApplicationsView';
import { useVendorsApplications } from './vendors-applications/useVendorsApplications';
import { VendorsApplicationsPageStyled } from './vendors-applications/VendorsApplicationsPage.styled';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { AdminPageLayout } from './admin/AdminPageLayout';

export const VendorsApplicationsPage = () => {
  const t = useTypedTranslation();
  const { applications, loading, setApplicationStatus } = useVendorsApplications();

  return (
    <AdminPageLayout kicker={t('vendorsApplicationsPage.kicker')} title={t('vendorsApplicationsPage.title')}>
      <VendorsApplicationsPageStyled>
        <VendorsApplicationsView
          applications={applications}
          loading={loading}
          setApplicationStatus={setApplicationStatus}
        />
      </VendorsApplicationsPageStyled>
    </AdminPageLayout>
  );
};
