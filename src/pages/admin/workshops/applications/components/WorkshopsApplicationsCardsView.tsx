import React from 'react';
import {
  ApplicationCard,
  ApplicationHeader,
  ApplicationsGrid,
  ApplicationsMeta,
  ApplicationTitle
} from '../WorkshopsApplicationsPage.styled';
import { formatDateTime } from '../utils/workshopsApplicationsFormatters';
import { WorkshopApplicationDetailsView } from './WorkshopApplicationDetailsView';
import type { WorkshopsApplicationsCardsViewProps } from './workshopsApplicationsViewContracts';

export const WorkshopsApplicationsCardsView = ({
  applications,
  deleteApplication,
  deletingApplicationId,
  locale,
  setApplicationStatus,
  translate,
  warningsByApplicationId
}: WorkshopsApplicationsCardsViewProps) => {
  return (
    <ApplicationsGrid>
      {applications.map((application) => (
        <ApplicationCard key={application.id}>
          <ApplicationHeader>
            <ApplicationTitle>{application.workshopTitle}</ApplicationTitle>
            <ApplicationsMeta>{formatDateTime(application.submittedAt, locale)}</ApplicationsMeta>
          </ApplicationHeader>

          <WorkshopApplicationDetailsView
            application={application}
            deleteApplication={deleteApplication}
            deletingApplicationId={deletingApplicationId}
            setApplicationStatus={setApplicationStatus}
            translate={translate}
            warnings={warningsByApplicationId.get(application.id) ?? []}
          />
        </ApplicationCard>
      ))}
    </ApplicationsGrid>
  );
};
