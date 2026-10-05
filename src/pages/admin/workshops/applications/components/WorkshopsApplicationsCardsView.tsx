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
  const notProvided = translate('workshopsApplicationsPage.fields.notProvided');

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
            <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.participants')}</ApplicationFieldLabel>
            <ApplicationFieldValue>
              {translate('workshopsApplicationsPage.fields.participantsRange', {
                min: application.minParticipants,
                max: application.maxParticipants
              })}
            </ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>
              {translate('workshopsApplicationsPage.fields.experienceLevel')}
            </ApplicationFieldLabel>
            <ApplicationFieldValue>
              {application.experienceLevel
                ? translate(`workshopsFormPage.steps.experienceLevel.${application.experienceLevel}`)
                : notProvided}
            </ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.description')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.description}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.duration')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.duration || notProvided}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>
              {translate('workshopsApplicationsPage.fields.participantsShouldBring')}
            </ApplicationFieldLabel>
            <ApplicationFieldValue>{application.participantsShouldBring || notProvided}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>
              {translate('workshopsApplicationsPage.fields.roomRequirements')}
            </ApplicationFieldLabel>
            <ApplicationFieldValue>{application.roomRequirements || notProvided}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>
              {translate('workshopsApplicationsPage.fields.requiredEquipment')}
            </ApplicationFieldLabel>
            <ApplicationFieldValue>{application.requiredEquipment || notProvided}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>
              {translate('workshopsApplicationsPage.fields.grossPricePerParticipant')}
            </ApplicationFieldLabel>
            <ApplicationFieldValue>
              {translate('workshopsApplicationsPage.fields.grossPricePerParticipantValue', {
                price: application.grossPricePerParticipant
              })}
            </ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.contractType')}</ApplicationFieldLabel>
            <ApplicationFieldValue>
              {application.contractType === 'other'
                ? application.contractTypeOther || notProvided
                : application.contractType
                  ? translate(`workshopsFormPage.steps.contractType.${application.contractType}`)
                  : notProvided}
            </ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.logoFilename')}</ApplicationFieldLabel>
            <ApplicationFieldValue>{application.logoFileName ?? notProvided}</ApplicationFieldValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationFieldLabel>
              {translate('workshopsApplicationsPage.fields.additionalInfo')}
            </ApplicationFieldLabel>
            <ApplicationFieldValue>{application.additionalInfo || notProvided}</ApplicationFieldValue>
          </ApplicationField>
        </ApplicationCard>
      ))}
    </ApplicationsGrid>
  );
};
