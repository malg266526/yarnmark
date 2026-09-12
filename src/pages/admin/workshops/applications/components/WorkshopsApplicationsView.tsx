import React from 'react';
import { ApplicationsEmpty, ApplicationsMeta, ApplicationsSection } from '../WorkshopsApplicationsPage.styled';
import type {
  WorkshopApplication,
  WorkshopApplicationStatus
} from '../../../../../domain/workshopApplications/workshopFormSubmission.ts';
import { useTypedTranslation } from '../../../../../translations/useTypedTranslation';
import { WorkshopsApplicationsCardsView } from './WorkshopsApplicationsCardsView';

interface WorkshopsApplicationsViewProps {
  applications: WorkshopApplication[];
  loading: boolean;
  setApplicationStatus: (applicationId: string, status: WorkshopApplicationStatus) => Promise<void>;
}

export const WorkshopsApplicationsView = ({
  applications,
  loading,
  setApplicationStatus
}: WorkshopsApplicationsViewProps) => {
  const t = useTypedTranslation();

  if (loading) {
    return <ApplicationsEmpty>{t('workshopsApplicationsPage.loading')}</ApplicationsEmpty>;
  }

  if (applications.length === 0) {
    return <ApplicationsEmpty>{t('workshopsApplicationsPage.empty')}</ApplicationsEmpty>;
  }

  return (
    <ApplicationsSection>
      <ApplicationsMeta>{t('workshopsApplicationsPage.savedCount', { count: applications.length })}</ApplicationsMeta>
      <WorkshopsApplicationsCardsView
        applications={applications}
        locale={t.i18n.language}
        setApplicationStatus={setApplicationStatus}
        translate={(translationKey) => t(translationKey as never)}
      />
    </ApplicationsSection>
  );
};
