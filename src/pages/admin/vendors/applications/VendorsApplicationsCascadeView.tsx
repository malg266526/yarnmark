import React from 'react';
import {
  AcceptedApplicationsQueueDescription,
  AcceptedApplicationsQueue,
  AcceptedApplicationsQueueTitle,
  ApplicationCard,
  ApplicationHeader,
  ApplicationsStack,
  ApplicationsMeta,
  ApplicationsMetaRow,
  ApplicationTitle
} from './VendorsApplicationsPage.styled';
import {
  formatDateTime,
  getCascadeChoiceReservations,
  getCascadeManualNegotiationReservations
} from './VendorsApplicationsUtils';
import { VendorsApplicationsCascadeViewProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsCascadeView = ({
  algorithmSteps,
  algorithmTitle,
  allocatedStandLabel,
  applications,
  locale,
  manualNegotiationTitle,
  preferredStandsLabel,
  noneSelectedLabel,
  notAssignedLabel
}: VendorsApplicationsCascadeViewProps) => {
  const reservedApplications = getCascadeChoiceReservations(applications);
  const manualNegotiationApplications = getCascadeManualNegotiationReservations(applications);

  return (
    <>
      <AcceptedApplicationsQueue>
        <AcceptedApplicationsQueueTitle>{algorithmTitle}</AcceptedApplicationsQueueTitle>
        <AcceptedApplicationsQueueDescription start={0}>
          {algorithmSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </AcceptedApplicationsQueueDescription>
      </AcceptedApplicationsQueue>

      <AcceptedApplicationsQueue>
        <ApplicationsStack>
          {reservedApplications.map(({ application, reservedStandId }) => (
            <ApplicationCard key={application.id}>
              <ApplicationHeader>
                <ApplicationTitle>{application.storeName}</ApplicationTitle>
                <ApplicationsMetaRow>
                  <ApplicationsMeta>{formatDateTime(application.submittedAt, locale)}</ApplicationsMeta>
                  <ApplicationsMeta>
                    {preferredStandsLabel}:{' '}
                    {application.preferredStands.length > 0
                      ? application.preferredStands.join(', ')
                      : noneSelectedLabel}
                  </ApplicationsMeta>
                  <ApplicationsMeta>
                    {allocatedStandLabel}: {reservedStandId ?? notAssignedLabel}
                  </ApplicationsMeta>
                </ApplicationsMetaRow>
              </ApplicationHeader>
            </ApplicationCard>
          ))}
        </ApplicationsStack>
      </AcceptedApplicationsQueue>

      {manualNegotiationApplications.length > 0 ? (
        <AcceptedApplicationsQueue>
          <AcceptedApplicationsQueueTitle>{manualNegotiationTitle}</AcceptedApplicationsQueueTitle>
          <ApplicationsStack>
            {manualNegotiationApplications.map(({ application }) => (
              <ApplicationCard key={`manual-${application.id}`}>
                <ApplicationHeader>
                  <ApplicationTitle>{application.storeName}</ApplicationTitle>
                  <ApplicationsMetaRow>
                    <ApplicationsMeta>{formatDateTime(application.submittedAt, locale)}</ApplicationsMeta>
                    <ApplicationsMeta>
                      {preferredStandsLabel}:{' '}
                      {application.preferredStands.length > 0
                        ? application.preferredStands.join(', ')
                        : noneSelectedLabel}
                    </ApplicationsMeta>
                    <ApplicationsMeta>
                      {allocatedStandLabel}: {notAssignedLabel}
                    </ApplicationsMeta>
                  </ApplicationsMetaRow>
                </ApplicationHeader>
              </ApplicationCard>
            ))}
          </ApplicationsStack>
        </AcceptedApplicationsQueue>
      ) : null}
    </>
  );
};
