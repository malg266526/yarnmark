import React from 'react';
import {
  AcceptedApplicationsQueue,
  AcceptedApplicationsQueueTitle,
  ApplicationCard,
  ApplicationHeader,
  ApplicationsGrid,
  ApplicationsMeta,
  ApplicationTitle
} from './VendorsApplicationsPage.styled';
import { formatDateTime, getAcceptedApplicationsSortedBySubmittedAt } from './VendorsApplicationsUtils';
import { VendorsApplicationsCascadeViewProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsCascadeView = ({
  applications,
  locale,
  title
}: VendorsApplicationsCascadeViewProps) => {
  const acceptedApplications = getAcceptedApplicationsSortedBySubmittedAt(applications);

  return (
    <AcceptedApplicationsQueue>
      <AcceptedApplicationsQueueTitle>{title}</AcceptedApplicationsQueueTitle>
      <ApplicationsGrid>
        {acceptedApplications.map((application) => (
          <ApplicationCard key={application.id}>
            <ApplicationHeader>
              <ApplicationTitle>{application.storeName}</ApplicationTitle>
              <ApplicationsMeta>{formatDateTime(application.submittedAt, locale)}</ApplicationsMeta>
            </ApplicationHeader>
          </ApplicationCard>
        ))}
      </ApplicationsGrid>
    </AcceptedApplicationsQueue>
  );
};
