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
  ApplicationTitle,
  CascadeSimulationNotice,
  CascadeSimulationTitle,
  CascadeExportLink
} from '../VendorsApplicationsPage.styled';
import { formatDateTime } from '../utils/vendorsApplicationsFormatters';
import { summarizeCascadeEligibility } from '../utils/standAllocationUtils';
import { useCascadeProposal, CASCADE_PROPOSAL_FILE_NAME } from '../hooks/useCascadeProposal';
import { VendorsApplicationsCascadeViewProps } from './vendorsApplicationsViewContracts';

export const VendorsApplicationsCascadeView = ({
  simulationLabel,
  simulationDescription,
  exportLabel,
  emptyLabel,
  resolveEmptyExplanation,
  exportLabels,
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
  const {
    reservations: reservedApplications,
    manualNegotiationReservations: manualNegotiationApplications,
    exportUrl
  } = useCascadeProposal(applications, exportLabels);

  return (
    <>
      <CascadeSimulationNotice>
        <CascadeSimulationTitle>{simulationLabel}</CascadeSimulationTitle>
        <ApplicationsMeta>{simulationDescription}</ApplicationsMeta>
        <CascadeExportLink
          href={exportUrl}
          download={CASCADE_PROPOSAL_FILE_NAME}
          aria-disabled={!exportUrl}
          tabIndex={exportUrl ? 0 : -1}
        >
          {exportLabel}
        </CascadeExportLink>
      </CascadeSimulationNotice>
      <AcceptedApplicationsQueue>
        <AcceptedApplicationsQueueTitle>{algorithmTitle}</AcceptedApplicationsQueueTitle>
        <AcceptedApplicationsQueueDescription start={0}>
          {algorithmSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </AcceptedApplicationsQueueDescription>
      </AcceptedApplicationsQueue>

      {reservedApplications.length === 0 ? (
        <AcceptedApplicationsQueue>
          <AcceptedApplicationsQueueTitle>{emptyLabel}</AcceptedApplicationsQueueTitle>
          <ApplicationsMeta>{resolveEmptyExplanation(summarizeCascadeEligibility(applications))}</ApplicationsMeta>
        </AcceptedApplicationsQueue>
      ) : (
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
      )}

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
