import React from 'react';
import { VendorsApplicationsView } from './components/VendorsApplicationsView';
import { useVendorsApplications } from './hooks/useVendorsApplications';
import { VendorsApplicationsPageStyled } from './VendorsApplicationsPage.styled';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { AdminPageLayout } from '../../AdminPageLayout';

export const VendorsApplicationsPage = () => {
  const t = useTypedTranslation();
  const {
    applications,
    deleteApplication,
    deletingApplicationId,
    dismissStatusChange,
    lastStatusChange,
    loading,
    savingStatusApplicationId,
    setApplicationStatus,
    undoStatusChange
  } = useVendorsApplications();

  return (
    <AdminPageLayout kicker={t('vendorsApplicationsPage.kicker')} title={t('vendorsApplicationsPage.title')}>
      <VendorsApplicationsPageStyled>
        <VendorsApplicationsView
          applications={applications}
          deleteApplication={deleteApplication}
          deletingApplicationId={deletingApplicationId}
          dismissStatusChange={dismissStatusChange}
          lastStatusChange={lastStatusChange}
          loading={loading}
          savingStatusApplicationId={savingStatusApplicationId}
          setApplicationStatus={setApplicationStatus}
          undoStatusChange={undoStatusChange}
        />
      </VendorsApplicationsPageStyled>
    </AdminPageLayout>
  );
};
