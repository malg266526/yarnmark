import React from 'react';
import { VendorsApplicationsView } from './VendorsApplicationsView';
import { useVendorsApplications } from './useVendorsApplications';
import { VendorsApplicationsPageStyled } from './VendorsApplicationsPage.styled';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { AdminPageLayout } from '../../AdminPageLayout';

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
