import React from 'react';
import { WorkshopsApplicationsView } from './components/WorkshopsApplicationsView';
import { useWorkshopsApplications } from './hooks/useWorkshopsApplications';
import { WorkshopsApplicationsPageStyled } from './WorkshopsApplicationsPage.styled';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import { AdminPageLayout } from '../../AdminPageLayout';

export const WorkshopsApplicationsPage = () => {
  const t = useTypedTranslation();
  const { applications, loading, setApplicationStatus } = useWorkshopsApplications();

  return (
    <AdminPageLayout kicker={t('workshopsApplicationsPage.kicker')} title={t('workshopsApplicationsPage.title')}>
      <WorkshopsApplicationsPageStyled>
        <WorkshopsApplicationsView
          applications={applications}
          loading={loading}
          setApplicationStatus={setApplicationStatus}
        />
      </WorkshopsApplicationsPageStyled>
    </AdminPageLayout>
  );
};
