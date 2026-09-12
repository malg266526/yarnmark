import React from 'react';
import {
  ApplicationActionButton,
  ApplicationActionRow,
  ApplicationCard,
  ApplicationField,
  ApplicationFieldLabel,
  ApplicationFieldValue,
  ApplicationHeader,
  ApplicationsGrid,
  ApplicationsMeta,
  ApplicationTitle
} from '../WorkshopsApplicationsPage.styled';
import { formatDateTime, sortApplicationsBySubmittedAt } from '../utils/workshopsApplicationsFormatters';
import { WORKSHOP_APPLICATION_STATUS_ORDER } from '../workshopsApplicationsConstants';
import { WorkshopsApplicationsCardsViewProps } from './workshopsApplicationsViewContracts';

export const WorkshopsApplicationsCardsView = ({
  applications,
  locale,
  setApplicationStatus,
  translate
}: WorkshopsApplicationsCardsViewProps) => {
  const sortedApplications = sortApplicationsBySubmittedAt(applications);

  return (
    <ApplicationsGrid>
      {sortedApplications.map((application) => (
        <ApplicationCard key={application.id}>
          <ApplicationHeader>
            <ApplicationTitle>{application.workshopTitle}</ApplicationTitle>
            <ApplicationsMeta>{formatDateTime(application.submittedAt, locale)}</ApplicationsMeta>
          </ApplicationHeader>

          <ApplicationField>
            <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.status')}</ApplicationFieldLabel>
            <ApplicationFieldValue>
              {translate(`workshopsApplicationsPage.statuses.${application.status}`)}
            </ApplicationFieldValue>
            <ApplicationActionRow>
              {WORKSHOP_APPLICATION_STATUS_ORDER.map((status) => (
                <ApplicationActionButton
                  key={status}
                  type="button"
                  aria-pressed={application.status === status}
                  onClick={() => {
                    void setApplicationStatus(application.id, status);
                  }}
                >
                  {translate(`workshopsApplicationsPage.statuses.${status}`)}
                </ApplicationActionButton>
              ))}
            </ApplicationActionRow>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.tutorName')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.tutorName}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.phone')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.phoneNumber}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.email')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.email}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.description')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.description}</ApplicationFieldValue>
          </ApplicationField>
        </ApplicationCard>
      ))}
    </ApplicationsGrid>
  );
};
