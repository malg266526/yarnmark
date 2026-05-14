import React from 'react';
import {
  AcceptedApplicationsQueue,
  AcceptedApplicationsQueueTitle,
  ApplicationCard,
  ApplicationHeader,
  ApplicationsStack,
  ApplicationsMeta,
  ApplicationsMetaRow,
  ApplicationTitle
} from './VendorsApplicationsPage.styled';
import { formatDateTime, getAcceptedApplicationsSortedBySubmittedAt } from './VendorsApplicationsUtils';
import { VendorsApplicationsCascadeViewProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsCascadeView = ({
  applications,
  locale,
  preferredStandsLabel,
  noneSelectedLabel,
  title
}: VendorsApplicationsCascadeViewProps) => {
  const acceptedApplications = getAcceptedApplicationsSortedBySubmittedAt(applications);

  return (
    <AcceptedApplicationsQueue>
      <AcceptedApplicationsQueueTitle>{title}</AcceptedApplicationsQueueTitle>
      <ApplicationsStack>
        {acceptedApplications.map((application) => (
          <ApplicationCard key={application.id}>
            <ApplicationHeader>
              <ApplicationTitle>{application.storeName}</ApplicationTitle>
              <ApplicationsMetaRow>
                <ApplicationsMeta>{formatDateTime(application.submittedAt, locale)}</ApplicationsMeta>
                <ApplicationsMeta>
                  {preferredStandsLabel}:{' '}
                  {application.preferredStands.length > 0 ? application.preferredStands.join(', ') : noneSelectedLabel}
                </ApplicationsMeta>
              </ApplicationsMetaRow>
            </ApplicationHeader>
          </ApplicationCard>
        ))}
      </ApplicationsStack>
    </AcceptedApplicationsQueue>
  );
};
