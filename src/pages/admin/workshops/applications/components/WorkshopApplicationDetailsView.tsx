import React from 'react';
import { ApplicationDeleteAction } from '../../../../../components/ApplicationDeleteAction';
import { LogoPreviewImage } from '../../../../../components/form/FormField.styled';
import {
  ApplicationActionButton,
  ApplicationActionRow,
  ApplicationField,
  ApplicationFieldLabel,
  ApplicationFieldValue
} from '../WorkshopsApplicationsPage.styled';
import { WORKSHOP_APPLICATION_STATUS_ORDER } from '../workshopsApplicationsConstants';
import { WorkshopApplicationWarningsView } from './WorkshopApplicationWarningsView';
import type { WorkshopApplicationDetailsViewProps } from './workshopsApplicationsViewContracts';

export const WorkshopApplicationDetailsView = ({
  application,
  deleteApplication,
  deletingApplicationId,
  setApplicationStatus,
  translate,
  warnings
}: WorkshopApplicationDetailsViewProps) => {
  const notProvided = translate('workshopsApplicationsPage.fields.notProvided');
  const fields = [
    ['tutorName', application.tutorName],
    ['phone', application.phoneNumber],
    ['email', application.email],
    [
      'participants',
      translate('workshopsApplicationsPage.fields.participantsRange', {
        min: application.minParticipants,
        max: application.maxParticipants
      })
    ],
    [
      'experienceLevel',
      application.experienceLevel
        ? translate(`workshopsFormPage.steps.experienceLevel.${application.experienceLevel}`)
        : notProvided
    ],
    ['description', application.description],
    ['duration', application.duration || notProvided],
    ['participantsShouldBring', application.participantsShouldBring || notProvided],
    ['roomRequirements', application.roomRequirements || notProvided],
    ['requiredEquipment', application.requiredEquipment || notProvided],
    [
      'grossPricePerParticipant',
      translate('workshopsApplicationsPage.fields.grossPricePerParticipantValue', {
        price: application.grossPricePerParticipant
      })
    ],
    [
      'contractType',
      application.contractType === 'other'
        ? application.contractTypeOther || notProvided
        : application.contractType
          ? translate(`workshopsFormPage.steps.contractType.${application.contractType}`)
          : notProvided
    ],
    ['additionalInfo', application.additionalInfo || notProvided]
  ] as const;

  return (
    <>
      <ApplicationField>
        <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.warnings')}</ApplicationFieldLabel>
        <WorkshopApplicationWarningsView
          emptyLabel={translate('workshopsApplicationsPage.warnings.none')}
          translate={translate}
          warnings={warnings}
        />
      </ApplicationField>
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
              onClick={() => void setApplicationStatus(application.id, status)}
            >
              {translate(`workshopsApplicationsPage.statuses.${status}`)}
            </ApplicationActionButton>
          ))}
        </ApplicationActionRow>
      </ApplicationField>
      {fields.map(([field, value]) => (
        <ApplicationField key={field}>
          <ApplicationFieldLabel>{translate(`workshopsApplicationsPage.fields.${field}`)}</ApplicationFieldLabel>
          <ApplicationFieldValue>{value}</ApplicationFieldValue>
        </ApplicationField>
      ))}
      <ApplicationField>
        <ApplicationFieldLabel>{translate('workshopsApplicationsPage.fields.logoFilename')}</ApplicationFieldLabel>
        <ApplicationFieldValue>{application.logoFileName ?? notProvided}</ApplicationFieldValue>
        {application.logoUrl ? (
          <LogoPreviewImage src={application.logoUrl} alt={application.logoFileName ?? application.workshopTitle} />
        ) : null}
      </ApplicationField>
      <ApplicationActionRow>
        <ApplicationDeleteAction
          buttonLabel={translate('workshopsApplicationsPage.delete.button')}
          cancelLabel={translate('confirmModal.cancel')}
          confirmLabel={translate('workshopsApplicationsPage.delete.confirm')}
          confirmationMessage={translate('workshopsApplicationsPage.delete.message', {
            name: application.workshopTitle
          })}
          confirmationTitle={translate('workshopsApplicationsPage.delete.title')}
          deleting={deletingApplicationId === application.id}
          deletingLabel={translate('workshopsApplicationsPage.delete.deleting')}
          onDelete={() => deleteApplication(application.id)}
        />
      </ApplicationActionRow>
    </>
  );
};
